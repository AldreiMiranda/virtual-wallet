import React, { useState } from 'react'
import './style.css'
import {
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
import AccountCircle from '@material-ui/icons/AccountCircle';
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
  title: {
    color: 'green'
  },
  button: {
    backgroundColor: 'green',
    color: 'white'
  }
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

  const handleSubmit = () => {
    const getPassword = localStorage.getItem(`login_${name}`);
    if (!getPassword) {
      setShowerror(true)
      return
    }
    const convertPassword = JSON.parse(getPassword);
    const storagePassword = convertPassword?.password
    if (password != storagePassword) {
      setShowerror(true)
      return
    }
    localStorage.setItem(`currentUser`, name);
    window.location = '/'
  }

  return (
    <div style={{ marginTop: 200 }}>
      <Grid container spacing={1} >
        <Grid item xs={12} className={classes.title}>
          <h3>Virtual Wallet</h3>
        </Grid>
        <Grid item xs={12}>
          <FormControl error={showError} className={clsx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel >Usuário *</InputLabel>
            <OutlinedInput
              type={'text'}
              value={name}
              onChange={e => setName(e.target.value)}
              endAdornment={
                <InputAdornment >
                  <AccountCircle style={{ color: 'grey' }} />
                </InputAdornment>
              }
              labelWidth={80}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl error={showError}
            className={clsx(classes.margin, classes.textField)}
            variant="outlined">
            <InputLabel >Senha *</InputLabel>
            <OutlinedInput
              className=".MuiOutlinedInput-root"
              type={values.showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              labelWidth={70}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <p style={{ fontSize: 10 }}>
            <b><a href="/register">Criar uma conta </a></b>
          </p>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button className={classes.button}
          onClick={handleSubmit}
          variant="contained">
          Entrar
       </Button>
      </Grid>
    </div>
  )
}
