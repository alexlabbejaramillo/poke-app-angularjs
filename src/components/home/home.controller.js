class HomeController {

  constructor(PokemonService, $q) {
    this.$q = $q;

    this.pokemonService = PokemonService;
    this.loading = true;
    this.linksPage = {
      next: null,
      previous: null
    };
    this.pokemons = [];
    this.pokemonsDisplayed = [];
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
      totalPages: 0,
      pagesToDisplay: 10
    };
    this.textSearch = '';
    this.pokeSelected = null;
    this.autoComplete = {
      options: [],
      display: false
    };
  }

  $onInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.loading = true;
    this.pokemonService.getPokemons(0, 100000).then((data) => {
      this.pokemons = data.results;
      this.pagination.totalItems = data.count;
      this.pagination.totalPages = Math.ceil(data.count / this.pagination.itemsPerPage);
      this.updateDisplayedItems();
    });
  }

  updateDisplayedItems() {
    const startIndex = (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    const endIndex = Math.min(startIndex + this.pagination.itemsPerPage, this.pagination.totalItems);
    const promises = this.pokemons.slice(startIndex, endIndex).map(pokemon => this.pokemonService.getPokemonByName(pokemon.name).then((_data) => {
      pokemon.image1 = _data.sprites.other.dream_world.front_default;
      pokemon.image2 = _data.sprites.front_default;
      pokemon.types = _data.types.map(type => type.type.name);
      return pokemon;
    }));
    this.$q.all(promises).then((result) => {
      this.pokemonsDisplayed = result;
      this.loading = false;
    });
  }

  setCurrentPage(page) {
    if (page >= 1 && page <= this.pagination.totalPages) {
      this.pagination.currentPage = page;
      this.updateDisplayedItems();
    }
  }

  startIndexPage() {
    if (this.pagination.currentPage > ((this.pagination.pagesToDisplay / 2) + 1)) {
      if ((this.pagination.currentPage + Math.ceil(this.pagination.pagesToDisplay / 2)) > this.pagination.totalPages) {
        return this.pagination.totalPages - (this.pagination.pagesToDisplay + 1);
      }
      return this.pagination.currentPage - Math.ceil(this.pagination.pagesToDisplay / 2);
    }
    return 1;
  }

  rangePagesNumbers() {
    const numbers = [];
    for (let i = 1; i <= parseInt(this.pagination.pagesToDisplay); i++) {
      numbers.push(i);
    }
    return numbers;
  }

  searchPokemon() {
    this.loading = true;
    const totalSearch = this.pokemons.filter(pokemon => pokemon.name.includes(this.textSearch));
    const promises = totalSearch.slice(0, 10)
        .map(pokemon => this.pokemonService.getPokemonByName(pokemon.name).then((_data) => {
          pokemon.image1 = _data.sprites.other.dream_world.front_default;
          pokemon.image2 = _data.sprites.front_default;
          pokemon.types = _data.types.map(type => type.type.name);
          return pokemon;
        }));
    this.$q.all(promises).then((result) => {
      const pagesToDisplay = totalSearch.length > 0 ? Math.ceil(totalSearch.length / this.pagination.itemsPerPage) : 1;
      this.pagination.pagesToDisplay = pagesToDisplay > this.pagination.pagesToDisplay ? 10 : pagesToDisplay;
      this.pagination.totalPages = Math.ceil(totalSearch.length / this.pagination.itemsPerPage);
      this.pagination.currentPage = 1;
      this.pokemonsDisplayed = result;
      this.loading = false;
    });
  }
}

export default HomeController;
