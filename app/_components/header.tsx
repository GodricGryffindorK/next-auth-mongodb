"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function Header() {
    const router = useRouter();
    return (
        <>
            <CssBaseline />
            <AppBar component="nav">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <img src='./logo.png' className='h-[60px]'/>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        </Box>

                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => {
                                signOut({ redirect: false }).then(() => {
                                    router.push("/");
                                });
                            }}>
                                <LogoutIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}
export default Header;
