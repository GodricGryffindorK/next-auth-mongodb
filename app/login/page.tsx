"use client"
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

interface SignInSchema {
  email: string,
  password: string,
}

export default function SignInSide() {

  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<SignInSchema>();

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    console.log(data)
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      setError("OK");
      return router.push("/");
    }
  };


  return (
    <Grid container className="h-screen">
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className="bg-cover bg-left"
        style={{ backgroundImage: 'url("./1 (4).png")' }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="flex items-center">
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className="mx-auto"
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} className="mt-4">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              autoComplete="email"
              autoFocus
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
              })}
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="mt-8"
            >
              Sign In
            </Button>
            {error === "OK" ? (
              <Alert variant="outlined" severity="success">
                Sign in Success. Welcome.
              </Alert>
            ) : error != "" ? (
              <Alert variant="outlined" severity="error">
                Error: {error}
              </Alert>
            ) : null}
            <Grid container className='mt-2'>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signup">
                  <Typography variant='button' className='text-blue-900 underline'>
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}