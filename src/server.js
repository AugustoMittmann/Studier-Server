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
    await prisma.user.create({
      data: {
        name: req.query.name,
        password: req.query.password
      }
    })
  } catch (e) {
    console.log(e);
  }

  return res.status(201).send()
})

app.get('/test', async (req, res) => {
  try {
    const data = await create(req.query.content);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
})

app.listen(4000);