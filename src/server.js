import express from "express";
import { create } from "./bot.js";
import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();

app.get('/users', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const users = await prisma.user.findMany();
  res.send(users)
})

app.post('/create', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const {name, password} = req.body;

  await prisma.user.create({
    data: {
      name: 'name',
      password: 'password'
    }
  })

  return res.status(201).send()
})

app.get('/test', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  try {
    const data = await create(req.query.content);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
})

app.listen(4000);