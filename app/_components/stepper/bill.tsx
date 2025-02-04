"use client"
import React from 'react';
import { TextField, Grid } from '@mui/material';

import LabelInput from '../labelInput';
type props = {
    register: any,
    error: any,
    setValue: any,
    watch: any
}


export default function BillForm({ register, error, setValue, watch }: props) {

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
                    name="bill_name"
                    register={register}
                    required
                    error={!!error.bill_name}
                    helperText={error.bill_name ? "Nombre Contacto is required" : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Telefono Contacto"
                    name="bill_phone"
                    register={register}
                    required
                    error={!!error.bill_phone}
                    helperText={error.bill_phone ? "Telefono Contacto is required" : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Correo de Contacto"
                    name="bill_email"
                    register={register}
                    required
                    error={!!error.bill_email}
                    helperText={error.bill_email ? "Correo de Contacto is required." : ""}
                />
            </Grid>
        </Grid>
    );
}
