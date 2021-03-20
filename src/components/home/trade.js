import React, { useState } from 'react'
import { Button, Grid, TextField, Dialog, AppBar, Toolbar, IconButton, Paper } from '@material-ui/core'
import Slide from '@material-ui/core/Slide';
import { InputLabel } from '@material-ui/core'
import CustomSelect from './../../_atoms/customSelect'
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    textAlign: 'left',
    minHeight: 200,
    maxWidth: 300,
    color: 'green',
    padding: 10,
    boxShadow: 'rgba(0, 128, 0, 80) 0px 3px 2px -3px, rgba(0, 128, 0, 50) 0px 3px 6px -2px, rgba(0,128,0,50) 0px 3px 6px -2px',
  },
  paper: {
    textAlign: 'left',
    minHeight: 200,
    maxHeight: 250,
    maxWidth: 250,
    minWidth: 150,
    color: 'green',
    padding: 15,
    boxShadow: 'rgba(0, 128, 0, 80) 0px 3px 2px -3px, rgba(0, 128, 0, 50) 0px 3px 6px -2px, rgba(0,128,0,50) 0px 3px 6px -2px',

  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default props => {
  const { userWallet, bitcoin, brita, currentUser, handleClose, open } = props
  const [operation, setOperation] = useState({})
  const [calculatedValue, setCalculatedValue] = useState()


  const cotacaoCompra = {
    BTC: bitcoin.buy,
    BRT: brita.cotacaoCompra
  }
  const cotacaoVenda = {
    BTC: bitcoin.sell,
    BRT: brita.cotacaoVenda
  }

  const classes = useStyles();

  const handleChange = (name, e) => {
    setOperation({ ...operation, [name]: e.target.value })
    setCalculatedValue(0)
  }

  const handleChangeStatus = (name, e) => {
    setOperation({
      moeda1: '',
      moeda2: '',
      value: 0,
      [name]: e.target.value
    })
    setCalculatedValue(0)
  }

  const cotar = () => {
    let novaCotacao = 0
    if (operation.status == 'buy') {
      novaCotacao = cotacaoCompra[operation.moeda2]
    } else if (operation.status == 'sell') {
      novaCotacao = cotacaoVenda[operation.moeda2]
    } else if (operation.status == 'change') {
      novaCotacao = cotacaoCompra[operation.moeda2] / cotacaoVenda[operation.moeda1]
    }
    setOperation({ ...operation, valor: operation.value / novaCotacao || 0 })
    setCalculatedValue(operation.value / novaCotacao)
  }

  const handleSave = () => {

    if (operation.status == 'buy') {
      userWallet.balance = userWallet.balance - Number(operation.value)
      userWallet[operation.moeda2] = userWallet[operation.moeda2] + operation.valor
    } else if (operation.status == 'sell') {
      userWallet.balance = userWallet.balance + Number(operation.value)
      userWallet[operation.moeda2] = userWallet[operation.moeda2] - operation.valor
    } else if (operation.status == 'change') {
      userWallet[operation.moeda1] = userWallet[operation.moeda1] - Number(operation.value)
      userWallet[operation.moeda2] = userWallet[operation.moeda2] + operation.valor
    }
  

    let date = Date.now()
    debugger
    const extrato1 = {
      date: date,
      currency: operation.moeda1,
      value: operation.value,
      balance: operation.status === 'change' ? userWallet[operation.moeda1] : userWallet.balance,
      operation: operation.status
    }
    const extrato2 = {
      date: date,
      currency: operation.moeda2,
      value: operation.valor,
      balance: userWallet[operation.moeda2],
      operation: operation.status
    }

    userWallet.extract.push(extrato1)
    userWallet.extract.push(extrato2)
    
    localStorage.setItem(`${currentUser}`, JSON.stringify(userWallet));
    
    debugger
  }



  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} style={{ backgroundColor: 'green' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <div>
              <h3>Transações </h3>
            </div>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} style={{ marginTop: 50, marginLeft: 20, marginRight: 20, display: 'flex', justifyContent: 'space-around' }}>
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} className={classes.paper}>
              <h3 style={{ textAlign: 'center' }}> Cotações </h3>
              <Grid container>
                <Grid item xs={12} >
                  <b>Bitcoin</b>
                </Grid>
                <Grid item xs={12}>
                  <b>Compra:</b> BRL {bitcoin.buy}
                </Grid>
                <Grid item xs={12}>
                  <b> Venda:</b> BRL {bitcoin.sell}
                </Grid>
                <Grid item xs={12}>
                  <span> <hr style={{ color: 'green' }} /> </span>
                </Grid>
                <Grid item xs={12}>
                  <b>Brita</b>
                </Grid>
                <Grid item xs={12}>
                  <b>Compra:</b> BRL {brita.cotacaoCompra}
                </Grid>
                <Grid item xs={12}>
                  <b>Vender:</b> BRL {brita.cotacaoVenda}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} style={{ justifyContent: 'center', display: 'grid' }}>
            <Grid item xs={12}>
              <Paper elevation={3} className={classes.root}>

                <Grid item xs={12}>
                  <h3 style={{ textAlign: 'center' }}> Transaçoes </h3>
                  <InputLabel style={{ padding: 5, color: 'green' }}>
                    Operação
              </InputLabel>

                  <CustomSelect
                    style={{ width: 275 }}
                    name={operation.status}
                    labelId="status"
                    id="status"
                    value={operation.status}
                    onChange={(e) => handleChangeStatus('status', e)}
                    required
                  >
                    <option value={""}>
                      Selecione
            </option>
                    <option value={"sell"}>
                      Vender
            </option>
                    <option value={"buy"}>
                      Comprar
            </option>
                    <option value={"change"}>
                      Trocar
            </option>
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} >
                  <InputLabel style={{ marginTop: 10, padding: 5, color: 'green' }}>
                    {operation.status === 'sell' ? 'Voce Recebe' : 'Voce Paga'}
                  </InputLabel>
                  <CustomSelect
                    disabled={!operation.status}
                    style={{ width: 150 }}
                    name={operation.moeda1}
                    labelId="moeda1"
                    id="moeda1"
                    value={operation.moeda1}
                    onChange={(e) => handleChange('moeda1', e)}
                    required
                  >
                    <option value={""}>
                      Selecione
            </option>
                    <option disabled={operation.status == 'change'} value={"BRL"}>
                      Real (BRL)
            </option>
                    <option disabled={operation.status == 'sell' || operation.status == 'buy'} value={"BTC"}>
                      Bitcoin (BTC)
            </option>
                    <option disabled={operation.status == 'sell' || operation.status == 'buy'} value={"BRT"}>
                      Brita (BRT)
            </option>
                  </CustomSelect>

                  <TextField
                    style={{ width: 120, marginLeft: 5 }}
                    placeholder="Quantidade"
                    type="number"
                    variant="outlined"
                    value={operation.value}
                    onChange={(e) => handleChange('value', e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel style={{ marginTop: 10, padding: 5, color: 'green' }}>
                    {operation.status === 'sell' ? 'Voce Vende' : 'Voce Recebe'}
                  </InputLabel>
                  <CustomSelect
                    disabled={!operation.status}
                    style={{ width: 150 }}
                    labelId="moeda2"
                    id="moeda2"
                    value={operation.moeda2}
                    onChange={(e) => handleChange('moeda2', e)}
                    required
                  >
                    <option value={""}>
                      Selecione
            </option>
                    <option disabled={operation.moeda1 === 'BTC'} value={"BTC"}>
                      Bitcoin (BTC)
            </option>
                    <option disabled={operation.moeda1 === 'BRT'} value={"BRT"}>
                      Brita (BRT)
            </option>
                  </CustomSelect>

                  <TextField
                    disabled
                    placeholder="Quantidade"
                    style={{ width: 120, marginLeft: 5 }}
                    type="number"
                    variant="outlined"
                    value={calculatedValue}
                  />
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div style={{ marginTop: 20 }}>
                <Button onClick={cotar} variant="contained" color="primary">
                  Calcular
             </Button>
                <Button style={{ marginLeft: 10 }} onClick={handleSave} variant="contained" color="primary">
                  Finalizar
            </Button>
              </div>
            </Grid>
          </Grid>

        </Grid>
      </Dialog>
    </ >
  )
}