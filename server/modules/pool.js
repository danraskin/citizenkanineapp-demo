const pg = require('pg');

let config = {};

if (process.env.DATABASE_URL) {
  config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  };
} else {
  config = {
    host: 'localhost',
    port: 5432, // env var: PGPORT
    database: 'citizen_kanine', 
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
