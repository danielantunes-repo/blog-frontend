import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  postForm!: FormGroup;

  constructor(
    private service: PostService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.postForm = this.fb.group({
      titulo: [null, Validators.required],
      texto: [null, Validators.required],
    });
  }

  goToposts() {
    this.router.navigate(['admin/posts']);
  }

  createPost() {
    if (this.postForm.valid) {
      const data = this.postForm.value;
      this.service.createPost(data).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['admin/posts']);
        },
        error: (error) => {
          if (error.status === 409) {
            alert('Já existe um post com o mesmo título e conteúdo.');
          } else {
            console.error('Error:', error);
            alert('Ocorreu um erro ao criar o post. Tente novamente.');
          }
        },
      });
    } else {
      alert('Por favor, preencha o formulário corretamente.');
    }
  }
}
