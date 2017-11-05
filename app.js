const dotenv = require('dotenv');
const Gdax = require('gdax');

dotenv.load();

// Set this to false to access actual API
const sandbox = true;

const apiURI = sandbox ? 'https://api-public.sandbox.gdax.com' : 'https://api.gdax.com';
const key = sandbox ? process.env.GDAX_SANDBOX_API_KEY : process.env.GDAX_API_KEY;
const b64secret = sandbox ? process.env.GDAX_SANDBOX_API_SECRET : process.env.GDAX_API_SECRET;
const passphrase = sandbox ? process.env.GDAX_SANDBOX_API_PASSPHRASE : process.env.GDAX_API_PASSPHRASE;

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
 * @function  [getCoinbaseAccounts]
 * @returns {Json} coinbaseAccounts
 */
const getCoinbaseAccounts = () => {
  authedClient.getCoinbaseAccounts()
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
  return new Promise((resolve, reject) => {
    const accountId = sandbox ? process.env[`SANDBOX_${currencyType}`] : process.env[currencyType]

    if (accountId) {
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
  })
}

const getCoinbaseAccount = (currencyType) => {
  return new Promise((resolve, reject) => {
    const findCoinbaseAccount = (coinbaseAccount) => {
      return coinbaseAccount.currency === currencyType;
    }

    authedClient.getCoinbaseAccounts()
      .then(data => {
        const account = data.find(findCoinbaseAccount)
        console.log(account)
        return account;
      })
  })
}

const getAccountHistory = (currencyType) => {
  getAccount(currencyType)
    .then(account => {
      authedClient.getAccountHistory(account.id)
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.log(error)
        });
    });
};

// Deposit to your Exchange USD account from your Coinbase USD account.
const depositUSD = (amount) => {
  getCoinbaseAccount('USD')
    .then(account => {

      const depositParamsUSD = {
        'amount': amount,
        'currency': 'USD',
        'coinbase_account_id': account.id, // USD Coinbase Account ID
      };

      authedClient.deposit(depositParamsUSD)
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      });
    });
};

// Export all methods
module.exports = { getProducts, getAccounts, getAccountHistory, getCoinbaseAccount, getCoinbaseAccounts, getAccount, depositUSD };
