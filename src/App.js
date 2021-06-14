import { faComments, faPoll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import AnsweredList from './components/AnsweredList';
import AskQuestion from './components/AskQuestion';
// import QuestionForm from './components/QuestionForm';
// import QuestionsList from './components/QuestionsList';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      answeredList: [],
      question: '',
      name: '',
      atualizar: 0,
      id: 0,
      sortType: 'Order',
    };
    this.changeValue = this.changeValue.bind(this);
    this.onSend = this.onSend.bind(this);
    this.upVote = this.upVote.bind(this);
    this.sortByPopularity = this.sortByPopularity.bind(this);
    this.sortByOrder = this.sortByOrder.bind(this);
    this.filterAnswered = this.filterAnswered.bind(this);
  }

  async onSend() {
    const { question, name, id } = this.state;
    const stringCode = 16;
    const time = new Date().getMinutes();
    const randomNumber = 16777215;
    const completeQuestion = {
      name,
      question,
      vote: 0,
      time: new Date().getMinutes(),
      id,
      answered: false,
      randomColor: Math.floor(Math.random() * randomNumber).toString(stringCode),
    };
    if (question !== '') {
      await this.setState((previous) => ({
        questionList: [...previous.questionList, completeQuestion],
        name: '',
        question: '',
        id: completeQuestion.time - time,
      }));
    }
    this.filterAnswered();
    this.sort();
  }

  filterAnswered() {
    const { questionList } = this.state;
    const answeredList = questionList.filter((question) => (
      question.answered === true
    ));
    this.setState({
      answeredList,
    });
  }

  sortByPopularity() {
    const { questionList, sortType } = this.state;
    const sortedList = questionList.sort((a, b) => (
      b.vote - a.vote
    ));
    this.setState({
      questionList: sortedList,
      sortType: 'Popularity',
    });
  }

  sortByOrder() {
    const { questionList, sortType } = this.state;
    const sortedList = questionList.sort((a, b) => (a.id - b.id));
    this.setState({
      questionList: sortedList,
      sortType: 'Order',
    });
  }

  async upVote() {
    const { sortType } = this.state;
    if (sortType === 'Order') {
      this.sortByOrder();
    } else {
      this.sortByPopularity();
    }
    await this.setState((previous) => ({
      atualizar: previous.atualizar + 1,
    }));
  }

  changeBorder({ target }) {
    const bottomLine = document.querySelector('.bottom-line');
    if (target.innerHTML.includes('Questions')) {
      bottomLine.style.transform = 'translateX(0px)';
    } else {
      bottomLine.style.transform = 'translateX(189px)';
    }
  }

  changeValue({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  sort() {
    const { sortType } = this.state;
    if (sortType === 'Order') {
      this.sortByOrder();
    } else {
      this.sortByPopularity();
    }
  }

  render() {
    const comments = <FontAwesomeIcon icon={ faComments } />;
    const poll = <FontAwesomeIcon icon={ faPoll } />;
    const { question, name, questionList, answeredList, sortType } = this.state;
    return (
      <BrowserRouter>
        <header className="header">
          <div className="header-options" aria-hidden="true">
            <span className="bottom-line" />
            <Link to="/" className="link">
              <button type="button" onClick={ this.changeBorder } className="span">
                { comments }
                Questions
              </button>
            </Link>
            <Link to="/answered" className="link">
              <button type="button" onClick={ this.changeBorder } className="span">
                { poll }
                Answered
              </button>
            </Link>
          </div>
        </header>
        <Route
          path="/answered"
        >
          <AnsweredList
            questions={ answeredList }
            upVote={ this.upVote }
            func={ this.filterAnswered }
          />
        </Route>
        <Route path="/" exact>
          <AskQuestion
            func={ this.changeValue }
            filter={ this.filterAnswered }
            name={ name }
            question={ question }
            onSend={ this.onSend }
            questions={ questionList }
            upVote={ this.upVote }
            sortPop={ this.sortByPopularity }
            sortOrd={ this.sortByOrder }
            sortType={ sortType }
          />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
