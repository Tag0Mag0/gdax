const program = require('commander');

// Require app.js file and extract controller functions using JS destructuring assignment
const { getProducts, getAccounts, getCoinbaseAccounts, getCoinbaseAccount, getAccount, getAccountHistory, depositUSD } = require('./app');

program
  .version('0.0.1')
  .description('gdax utils');

program
  .command('getProducts')
  .alias('r')
  .description('Get products')
  .action(name => getProducts());

program
  .command('getAccounts')
  .description('Get accounts')
  .action(name => getAccounts());

program
  .command('getCoinbaseAccounts')
  .description('Get Coinbase accounts')
  .action(name => getCoinbaseAccounts());

program
  .command('getCoinbaseAccount')
  .description('Get Coinbase account for currency')
  .action(currencyType => getCoinbaseAccount(currencyType));

program
  .command('getAccount')
  .description('Get account for currency')
  .action(currencyType => getAccount(currencyType));

program
  .command('getAccountHistory')
  .description('Get account history for currency')
  .action(currencyType => getAccountHistory(currencyType));

program
  .command('depositUSD')
  .description('Deposit USD from coinbase account')
  .action(amount => depositUSD(amount));

program.parse(process.argv);
