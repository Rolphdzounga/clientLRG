import { Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useAdherentStore } from '../../../store/store';

const AdherentEdit = () => {
  const { data } = useAdherentStore((state) => state.adherent);
  //console.log(JSON.stringify(data))
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Link to='/admin/adherent'>
        back
        </Link>
      </Grid>
      <Grid item xs={12}>

       <h1>
        {data.noms}
       </h1>
        <h2>
          {data.email}
        </h2>
      </Grid>
    </Grid>
  )
}

export default AdherentEdit