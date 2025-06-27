import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SafeForm } from "./safe-form/safe-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SafeForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
