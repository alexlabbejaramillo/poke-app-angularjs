import angular from 'angular';

import PokemonService from './pokemon.service';

const ServicesModule = angular
  .module('app.services', [])
  .service('PokemonService', PokemonService)
  .name;

export default ServicesModule;
