import React, { useState, useEffect } from "react";

// cleanup function
// second argument

const UseEffectCleanup = () => {
    const [size, setSize] = useState(() => {
        console.log("useState");
        return window.innerWidth;
    });

    const changeSize = () => {
        setSize(window.innerWidth);
    };

    useEffect(() => {
        console.log("useEffect");
        window.addEventListener("resize", changeSize);
        return () => {
            console.log("clean up");
            window.removeEventListener("resize", changeSize);
        };
    });
    console.log("render");

    return (
        <>
            <h2>window</h2>
            <h1>{size} PX</h1>
        </>
    );
};

export default UseEffectCleanup;
