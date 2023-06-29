import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';

import { Subject, takeUntil } from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth/auth.service';
import { authActions } from '../../state/auth/auth.action';

const Material = [MatIconModule, MatInputModule, MatButtonModule];

export interface FormLogin {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...Material],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject<boolean>();

  /**
   * To prevent error state after submit
   */
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;
  loginForm!: FormGroup<FormLogin>;

  showPassword = false;

  constructor(
    private store: Store,
    private fb: NonNullableFormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._createLoginForm();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  get controls(): FormLogin {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;

    this.authService
      .login(this.loginForm.getRawValue())
      .pipe(takeUntil(this._destroyed$))
      .subscribe((tokens) => {
        this.loginForm.reset();
        this.formGroupDirective.resetForm();

        this.store.dispatch(authActions.loggedSuccess(tokens));
      });
  }

  private _createLoginForm(): FormGroup<FormLogin> {
    return this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }
}
