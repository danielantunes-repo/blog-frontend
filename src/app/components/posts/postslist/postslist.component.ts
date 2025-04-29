import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { Post } from '../../../models/post';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PostService } from '../../../services/post.service';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-postslist',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    RouterLink,
    MatDialogModule,
  ],
  templateUrl: './postslist.component.html',
  styleUrl: './postslist.component.scss',
})
export class PostslistComponent implements OnInit {
  @Input() post?: { texto: string };
  posts: Post[] = [];
  edit: number | null = null;

  userId: number | null = null;

  constructor(
    private postService: PostService,
    public loginService: LoginService
  ) {}

  get truncatedTexto(): string {
    if (!this.post || !this.post.texto) {
      return '';
    }
    const palavras = this.post.texto.split(' ');
    return palavras.length > 300
      ? palavras.slice(0, 300).join(' ') + '...'
      : this.post.texto;
  }

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    this.postService.getAllPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  editPost(postId: number): void {
    this.edit = postId;
  }

  deleteById(post: Post) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar esse post?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(post.id).subscribe({
          next: (value) => {
            Swal.fire({
              title: 'Deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'ok',
            });
            this.ngOnInit();
          },
          error: (erro) => {
            Swal.fire({
              title: 'Ocorreu um erro',
              icon: 'error',
              confirmButtonText: 'ok',
            });
          },
        });
      }
    });
  }
}
