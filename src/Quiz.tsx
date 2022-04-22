import React, { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import { nanoid } from "nanoid";

interface Quiz {
    id: string;
    correctAnswer: string;
    question: string;
    answers: Answer[];
}

interface Answer {
    ansId: string;
    isHeld: boolean;
    text: string;
}

interface APIresponse {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export default function Quiz() {
    const [quizes, setQuizes] = useState<Quiz[]>([]);
    const [amountOfAnswers, setAmountOfAnswers] = useState<number>(0);
    const [resultsShown, setResultsShown] = useState<boolean>(false);
    // console.log("quizes state:", quizes);

    function shuffle(array: string[]): string[] {
        let currentIndex = array.length,
            randomIndex: number;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }

        return array;
    }

    function answersArr(data: string[]): Answer[] {
        return data.map((answer) => {
            return {
                text: answer,
                isHeld: false,
                ansId: nanoid(),
            };
        });
    }

    function intializeQuizes(data: APIresponse[]) {
        let quizSet = data.map((quizlet: APIresponse) => {
            return {
                id: nanoid(),
                question: quizlet.question,
                correctAnswer: quizlet.correct_answer,
                answers: answersArr(
                    shuffle([
                        ...quizlet.incorrect_answers,
                        quizlet.correct_answer,
                    ])
                ),
            };
        });
        return quizSet;
    }

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((res) => res.json())
            .then((data) => setQuizes(intializeQuizes(data.results)))
            .catch((err) => {
                console.log("error in retrieving question", err);
            });
    }, []);

    const newGame = (): void => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((res) => res.json())
            .then((data) => setQuizes(intializeQuizes(data.results)))
            .catch((err) => {
                console.log("error in retrieving question", err);
            });
        setResultsShown(false);
    };

    function choiceToggle(answerId: string, questId: string): void {
        setQuizes((quiz) =>
            quiz.map((question) => {
                if (question.id === questId) {
                    let answersArr = question.answers.map((answ) => {
                        if (answ.ansId == answerId || answ.isHeld) {
                            return { ...answ, isHeld: !answ.isHeld };
                        } else {
                            return answ;
                        }
                    });
                    return { ...question, answers: answersArr };
                } else {
                    return question;
                }
            })
        );
    }

    const answersCheck = (): void => {
        let chosenAnswers = quizes.map((question) =>
            question.answers.filter((ans) => ans.isHeld == true)
        );
        let chosenAnswersArr = chosenAnswers.map((answer) => answer[0].text);
        let correctAnswers = quizes.map((question) => question.correctAnswer);
        for (let i = 0; i < correctAnswers.length; i++) {
            if (correctAnswers[i] == chosenAnswersArr[i]) {
                setAmountOfAnswers((prevAmount) => prevAmount + 1);
            }
        }
        setResultsShown(true);
    };

    let quizSet = quizes.map((quiz) => {
        return (
            <QuizCard
                key={quiz.id}
                id={quiz.id}
                question={quiz.question}
                answers={quiz.answers}
                correct={quiz.correctAnswer}
                selector={choiceToggle}
                resultsShown={resultsShown}
            />
        );
    });

    return (
        <div className="quiz-container">
            {quizSet}
            <div className="results">
                {resultsShown ? (
                    <div className="results--shown">
                        <p>
                            You scored {amountOfAnswers}/{quizes.length} correct
                            answers
                        </p>
                        <button className="checker" onClick={newGame}>
                            New Game
                        </button>
                    </div>
                ) : (
                    <button className="checker" onClick={answersCheck}>
                        Check Answers
                    </button>
                )}
            </div>
        </div>
    );
}
