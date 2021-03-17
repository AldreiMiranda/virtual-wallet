import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'

export default props => {
  const { userWallet, bitcoin, brita } = props



  return (
    <div>
      <Grid container spacing={1} style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}>
        <Grid iten xs={4} style={{ textAlign: '-webkit-center' }}>
          <Paper elevation={3} style={{ minHeight: 200, maxWidth: 300, backgroundColor: 'green', color: 'white' }}>
            <p> Saldo </p>
            R$: {userWallet.balance}
          </Paper>
        </Grid>
        <Grid iten xs={4} style={{ textAlign: '-webkit-center' }}>
          <Paper elevation={3} style={{ minHeight: 200, maxWidth: 300, backgroundColor: 'green', color: 'white' }}>
            <p>BitCoin</p>
            <p> Quantidade: {userWallet.bitcoin}</p>
            <p>Saldo em Bitcoin: {userWallet.bitcoin * bitcoin.sell}</p>
            <p>   Cotação compra: {bitcoin.buy}</p>
            <p>  Cotação venda: {bitcoin.sell}</p>

          </Paper>
        </Grid>
        <Grid iten xs={4} style={{ textAlign: '-webkit-center' }}>
          <Paper elevation={3} style={{ minHeight: 200, maxWidth: 300, backgroundColor: 'green', color: 'white' }}>
            <p>Brita</p>
            <p>  Quantidade: {userWallet.brita}</p>
            <p>Saldo em Bitcoin: {userWallet.brita * brita.cotacaoVenda}</p>
            <p>  Cotação compra: {brita.cotacaoCompra}</p>
            <p>  Cotação venda: {brita.cotacaoVenda}</p>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}