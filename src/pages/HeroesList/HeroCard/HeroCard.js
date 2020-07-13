import React, {PureComponent} from 'react';

class HeroCard extends PureComponent {
  render() {
    // const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld, vehicles, films } = this.props;
    const { name, gender, films } = this.props;
    return(
      <div>
        <p>{name}</p>
        <p>{gender}</p>
        <p>{films.map((item) => {
          return item;
        })}</p>
      </div>
    )
  }
}

export default HeroCard;