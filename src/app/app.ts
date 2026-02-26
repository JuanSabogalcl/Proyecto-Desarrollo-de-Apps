import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  nuevaTarea: string = '';
  listaTareas: string[] = [];

  agregarTarea() {

    if (this.nuevaTarea.trim() === '') {
      alert('Por favor escribe una tarea');
      return;
    }

    this.listaTareas.push(this.nuevaTarea);
    this.nuevaTarea = '';
  }
}
