import React, { useState, useEffect } from "react";

const url = "https://api.github.com/users";

const UseEffectFetchData = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setUsers(data);
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            throw new Error(`${error} - Unable to fetch users`);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <h3>GitHub users</h3>
            <ul className="users">
                {users.map((user) => {
                    const { id, login, avatar_url, html_url } = user;
                    return (
                        <li key={id}>
                            <img src={avatar_url} alt={login} />
                            <div>
                                <h4>{login}</h4>
                                <a href={html_url}>profile</a>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default UseEffectFetchData;
