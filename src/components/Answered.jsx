import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

class Answered extends React.Component {
  constructor(props) {
    super(props);
    this.upVote = this.upVote.bind(this);
  }

  upVote() {
    const { question, upVote } = this.props;
    upVote();
    question.vote += 1;
  }

  render() {
    const { question, upVote } = this.props;
    const { id } = question;
    return (
      <div className="question">
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
              { id === 1 ? `${id} hour ago` : `${id} hours ago`}
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

Answered.propTypes = {
  question: PropTypes.objectOf(String),
  upVote: PropTypes.func,
};

Answered.defaultProps = {
  question: {},
  upVote: '',
};

export default Answered;
