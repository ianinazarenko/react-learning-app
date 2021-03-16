import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
  const { error, quiz, handleChange, handleSubmit } = useGlobalContext();

  return (
    <section className='quiz quiz-small'>
      <form className='setup-form' onSubmit={handleSubmit}>
        <h2>setup quiz</h2>
        {/* amount */}
        <div className='form-control'>
          <label htmlFor='amount'>number of questions</label>
          <input
            type='number'
            id='amount'
            className='form-input'
            name='amount'
            min={1}
            max={50}
            value={quiz.amount}
            onChange={handleChange}
          />
        </div>
        {/* category */}
        <div className='form-control'>
          <label htmlFor='category'>category of questions</label>
          <select
            id='category'
            name='category'
            className='form-input'
            value={quiz.category}
            onChange={handleChange}>
            <option value='sports'>sports</option>
            <option value='history'>history</option>
            <option value='politics'>politics</option>
          </select>
        </div>
        {/* difficulty */}
        <div className='form-control'>
          <label htmlFor='difficulty'>difficulty of questions</label>
          <select
            id='difficulty'
            name='difficulty'
            className='form-input'
            value={quiz.difficulty}
            onChange={handleChange}>
            <option value='easy'>easy</option>
            <option value='medium'>medium</option>
            <option value='hard'>hard</option>
          </select>
        </div>
        {error && (
          <p className='error'>
            can't generate questions, please try different options
          </p>
        )}
        <button className='submit-btn' type='submit'>
          start
        </button>
      </form>
    </section>
  );
};

export default SetupForm;
