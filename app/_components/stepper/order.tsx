"use client"
import React from 'react';
import { Controller } from 'react-hook-form'
import { TextField, Grid, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import LabelInput from '../labelInput';

type props = {
    register: any,
    error: any,
    setValue: any,
    watch: any
}


export default function OrderForm({ register, error, setValue, watch }: props) {

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('delivery_type', event.target.value as 'time' | 'date');
        // Clear values when switching radio options
        setValue('delivery_hour', '');
        setValue('delivery_date', '');
    };
    return (
        <Grid container spacing={3}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            className='my-16'
        >
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Nombre Cliente"
                    name="client_name"
                    register={register}
                    required
                    error={!!error.client_name}
                    helperText={error.client_name ? "Nombre Cliente is required" : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Rut Cliente"
                    name="customer_id"
                    register={register}
                    required
                    error={!!error.customer_id}
                    helperText={error.customer_id ? "Rut Cliente is required" : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Correo Cliente"
                    name="customer_email"
                    register={register}
                    required
                    error={!!error.customer_email}
                    helperText={error.customer_email ? "Correo Cliente is required." : ""}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <LabelInput
                    label="Teléfono Cliente"
                    name="customer_phone"
                    register={register}
                    required
                    error={!!error.customer_phone}
                    helperText={error.customer_phone ? "Teléfono Cliente is required." : ""}
                />
            </Grid>
            <Grid item xs={12} md={10} className='mr-16'>
                <Grid container
                    alignItems="center"
                >
                    <Grid item xs={6} md={6} className='text-black'>
                        <RadioGroup
                            aria-label="delivery_type"
                            name="delivery_type"
                            value={watch('delivery_type')}
                            onChange={handleRadioChange}
                            row // Display radio buttons horizontally
                        >
                            <FormControlLabel value="time" control={<Radio />} label="Delivery Time" />
                            <FormControlLabel value="date" control={<Radio />} label="Delivery Date" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        {watch('delivery_type') === 'time' ? (
                            <TextField
                                {...register('delivery_hour', { required: true })}
                                label="Delivery Time"
                                type="time"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled={!!watch('delivery_date')}
                                error={!!error.delivery_hour}
                                helperText={error.delivery_hour ? "Delivery time is required." : ""}
                            />
                        ) : (
                            <TextField
                                {...register('delivery_date', { required: true })}
                                label="Delivery Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                disabled={!!watch('delivery_hour')}
                                error={!!error.delivery_date}
                                helperText={error.delivery_date ? "Delivery date is required." : ""}
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
