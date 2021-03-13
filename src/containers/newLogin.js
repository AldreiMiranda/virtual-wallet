import React from 'react';
import {
  TextField,
  Grid,
  Button
} from '@material-ui/core'
import './../assets/css/login.css'

function Login() {
  return (
    <div className="Login" style={{ marginTop: 200 }}>
      <Grid container spacing={1} >
        <Grid item xs={12}>
          <p> Criar uma nova conta </p>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-password-input"
            label="Usuario"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-password-input"
            label="Confirmar senha"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button style={{ marginTop: 5 }} variant="contained" color="primary">
          criar
      </Button>
      </Grid>


    </div>
  );
};

export default Login;