import React from "react";

interface AnswProp {
    key: number;
    text: string;
    isHeld: boolean;
    correctAnswer: string;
    resultsShown: boolean;
    selector: () => void;
}

export default function Answer(props: AnswProp) {
    let display: React.CSSProperties = {};

    if (!props.resultsShown) {
        display = {
            background: props.isHeld ? "#D6DBF5" : "none",
        };
    } else if (
        props.resultsShown &&
        props.text == props.correctAnswer &&
        props.isHeld
    ) {
        display = {
            background: "#38e698",
            fontWeight: "bold",
            border: "none",
        };
    } else if (
        props.resultsShown &&
        props.text != props.correctAnswer &&
        props.isHeld
    ) {
        display = {
            background: "#dd6d77",
            opacity: "0.7",
            border: "grey 1.5px solid",
        };
    } else if (props.resultsShown && props.text == props.correctAnswer) {
        display = {
            background: "#38e698",
            fontWeight: "bold",
            border: "none",
        };
    }

    return (
        <div className="quiz--answer" style={display} onClick={props.selector}>
            {props.text.replace(/&quot;/g, '"').replace(/&#039;/g, "'")}
        </div>
    );
}
