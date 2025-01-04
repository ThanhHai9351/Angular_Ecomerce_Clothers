import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IAccount } from '@app/core/model/model';
import { AccountService } from '@app/core/services/account.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [ButtonModule, OverlayPanelModule, RouterLink, RouterLinkActive],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'], 
  providers: [MessageService],
})
export class AvatarComponent implements OnInit {
  user: IAccount = {} as IAccount;

  constructor(
    private accountService: AccountService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getMe();
  }

  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  getMe(): void {
    if (typeof localStorage === 'undefined') {
      this.showError('localStorage is not available.');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) {
      this.showError('Access token is missing.');
      return;
    }

    this.accountService.getMe(token).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.user = response.data as IAccount;
        }
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Network error occurred.';
        this.showError(errorMessage);
      },
    });
  }
}
