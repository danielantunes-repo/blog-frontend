import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-post',
  imports: [
    MatButton,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  postForm!: FormGroup;
  postId!: number;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      titulo: [null, Validators.required],
      texto: [null, Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
      this.loadPostData(this.postId);
    });
  }

  goToposts() {
    this.router.navigate(['admin/posts']);
  }

  loadPostData(id: number): void {
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.postForm.patchValue(post);
      },
      error: (error) => {
        console.error('Error loading post:', error);
        alert('Unable to load the post data.');
      },
    });
  }

  updatePost(): void {
    if (this.postForm.valid) {
      const updatedPost: Post = this.postForm.value;

      this.postService.editPost(updatedPost, this.postId).subscribe({
        next: () => {
          this.router.navigate(['/admin/posts']); // Redireciona para a lista de posts!!
        },
        error: (error) => {
          console.error('Error updating post:', error);
          alert('An error occurred while updating the post.');
        },
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
