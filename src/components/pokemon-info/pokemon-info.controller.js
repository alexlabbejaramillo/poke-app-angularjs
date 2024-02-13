class PokemonInfoController {

  constructor(PokemonService) {
    this.pokemonService = PokemonService;
    this.loading = true;
    this.pokemon = {};
  }

  $onChanges(changes) {
    if (changes.pokeName) {
      this.getPokemon();
    }
  }

  getPokemon() {
    this.pokemonService.getPokemonByName(this.pokeName).then((data) => {
      this.pokemon = data;
      this.loading = false;
    });
  }

  calculateWidthBar(stat) {
    const numMayor = this.pokemon.stats.sort((a, b) => b.base_stat - a.base_stat)[0].base_stat;
    return `${(stat * 100) / numMayor}%`;
  }
}

export default PokemonInfoController;
