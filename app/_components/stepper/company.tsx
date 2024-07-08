"use client"
import React from 'react';
import { Controller } from 'react-hook-form'
import { TextField, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';

type props = {
    register: any,
    error: any,
    setValue: any,
    watch: any
}

interface LabelInputProps {
    label: string;
    name: string;
    register: any;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    type?: string;
}

const LabelInput: React.FC<LabelInputProps> = ({ label, name, register, required = false, error = false, helperText = '', type = 'text' }) => {
    return (
        <Grid container spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Grid item className='float-right text-black' width={150} >
                <div className='text-center'>{label}:</div>
            </Grid>
            <Grid item >
                <TextField
                    id={name}
                    {...register(name, { required })}
                    error={error}
                    helperText={helperText}
                    type={type}
                    sx={{ width: "50ch" }}
                />
            </Grid>
        </Grid>
    );
};

export default function CompanyForm({ register, error, setValue, watch }: props) {
    const require_hes = watch('require_hes');
    return (
        <Grid container spacing={3}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            className='my-16'
        >
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Razón Social"
                    name="business_name"
                    register={register}
                    required
                    error={!!error.business_name}
                    helperText={error.business_name ? "Razón Social is required" : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Rut"
                    name="ruth"
                    register={register}
                    required
                    error={!!error.ruth}
                    helperText={error.ruth ? "Rut is required" : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Giro Comercial"
                    name="commercial_business"
                    register={register}
                    required
                    error={!!error.commercial_business}
                    helperText={error.commercial_business ? "Giro Comercial is required." : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Dirección Comercial"
                    name="commercial_address"
                    register={register}
                    required
                    error={!!error.commercial_address}
                    helperText={error.commercial_address ? "Dirección Comercial is required." : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="N° OC"
                    name="oc_num"
                    register={register}
                    required
                    error={!!error.oc_num}
                    helperText={error.oc_num ? "N° OC is required." : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>

                <Grid container spacing={2}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Grid item className='float-right text-black' width={150} >
                        <div className='text-center'>Requiere HES:</div>
                    </Grid>
                    <Grid item >
                        <RadioGroup
                            aria-label="require_hes"
                            name="require_hes"
                            value={require_hes}
                            onChange={(e) => setValue('require_hes', e.target.value)}
                            row
                            className='ml-16'
                        >
                            <FormControlLabel value="yes" className='text-black' control={<Radio />} label="Yes" />
                            <FormControlLabel value="no" className='ml-8 text-black' control={<Radio />} label="No" />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Correo"
                    name="mail"
                    register={register}
                    required
                    error={!!error.mail}
                    helperText={error.mail ? "Correo is required." : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Teléfono"
                    name="phone"
                    register={register}
                    required
                    error={!!error.phone}
                    helperText={error.phone ? "Teléfono is required." : ""}
                />
            </Grid>
        </Grid>
    );
}
