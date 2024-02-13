import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import ComponentsModule from './components/components.module';
import AppComponent from './app.component';

angular.module('myApp', [
  uiRouter,
  ComponentsModule,
])
.config(($stateProvider, $urlRouterProvider) => {
  const states = [{
    name: 'home',
    url: '',
    template: '<home></home>',
  }];
  states.forEach((state) => {
    $stateProvider.state(state);
  });
  $urlRouterProvider.when('/', ['$state', '$match', ($state) => {
    $state.go('home');
  }]);
})
.component('app', AppComponent);
