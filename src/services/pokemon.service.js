class PokemonService {

  constructor($http) {
    'ngInject';

    this.$http = $http;
    this.urlApi = 'https://pokeapi.co/api/v2/pokemon';
  }

  getPokemons(offset = 0, limit = 10) {
    return this.$http
      .get(`${this.urlApi}?limit=${limit}&offset=${offset}`)
      .then(res => res.data)
      .catch(() => {
        throw new Error('Error fetching data');
      });
  }

  getPokemonByName(name) {
    return this.$http
      .get(`${this.urlApi}/${name}`)
      .then(res => res.data)
      .catch(() => {
        throw new Error('Error fetching data');
      });
  }
}

export default PokemonService;
