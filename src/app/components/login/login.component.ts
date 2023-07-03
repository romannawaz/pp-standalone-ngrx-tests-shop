import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { first } from 'rxjs';

import { AuthService } from '@services/auth/auth.service';
import { LoginData } from '@services/auth/auth.interface';
import { AuthFacade } from '../../state/auth/auth.facade';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const Material = [MatIconModule, MatInputModule, MatButtonModule];

export interface FormLogin {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...Material],
  providers: [AuthService, AuthFacade],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * To prevent error state after submit
   */
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;
  loginForm: FormGroup<FormLogin> = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  showPassword = false;

  constructor(
    public authFacade: AuthFacade,
    private fb: NonNullableFormBuilder
  ) {}

  get controls(): FormLogin {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;

    const loginData: LoginData = this.loginForm.getRawValue();

    this.authFacade.login(loginData);
    this.authFacade.loggedSuccess$.pipe(first()).subscribe(() => {
      this.loginForm.reset();
      this.formGroupDirective.resetForm();
    });
  }
}
