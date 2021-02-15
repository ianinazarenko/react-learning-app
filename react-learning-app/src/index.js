import React from "react";
import ReactDOM from "react-dom";

// CSS
import "./index.css";

const books = [
    {
        id: 1,
        img:
            "https://images-na.ssl-images-amazon.com/images/I/81EVdWdmOKL._AC_UL200_SR200,200_.jpg",
        title: "Brown Bear, Brown Bear, What Do You See?",
        author: "Bill Martin Jr.",
    },
    {
        id: 2,
        img:
            "https://images-na.ssl-images-amazon.com/images/I/71l9WWa-rXL._AC_UL200_SR200,200_.jpg",
        title: "Milk and Honey",
        author: "Rupi Kaur",
    },
];

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

ReactDOM.render(<BookList />, document.getElementById("root"));
