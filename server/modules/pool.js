/* the only line you likely need to change is

 database: 'prime_app',

 change `prime_app` to the name of your database, and you should be all set!
*/

const pg = require('pg');
const url = require('url');

let config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  // const params = url.parse(process.env.DATABASE_URL);
  // const auth = params.auth.split(':');

  config = {
    // user: 'danraskin',
    // host: 'db.bit.io',
    connectionString: process.env.DATABASE_URL,
    // password: process.env.DB_PASS, // key from bit.io database page connect menu
    port: 5432,
    //ssl: true //from bit.io settings
    ssl: {
      rejectUnauthorized: false
    },
  };
} else {
  config = {
    host: 'localhost', // Server hosting the postgres database
    port: 5432, // env var: PGPORT
    database: 'citizen_kanine', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
    schema: 'ck_demo_staging'
  };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

pool.on('connect',(client)=> {
  client.query(`SET search_path TO ${config.schema}, public`);
});
// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
