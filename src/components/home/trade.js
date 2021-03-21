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
  const { userWallet, bitcoin, brita, currentUser, handleClose, open, handleOpenNotification } = props
  const [operation, setOperation] = useState({
    moeda1: '',
    moeda2: '',
    value: 0,
    valor: 0,
  })
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

  const handleChangeValue = (name, e) => {
    setOperation({ ...operation, [name]: Number(e.target.value) })
    setCalculatedValue(0)
  }

  const handleChangeStatus = (name, e) => {
    setOperation({
      moeda1: '',
      moeda2: '',
      value: 0,
      valor: 0,
      [name]: e.target.value
    })
    setCalculatedValue(0)
  }

  const cotar = () => {
    let novaCotacao = 0
    if (operation.status === 'compra') {
      novaCotacao = cotacaoCompra[operation.moeda2]
    } else if (operation.status === 'venda') {
      novaCotacao = cotacaoVenda[operation.moeda2]
    } else if (operation.status === 'troca') {
      novaCotacao = cotacaoCompra[operation.moeda2] / cotacaoVenda[operation.moeda1]
    }
    setOperation({ ...operation, valor: operation.value / novaCotacao || 0 })
    setCalculatedValue(operation.value / novaCotacao)
  }

  const handleSave = () => {

    const handleBuyOperation = () => {
      let balance = userWallet.balance - operation.value
      if (balance < 0) {
        showError = true
        return
      }
      userWallet.balance = balance
      userWallet[operation.moeda2] = userWallet[operation.moeda2] + operation.valor
    }

    const handleChangeOperation = () => {
      let moeda1Value = userWallet[operation.moeda1] - operation.value
      if (moeda1Value < 0) {
        showError = true
        return
      }
      userWallet[operation.moeda1] = moeda1Value
      userWallet[operation.moeda2] = userWallet[operation.moeda2] + operation.valor
    }

    const handleSellOperation = () => {
      let moeda2Balance = userWallet[operation.moeda2] - operation.valor
      if (moeda2Balance < 0) {
        showError = true
        return
      }
      userWallet.balance = userWallet.balance + operation.value
      userWallet[operation.moeda2] = moeda2Balance
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
    const extrato1 = {
      date: date,
      currency: operation.moeda1,
      value: operation.status === 'venda' ? operation.value : - operation.value,
      balance: operation.status === 'troca' ? userWallet[operation.moeda1] : userWallet.balance,
      operation: operation.status
    }
    const extrato2 = {
      date: date,
      currency: operation.moeda2,
      value: operation.status === 'venda' ? - operation.valor : operation.valor,
      balance: userWallet[operation.moeda2],
      operation: operation.status
    }

    userWallet.extract.push(extrato1)
    userWallet.extract.push(extrato2)

    localStorage.setItem(`${currentUser}`, JSON.stringify(userWallet));

    handleClose()
    handleOpenNotification('Operação realizada com sucesso.', 'Sucesso')
  }

  return (
    <>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
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
                    value={operation.value}
                    onChange={(e) => handleChangeValue('value', e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel style={{ marginTop: 10, padding: 5, color: 'green' }}>
                    {operation.status === 'venda' ? 'Você Vende' : 'Você Recebe'}
                  </InputLabel>
                  <CustomSelect
                    disabled={!operation.status}
                    style={{ width: '40%' }}
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
                onClick={cotar}
                variant="contained" >
                Calcular
                </Button>
              <Button
                className={classes.button}
                disabled={operation.valor === 0}
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