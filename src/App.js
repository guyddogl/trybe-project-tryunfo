import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
    };
  }

  validateTextInputs = () => {
    const { cardName, cardDescription, cardImage } = this.state;
    const validateName = cardName.length === 0;
    const validateDescription = cardDescription.length === 0;
    const validateImage = cardImage.length === 0;
    const validateInputs = validateName || validateDescription || validateImage;
    return validateInputs;
  }

  validateAttributes = () => {
    const maxAttribute = 90;
    const minAttribute = 0;
    const maxTotalAttribute = 210;
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const attr1 = cardAttr1 < minAttribute || cardAttr1 > maxAttribute;
    const attr2 = cardAttr2 < minAttribute || cardAttr2 > maxAttribute;
    const attr3 = cardAttr3 < minAttribute || cardAttr3 > maxAttribute;
    const sumAttributes = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const totalAttributes = sumAttributes > maxTotalAttribute;
    const validateAttributes = attr1 || attr2 || attr3 || totalAttributes;
    return validateAttributes;
  }

  validateForm = () => this.validateTextInputs() || this.validateAttributes();

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, () => {
      this.setState({ isSaveButtonDisabled: this.validateForm() });
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
    } = this.state;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
        />
      </div>
    );
  }
}

export default App;
