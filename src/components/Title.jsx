import React from 'react';
import PropTypes from 'prop-types';

class Title extends React.Component {
  render() {
    const { icon, text } = this.props;
    return (
      <div className="row my-3">
        <h4>
          <i className={ `${icon} me-2` } />
          <strong>{ text }</strong>
        </h4>
      </div>
    );
  }
}

Title.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Title;
