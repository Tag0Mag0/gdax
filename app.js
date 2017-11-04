const assert = require('assert'); // N.B: Assert module comes bundled with Node.js.
const dotenv = require('dotenv');
const Gdax = require('gdax');

dotenv.load();

// Set this to false to access actual API
const sandbox = true;

const apiURI = sandbox ? 'https://api-public.sandbox.gdax.com' : 'https://api.gdax.com';
const key = sandbox ? process.env.GDAX_SANDBOX_API_KEY : process.env.GDAX_API_KEY;
const b64secret = sandbox ? process.env.GDAX_SANDBOX_API_SECRET : process.env.GDAX_API_SECRET;
const passphrase = sandbox ? process.env.GDAX_SANDBOX_API_PASSPHRASE : process.env.GDAX_API_PASSPHRASE;

// defaults to `BTC-USD` for first arg
const publicClient = new Gdax.PublicClient('BTC-USD', apiURI);
const authedClient = new Gdax.AuthenticatedClient(key, b64secret, passphrase, apiURI);

/**
 * @function  [getProducts]
 * @returns {Json} products
 */
const getProducts = () => {
  publicClient.getProducts()
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  });
};

/**
 * @function  [getAccounts]
 * @returns {Json} accounts
 */
const getAccounts = () => {
  authedClient.getAccounts()
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  });
};

/**
 * @function  [getAccount]
 * @returns {Json} account
 */
const getAccount = (currencyType) => {
  const accountId = process.env[currencyType]

  if(accountId) {
    authedClient.getAccount(accountId)
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    });
  } else {
    throw 'no currency matches that type'
  }
};
// Export all methods
module.exports = { getProducts, getAccounts, getAccount };
