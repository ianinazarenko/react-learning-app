import React, { useState } from "react";
import people from "./data";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";

const Review = () => {
    const [index, setIndex] = useState(0);
    const { id, name, job, image, text } = people[index];

    const checkIndex = (num) => {
        console.log(`in checkIndex: ${index}`);
        if (num < 0) {
            return people.length - 1;
        } else if (num > people.length - 1) {
            return 0;
        } else return num;
    };

    // console.log(`in component: ${index}`);
    console.log("_______");

    const prevPerson = () => {
        console.log(`in prevPerson: ${index}`);
        // if (index < 0) {
        //     setIndex(people.length - 1);
        // } else {
        //     setIndex(index - 1);
        // }
        setIndex(() => checkIndex(index - 1));
    };

    const nextPerson = () => {
        setIndex(() => checkIndex(index + 1));
    };

    const randomPerson = () => {
        const randomNum = Math.floor(Math.random() * people.length);
        if (randomNum === index) {
            randomNum += 1;
        }
        setIndex(checkIndex(randomNum));
    };

    return (
        <article className="review">
            <div className="img-container">
                <img src={image} alt={name} className="person-img" />
                <span className="quote-icon">
                    <FaQuoteRight />
                </span>
            </div>
            <h4>{name}</h4>
            <p className="job">{job}</p>
            <p className="info">{text}</p>
            <div className="button-container">
                <button className="prev-btn" onClick={prevPerson}>
                    <FaChevronLeft />
                </button>
                <button className="next-btn" onClick={nextPerson}>
                    <FaChevronRight />
                </button>
            </div>
            <button className="random-btn" onClick={randomPerson}>
                surprise me
            </button>
        </article>
    );
};

export default Review;
