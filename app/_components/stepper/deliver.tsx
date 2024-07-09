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
