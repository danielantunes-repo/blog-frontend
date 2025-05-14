import { Component, OnInit, ViewChild } from '@angular/core';
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
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
  Chart,
  registerables,
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    BaseChartDirective,
  ],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'], // Corrigido para styleUrls
})
export class PerfilComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: false }) chart:
    | BaseChartDirective
    | undefined;

  postCountData: any[] = []; // Dados que serão exibidos
  isLoading: boolean = true;
  displayedColumns: string[] = ['id', 'count', 'name', 'username'];
  totalPosts: number = 0;

  public lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Quantidade de Posts',
        fill: 'origin',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Usuário (Username)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Quantidade de Posts',
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
        },
      },
    },
  };
  public lineChartType: ChartType = 'line';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadTotalPosts();
    // this.loadPostCount();
    this.loadPostCountAndSetupChart();
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

  // loadPostCount(): void {
  //   this.postService.getPostCountByUser().subscribe(
  //     (data) => {
  //       console.log('Dados recebidos:', data);
  //       this.postCountData = data;

  //       this.isLoading = false;
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar dados de contagem de posts', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }

  loadPostCountAndSetupChart(): void {
    this.isLoading = true;
    this.postService.getPostCountByUser().subscribe(
      (data: any[][]) => {
        // Mudança aqui para indicar array de arrays
        console.log('Dados recebidos para o gráfico:', data);

        // Ordenar os dados pela contagem de posts (índice 3) em ordem decrescente
        // Certifique-se que o índice 3 realmente corresponde à contagem de posts
        const sortedData = [...data].sort((a, b) => {
          const countA = a[3]; // Quantidade de posts do usuário A
          const countB = b[3]; // Quantidade de posts do usuário B
          return countB - countA;
        });

        // Pegar os top 10 usuários
        const top10Data = sortedData.slice(0, 10);

        // Preparar dados para o gráfico
        // Assumindo que o username está no índice 2 e a contagem no índice 3
        const labels = top10Data.map((item) => item[2]); // Username do array interno
        const counts = top10Data.map((item) => item[3]); // Quantidade de posts do array interno

        this.lineChartLabels = labels;
        this.lineChartData = {
          labels: this.lineChartLabels,
          datasets: [
            {
              data: counts,
              label: 'Quantidade de Posts',
              fill: 'origin',
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1,
            },
          ],
        };

        // Se você ainda usa postCountData para a tabela e ela espera o formato de array de arrays,
        // você pode mantê-la assim. Se a tabela espera objetos, você precisaria transformá-la também.
        this.postCountData = data;
        this.isLoading = false;
        this.chart?.update(); // Atualiza o gráfico
      },
      (error) => {
        console.error(
          'Erro ao carregar dados de contagem de posts para o gráfico',
          error
        );
        this.isLoading = false;
      }
    );
  }

  // Funções de evento do gráfico (opcional)
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  objectKeys(obj: { [key: string]: number }): string[] {
    return Object.keys(obj);
  }
}
