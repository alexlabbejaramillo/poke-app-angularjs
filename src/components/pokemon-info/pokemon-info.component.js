import template from './pokemon-info.component.html';
import controller from './pokemon-info.controller';

const PokemonInfoComponent = {
  bindings: {
    pokeName: '<'
  },
  template,
  controller
};

export default PokemonInfoComponent;
