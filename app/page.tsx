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
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

import ApartmentIcon from '@mui/icons-material/Apartment';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import TableViewIcon from '@mui/icons-material/TableView';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

const steps = ['DATOS DE LA EMPRESA', 'DATOS DEL PEDIDO', 'DATOS PARA LA ENTREGA DE PRODUCTOS', 'DATOS PARA FACTURACION Y COBRANZA'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
      ,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
      ,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',

    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'

  }),
}));

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
  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
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
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        Your Order Succesfully Saved!
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} >
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset} size='large'  >Order New</Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
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
                          {activeStep === steps.length - 1 ? 'Finish ✔️' : 'Next >>'}
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
    } else if (status === "loading") {
      return <Loading />
    } else {
      router.push("/login")
    }
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (

    <>
      {showSession()}
    </>

  );
}
