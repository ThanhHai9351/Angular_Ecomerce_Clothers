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
import { Router } from '@angular/router';

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
    CardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
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
      this.showError('Email và Password không được để trống');
      return;
    }

    this.accountService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.showSuccess('Login thành công!');
          setTimeout(()=>{
            this.router.navigate(['/']);
          },1500)
        } else {
          this.showError('Sai tài khoản hoặc mật khẩu!');
        }
      },
      error: () => {
        this.showError('Mạng lỗi');
      }
    });
  }
}
