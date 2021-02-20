import React, { useState } from "react";
import data from "./data";
import Question from "./Question";
import SingleQuestion from "./Question";
function App() {
    return (
        <main>
            <div className="container">
                <h3>Questions and answers about login</h3>

                <section className="info">
                    {data.map((question) => {
                        return <Question key={question.id} {...question} />;
                    })}
                </section>
            </div>
        </main>
    );
}

export default App;
