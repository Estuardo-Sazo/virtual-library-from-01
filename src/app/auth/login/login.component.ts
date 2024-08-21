import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    emailFormControl: new FormControl(),
    passwordFormControl: new FormControl(),
  });

  submitted = false;
  errorLogin = false;
  

  constructor(
    private authService: AuthService,
    private formBilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBilder.group({
      emailFormControl: ['', [Validators.email, Validators.required]],
      passwordFormControl: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorLogin = false;
    const { emailFormControl, passwordFormControl } = this.form.value;

    this.authService.login(emailFormControl, passwordFormControl).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        this.errorLogin = true;
      },
    });
  }
}
