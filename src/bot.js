import OpenAI from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function create(content) {
  const message = "Retorne 10 questões sobre " + content + " enumeradas de 1 à 10. Com 5 opções (A, B, C, D e E). Marque a resposta correta.";

  /*const chat = await openai.chat.completions.create({
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

  const message2 = `1. Qual é o nome do elemento químico com o símbolo "Na"?
 A) Níquel
  B) Neônio
  C) Nitrogênio
  D) Sódio
  E) Náilon
  Resposta correta: A
  
  2. Qual é a fórmula química da água?
 A) H2O
  B) CO2
  C) O2
  D) H2O2
  E) NaCl
  Resposta correta: A
  
  3. Qual é o número atômico do hidrogênio?
 A) 1
  B) 2
  C) 3
  D) 4
  E) 5
  Resposta correta: A
  
  4. Qual é a fórmula química do sal de cozinha?
 A) NaCl
  B) KCl
  C) CaCl2
  D) MgCl2
  E) FeCl3
  Resposta correta: A
  
  5. Qual é o nome do processo de transformação de um gás em líquido?
 A) Evaporação
  B) Condensação
  C) Sublimação
  D) Fusão
  E) Solidificação
  Resposta correta: A
  
  6. Qual é o nome do elemento químico com o símbolo "O"?
 A) Oxigênio
  B) Osmio
  C) Ósmio
  D) Óleo
  E) Ouro
  Resposta correta: A
  
  7. Qual é a fórmula química do dióxido de carbono?
 A) CO
  B) CO2
  C) C2O
  D) C2O2
  E) C3O2
  Resposta correta: A
  
  8. Qual é o nome do processo de transformação de um sólido diretamente em gás?
 A) Evaporação
  B) Condensação
  C) Sublimação
  D) Fusão
  E) Solidificação
  Resposta correta: A
  
  9. Qual é o nome do elemento químico com o símbolo "K"?
 A) Cálcio
  B) Potássio
  C) Kriptônio
  D) Krypton
  E) Kalium
  Resposta correta: A
  
  10. Qual é a fórmula química do ácido sulfúrico?
 A) H2SO4
  B) H2SO3
  C) HSO4
  D) H2S
  E) SO4
  Resposta correta: A`;
  const questions = [];

  const completeMessage = message2;

  const start1 = completeMessage.indexOf("1."); //pergunta completa, considerando as perguntas, respostas e resposta certa
  const end1 = completeMessage.indexOf("2.") - 2;
  const start2 = completeMessage.indexOf("2.");
  const end2 = completeMessage.indexOf("3.") - 2;
  const start3 = completeMessage.indexOf("3.");
  const end3 = completeMessage.indexOf("4.") - 2;
  const start4 = completeMessage.indexOf("4.");
  const end4 = completeMessage.indexOf("5.") - 2;
  const start5 = completeMessage.indexOf("5.");
  const end5 = completeMessage.indexOf("6.") - 2;
  const start6 = completeMessage.indexOf("6.");
  const end6 = completeMessage.indexOf("7.") - 2;
  const start7 = completeMessage.indexOf("7.");
  const end7 = completeMessage.indexOf("8.") - 2;
  const start8 = completeMessage.indexOf("8.");
  const end8 = completeMessage.indexOf("9.") - 2;
  const start9 = completeMessage.indexOf("9.");
  const end9 = completeMessage.indexOf("10.") - 2;
  const start10 = completeMessage.indexOf("10.");
  const end10 = completeMessage.length;

  questions.push(completeMessage.slice(start1, end1));  //apenas a questão, sem as respostas
  questions.push(completeMessage.slice(start2, end2));
  questions.push(completeMessage.slice(start3, end3));
  questions.push(completeMessage.slice(start4, end4));
  questions.push(completeMessage.slice(start5, end5));
  questions.push(completeMessage.slice(start6, end6));
  questions.push(completeMessage.slice(start7, end7));
  questions.push(completeMessage.slice(start8, end8));
  questions.push(completeMessage.slice(start9, end9));
  questions.push(completeMessage.slice(start10, end10));

  const finalObj = [];

  questions.forEach((question, index) => {
    const startQuestionIndex = question.indexOf(`${index+1}.`);
    const endQuestionIndex = question.indexOf("?");
    const allQuestion = question.slice(startQuestionIndex, endQuestionIndex + 1);
    const endAllQuestionIndex = question.indexOf("Resposta") + 20;

    const alternativeBIndex = question.indexOf("B)");
    const alternativeCIndex = question.indexOf("C)");
    const alternativeDIndex = question.indexOf("D)");
    const alternativeEIndex = question.indexOf("E)");
    const alternativeA = question.slice(endQuestionIndex + 5, alternativeBIndex - 1);
    const alternativeB = question.slice(alternativeBIndex + 3, alternativeCIndex - 1);
    const alternativeC = question.slice(alternativeCIndex + 3, alternativeDIndex - 1);
    const alternativeD = question.slice(alternativeDIndex + 3, alternativeEIndex - 1);
    const alternativeE = question.slice(alternativeEIndex + 3, endAllQuestionIndex - 21);
    const rightAnswer = question.slice(endAllQuestionIndex-2, endAllQuestionIndex-1);

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

  return finalObj;
}


