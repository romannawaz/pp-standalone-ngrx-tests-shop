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

import { Subject, takeUntil } from 'rxjs';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '@services/auth/auth.service';

const Material = [MatInputModule, MatIconModule, MatButtonModule];

interface FormRegister {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...Material],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject<boolean>();

  /**
   * To prevent error state after submit
   */
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;
  registerForm!: FormGroup<FormRegister>;

  showPassword = false;

  isRequestSucceeded: boolean | null = null;

  constructor(
    private authService: AuthService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.registerForm = this._createRegisterForm();
  }

  ngOnDestroy(): void {
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

  get controls(): FormRegister {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    if (!this.registerForm.valid) return;

    this.authService
      .register(this.registerForm.getRawValue())
      .pipe(takeUntil(this._destroyed$))
      .subscribe({
        next: () => {
          this.registerForm.reset();
          this.formGroupDirective.resetForm();

          this.isRequestSucceeded = true;
        },
        error: () => {
          this.isRequestSucceeded = false;
        },
      });
  }

  private _createRegisterForm(): FormGroup<FormRegister> {
    return this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
    });
  }
}
