import React, { useState } from 'react'

import {
  TextField,
  Grid,
  Button
} from '@material-ui/core'


export default function Login({ }) {
  const [password, setPassword] = useState(
    {
      password: ''
    })
  const [name, setName] = useState("")
  const [passwordConfirm, setpassWordConfirm] = useState("")
  const [showError, setShowerror] = useState(false)
  const user_json = JSON.stringify(password);

  const handleSubmit = () => {
    if (password.password === passwordConfirm) {
      localStorage.setItem(`${name}`, user_json);
      setShowerror(false)
      window.location = '/login'
    } else {
      setShowerror(true)
      return
    }
  }

  return (
    <div style={{ marginTop: 200 }}>
      <Grid container spacing={1} >
        <Grid item xs={12}>
          <p>Crie uma conta </p>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Usuário"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={showError}
            label="Senha"
            type="password"
            variant="outlined"
            value={password.password}
            onChange={e => setPassword({ ...password, password: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={showError}
            label="Confirme a senha"
            type="password"
            variant="outlined"
            value={passwordConfirm}
            onChange={e => setpassWordConfirm(e.target.value)}
          />
        </Grid>

      </Grid>
      <Grid style={{ marginTop: 5 }} item xs={12}>
        <Button disabled={!name || !password.password || !passwordConfirm} onClick={handleSubmit} variant="contained" color="primary">
          Criar
      </Button>
      </Grid>
    </div>
  )
}
