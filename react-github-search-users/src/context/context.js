import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequsts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  async function checkRequests() {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequsts(remaining);
        if (remaining === 0) {
          toggleError(true, 'no more requests');
        }
      })
      .catch((err) => console.log(err));
  }

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  async function searchGithubUser(user) {
    toggleError();
    // setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    console.log(response);
    if (response) {
      setGithubUser(response.data);
    } else {
      toggleError(true, 'no such user');
    }
  }

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
      }}>
      {children}
    </GithubContext.Provider>
  );
};

const rootUrl = 'https://api.github.com';

export { GithubContext, GithubProvider };
