import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
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

  validateTextInputs = ({ cardName, cardDescription, cardImage } = this.state) => {
    const arrayInputs = [cardName, cardDescription, cardImage];
    return arrayInputs.some((input) => input.length === 0);
  }

  validateAttributes = ({ cardAttr1, cardAttr2, cardAttr3 } = this.state) => {
    const arrayAttr = [Number(cardAttr1), Number(cardAttr2), Number(cardAttr3)];
    const maxAttribute = 90;
    const isInvalid = arrayAttr.some((attr) => attr < 0 || attr > maxAttribute);
    const maxTotalAttribute = 210;
    const sumAttributes = arrayAttr.reduce((acc, curr) => acc + curr) > maxTotalAttribute;
    return isInvalid || sumAttributes;
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
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
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
      <main className="container-fluid">
        <section className="row justify-content-center">
          <div className="col-11 col-md-4 mb-5 bg-white">
            <h1 className="my-4">
              <i
                className="fa-solid fa-code me-3"
              />
              <strong>Tryunfo</strong>
            </h1>
            <center>
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
            </center>
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
          <div className="col-11 col-md-8 bg-gray">
            <input
              type="text"
              name="filterName"
              data-testid="name-filter"
              className="form-control mt-2"
              placeholder="Filter by name"
              onChange={ (e) => { this.filterCards(e); } }
              disabled={ filterTrunfo }
            />
            <select
              name="filterRare"
              data-testid="rare-filter"
              className="form-select mt-2"
              onChange={ (e) => { this.filterCards(e); } }
              disabled={ filterTrunfo }
              defaultValue="todas"
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
            <label htmlFor="filterTrunfo" className="form-label mt-2">
              <input
                type="checkbox"
                name="filterTrunfo"
                className="form-check-input me-2"
                data-testid="trunfo-filter"
                onChange={ (e) => { this.filterCards(e); } }
              />
              Filter Super Trunfo
            </label>
            <div className="row row-cols-1 row-cols-md-3">
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
                    <center>
                      <button
                        id={ card.name }
                        type="button"
                        data-testid="delete-button"
                        className="btn btn-sm btn-danger my-1"
                        onClick={ this.deleteCard }
                      >
                        Excluir
                      </button>
                    </center>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default App;
