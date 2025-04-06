import pkg from "pg"

const {Pool} = pkg;


const pool = new Pool({

    connectionString : "",
    ssl : {rejectUnauthorized : false},
});

pool.query(`
    
   CREATE TABLE Customer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(105) UNIQUE NOT NULL,
  password VARCHAR(100) 
);

     
     )

    `)

    export default pool;
