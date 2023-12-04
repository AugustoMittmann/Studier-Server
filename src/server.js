import express from "express";
import { create } from "./bot.js";
import mysql from "mysql"

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'STUDIER'
})

const app = express();

app.get('/insert', async (req, res) => {
  database.query('SELECT * FROM USERS', (err, result) => {
    console.log('err:', err);
    console.log('result:', result);
    res.send(result);
  })
})

app.get('/', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    res.send('Hello!');
  } catch (e) {
    console.log(e);
  }
})

app.get('/test', async (req, res) => {
  console.log(req.query.content)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  try {
    const data = await create(req.query.content);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
})

app.listen(4000);