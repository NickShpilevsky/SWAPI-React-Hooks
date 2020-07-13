import React from 'react';
import { connect } from 'react-redux';

import HeroCard from '../HeroCard';

const List = ({ heroesList }) => (
    <React.Fragment>
      {
        heroesList.map(hero => (
          <HeroCard
            key={hero.name}
            name={heroesList.length}
            gender={hero.gender}
            films={hero.films}
          />
        ))
      }
    </React.Fragment>
  );

export default connect(store => ({ heroesList: store.allHeroes }))(List);