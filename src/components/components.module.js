import angular from 'angular';

import ServicesModule from '../services/services.module';

import HomeComponent from './home/home.component';
import PokemonInfoComponent from './pokemon-info/pokemon-info.component';
import CapitalizeFilter from './pokemon-info/capitalize.filter';
import PokemonResumenComponent from './pokemon-resumen/pokemon-resumen.component';

const ComponentsModule = angular
  .module('app.components', [
    ServicesModule
  ])
  .component('home', HomeComponent)
  .component('pokemonInfo', PokemonInfoComponent)
  .component('pokemonResumen', PokemonResumenComponent)
  .filter('capitalize', CapitalizeFilter)
  .name;

export default ComponentsModule;
