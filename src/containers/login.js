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
          <p>Virtual Wallet </p>
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
          <p style={{fontSize: 10}}><b><a href="/register" target="_blank">Criar uma conta </a></b></p>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary">
          Entrar
      </Button>
      </Grid>


    </div>
  );
};

export default Login;