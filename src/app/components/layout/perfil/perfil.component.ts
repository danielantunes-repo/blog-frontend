import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PostService } from '../../../services/post.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-perfil',
  imports: [
    MatSidenavModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'], // Corrigido para styleUrls
})
export class PerfilComponent {
  postCountData: any[] = []; // Dados que serão exibidos
  isLoading: boolean = true;
  displayedColumns: string[] = ['id', 'count', 'name', 'username'];
  totalPosts: number = 0;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadTotalPosts();
    this.loadPostCount();
  }

  loadTotalPosts(): void {
    this.postService.getTotalPosts().subscribe({
      next: (data) => {
        this.totalPosts = data;
      },
      error: (err) => {
        console.error('Erro ao carregar total de posts:', err);
      },
    });
  }

  loadPostCount(): void {
    this.postService.getPostCountByUser().subscribe(
      (data) => {
        this.postCountData = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar dados de contagem de posts', error);
        this.isLoading = false;
      }
    );
  }

  objectKeys(obj: { [key: string]: number }): string[] {
    return Object.keys(obj);
  }
}
