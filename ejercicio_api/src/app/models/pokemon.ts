/** Respuesta de la API al listar pokemons: GET /pokemon?limit=20 */
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

/** Detalle de un pokemon: GET /pokemon/:id */
export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: { front_default: string };
    };
  };
  types: Array<{ slot: number; type: { name: string; url: string } }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }>;
}
