"use client"
import React from 'react';
import { TextField, Grid } from '@mui/material';

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
          sx={{ width: "120%" }}
        />
      </Grid>
    </Grid>
  );
};

export default LabelInput