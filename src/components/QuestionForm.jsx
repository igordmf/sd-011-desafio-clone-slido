import React from 'react';
import PropTypes from 'prop-types';
import NameArea from '../codeParts/NameArea';
import TextArea from '../codeParts/TextArea';
import '../style/QuestionForm.css';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);

    this.changeValue = this.changeValue.bind(this);
    this.changeStyles = this.changeStyles.bind(this);
    this.changeStyleKeyPressed = this.changeStyleKeyPressed.bind(this);
  }

  changeValue({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  changeStylesTop({ ...args }) {
    const { quest, minus, text, count, name, user } = args;
    quest.classList.toggle('minusQuest');
    minus.classList.toggle('minus');
    text.classList.toggle('minusText');
    count.classList.toggle('minusCount');
    name.classList.toggle('minusName');
    user.classList.toggle('minusUser');
    quest.classList.add('questionForm');
    minus.classList.add('form');
    text.classList.add('textarea');
    count.classList.add('count');
    name.classList.add('nameArea');
    user.classList.add('user');
  }

  changeStylesBottom({ ...args }) {
    const { quest, minus, text, count, name, user } = args;
    quest.classList.toggle('questionForm');
    minus.classList.toggle('form');
    text.classList.toggle('textarea');
    count.classList.toggle('count');
    name.classList.toggle('nameArea');
    user.classList.toggle('user');
    quest.classList.add('minusQuest');
    minus.classList.add('minus');
    text.classList.add('minusText');
    count.classList.add('minusCount');
    name.classList.add('minusName');
    user.classList.add('minusUser');
  }

  changeStyles({ target }) {
    const { question } = this.props;
    const object = {
      quest: document.querySelector('.minusQuest'),
      minus: document.querySelector('.minus'),
      text: document.querySelector('.minusText'),
      count: document.querySelector('.minusCount'),
      name: document.querySelector('.minusName'),
      user: document.querySelector('.minusUser'),
    };
    const objectMinus = {
      quest: document.querySelector('.questionForm'),
      minus: document.querySelector('.form'),
      text: document.querySelector('.textarea'),
      count: document.querySelector('.count'),
      name: document.querySelector('.nameArea'),
      user: document.querySelector('.user'),
    };
    if (question.length === 0) {
      if (object.quest) {
        this.changeStylesTop(object);
      } else {
        this.changeStylesBottom(objectMinus);
      }
    }
  }

  changeStyleKeyPressed() {
    const object = {
      quest: document.querySelector('.minusQuest'),
      minus: document.querySelector('.minus'),
      text: document.querySelector('.minusText'),
      count: document.querySelector('.minusCount'),
      name: document.querySelector('.minusName'),
      user: document.querySelector('.minusUser'),
    };
    if (object.quest) {
      this.changeStylesTop(object);
    }
  }

  render() {
    const { func, name, question, onSend } = this.props;
    return (
      <div className="minusQuest">
        <h1 className="h1">Ask the speaker</h1>
        <form>
          <div className="minus">
            <TextArea
              func={ func }
              value={ question }
              click={ this.changeStyles }
              keyPress={ this.changeStyleKeyPressed }
            />
            <NameArea func={ func } value={ name } onSend={ onSend } />
          </div>
        </form>
      </div>
    );
  }
}

QuestionForm.propTypes = {
  name: PropTypes.string,
  question: PropTypes.string,
  func: PropTypes.func,
  onSend: PropTypes.func,
};

QuestionForm.defaultProps = {
  name: '',
  question: '',
  func: '',
  onSend: '',
};

export default QuestionForm;
