import React from 'react';
import {
  TextField,
  Grid
} from '@material-ui/core'



function Login() {
  return (
    <div>
      <Grid container style={{ display: 'flex' }}>
        <Grid item>
          <TextField
            id="outlined-password-input"
            label="Nome"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
            variant="outlined"
          />
        </Grid>
      </Grid>


    </div>
  );
};

export default Login;