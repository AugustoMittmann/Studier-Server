import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function create(content) {
  /*const message = "Retorne 10 questões sobre " + content + " enumeradas de 1 à 10. Com 5 opções (A, B, C, D e E). Marque a resposta correta.";

  const chat = await openai.chat.completions.create({
    messages: [{ 
      role: "system", 
      content: message 
    }],
    model: "gpt-4",
    //max_tokens: 500,
    temperature: 0
  });

  const perguntas = chat.choices[0].message.content;
  console.log(perguntas);*/
  const message2 = `1. Qual é a raiz quadrada de 64?
  A) 6
  B) 7
  C) 8
  D) 10
  E) 12
  Resposta correta: C
  
  2. Se você tem 20 maçãs e come 15, quantas maçãs você tem agora?
  A) 5
  B) 10
  C) 15
  D) 20
  E) 25
  Resposta correta: A
  
  3. Qual é o resultado de 7x7?
  A) 49
  B) 50
  C) 51
  D) 52
  E) 53
  Resposta correta: A
  
  4. Qual é o resultado de 10-3?
  A) 5
  B) 6
  C) 7
  D) 8
  E) 9
  Resposta correta: C
  
  5. Qual é o resultado de 2x2x2?
  A) 4
  B) 6
  C) 8
  D) 10
  E) 12
  Resposta correta: C
  
  6. Qual é o resultado de 100/10?
  A) 5
  B) 10
  C) 15
  D) 20
  E) 25
  Resposta correta: B
  
  7. Qual é o resultado de 5x5?
  A) 10
  B) 15
  C) 20
  D) 25
  E) 30
  Resposta correta: D
  
  8. Qual é o resultado de 9+9?
  A) 16
  B) 17
  C) 18
  D) 19
  E) 20
  Resposta correta: C
  
  9. Qual é o resultado de 12-4?
  A) 6
  B) 7
  C) 8
  D) 9
  E) 10
  Resposta correta: C
  
  10. Qual é o resultado de 3x3?
  A) 6
  B) 7
  C) 8
  D) 9
  E) 10
  Resposta correta: D`;

  const questions = [];

  const start1 = message2.indexOf("1.");
  const end1 = message2.indexOf("2.") - 3;
  const start2 = message2.indexOf("2.");
  const end2 = message2.indexOf("3.") - 3;
  const start3 = message2.indexOf("3.");
  const end3 = message2.indexOf("4.") - 3;
  const start4 = message2.indexOf("4.");
  const end4 = message2.indexOf("5.") - 3;
  const start5 = message2.indexOf("5.");
  const end5 = message2.indexOf("6.") - 3;
  const start6 = message2.indexOf("6.");
  const end6 = message2.indexOf("7.") - 3;
  const start7 = message2.indexOf("7.");
  const end7 = message2.indexOf("8.") - 3;
  const start8 = message2.indexOf("8.");
  const end8 = message2.indexOf("9.") - 3;
  const start9 = message2.indexOf("9.");
  const end9 = message2.indexOf("10.") - 3;
  const start10 = message2.indexOf("10.");
  const end10 = message2.length;

  questions.push(message2.slice(start1, end1));
  questions.push(message2.slice(start2, end2));
  questions.push(message2.slice(start3, end3));
  questions.push(message2.slice(start4, end4));
  questions.push(message2.slice(start5, end5));
  questions.push(message2.slice(start6, end6));
  questions.push(message2.slice(start7, end7));
  questions.push(message2.slice(start8, end8));
  questions.push(message2.slice(start9, end9));
  questions.push(message2.slice(start10, end10));

  const finalObj = [];

  questions.forEach((question, index) => {
    const startQuestionIndex = question.indexOf(`${index+1}.`);
    const endQuestionIndex = question.indexOf("?");
    const allQuestion = question.slice(startQuestionIndex, endQuestionIndex + 1);
    const endAllQuestionIndex = question.indexOf("Resposta") + 19;

    const alternativeBIndex = question.indexOf("B)");
    const alternativeCIndex = question.indexOf("C)");
    const alternativeDIndex = question.indexOf("D)");
    const alternativeEIndex = question.indexOf("E)");
    const alternativeA = question.slice(endQuestionIndex + 5, alternativeBIndex - 1);
    const alternativeB = question.slice(alternativeBIndex + 3, alternativeCIndex - 1);
    const alternativeC = question.slice(alternativeCIndex + 3, alternativeDIndex - 1);
    const alternativeD = question.slice(alternativeDIndex + 3, alternativeEIndex - 1);
    const alternativeE = question.slice(alternativeEIndex + 3, endAllQuestionIndex - 20);
    const rightAnswer = question.slice(endAllQuestionIndex - 1, endAllQuestionIndex);

    finalObj.push({
      'question': allQuestion,
      'answers': {
        'A': alternativeA,
        'B': alternativeB,
        'C': alternativeC,
        'D': alternativeD,
        'E': alternativeE,
      },
     'rightAnswer': rightAnswer
    });
  })

  //console.log(finalObj);

  return finalObj;
}


