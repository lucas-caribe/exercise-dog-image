import React from 'react';
import PropTypes from 'prop-types';

class Dog extends React.Component {
  render() {
    const { dogImage } = this.props;

    return (
      <div>
        <img src={ dogImage } alt="doguinho" />
      </div>
    );
  }
}

Dog.propTypes = {
  dogImage: PropTypes.string.isRequired,
};

export default Dog;
