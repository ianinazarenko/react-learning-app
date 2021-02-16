import React, { useState } from "react";

const UseStateCounter = () => {
    const [value, setValue] = useState(0);

    const increaseComplex = () => {
        setTimeout(() => {
            setValue((prevState) => {
                return prevState + 1;
            });
        }, 2000);
    };

    return (
        <>
            <section style={{ margin: "4rem 0" }}>
                <h2>regular counter</h2>
                <h1>{value}</h1>
                <button
                    className="btn"
                    onClick={() => {
                        setValue(value - 1);
                        console.log(value);
                    }}
                >
                    decrease
                </button>
                <button
                    className="btn"
                    onClick={() => {
                        setValue(0);
                    }}
                >
                    reset
                </button>
                <button
                    className="btn"
                    onClick={() => {
                        setValue(value + 1);
                    }}
                >
                    increase
                </button>
            </section>
            <section style={{ margin: "4rem 0" }}>
                <h2>more complex counter</h2>
                <h1>{value}</h1>
                <button className="btn" onClick={increaseComplex}>
                    increase later
                </button>
            </section>
        </>
    );
};

export default UseStateCounter;

// Here if we use value-- there will be an error, cause we try to reassign value to value =)
// But if we use value - 1 and console.log(value), we'll see value's changing every time we press the button
