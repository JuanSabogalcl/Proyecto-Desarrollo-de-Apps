import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PokemonListResponse,
  PokemonDetail,
} from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}


  getPokemons(limit = 20, offset = 0): Observable<PokemonListResponse> {
    const url = `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`;
    return this.http.get<PokemonListResponse>(url);
  }

  
  getPokemonById(id: number): Observable<PokemonDetail> {
    const url = `${this.baseUrl}/pokemon/${id}`;
    return this.http.get<PokemonDetail>(url);
  }

  
  getPokemonByName(name: string): Observable<PokemonDetail> {
    const url = `${this.baseUrl}/pokemon/${encodeURIComponent(name)}`;
    return this.http.get<PokemonDetail>(url);
  }
}
