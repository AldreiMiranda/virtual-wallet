import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import Top from './../components/home/top'
import Trade from './../components/home/trade'
import Extract from '../components/home/extract'
import NotificationModal from './../components/home/notificationModal'
import { makeStyles } from '@material-ui/core/styles'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import axios from "axios";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  top: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 15,
    color: 'black',
    borderBottom: '1px solid green',
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    color: 'green',
    backgroundColor: 'white'
  }
}))

export default function Home({ }) {
  const [bitcoin, setBitcoin] = useState([])
  const [brita, setbrita] = useState([])
  const getCurrentUser = localStorage.getItem(`currentUser`);
  const getUserWallet = localStorage.getItem(`${getCurrentUser}`)
  const userWallet = JSON.parse(getUserWallet);
  const [open, setOpen] = React.useState(false);
  const [modalNotification, setModalNotification] = useState({ open: false, message: '', title: '' })

  const LoadBitcoin = () => {
    axios.get('https://www.mercadobitcoin.net/api/BTC/ticker/').then(response => {
      setBitcoin(response.data.ticker)
    })
  }

  const date =  new Date()
  const britaDate = moment(date).format('MM-DD-YYYY')
  const Loadbrita = () => {
    axios.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40dataInicial='03-10-2021'&%40dataFinalCotacao='${britaDate}'&%24format=json`).then(response => {
      setbrita(response.data.value[response.data.value.length - 1])
    })
  }

  useEffect(() => {
    LoadBitcoin()
    Loadbrita()
  }, [])

  const handleClickLogout = () => {
    window.location = '/login'
    localStorage.removeItem(`currentUser`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpenNotification = (message, title) => {
    setModalNotification({ open: true, message: message, title: title })
  }

  const handleCloseNotification = () => {
    setModalNotification({ open: false })
  }

  const formatdate = moment(date).format('DD-MM-YYYY')
  const classes = useStyles()

  return (
    <div>
      <Grid container spacing={1} style={{ height: 50 }} >
        <Grid iten xs={12} className={classes.top}>
          <div>
            <Button
              className={classes.button}
              onClick={handleClickLogout}
              variant="outlined"
            >
              <b> Sair </b>
            </Button>
          </div>
          <div style={{ marginLeft: 100 }}>
            <b style={{ color: 'white' }}>{formatdate}</b>
          </div>
          <div>
            <Button
              className={classes.button}
              endIcon={<TrendingUpIcon />}
              variant="outlined"
              onClick={handleClickOpen}>
              <b>Transações</b>
            </Button>
          </div>
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
              setModalNotification={setModalNotification}
              handleCloseNotification={handleCloseNotification}
              handleOpenNotification={handleOpenNotification}
              open={open}
            />
            {modalNotification.open &&
              <NotificationModal
                handleCloseNotification={handleCloseNotification}
                modalNotification={modalNotification}
              />
            }
          </center>
        </Grid>
      </Grid>
    </div>
  )
}
