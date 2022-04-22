import React from "react";
import Answer from "./Answer";

interface Answ {
    ansId: string;
    isHeld: boolean;
    text: string;
}

interface CardProp {
    key: string;
    id: string;
    question: string;
    correct: string;
    resultsShown: boolean;
    answers: Answ[];
    selector: (ansId: string, questId: string) => void;
}

export default function QuizCard(props: CardProp) {
    let question = props.question
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");

    return (
        <div className="quiz--card">
            <p className="quiz--question">{question}</p>

            <div className="quiz--answers">
                {props.answers.map((elem, index) => (
                    <Answer
                        key={index}
                        text={elem.text}
                        selector={() => props.selector(elem.ansId, props.id)}
                        isHeld={elem.isHeld}
                        correctAnswer={props.correct}
                        resultsShown={props.resultsShown}
                    />
                ))}
            </div>
            <hr />
        </div>
    );
}
