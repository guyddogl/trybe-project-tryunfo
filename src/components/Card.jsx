import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
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
    } = this.props;
    const cssClass = cardTrunfo || cardRare.replaceAll(' ', '-');
    return (
      <center>
        <div className="col mb-2">
          <div className={ `card mt-2 bg-${cssClass}` }>
            <img
              data-testid="image-card"
              src={ cardImage }
              alt={ cardName }
              className="card-img-top"
            />
            <div className="card-body">
              <h6
                data-testid="name-card"
                className="card-title text-center"
              >
                { cardName }
              </h6>
              <span
                className="card-text"
                data-testid="description-card"
              >
                { cardDescription }
              </span>
              <p className="card-text attr mt-2" data-testid="attr1-card">
                { `Attack .............................................. ${cardAttr1}` }
              </p>
              <p className="card-text attr" data-testid="attr2-card">
                { `Defense ........................................... ${cardAttr2}` }
              </p>
              <p className="card-text attr" data-testid="attr3-card">
                { `HP .................................................... ${cardAttr3}` }
              </p>
              <p
                className="card-text text-center bg-dark rounded-2"
                data-testid="rare-card"
              >
                { cardRare }
                { cardTrunfo && <span data-testid="trunfo-card"> (Super Trunfo)</span> }
              </p>
            </div>
          </div>
        </div>
      </center>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
