import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  userForm!: FormGroup;

  constructor(
    private service: RegisterService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required], // Corrigido aqui
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  createPost() {
    if (this.userForm.valid) {
      const data = this.userForm.value;
      this.service.register(data).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['login']);
        },
        error: (error) => {
          console.error('Error:', error);
          alert('An error occurred during registration. Please try again.');
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
