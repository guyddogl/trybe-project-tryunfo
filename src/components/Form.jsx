import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <input
          type="text"
          name="cardName"
          id="cardName"
          data-testid="name-input"
        />
        <input
          type="textarea"
          name="cardDescription"
          id="descrcardDescriptioniption"
          data-testid="description-input"
        />
        <input
          type="number"
          name="cardAttr1"
          id="cardAttr1"
          data-testid="attr1-input"
        />
        <input
          type="number"
          name="cardAttr2"
          id="cardAttr2"
          data-testid="attr2-input"
        />
        <input
          type="number"
          name="cardAttr3"
          id="cardAttr3"
          data-testid="attr3-input"
        />
        <input
          type="text"
          name="cardImage"
          id="cardImage"
          data-testid="image-input"
        />
        <select
          name="cardRare"
          id="cardRare"
          data-testid="rare-input"
        >
          <option value="normal">normal</option>
          <option value="raro">raro</option>
          <option value="muito raro">muito raro</option>
        </select>
        <input
          type="checkbox"
          name="cardTrunfo"
          id="cardTrunfo"
          data-testid="trunfo-input"
        />
        <button
          type="submit"
          data-testid="save-button"
        >
          Salvar
        </button>
      </form>
    );
  }
}

export default Form;
