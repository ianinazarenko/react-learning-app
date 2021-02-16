import React from "react";

const Book = (props) => {
    console.log(props);
    const { img, title, author } = props;
    return (
        <article className="book">
            <img src={img} alt={title} />
            <h1>{title}</h1>
            <h4>{author}</h4>
        </article>
    );
};

export default Book;
