import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
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
      onInputChange,
      isSaveButtonDisabled,
      onSaveButtonClick,
    } = this.props;
    return (
      <form onSubmit={ onSaveButtonClick }>
        <div className="input-group mb-2 row">
          <div className="col-5">
            <label htmlFor="cardName" className="form-label input-100 text-start">
              Card Name
              <input
                type="text"
                name="cardName"
                id="cardName"
                className="form-control"
                value={ cardName }
                onChange={ onInputChange }
                data-testid="name-input"
              />
            </label>
          </div>
          <div className="col-7">
            <label htmlFor="cardImage" className="form-label input-100 text-start">
              Image Url
              <input
                type="text"
                name="cardImage"
                id="cardImage"
                className="form-control"
                value={ cardImage }
                onChange={ onInputChange }
                data-testid="image-input"
              />
            </label>
          </div>
        </div>
        <div className="input-group mb-2 row">
          <div className="col-12">
            <label htmlFor="cardDescription" className="form-label input-100 text-start">
              Description
              <input
                type="textarea"
                name="cardDescription"
                id="cardDescription"
                className="form-control"
                value={ cardDescription }
                onChange={ onInputChange }
                data-testid="description-input"
              />
            </label>
          </div>
        </div>
        <div className="input-group mb-2 row">
          <div className="col-2">
            <label htmlFor="cardAttr1" className="form-label input-100 text-start">
              Attack
              <input
                type="number"
                name="cardAttr1"
                id="cardAttr1"
                className="form-control"
                value={ cardAttr1 }
                onChange={ onInputChange }
                data-testid="attr1-input"
              />
            </label>
          </div>
          <div className="col-2">
            <label htmlFor="cardAttr2" className="form-label input-100 text-start">
              Defense
              <input
                type="number"
                name="cardAttr2"
                id="cardAttr2"
                className="form-control"
                value={ cardAttr2 }
                onChange={ onInputChange }
                data-testid="attr2-input"
              />
            </label>
          </div>
          <div className="col-2">
            <label htmlFor="cardAttr3" className="form-label input-100 text-start">
              HP
              <input
                type="number"
                name="cardAttr3"
                id="cardAttr3"
                className="form-control"
                value={ cardAttr3 }
                onChange={ onInputChange }
                data-testid="attr3-input"
              />
            </label>
          </div>
          <label htmlFor="cardRare" className="form-label col-6 text-start">
            Rarity
            <select
              name="cardRare"
              id="cardRare"
              className="form-select"
              value={ cardRare }
              data-testid="rare-input"
              onChange={ onInputChange }
            >
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito raro</option>
            </select>
          </label>
        </div>
        <div className="input-group mb-2 row">
          <div className="col-12">
            { hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p>
              : (
                <label htmlFor="cardAttr3" className="form-label input-100 text-start">
                  <input
                    type="checkbox"
                    name="cardTrunfo"
                    id="cardTrunfo"
                    className="form-check-input me-2"
                    checked={ cardTrunfo }
                    onChange={ onInputChange }
                    data-testid="trunfo-input"
                  />
                  Check this box if card is a Super Trunfo
                </label>)}
          </div>
        </div>
        <div className="input-group mb-2 row justify-content-center">
          <div className="col-12">
            <button
              disabled={ isSaveButtonDisabled }
              type="submit"
              data-testid="save-button"
              className={ `btn mb-4
              btn-md btn-${isSaveButtonDisabled ? 'secondary' : 'success'} input-100` }
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
