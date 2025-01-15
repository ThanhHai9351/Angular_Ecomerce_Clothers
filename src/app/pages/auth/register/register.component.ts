import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '@app/core/services/account.service';
@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ToastModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService],
})
export class RegisterComponent {
  firstName: string = '';
  email: string = '';
  password: string = '';
  lastName: string = '';
  repassword: string = '';

  constructor(
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router
  ) {}

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  register() {
    if (
      !this.email ||
      !this.password ||
      !this.firstName ||
      !this.lastName ||
      !this.repassword
    ) {
      this.showError('All field not empty!');
      return;
    }
    if (this.password !== this.repassword) {
      this.showError('Password not match!');
      return;
    }

    const data = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      role: 'customer',
    };

    this.accountService.register(data).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.showSuccess('register successfully!');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.showError('Register failed! Please to check information again!');
        }
      },
      error: () => {
        this.showError('Network error!');
      },
    });
  }
}
