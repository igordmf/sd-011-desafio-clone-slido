import React from 'react';
import PropTypes from 'prop-types';
import '../style/Question.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.upVote = this.upVote.bind(this);
    this.answer = this.answer.bind(this);
  }

  upVote() {
    const { question, upVote } = this.props;
    upVote();
    question.vote += 1;
  }

  answer() {
    const { question, filter } = this.props;
    question.answered = true;
    filter();
  }

  render() {
    const { question, upVote } = this.props;
    const { id } = question;
    question.id = (new Date().getMinutes()) - question.time;
    return (
      <div className="question" onDoubleClick={ this.answer }>
        <div className="personName">
          <div
            className="letter"
            style={ { backgroundColor: `#${question.randomColor}` } }
          >
            { question.name ? question.name.charAt(0) : 'A'}
          </div>
          <div className="texts">
            <h1>
              { question.name ? question.name : 'Anonymous' }
            </h1>
            <p>
              { id === 1 ? `${id} minute ago` : `${id} minutes ago`}
            </p>
          </div>
          <button
            aria-label="vote"
            type="button"
            className="votes"
            onClick={ this.upVote }
            onChange={ upVote }
            value={ question.vote }
          >
            { question.vote }
            <FontAwesomeIcon icon={ faThumbsUp } />
          </button>
        </div>
        <div className="personQuestion">
          <p>
            { question.question }
          </p>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.objectOf(String),
  upVote: PropTypes.func,
  filter: PropTypes.func,
};

Question.defaultProps = {
  question: {},
  upVote: '',
  filter: '',
};

export default Question;
