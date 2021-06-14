import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

class NameArea extends React.Component {
  render() {
    const { func, value, onSend } = this.props;
    const profile = <FontAwesomeIcon icon={ faUser } />;
    return (
      <div className="minusName">
        <div className="person">
          {profile}
        </div>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your name"
            onChange={ func }
            value={ value }
          />
        </label>
        <button type="button" id="sendButton" onClick={ onSend }>Send</button>
      </div>
    );
  }
}

NameArea.propTypes = {
  value: PropTypes.string,
  func: PropTypes.func,
  onSend: PropTypes.func,
};

NameArea.defaultProps = {
  value: '',
  func: '',
  onSend: '',
};

export default NameArea;
