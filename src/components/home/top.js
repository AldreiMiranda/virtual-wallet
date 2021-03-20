import React, { useState } from 'react'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import bitcoinIcon from './../../images/bitcoin.jpg'
import money from './../../images/money.png'
import britaIcon from './../../images/brita.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'left',
    minHeight: 200,
    maxWidth: 300,
    color: 'green',
    padding: 5,
    boxShadow: 'rgba(0, 128, 0, 80) 0px 3px 2px -3px, rgba(0, 128, 0, 50) 0px 3px 6px -2px, rgba(0,128,0,50) 0px 3px 6px -2px',
  },
}))

export default props => {
  const { userWallet, bitcoin, brita } = props

  const classes = useStyles()

  return (
    <div>
      <Grid container spacing={1} style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}>
        <Grid iten xs={4} style={{ textAlign: '-webkit-center' }}>
          <Paper elevation={3} className={classes.root}>
            <div style={{ textAlign: 'center' }}>
              <img src={money} alt="bitcoin" style={{ width: 85, height: 50 }} />
              <h3>Saldo </h3>
            <p style={{fontSize: 20}}>  BRL  {userWallet.balance} </p>
            </div>
          </Paper>
        </Grid>
        <Grid iten xs={4} style={{ textAlign: '-webkit-center' }}>
          <Paper elevation={3} className={classes.root}>
            <div style={{ textAlign: 'center' }}>
              <img src={bitcoinIcon} alt="bitcoin" style={{ width: 85, height: 50 }} />
              <h3> Bitcoin</h3>
              <p style={{fontSize: 20}} >BTC {userWallet.BTC}</p>
              <p style={{fontSize: 20}}>BRL {userWallet.BTC * bitcoin.sell}</p>
            </div>
          </Paper>

        </Grid>
        <Grid iten xs={4} style={{ textAlign: '-webkit-center' }}>
          <Paper elevation={3} className={classes.root} >
            <div style={{ textAlign: 'center' }}>
              <img src={britaIcon} alt="bitcoin" style={{ width: 60, height: 60 }} />
              <h3>Brita</h3>
              <p style={{fontSize: 20}}>BRT {userWallet.BRT}</p>
              <p style={{fontSize: 20}}>BRL {userWallet.BRT * brita.cotacaoVenda}</p>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}