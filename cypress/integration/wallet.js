

const user = Math.random().toString().substr(2, 5)
const password = Math.random().toString().substr(2, 5)

const register = () => {
  cy.get('h3').contains('Virtual Wallet')
  cy.get('div').contains('Criar uma conta').click({ force: true })
  cy.get('input[name="name"]').click({ force: true }).type(user)
  cy.get('input[name="password"]').click({ force: true }).type(password)
  cy.get('input[name="confirmpassword"]').click({ force: true }).type(password)
  cy.get('button[type=button]').contains('Criar').click({ force: true })
}

describe('virtual Wallet', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    register()
  })

  const login = () => {
    cy.get('input[name="name"]').click({ force: true }).clear().type(user)
    cy.get('input[name="password"]').click({ force: true }).clear().type(password)
    cy.get('button[type=button]').contains('Entrar').click({ force: true })
  }

  const logout = () => {
    cy.wait(1000)
    cy.get('button[type=button]').contains('Sair').click({ force: true })
    cy.get('h3').contains('Virtual Wallet')
  }

  it('Validate Login', () => {
    cy.get('button[type=button]').contains('Entrar').click({ force: true })
    cy.get('h3').contains('Virtual Wallet')
    cy.get('input[name="name"]').click({ force: true }).type(user)
    cy.get('input[name="password"]').click({ force: true }).type("123")
    cy.get('h3').contains('Virtual Wallet')
    cy.get('input[name="name"]').click({ force: true }).clear().type(user)
    login()
    logout()
  })

  const invalidSell = () => {
    cy.get('button[type=button]').contains('Transações').click({ force: true })
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="status"]').select("venda")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency1"]').select("Real (BRL)")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('input[name="qtd"]').type(1)
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency2"]').select("Brita (BRT)")
    cy.get('button[type=button]').contains('Calcular').click({ force: true })
    cy.get('button[type=button]').contains('Finalizar').click({ force: true })
    cy.get('.MuiDialogContent-root').contains('Saldo insuficiente')
    cy.get("body").click(0, 0)
  }

  const invalidChange = () => {
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="status"]').select("troca")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency1"]').select("Bitcoin (BTC)")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('input[name="qtd"]').type(1)
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency2"]').select("Brita (BRT)")
    cy.get('button[type=button]').contains('Calcular').click({ force: true })
    cy.get('button[type=button]').contains('Finalizar').click({ force: true })
    cy.get('.MuiDialogContent-root').contains('Saldo insuficiente')
    cy.get("body").click(0, 0)
  }

  const validBuy = () => {
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="status"]').select("compra")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency1"]').select("Real (BRL)")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('input[name="qtd"]').type(10)
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency2"]').select("Brita (BRT)")
    cy.get('button[type=button]').contains('Calcular').click({ force: true })
    cy.get('button[type=button]').contains('Finalizar').click({ force: true })
    cy.get('.MuiDialogContent-root').contains('Operação realizada com sucesso.')
    cy.get("body").click(0, 0)
  }

  const validChange = () => {
    cy.get('button[type=button]').contains('Transações').click({ force: true })
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="status"]').select("troca")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency1"]').select("Brita (BRT)")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('input[name="qtd"]').type(1)
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency2"]').select("Bitcoin (BTC)")
    cy.get('button[type=button]').contains('Calcular').click({ force: true })
    cy.get('button[type=button]').contains('Finalizar').click({ force: true })
    cy.get('.MuiDialogContent-root').contains('Operação realizada com sucesso.')
    cy.get("body").click(0, 0)
  }

  const validSell = () => {
    cy.get('button[type=button]').contains('Transações').click({ force: true })
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="status"]').select("venda")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency1"]').select("Real (BRL)")
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('input[name="qtd"]').type(1)
    cy.get('.MuiDialog-paperFullScreen').find('div[name=transactionPaper]').find('select[id="currency2"]').select("Brita (BRT)")
    cy.get('button[type=button]').contains('Calcular').click({ force: true })
    cy.get('button[type=button]').contains('Finalizar').click({ force: true })
    cy.get('.MuiDialogContent-root').contains('Operação realizada com sucesso.')
    cy.get("body").click(0, 0)
  }

  const validateExtract = () => {
    cy.get('.MuiTable-root').find('td').contains('troca')
    cy.get('.MuiTable-root').find('td').contains('venda')
    cy.get('.MuiTable-root').find('td').contains('compra')

  }

  const validBitcoinAPI = () => {
    cy.request('GET', 'https://www.mercadobitcoin.net/api/BTC/ticker/').then((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.not.be.null
    })
  }

  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const britaDay = m + '-' + d + '-' + y

  const validBritaAPI = () => {
    cy.request('GET', `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?%40dataInicial='03-10-2021'&%40dataFinalCotacao='${britaDay}'&%24format=json`).then((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.not.be.null
    })
  }


  it('Validate transactions', () => {
    login()
    validBitcoinAPI()
    validBritaAPI()
    invalidSell()
    invalidChange()
    validBuy()
    validChange()
    validSell()
    validateExtract()
  })
})
