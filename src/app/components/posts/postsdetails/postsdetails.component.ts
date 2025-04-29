import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Post } from '../../../models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-postsdetails',
  imports: [
    FormsModule,
    MatDivider,
    MatCardModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './postsdetails.component.html',
  styleUrls: ['./postsdetails.component.scss'],
})
export class PostsdetailsComponent implements OnInit {
  post: Post | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    if (postId) {
      this.postService.getPostById(postId).subscribe({
        next: (post) => {
          this.post = post;
        },
        error: (err) => {
          console.error('Erro ao carregar o post:', err);
        },
      });
    }
  }
}
