import React, { useState } from 'react'

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@material-ui/core'

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
  const [password, setPassword] = useState(
    {
      password: ''
    })
  const [userWallet, setUserWallet] = useState(
    {
      balance: 100000000,
      BTC: 0,
      BRT: 0,
      extract: []
    }
  )
  const classes = useStyles();
  const [name, setName] = useState("")
  const [passwordConfirm, setpassWordConfirm] = useState("")
  const [showError, setShowerror] = useState(false)
  const userJson = JSON.stringify(password);
  const userWalletJson = JSON.stringify(userWallet);
  const [values, setValues] = useState({
    password: '',
    passwordConfirmed: '',
    showConfirmedpassword: false,
    showPassword: false
  });

  const handleSubmit = () => {
    if (password.password === passwordConfirm) {
      localStorage.setItem(`login_${name}`, userJson);
      localStorage.setItem(`${name}`, userWalletJson);
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
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel >Usuário </InputLabel>
            <OutlinedInput
              type={'text'}
              value={name}
              onChange={e => setName(e.target.value)}
              endAdornment={
                <InputAdornment >
                  <AccountCircle style={{ color: 'grey' }} />
                </InputAdornment>
              }
              labelWidth={55}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel >Senha </InputLabel>
            <OutlinedInput
              type={values.showPassword ? 'text' : 'password'}
              value={password.password}
              onChange={e => setPassword({ ...password, password: e.target.value })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setValues({ ...values, showPassword: !values.showPassword })}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={50}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel >Confirmar senha </InputLabel>
            <OutlinedInput
              type={values.showConfirmedpassword ? 'text' : 'password'}
              value={passwordConfirm}
              onChange={e => setpassWordConfirm(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setValues({ ...values, showConfirmedpassword: !values.showConfirmedpassword })}
                    edge="end"
                  >
                    {values.showConfirmedpassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={120}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid style={{ marginTop: 5 }} item xs={12}>
        <Button
          disabled={!name || !password.password || !passwordConfirm}
          onClick={handleSubmit} variant="contained"
          style={{ backgroundColor: 'green', color: 'white' }}>
          Criar
      </Button>
      </Grid>
    </div>
  )
}
