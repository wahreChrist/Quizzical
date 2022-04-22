import React from "react";

export default function TitleCard({ toggle }: { toggle: () => void }) {
    return (
        <div className="title-container">
            <div className="start-page">
                <h2>Quizzical</h2>
                <h4>Interactive quiz game of the next century</h4>
                <button onClick={toggle}>Start Quiz</button>
            </div>
        </div>
    );
}
