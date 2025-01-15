import { Injectable } from '@angular/core';
import { IAccount } from '@app/core/model/model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<IAccount | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: IAccount | null): void {
    this.userSubject.next(user);
  }

  clearUser(): void {
    this.userSubject.next(null);
  }

  getUser(): IAccount | null {
    return this.userSubject.getValue();
  }
}
