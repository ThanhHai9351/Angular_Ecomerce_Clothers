import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '@app/core/services/account.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { IAccount } from '@app/core/model/model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  user: IAccount | null = null;

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message
    });
  }

  login() {
    if (!this.email || !this.password) {
      this.showError('Email and password not empty!');
      return;
    }

    this.accountService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.getMe(response.accessToken);
          this.showSuccess('Login successfully!');
          setTimeout(()=>{
            this.router.navigate(['/']);
          },1500)
        } else {
          this.showError('Login fail! Please to check information again!');
        }
      },
      error: () => {
        this.showError('Network error!');
      }
    });
  }

   getMe(accessToken: string): void {
      this.accountService.getMe(accessToken).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.authService.setUser(response.data as IAccount)
          }
        },
        error: (err) => {
          const errorMessage = err?.error?.message || 'Network error occurred.';
          this.showError(errorMessage);
        },
      });
    }
}
