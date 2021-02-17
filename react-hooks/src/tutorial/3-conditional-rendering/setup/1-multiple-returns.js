import React, { useState, useEffect } from "react";
const url = "https://api.github.com/users/QuincyLarson";
const MultipleReturns = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [user, setUser] = useState("default user");

    useEffect(() => {
        fetch(url)
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    setIsLoading(false);
                    setIsError(true);
                    throw new Error(resp.statusText);
                }
            })
            .then((user) => {
                setUser(user.name);
                setIsLoading(false);
            })
            .catch((err) => console.log(err), []);
    });

    if (isLoading) {
        // Show loading
        return (
            <>
                <h2>Loading...</h2>
            </>
        );
    }

    if (isError) {
        // Show error
        return (
            <>
                <h2>Error!</h2>
            </>
        );
    }

    return (
        <>
            <h1>{user}</h1>
        </>
    );
};

export default MultipleReturns;
