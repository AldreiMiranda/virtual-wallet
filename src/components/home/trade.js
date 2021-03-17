import React, { useState } from 'react'
import { Button, Grid, TextField, Dialog, AppBar, Toolbar, IconButton } from '@material-ui/core'
import Slide from '@material-ui/core/Slide';
import { InputBase, FormControl, InputLabel, NativeSelect } from '@material-ui/core'
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default props => {
  const { userWallet, bitcoin, brita, currentUser, handleClose, open } = props
  const [operation, setOperation] = useState({})
  const [cotacao, setcotacao] = useState()


  const cotacaoCompra = {
    bitcoin: bitcoin.buy,
    brita: brita.cotacaoCompra
  }
  const cotacaoVenda = {
    bitcoin: bitcoin.sell,
    brita: brita.cotacaoVenda
  }



  const classes = useStyles();


  const handleChange = (name, e) => {
    setOperation({ ...operation, [name]: e.target.value })
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
    setcotacao(novaCotacao)
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
    localStorage.setItem(`${currentUser}`, JSON.stringify(userWallet));
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
              Transações
              </div>
          </Toolbar>
        </AppBar>
        <Grid container spacing={1} style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}>
          <Grid item xs={2}>
            <CustomSelect
              name={operation.status}
              labelId="status"
              id="status"
              value={operation.status}
              onChange={(e) => handleChange('status', e)}
              required
            >
              <option value={""}>
                Selecione
            </option>
              <option value={"sell"}>
                Vender
            </option>
              <option value={"buy"}>
                comprar
            </option>
              <option value={"change"}>
                trocar
            </option>
            </CustomSelect>
          </Grid>
          <Grid item xs={2}>
            <TextField
              required
              type="number"
              label="Quantidade"
              variant="outlined"
              value={operation.value}
              onChange={(e) => handleChange('value', e)}
            />
          </Grid>
          <Grid item xs={2}>
            <CustomSelect
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
              <option disabled={operation.status == 'change'} value={"real"}>
                Real R$
            </option>
              <option disabled={operation.status == 'sell' || operation.status == 'buy'} value={"bitcoin"}>
                Bitcoin
            </option>
              <option disabled={operation.status == 'sell' || operation.status == 'buy'} value={"brita"}>
                Brita
            </option>
            </CustomSelect>
          </Grid>

          {/* <Grid item xs={2}>
          Valor: { operation.value / cotacao || 0}
        </Grid> */}
          <Grid item xs={2}>
            <CustomSelect
              labelId="moeda2"
              id="moeda2"
              value={operation.moeda2}
              onChange={(e) => handleChange('moeda2', e)}
              required
            >
              <option value={""}>
                Selecione
            </option>
              <option value={"bitcoin"}>
                Bitcoin
            </option>
              <option value={"brita"}>
                Brita
            </option>
            </CustomSelect>
          </Grid>
          <Grid item xs={2}>
            <TextField
              disabled
              type="number"
              label="Quantidade"
              variant="outlined"
              value={operation.value / cotacao || 0}
            />
          </Grid>
          <Grid item xs={2}>
            Cotação: {cotacao}
          </Grid>

          <Grid item xs={2}>
            <Button onClick={cotar} variant="contained" color="primary">
              cotar
       </Button>
            <Button style={{ marginLeft: 10 }} onClick={handleSave} variant="contained" color="primary">
              Finalizar
       </Button>
          </Grid>
        </Grid>
      </Dialog>
    </ >
  )
}