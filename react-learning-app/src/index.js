import React from "react";
import ReactDOM from "react-dom";

// CSS
import "./index.css";

import { books } from "./books";
import Book from "./Book";

function BookList() {
    // This is JSX
    return (
        <section className="booklist">
            {books.map((book) => {
                return <Book key={book.id} {...book}></Book>;
            })}
        </section>
    );
}

ReactDOM.render(<BookList />, document.getElementById("root"));
