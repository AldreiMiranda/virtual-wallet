# Carteira Virtual

## Descrição

O Web App tem como objetivo fornecer carteiras virtuais de criptomoedas. 

Todo cliente possui ao se cadastrar R$ 100.000,00 (cem mil reais) em conta para comprar Bitcoins e Britas. A cotação da criptomoeda Brita é equivalente ao dólar e é consultada na API do Banco Central enquanto que a cotação do Bitcoin é consultada na API do Mercado Bitcoin.

## Dependências

- NodeJS
- Yarn
- npm
- React

## Como rodar

Primeiramente, clone o projeto:

```
  git clone https://github.com/AldreiMiranda/virtual-wallet.git
```

Antes de rodar a aplicação, é necessário instalar as dependências listadas no arquivo `package.json`. Entre na pasta raíz do projeto e execute:

```
  npm install
```

Com as dependências instaladas, execute a aplicação em modo de desenvolvimento com o comando:

```
  yarn start
```

Abra o browser e acesse [http://localhost:3000](http://localhost:3000).


## Como usar

Para acessar a carteira virtual, é necessário cadastrar um perfil (usuário e senha). 

Feito o cadastro, use as credenciais para logar na aplicação.

A página inicial possui a visualização de saldos e extratos da carteira. O saldo de cada moeda está apresentado no formato de card. No caso de criptomoedas, o card conta com dois valores: a quantidade de moedas e o valor que ela representa em reais (considerando a cotação de venda).

No modal de "Transações" é possível operar com as moedas. As operações dísponíveis são compra, venda e troca. Toda operação finalizada é registrada no extrato da carteira.
