"use client"
import React from 'react';
import { TextField, Grid } from '@mui/material';

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

export default function DeliverForm({ register, error, setValue, watch }: props) {

    return (
        <Grid container spacing={3}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            className='my-16'
        >
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Nombre Contacto"
                    name="deliver_name"
                    register={register}
                    required
                    error={!!error.deliver_name}
                    helperText={error.deliver_name ? "Nombre Contacto is required" : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Telefono Contacto"
                    name="deliver_phone"
                    register={register}
                    required
                    error={!!error.deliver_phone}
                    helperText={error.deliver_phone ? "Telefono Contacto is required" : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Dirección de Despacho"
                    name="deliver_address"
                    register={register}
                    required
                    error={!!error.deliver_address}
                    helperText={error.deliver_address ? "Dirección de Despacho is required." : ""}
                />
            </Grid>
        </Grid>
    );
}
