"use client"
import * as React from 'react';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Loading from "./_components/loading"
import Header from "./_components/header"
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Suspense } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { StepIconProps } from '@mui/material/StepIcon';

import ApartmentIcon from '@mui/icons-material/Apartment';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import TableViewIcon from '@mui/icons-material/TableView';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import SendIcon from '@mui/icons-material/Send';

import { useForm, SubmitHandler } from 'react-hook-form';

import ColorlibConnector from './_components/colorlib';
import ColorlibStepIconRoot from './_components/colorbtn';
import CompanyForm from "./_components/stepper/company"
import OrderForm from "./_components/stepper/order"
import DeliverForm from "./_components/stepper/deliver"
import BillForm from "./_components/stepper/bill"
import { Grid, Alert } from '@mui/material';

const steps = ['DATOS DE LA EMPRESA', 'DATOS DEL PEDIDO', 'DATOS PARA LA ENTREGA DE PRODUCTOS', 'DATOS PARA FACTURACION Y COBRANZA'];

interface FormData {
  business_name: string;
  ruth: string;
  commercial_business: string;
  commercial_address: string;
  oc_num: string;
  require_hes: string;
  mail: string;
  phone: string;
  client_name: string;
  customer_id: string;
  customer_email: string;
  customer_phone: string;
  delivery_type: string;
  delivery_hour: string;
  delivery_date: string;
  deliver_name: string;
  deliver_phone: string;
  deliver_address: string;
  bill_name: string;
  bill_phone: string;
  bill_email: string;
}

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <ApartmentIcon />,
    2: <ShoppingCartCheckoutIcon />,
    3: <AirportShuttleIcon />,
    4: <TableViewIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function HorizontalLinearStepper() {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>(
    {
      // defaultValues: {
      //   business_name: "123",
      //   ruth: "123",
      //   commercial_business: "123",
      //   commercial_address: "123",
      //   oc_num: "123",
      //   require_hes: "yes",
      //   mail: "123",
      //   phone: "123",
      //   client_name: "123",
      //   customer_id: "123",
      //   customer_email: "123",
      //   customer_phone: "123",
      //   delivery_type: "time",
      //   delivery_hour: "123",
      //   delivery_date: "123",
      //   deliver_name: "123",
      //   deliver_phone: "123",
      //   deliver_address: "123",
      //   bill_name: "123",
      //   bill_phone: "123",
      //   bill_email: "123",
      // }
      defaultValues: {
        require_hes: "yes",
        delivery_type: "time",
      }
    }
  );
  const [result, setResult] = React.useState<boolean | null>(null)
  const { data: session, status } = useSession<boolean>();
  const [submitting, setSubmitting] = React.useState<boolean | null>(false);
  const router = useRouter();
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const orderVals = watch();


  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {
    setResult(null)
    if (activeStep == 4) return;
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep == 0) return;
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOrder = async () => {
    const stringFormData: FormData = Object.entries(orderVals).reduce((acc, [key, value]) => {
      acc[key as keyof FormData] = String(value);
      return acc;
    }, {} as FormData);
    setSubmitting(true);
    const email = (session?.user?.email);
    const response = await fetch("./api/order", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ orderVals, email: email })
    })
    setSubmitting(false);
    if (response.ok == true) {
      setResult(true)
      setActiveStep(0)
    } else {
      setResult(false);
    }
  };
  const stepContent = [
    <CompanyForm
      key="companyForm"
      register={register}
      error={errors}
      setValue={setValue}
      watch={watch}
    />,
    <OrderForm
      key="orderForm"
      register={register}
      error={errors}
      setValue={setValue}
      watch={watch}
    />,
    <DeliverForm
      key="deliverForm"
      register={register}
      error={errors}
      setValue={setValue}
      watch={watch}
    />,
    <BillForm
      key="billForm"
      register={register}
      error={errors}
      setValue={setValue}
      watch={watch}
    />,
  ]

  const showSession = () => {
    if (status === "authenticated" && (submitting === false)) {
      return (
        <>
          <Header />
          <div className="mt-TopSpace">
            <Suspense fallback={<Loading />}>
              <Box sx={{ width: '100%', height: "100vh" }}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                  {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                      optional?: React.ReactNode;
                    } = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = (
                        <Typography variant="caption">Optional</Typography>
                      );
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps} StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <div className='px-ContainerSpace'>
                  {activeStep === steps.length ? (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }} className='text-black text-3xl font-extrabold text-center'>
                        Your Order Info
                      </Typography>

                      <Grid container className="py-4">
                        <Grid item xs={12} md={12} lg={12}>
                          <h2 className='text-black text-2xl font-extrabold'>DATOS DE LA EMPRESA</h2>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Razón Social: </strong> {orderVals.business_name}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Rut: </strong> {orderVals.ruth}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Giro Comercial: </strong> {orderVals.commercial_business}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Dirección Comercial: </strong> {orderVals.commercial_address}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>N° OC: </strong> {orderVals.oc_num}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Requiere HES: </strong> {orderVals.require_hes}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Correo: </strong> {orderVals.mail}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Teléfono: </strong> {orderVals.phone}
                        </Grid>
                      </Grid>
                      <Grid container className="py-4">
                        <Grid item xs={12} md={12} lg={12}>
                          <h2 className='text-black text-2xl font-extrabold'>DATOS DEL PEDIDO</h2>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Nombre Cliente: </strong> {orderVals.client_name}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Rut Cliente: </strong> {orderVals.customer_id}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Correo Cliente: </strong> {orderVals.customer_email}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Teléfono Cliente: </strong> {orderVals.customer_phone}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Plazo de entrega requerido: </strong> {orderVals.delivery_hour}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Fecha de entrega específica: </strong> {orderVals.delivery_date}
                        </Grid>
                      </Grid>
                      <Grid container className="py-4">
                        <Grid item xs={12} md={12} lg={12}>
                          <h2 className='text-black text-2xl font-extrabold'>DATOS PARA LA ENTREGA DE PRODUCTOS</h2>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Nombre Contacto: </strong> {orderVals.client_name}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Telefono Contacto: </strong> {orderVals.business_name}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Dirección de Despacho: </strong> {orderVals.business_name}
                        </Grid>
                      </Grid>
                      <Grid container className="py-4">
                        <Grid item xs={12} md={12} lg={12}>
                          <h2 className='text-black text-2xl font-extrabold'>DATOS PARA FACTURACION Y COBRANZA</h2>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Nombre Contacto: </strong> {orderVals.business_name}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Telefono Contacto: </strong> {orderVals.business_name}
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} className='text-black py-1 '>
                          * <strong>Correo de Contacto: </strong> {orderVals.business_name}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} md={12} lg={12}>
                        <Alert severity="info">Ante cualquier duda para el llenado de este formulario, consulte a su ejecutivo de ventas asignado.</Alert>
                        {result == false ? <Alert severity="error">Order failed.</Alert> : <></>}
                        {result == true ? <Alert severity="success">Successfully Ordered.</Alert> : result == false ? <Alert severity="error">Order failed.</Alert> : <></>}
                      </Grid>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} >
                        <Button
                          variant="outlined"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                          size='large'
                        >
                          {"<< Back"}
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleOrder} size='large' variant='contained' endIcon={<SendIcon />}>Order Now</Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        {stepContent[activeStep]}
                      </Typography>
                      <Grid item xs={12} md={12} lg={12}>
                        {result == true ? <Alert severity="success">Successfully Ordered.</Alert> : <></>}
                      </Grid>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                          variant="outlined"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                          size='large'
                        >
                          {"<< Back"}
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button variant="outlined" onClick={handleNext} size='large'>
                          {activeStep === steps.length - 1 ? 'ReCheck ✔️' : 'Next >>'}
                        </Button>
                      </Box>
                    </React.Fragment>
                  )}
                </div>
              </Box>
            </Suspense>
          </div>
        </>
      );
    } else if (status === "loading" || (submitting === true)) {
      return <Loading />
    } else {
      router.push("/login")
    }
  };

  return (
    <>
      {showSession()}
    </>
  );
}
