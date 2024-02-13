class PokemonResumenController {

  constructor(PokemonService) {
    this.pokemonService = PokemonService;
    this.loading = true;
    this.resumen = [];
    this.abecedario = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  }

  $onInit() {
    this.getResumen();
  }

  getResumen() {
    this.loading = true;
    this.pokemonService.getPokemons(0, 100000).then((data) => {
      this.resumen = this.abecedario.map(letra => ({
        letra,
        cantidad: data.results.filter(pokemon => pokemon.name.toUpperCase().startsWith(letra)).length
      }));
      this.loading = false;
    });
  }
}

export default PokemonResumenController;
