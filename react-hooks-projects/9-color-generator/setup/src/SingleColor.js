import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ index, rgb, type, weight }) => {
    const [alert, setAlert] = useState(false);
    const bcg = rgb.join(",");
    const hex = rgbToHex(...rgb);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (alert) setAlert(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [alert]);

    const handleClick = () => {
        setAlert(true);
        navigator.clipboard.writeText(hex);
    };
    return (
        <article
            className={`color ${type !== "tint" && "color-light"}`}
            style={{ backgroundColor: `rgb(${bcg})` }}
            onClick={handleClick}
        >
            <p className="percent-value">{weight}%</p>
            <p className="color-value">{hex}</p>
            {alert && <p className="alert">copied to clipboard</p>}
        </article>
    );
};

export default SingleColor;
