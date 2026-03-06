import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../servicio/api';
import { PokemonListItem } from '../models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList implements OnInit {
  private readonly apiService = inject(ApiService);

  pokemons = signal<PokemonListItem[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  /** Extrae el id del pokemon desde la URL de la API (ej: .../pokemon/25/ -> 25). */
  getPokemonId(item: PokemonListItem): number {
    const parts = item.url.replace(/\/$/, '').split('/');
    const id = parts[parts.length - 1];
    return parseInt(id, 10) || 0;
  }

  ngOnInit(): void {
    this.apiService.getPokemons(20, 0).subscribe({
      next: (data) => {
        this.pokemons.set(data.results);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Error al cargar la lista');
        this.loading.set(false);
      },
    });
  }
}
