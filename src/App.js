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
      cards: [],
      filterRare: '',
      filterName: '',
      filterTrunfo: false,
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

  deleteCard = (e) => {
    const { cards } = this.state;
    const { hasTrunfo } = cards.find((card) => card.name);
    const filterCard = cards.filter((card) => card.name !== e.target.id);
    this.setState({ cards: filterCard });
    if (hasTrunfo) this.setState({ hasTrunfo: false });
  }

  onSaveButtonClick = (e) => {
    e.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardTrunfo,
      cardRare,
    } = this.state;
    const newCard = {
      name: cardName,
      descripton: cardDescription,
      attr1: cardAttr1,
      attr2: cardAttr2,
      attr3: cardAttr3,
      image: cardImage,
      rare: cardRare,
      hasTrunfo: cardTrunfo,
    };
    this.setState((prevState) => ({
      cards: [...prevState.cards, newCard],
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: prevState.hasTrunfo === true ? true : cardTrunfo,
    }));
  }

  filterCards = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

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
      cards,
      isSaveButtonDisabled,
      filterRare,
      filterName,
      filterTrunfo,
    } = this.state;

    const cardsFiltered = cards
      .filter((card) => (filterTrunfo ? card.hasTrunfo === true : card))
      .filter(({ name }) => name.includes(filterName))
      .filter(({ rare }) => (
        filterRare === 'todas' || !filterRare ? rare : rare === filterRare));

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
        <div>Todas as cartas:</div>
        <input
          type="text"
          name="filterName"
          data-testid="name-filter"
          onChange={ (e) => { this.filterCards(e); } }
          disabled={ filterTrunfo }
        />
        <input
          type="checkbox"
          name="filterTrunfo"
          data-testid="trunfo-filter"
          onChange={ (e) => { this.filterCards(e); } }
        />
        <select
          name="filterRare"
          data-testid="rare-filter"
          onChange={ (e) => { this.filterCards(e); } }
          disabled={ filterTrunfo }
        >
          <option value="todas" selected>Todas</option>
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
        </select>
        {
          cardsFiltered.map((card, index) => (
            <div key={ index }>
              <Card
                key={ card.name }
                cardName={ card.name }
                cardDescription={ card.descripton }
                cardAttr1={ card.attr1 }
                cardAttr2={ card.attr2 }
                cardAttr3={ card.attr3 }
                cardImage={ card.image }
                cardRare={ card.rare }
                cardTrunfo={ card.hasTrunfo }
                deleteCard={ this.deleteCard }
              />
              <button
                id={ card.name }
                type="button"
                data-testid="delete-button"
                onClick={ this.deleteCard }
              >
                Excluir
              </button>
            </div>
          ))
        }
      </div>
    );
  }
}

export default App;
