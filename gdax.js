const program = require('commander');

// Require app.js file and extract controller functions using JS destructuring assignment
const { getProducts, getAccounts, getAccount } = require('./app');

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
  .command('getAccount')
  .description('Get account for currency')
  .action(currencyType => getAccount(currencyType));

program.parse(process.argv);
