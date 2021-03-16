import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });

  // fetching data
  const fetchData = async (url) => {
    setLoading(true);
    setWaiting(false);

    const response = await axios(url)
      .then((response) => response)
      .catch((err) => console.log(err));

    if (response) {
      const data = response.data.results;
      if (data.length) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  // next question
  const nextQuestion = () => {
    setIndex((currentIndex) => {
      const newIndex = currentIndex + 1;
      if (newIndex > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return newIndex;
      }
    });
  };

  // checking correct answer
  const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => {
        return oldState + 1;
      });
    }
    nextQuestion();
  };

  // open Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // close Modal
  const closeModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  // handle change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({
      ...quiz,
      [name]: value,
    });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `${API_ENDPOINT}amount=${quiz.amount}&category=${
      table[quiz.category]
    }&difficulty=${quiz.difficulty}&type=multiple`;

    fetchData(url);
  };

  // useEffect
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // return
  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        error,
        isModalOpen,
        nextQuestion,
        checkAnswer,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
