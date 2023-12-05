-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "finalGrade" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "question1" TEXT NOT NULL,
    "question2" TEXT NOT NULL,
    "question3" TEXT NOT NULL,
    "question4" TEXT NOT NULL,
    "question5" TEXT NOT NULL,
    "question6" TEXT NOT NULL,
    "question7" TEXT NOT NULL,
    "question8" TEXT NOT NULL,
    "question9" TEXT NOT NULL,
    "question10" TEXT NOT NULL,
    "historyId" TEXT,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RightAnswers" (
    "id" TEXT NOT NULL,
    "answer1" TEXT NOT NULL,
    "answer2" TEXT NOT NULL,
    "answer3" TEXT NOT NULL,
    "answer4" TEXT NOT NULL,
    "answer5" TEXT NOT NULL,
    "answer6" TEXT NOT NULL,
    "answer7" TEXT NOT NULL,
    "answer8" TEXT NOT NULL,
    "answer9" TEXT NOT NULL,
    "answer10" TEXT NOT NULL,
    "historyId" TEXT,

    CONSTRAINT "RightAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswers" (
    "id" TEXT NOT NULL,
    "answer1" TEXT NOT NULL,
    "answer2" TEXT NOT NULL,
    "answer3" TEXT NOT NULL,
    "answer4" TEXT NOT NULL,
    "answer5" TEXT NOT NULL,
    "answer6" TEXT NOT NULL,
    "answer7" TEXT NOT NULL,
    "answer8" TEXT NOT NULL,
    "answer9" TEXT NOT NULL,
    "answer10" TEXT NOT NULL,
    "historyId" TEXT,

    CONSTRAINT "UserAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RightAnswers" ADD CONSTRAINT "RightAnswers_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswers" ADD CONSTRAINT "UserAnswers_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE SET NULL ON UPDATE CASCADE;
