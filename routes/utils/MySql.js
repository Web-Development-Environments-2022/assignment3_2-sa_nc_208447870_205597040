var mysql = require('mysql');
require("dotenv").config();

const config={
connectionLimit:4,
  host: "localhost",
  // user: process.env.user,//"root"
  user: "root",
  // password: "shacharSQL123",
  password: "root",
  // database: "mydb",
  database: "mydb"
}
const pool = new mysql.createPool(config);

const connection =  () => {
  console.log("getting sql connection");
  return new Promise((resolve, reject) => {
    console.log("getting connection from pool");
  pool.getConnection((err, connection) => {
    if (err) reject(err);
    //console.log("MySQL pool connected: threadId " + connection.threadId);
    const query = (sql, binding) => {
      return new Promise((resolve, reject) => {
         connection.query(sql, binding, (err, result) => {
           if (err) reject(err);
           resolve(result);
           });
         });
       };
       const release = () => {
         return new Promise((resolve, reject) => {
           if (err) reject(err);
           console.log("MySQL pool released: threadId " + connection.threadId);
           resolve(connection.release());
         });
       };
       resolve({ query, release });
     });
   });
 };
const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
module.exports = { pool, connection, query };







