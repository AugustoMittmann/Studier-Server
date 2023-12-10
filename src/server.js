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
    if(user === null) {
      if(user != req.query.name) {
          const createdUser = await prisma.user.create({
          data: {
            name: req.query.name,
            password: req.query.password
          }
        })
        return res.status(201).send(createdUser)
      }
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
    //console.log(data);
    res.send(data);
  } catch (e) {
    console.log(e);
  }
})

app.get('/saveHistory', async (req, res) => {
  try{
    let questions = [];
    let rightAnswers = [];
    let userAnswers = [];
    req.query.history.forEach(data => {
      questions.push(data.question ? data.question : "");
      rightAnswers.push(data.rightAnswer ? data.rightAnswer : "");
      userAnswers.push(data.userAnswer ? data.userAnswer : "");
    })
    const userId = req.query.userId
    const historyDB = await prisma.history.create({
      data: {
        userId,
        finalGrade: parseInt(req.query.finalGrade),
        content: req.query.content
      }
    })
    const questionsDB = await prisma.questions.create({
      data: {
        question1: questions[0],
        question2: questions[1],
        question3: questions[2],
        question4: questions[3],
        question5: questions[4],
        question6: questions[5],
        question7: questions[6],
        question8: questions[7],
        question9: questions[8],
        question10: questions[9],
        historyId: historyDB.id
      }
    })
    const rightAnswersDB = await prisma.rightAnswers.create({
      data: {
        answer1: rightAnswers[0],
        answer2: rightAnswers[1],
        answer3: rightAnswers[2],
        answer4: rightAnswers[3],
        answer5: rightAnswers[4],
        answer6: rightAnswers[5],
        answer7: rightAnswers[6],
        answer8: rightAnswers[7],
        answer9: rightAnswers[8],
        answer10: rightAnswers[9],
        historyId: historyDB.id
      }
    })
    const userAnswersDB = await prisma.userAnswers.create({
      data: {
        answer1: userAnswers[0],
        answer2: userAnswers[1],
        answer3: userAnswers[2],
        answer4: userAnswers[3],
        answer5: userAnswers[4],
        answer6: userAnswers[5],
        answer7: userAnswers[6],
        answer8: userAnswers[7],
        answer9: userAnswers[8],
        answer10: userAnswers[9],
        historyId: historyDB.id
      }
    })    
  } catch (e){
    console.log(e)
  }
})

app.get('/showHistory', async (req, res) => {
  const historyDB = await prisma.history.findMany({
    where: {
      userId: req.query.userId,
    }
  });
  const id = historyDB.map((history) => history.id);

  const getQuestion = await prisma.questions.findMany({
    where: {
      historyId: { in: id },
    }
  })
  const getUserAnswer = await prisma.userAnswers.findMany({
    where: {
      historyId: { in: id }
    }
  })
  const getRightAnswer = await prisma.rightAnswers.findMany({
    where: {
      historyId: { in: id }
    }
  })
  const result = []

  for(let x = 0; x < getQuestion.length; x++) {
    for(let y = 0; y < getUserAnswer.length; y++) {
      for(let z = 0; z < getRightAnswer.length; z++) {
        if(getQuestion[x].historyId === getUserAnswer[y].historyId && getUserAnswer[y].historyId === getRightAnswer[z].historyId) {
          result.push({
            getQuestion: getQuestion[x],
            getUserAnswer: getUserAnswer[y],
            getRightAnswer: getRightAnswer[z],
            finalGrade: historyDB[x].finalGrade,
            content: historyDB[x].content
          })
        }
      }
    }
  }
  res.send(result)
})

app.get('/deleteHistory', async (req, res) => {
  try {
    await prisma.history.delete({
      where: {
        id: req.query.id
      }
    })
    res.sendStatus(200)
  } catch {
    res.send(400)
  }
})

app.get('/connectServer', async (req, res) => {
    res.sendStatus(200)
})
app.listen(4000);