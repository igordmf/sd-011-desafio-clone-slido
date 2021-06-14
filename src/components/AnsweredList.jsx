import React from 'react';
import PropTypes from 'prop-types';
import Answered from './Answered';

class AnsweredList extends React.Component {
  render() {
    const { questions, upVote } = this.props;
    const size = 130;
    const height = (questions.length * size);
    return (
      <div className="completeList">
        <div className="questionsList" style={ { height: `${height}px` } }>
          {questions.map((question, index) => (
            <Answered key={ index } question={ question } upVote={ upVote } />
          ))}
        </div>
      </div>
    );
  }
}

AnsweredList.propTypes = {
  questions: PropTypes.arrayOf(Object),
  upVote: PropTypes.func,
};

AnsweredList.defaultProps = {
  questions: '',
  upVote: '',
};

export default AnsweredList;
