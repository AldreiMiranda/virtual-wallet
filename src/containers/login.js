import React, { useState } from 'react'

import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));



export default function Login({ }) {
  const classes = useStyles();
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [showError, setShowerror] = useState(false)
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    const getPassWord = localStorage.getItem(`${name}`);
    if (getPassWord == null) {
      setShowerror(true)
      return
    }
    const convertPassw = JSON.parse(getPassWord);
    const passwordLocalStoga = convertPassw?.password
    if (password != passwordLocalStoga) {
      setShowerror(true)
      return
    }
    window.location = '/register'
  }


  return (
    <div style={{ marginTop: 200 }}>
      <Grid container spacing={1} >
        <Grid item xs={12}>
          <p>Virtual Wallet </p>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={showError && !name}
            label="Usuário"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin, classes.textField)} style={{ borderColor: 'green' }} variant="outlined">
            <InputLabel >Senha *</InputLabel>
            <OutlinedInput
              type={values.showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </Grid>
        {showError &&
          <Grid item xs={12}>
            <p> Senha ou usuario invalido </p>
          </Grid>
        }
        <Grid item xs={12}>
          <p style={{ fontSize: 10 }}><b><a href="/register">Criar uma conta </a></b></p>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Entrar
      </Button>
      </Grid>


    </div>
  )
}
