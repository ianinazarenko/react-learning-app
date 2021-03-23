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
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  function toggleError(show = false, msg = '') {
    setError({ show, msg });
  }

  const checkRequests = React.useCallback(async () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'no more requests');
        }
      })
      .catch((err) => console.log(err));
  }, [rootUrl]);

  async function searchGithubUser(user) {
    toggleError();
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { followers_url, repos_url } = response.data;

      const results = await Promise.allSettled([
        axios(followers_url),
        axios(`${repos_url}?per_page=100`),
      ]).catch((err) => console.log(err));

      const [followers, repos] = results;
      if (followers.status === 'fulfilled') {
        setFollowers(followers.value.data);
      }
      if (repos.status === 'fulfilled') {
        setRepos(repos.value.data);
      }
    } else {
      toggleError(true, 'no such user');
    }
    checkRequests();
    setLoading(false);
  }

  useEffect(() => {
    checkRequests();
  }, [checkRequests]);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        loading,
      }}>
      {children}
    </GithubContext.Provider>
  );
};

const rootUrl = 'https://api.github.com';

export { GithubContext, GithubProvider };
