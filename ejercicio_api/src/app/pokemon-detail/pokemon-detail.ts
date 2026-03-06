import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../servicio/api';
import { PokemonDetail as PokemonDetailModel } from '../models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  pokemon = signal<PokemonDetailModel | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  imageUrl = computed(() => {
    const p = this.pokemon();
    if (!p?.sprites) return null;
    return (
      p.sprites.other?.['official-artwork']?.front_default ??
      p.sprites.front_default
    );
  });

  types = computed(() => {
    const p = this.pokemon();
    return p?.types?.map((t) => t.type.name) ?? [];
  });

  stats = computed(() => {
    const p = this.pokemon();
    return p?.stats ?? [];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }
    const numId = Number(id);
    if (Number.isNaN(numId)) {
      this.apiService.getPokemonByName(id).subscribe({
        next: (data) => {
          this.pokemon.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err?.message ?? 'Error al cargar el pokemon');
          this.loading.set(false);
        },
      });
      return;
    }
    this.apiService.getPokemonById(numId).subscribe({
      next: (data) => {
        this.pokemon.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err?.message ?? 'Error al cargar el pokemon');
        this.loading.set(false);
      },
    });
  }
}
