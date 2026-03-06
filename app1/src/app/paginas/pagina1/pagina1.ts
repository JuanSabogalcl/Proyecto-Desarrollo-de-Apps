import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina1',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagina1.html',
  styleUrl: './pagina1.css',
})
export class Pagina1 {

  nombre: string = 'Juan';

  cambiarNombre() {
    if (this.nombre === 'Juan') {
      this.nombre = 'Pedro';
    } else {
      this.nombre = 'Juan';
    }
  }
}
