import React, { useState } from 'react'

import {
  TextField,
  Grid,
  Button
} from '@material-ui/core'


export default function Login({ }) {
  const [user, setUser] = useState([
    {
      name: 'aldrei',
      password: '123',
      balance: '100,000,00',
      bitcoins: '',
      britas: '',
      extract: [],
    }
  ])

  const user_json = JSON.stringify(user);

  const handleSubmit = () => {
    debugger
    localStorage.setItem("user", user_json);
  }


  return (
    <div style={{ marginTop: 200 }}>
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
          <p style={{ fontSize: 10 }}><b><a href="/register">Criar uma conta </a></b></p>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button onChange={handleSubmit} variant="contained" color="primary">
          Entrar
      </Button>
      </Grid>


    </div>
  )
}
