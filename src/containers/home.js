import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import Top from './../components/home/top'
import Trade from './../components/home/trade'
import Extract from '../components/home/extract'
import Icon from '@material-ui/core/Icon';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
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
      <Grid container spacing={1} style={{ height: 50 }} >
        <Grid iten xs={12} style={{ backgroundColor: 'green' , padding: 15, color: 'black', borderBottom: '1px solid green', textAlign: 'end' }}>
          <Button
            endIcon={<TrendingUpIcon />}
            variant="outlined"
            style={{color: 'green', borderColor: "green", backgroundColor: 'white'}}
            onClick={handleClickOpen}>
            <b>Transações</b>
            </Button>
        </Grid>
        <Grid item xs={12}>
          <center>
            <Top
              userWallet={userWallet}
              bitcoin={bitcoin}
              brita={brita}
            />
            <Extract
              extract={userWallet.extract}
            />
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
