import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pagina1 } from './paginas/pagina1/pagina1';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Pagina1],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app1');
}
