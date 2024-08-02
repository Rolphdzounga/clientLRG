import { Link } from 'react-router-dom'
import * as React from 'react';


import { Grid } from '@mui/material';



const AdherentAdd = () => {

  return (
    <Grid container spacing={2} className='mt-10'>
        <Grid item xs={4}>
        AdherentAdd
        </Grid>
        <Grid item xs={8}>
            <Link to='/admin/adherent'>
          back
          </Link>
        </Grid>

    </Grid>
  )
}

export default AdherentAdd