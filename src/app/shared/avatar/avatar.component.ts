import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IAccount } from '@app/core/model/model';
import { AuthService } from '@app/core/services/auth.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [ButtonModule, OverlayPanelModule, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'], 
  providers: [MessageService],
})
export class AvatarComponent implements OnInit {
  user: IAccount | null = null;

  constructor(  
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  logout():void {
    localStorage.removeItem('accessToken');
    this.user = null;
  }
}
