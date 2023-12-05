import express from "express";
import { create } from "./bot.js";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

const app = express();
app.use(cors());

const prisma = new PrismaClient();


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users)
})

app.get('/create', async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: req.query.name
      }
    })
    if(user === "" || user != req.query.name) {
      await prisma.user.create({
      data: {
        name: req.query.name,
        password: req.query.password
      }
    })
    return res.status(201).send()
  } else {
    return res.send(false)
  }
  } catch (e) {
    console.log(e);
  }

  
})

app.get('/login', async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: req.query.name,
        password: req.query.password
      }
    })
    res.send(user);
  } catch (e) {
    console.log(e);
  }
})

app.get('/question', async (req, res) => {
  try {
    const data = await create(req.query.content);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
})

app.listen(4000);