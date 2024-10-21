import Link from 'next/link';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

export default function Breadcrumb({ pokemonName }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{pokemonName}</Typography>
      </Breadcrumbs>
  );
}
