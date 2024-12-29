import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from '@app/pages/auth/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-emcomerce-clother';
}
