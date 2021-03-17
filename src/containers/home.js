import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import Top from './../components/home/top'
import Trade from './../components/home/trade'
import Extrato from './../components/home/extrato'

import axios from "axios";


export default function Home({ }) {

  const [bitcoin, setBitcoin] = useState([])
  const [brita, setbrita] = useState([])
  const getCurrentUser = localStorage.getItem(`currentUser`);
  const getUserWallet = localStorage.getItem(`${getCurrentUser}`)
  const userWallet = JSON.parse(getUserWallet);
  const [open, setOpen] = React.useState(false);



  const data = new Date()
  const dia = data.getDate().toString().padStart(2, '0')
  const b = (data.getMonth() + 1).toString().padStart(2, '0') //+1 pois no getMonth Janeiro começa com zero.
  const ano = data.getFullYear();
  const datahoje = `${b}-${dia}-${ano}`


  const LoadBitcoin = () => {
    axios.get('https://www.mercadobitcoin.net/api/BTC/ticker/').then(response => {
      setBitcoin(response.data.ticker)
    })
  }

  const Loadbrita = () => {
    axios.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40dataInicial='03-10-2021'&%40dataFinalCotacao='${datahoje}'&%24format=json`).then(response => {
      setbrita(response.data.value[response.data.value.length - 1])
    })
  }


  useEffect(() => {
    LoadBitcoin()
    Loadbrita()
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div>
      <Grid container spacing={1} style={{ height: 50, backgroundColor: 'green' }} >
        <Grid iten xs={12} style={{ marginTop: 15, color: 'white' }}>
          bara aqui
        </Grid>
        <Grid item xs={12}>
          <center>
            <Button variant="outlined" style={{ backgroundColor: 'green', color: 'white', marginTop: 50, width: 400 }} onClick={handleClickOpen}>
              Transações
            </Button>

            <Top
              userWallet={userWallet}
              bitcoin={bitcoin}
              brita={brita}
            />
            <Extrato/>
            <Trade
              userWallet={userWallet}
              bitcoin={bitcoin}
              brita={brita}
              currentUser={getCurrentUser}
              handleClose={handleClose}
              open={open}
            />

            
          </center>

        </Grid>
      </Grid>
    </div>
  )
}
