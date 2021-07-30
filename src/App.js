import React from 'react';

import Dog from './components/Dog';
import Loading from './components/Loading';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      dogImage: undefined,
      dogName: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.retrieveFromLocalStorage = this.retrieveFromLocalStorage.bind(this);
    this.fetchDog = this.fetchDog.bind(this);
  }

  componentDidMount() {
    if (!this.retrieveFromLocalStorage()) this.fetchDog();
  }

  shouldComponentUpdate(_, { dogImage }) {
    console.log(dogImage);
    if (!dogImage) return true;
    return !dogImage.includes('terrier');
  }

  handleClick() {
    this.fetchDog();
  }

  handleInput({ target }) {
    this.setState({
      dogName: target.value,
    });
  }

  saveDog() {
    const { dogImage, dogName } = this.state;
    localStorage.setItem('doguinho', JSON.stringify({ dogName, dogImage }));
  }

  retrieveFromLocalStorage() {
    const savedInfo = JSON.parse(localStorage.getItem('doguinho'));

    console.log(savedInfo);

    if (savedInfo) {
      this.setState({
        dogImage: savedInfo.dogImage,
        dogName: savedInfo.dogName,
      });

      return true;
    }

    return false;
  }

  async fetchDog() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();

    this.setState({
      dogImage: data.message,
    });
  }

  render() {
    const { dogImage, dogName } = this.state;

    if (!dogImage) return <Loading />;

    return (
      <div className="App">
        <Dog dogImage={ dogImage } />
        <input
          type="text"
          value={ dogName }
          maxLength="20"
          onChange={ this.handleInput }
        />
        <button type="button" onClick={ this.saveDog }>
          Dar nome ao doguinho
        </button>
        <button type="button" onClick={ this.handleClick }>
          Doguinho aleatório
        </button>
      </div>
    );
  }
}

export default App;
