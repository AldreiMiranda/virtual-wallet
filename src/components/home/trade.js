import React, { useState } from 'react'
import { Button, Grid, Dialog, AppBar, Toolbar, IconButton, Paper, InputBase } from '@material-ui/core'
import Slide from '@material-ui/core/Slide';
import { InputLabel } from '@material-ui/core'
import CustomSelect from './../../util/customSelect'
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
  paper: {
    textAlign: 'left',
    minHeight: 300,
    minWidth: 400,
    maxWidth: 400,
    color: 'green',
    padding: 10,
    boxShadow: 'rgba(0, 128, 0, 80) 0px 3px 2px -3px, rgba(0, 128, 0, 50) 0px 3px 6px -2px, rgba(0,128,0,50) 0px 3px 6px -2px',
  },
  grid: {
    marginTop: '7%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  grid2: {
    display: 'flex',
    justifyContent: 'center'
  },
  inputBase: {
    width: '55%',
    marginLeft: 5,
    border: '1px solid #ccc',
    borderRadius: 5,
    padding: 5
  },
  button: {
    backgroundColor: 'green',
    color: 'white',
    marginRight: 5
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default props => {
  const { userWallet, bitcoin, brita, currentUser, handleCloseTransactions, openTransactions, handleOpenNotification } = props
  const [operation, setOperation] = useState({
    currency1: '',
    currency2: '',
    currencyValue1: 0,
    currencyValue2: 0,
  })
  const [calculatedValue, setCalculatedValue] = useState()
  const buyPrice = {
    BTC: bitcoin.buy,
    BRT: brita.cotacaoCompra
  }
  const sellPrice = {
    BTC: bitcoin.sell,
    BRT: brita.cotacaoVenda
  }

  const classes = useStyles();

  const handleChange = (name, e) => {
    setOperation({ ...operation, [name]: e.target.value })
    setCalculatedValue(0)
  }

  const handleChangeValue = (name, e) => {
    setOperation({ ...operation, [name]: Number(e.target.value) })
    setCalculatedValue(0)
  }

  const handleChangeStatus = (name, e) => {
    setOperation({
      currency1: '',
      currency2: '',
      currencyValue1: 0,
      currencyValue2: 0,
      [name]: e.target.value
    })
    setCalculatedValue(0)
  }

  const calculatePrice = () => {
    let newPrice = 0
    if (operation.status === 'compra') {
      newPrice = buyPrice[operation.currency2]
    } else if (operation.status === 'venda') {
      newPrice = sellPrice[operation.currency2]
    } else if (operation.status === 'troca') {
      newPrice = buyPrice[operation.currency2] / sellPrice[operation.currency1]
    }
    setOperation({ ...operation, currencyValue2: operation.currencyValue1 / newPrice || 0 })
    setCalculatedValue(operation.currencyValue1 / newPrice)
  }

  const handleSave = () => {

    const handleBuyOperation = () => {
      let balance = userWallet.balance - operation.currencyValue1
      if (balance < 0) {
        showError = true
        return
      }
      userWallet.balance = balance
      userWallet[operation.currency2] = userWallet[operation.currency2] + operation.currencyValue2
    }

    const handleChangeOperation = () => {
      let currency1Balance = userWallet[operation.currency1] - operation.currencyValue1
      if (currency1Balance < 0) {
        showError = true
        return
      }
      userWallet[operation.currency1] = currency1Balance
      userWallet[operation.currency2] = userWallet[operation.currency2] + operation.currencyValue2
    }

    const handleSellOperation = () => {
      let currency2Balance = userWallet[operation.currency2] - operation.currencyValue2
      if (currency2Balance < 0) {
        showError = true
        return
      }
      userWallet.balance = userWallet.balance + operation.currencyValue1
      userWallet[operation.currency2] = currency2Balance
    }

    let showError = false

    if (operation.status === 'compra') {
      handleBuyOperation()
    } else if (operation.status === 'venda') {
      handleSellOperation()
    } else if (operation.status === 'troca') {
      handleChangeOperation()
    }

    if (showError) {
      handleOpenNotification('Saldo insuficiente', 'Erro')
      return
    }

    let date = Date.now()
    const extract1 = {
      date: date,
      currency: operation.currency1,
      value: operation.status === 'venda' ? operation.currencyValue1 : - operation.currencyValue1,
      balance: operation.status === 'troca' ? userWallet[operation.currency1] : userWallet.balance,
      operation: operation.status
    }
    const extract2 = {
      date: date,
      currency: operation.currency2,
      value: operation.status === 'venda' ? - operation.currencyValue2 : operation.currencyValue2,
      balance: userWallet[operation.currency2],
      operation: operation.status
    }

    userWallet.extract.push(extract1)
    userWallet.extract.push(extract2)

    localStorage.setItem(`${currentUser}`, JSON.stringify(userWallet));

    handleCloseTransactions()
    handleOpenNotification('Operação realizada com sucesso.', 'Sucesso')
  }

  return (
    <>
      <Dialog fullScreen open={openTransactions} onClose={handleCloseTransactions} TransitionComponent={Transition} >
        <AppBar className={classes.appBar} style={{ backgroundColor: 'green' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleCloseTransactions} aria-label="close">
              <CloseIcon />
            </IconButton>
            <div>
              <h3>Transações </h3>
            </div>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} className={classes.grid}>
          <Grid item xs={6} className={classes.grid2}>
            <Paper elevation={3} className={classes.paper}>
              <h3 style={{ textAlign: 'center' }}> Cotações </h3>
              <Grid container>
                <Grid item xs={12} >
                  <h3> Bitcoin </h3>
                    <p> <b>Compra:</b> BRL {bitcoin.buy} <br />
                    <b> Venda:</b> BRL {bitcoin.sell} </p>
                </Grid>
                <Grid item xs={12}>
                  <span> <hr /> </span>
                </Grid>
                <Grid item xs={12}>
                  <h3>Brita</h3>
                  <p> <b>Compra:</b> BRL {brita.cotacaoCompra} <br />
                    <b>Vender:</b> BRL {brita.cotacaoVenda} </p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.grid2}>
            <Paper elevation={3} className={classes.paper}>
              <h3 style={{ textAlign: 'center' }}> Transações </h3>
              <Grid container>
                <InputLabel style={{ padding: 5, color: 'green' }}>
                  Operação
                 </InputLabel>
                <Grid item xs={12}>
                  <CustomSelect
                    style={{ width: '95%' }}
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
                    <option value={"venda"}>
                      Vender
                    </option>
                    <option value={"compra"}>
                      Comprar
                    </option>
                    <option value={"troca"}>
                      Trocar
                    </option>
                  </CustomSelect>
                </Grid>
                <Grid item xs={12} >
                  <InputLabel style={{ marginTop: 10, padding: 5, color: 'green' }}>
                    {operation.status === 'venda' ? 'Você Recebe' : 'Você Paga'}
                  </InputLabel>
                  <CustomSelect
                    disabled={!operation.status}
                    style={{ width: '40%' }}
                    name={operation.currency1}
                    labelId="currency1"
                    id="currency1"
                    value={operation.currency1}
                    onChange={(e) => handleChange('currency1', e)}
                    required
                  >
                    <option value={""}>
                      Selecione
                    </option>
                    <option disabled={operation.status === 'troca'} value={"BRL"}>
                      Real (BRL)
                    </option>
                    <option disabled={operation.status === 'venda' || operation.status === 'compra'} value={"BTC"}>
                      Bitcoin (BTC)
                    </option>
                    <option disabled={operation.status === 'venda' || operation.status === 'compra'} value={"BRT"}>
                      Brita (BRT)
                    </option>
                  </CustomSelect>
                  <InputBase
                    className={classes.inputBase}
                    placeholder="Quantidade"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={operation.currencyValue1}
                    onChange={(e) => handleChangeValue('currencyValue1', e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel style={{ marginTop: 10, padding: 5, color: 'green' }}>
                    {operation.status === 'venda' ? 'Você Vende' : 'Você Recebe'}
                  </InputLabel>
                  <CustomSelect
                    disabled={!operation.status}
                    style={{ width: '40%' }}
                    labelId="currency2"
                    id="currency2"
                    value={operation.currency2}
                    onChange={(e) => handleChange('currency2', e)}
                    required
                  >
                    <option value={""}>
                      Selecione
                    </option>
                    <option disabled={operation.currency1 === 'BTC'} value={"BTC"}>
                      Bitcoin (BTC)
                    </option>
                    <option disabled={operation.currency1 === 'BRT'} value={"BRT"}>
                      Brita (BRT)
                   </option>
                  </CustomSelect>
                  <InputBase
                    className={classes.inputBase}
                    disabled
                    placeholder="Quantidade"
                    type="number"
                    value={calculatedValue}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.grid2}>
          </Grid>
          <Grid item xs={6} className={classes.grid2}>
            <div style={{ width: 400, marginTop: 20 }}>
              <Button
                className={classes.button}
                onClick={calculatePrice}
                variant="contained" >
                Calcular
                </Button>
              <Button
                className={classes.button}
                disabled={operation.currencyValue2 === 0}
                onClick={handleSave}
                variant="contained"  >
                Finalizar
                </Button>
            </div>
          </Grid>
        </Grid>
      </Dialog>
    </ >
  )
}