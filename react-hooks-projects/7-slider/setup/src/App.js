import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
import people from "./data";
function App() {
    const [index, setIndex] = useState(0);
    const [people, setPeople] = useState(data);

    // const checkIndex = (num) => {
    //     if (num < 0) {
    //         setIndex(people.length - 1);
    //     } else if (num > people.length - 1) {
    //         setIndex(0);
    //     } else {
    //         setIndex(num);
    //     }
    // };

    useEffect(() => {
        if (index < 0) {
            setIndex(people.length - 1);
        } else if (index > people.length - 1) {
            setIndex(0);
        }
    }, [index, people]);

    useEffect(() => {
        const slider = setInterval(() => {
            setIndex(index + 1);
        }, 3000);
        return () => clearInterval(slider);
    }, [index]);

    return (
        <section className="section">
            <h2 className="title">
                <span>/</span> Reviews
            </h2>
            <div className="section-center">
                {data.map((person, personIndex) => {
                    console.log(person);
                    let position = "nextSlide";
                    if (personIndex === index) {
                        position = "activeSlide";
                    } else if (
                        personIndex === index - 1 ||
                        (index === 0 && personIndex === people.length - 1)
                    ) {
                        position = "lastSlide";
                    }
                    const { id, image, name, quote, title } = person;
                    return (
                        <article key={id} className={position}>
                            <img
                                src={image}
                                alt={name}
                                className="person-img"
                            />
                            <h4>{name}</h4>
                            <p className="title">{title}</p>
                            <p className="text">{quote}</p>
                            <FaQuoteRight className="icon" />
                        </article>
                    );
                })}
                <button className="prev" onClick={() => setIndex(index - 1)}>
                    <FiChevronLeft />
                </button>
                <button className="next" onClick={() => setIndex(index + 1)}>
                    <FiChevronRight />
                </button>
            </div>
        </section>
    );
}

export default App;
