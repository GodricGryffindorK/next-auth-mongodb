"use client"

import * as React from 'react';
import CircularProgress, {
} from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

const CenteredContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',  // Full viewport height
});

const MyCircularProgress = styled(CircularProgress)({
  '& .MuiCircularProgress-circle': {
    stroke: 'url(#my_gradient)',
  },
});


export default function GradientCircularProgress() {
  return (
    <React.Fragment >
      <CenteredContainer>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>

        <MyCircularProgress />
      </CenteredContainer>
    </React.Fragment>
  );
}
