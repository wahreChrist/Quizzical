import React, { useState } from "react";
import TitleCard from "./TitleCards";
import Quiz from "./Quiz";

export default function App() {
    const [menu, setMenu] = useState(false);

    function toggleMenu() {
        setMenu((state) => !state);
    }

    return (
        <div className="container">
            <i className="fas fa-cloud bottom-cloud"></i>
            <i className="fas fa-cloud right-cloud"></i>
            {menu ? <Quiz /> : <TitleCard toggle={toggleMenu} />}
        </div>
    );
}
