import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.scss'
})
export class DashComponent implements OnInit {
  title = 'dashboard';
  pizzaChart: any;

  ngOnInit(): void {
    this.RenderBarra();
    this.RenderPizza();
  }

  RenderBarra(): void {
    new Chart("1", {
      type: 'bar',
      data: {
        labels: ['sala 1', 'sala 2', 'sala 3', 'sala 4', 'sala 5', 'sala 6'],
        datasets: [{
          label: 'Acertos',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)',
            'rgb(255, 159, 64)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  RenderPizza(): void {
    const ctx = document.getElementById('pizzaChart');

    let data: any;
    let options: any;

    const dados = [40, 50, 10, 60, 48];

    const total = dados.reduce((acc: number, value: number) => acc + value, 0);

    const percentuais = dados.map((value: number) => ((value / total) * 100).toFixed(1));

    if (!this.pizzaChart) {
      data = {
        labels: ['Metal', 'Vidro', 'Orgânico', 'Plástico', 'Papel'],
        datasets: [{
          label: 'pizza',
          data: percentuais,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)'
          ],
          hoverOffset: 4
        }]
      };

      options = {
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      };
    } else {
      data = {
        labels: ['Metal', 'Vidro', 'Orgânico', 'Plástico', 'Papel'],
        datasets: [{
          label: 'pizza',
          data: percentuais,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)'
          ],
          hoverOffset: 4
        }]
      };

      options = {
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      };
    }

    this.pizzaChart = new Chart("pizza", {
      type: 'pie',
      data: data,
      options: options
    });


    this.pizzaChart.data.labels = ['Metal', 'Vidro', 'Orgânico', 'Plástico', 'Papel'];
    this.pizzaChart.update();
  }


  AtualizarDadosNovos(novosDados: any): void {

    this.pizzaChart.data = novosDados;
    this.pizzaChart.update();
  }

  DadosMetal(): void {

    const dados = [124, 345];
    const total = dados.reduce((acc: number, value: number) => acc + value, 0);
    const percentuais = dados.map((value: number) => ((value / total) * 100).toFixed(1));

    const novosDados = {
        labels: ['Acerto', 'Erro'],
        datasets: [{
            label: 'pizza',
            data: percentuais,
            backgroundColor: [
              '#43F55D',
              'rgb(255, 50, 123)'
            ],
            hoverOffset: 4
        }]
    };


    this.AtualizarDadosNovos(novosDados);
}


  DadosPlastico(): void {

    const dados = [324,124];
    const total = dados.reduce((acc: number, value: number) => acc + value, 0);
    const percentuais = dados.map((value: number) => ((value / total) * 100).toFixed(1));

    const novosDados = {
      labels: ['Acerto', 'Erro'],
      datasets: [{
        label: 'pizza',
        data: percentuais,
        backgroundColor: [
          '#43F55D',
          'rgb(255, 50, 123)'
        ],
        hoverOffset: 4
      }]
    };


    this.AtualizarDadosNovos(novosDados);
  }

  DadosOrganico(): void {

    const dados = [324, 512];
    const total = dados.reduce((acc: number, value: number) => acc + value, 0);
    const percentuais = dados.map((value: number) => ((value / total) * 100).toFixed(1));

    const novosDados = {
      labels: ['Acerto', 'Erro'],
      datasets: [{
        label: 'pizza',
        data: percentuais,
        backgroundColor: [
          '#43F55D',
          'rgb(255, 50, 123)'
        ],
        hoverOffset: 4
      }]
    };


    this.AtualizarDadosNovos(novosDados);
  }

  DadosVidro(): void {

    const dados = [124,23];
    const total = dados.reduce((acc: number, value: number) => acc + value, 0);
    const percentuais = dados.map((value: number) => ((value / total) * 100).toFixed(1));
    const novosDados = {
      labels: ['Acerto', 'Erro'],
      datasets: [{
        label: 'pizza',
        data: percentuais,
        backgroundColor: [
          '#43F55D',
          'rgb(255, 50, 123)'
        ],
        hoverOffset: 4
      }]
    };


    this.AtualizarDadosNovos(novosDados);
  }

  DadosPapel(): void {
    const dados = [124, 345];
    const total = dados.reduce((acc: number, value: number) => acc + value, 0);
    const percentuais = dados.map((value: number) => ((value / total) * 100).toFixed(1));
    const novosDados = {
      labels: ['Acerto', 'Erro'],
      datasets: [{
        label: 'pizza',
        data: percentuais,
        backgroundColor: [
          '#43F55D',
          'rgb(255, 50, 123)'
        ],
        hoverOffset: 4
      }]
    };


    this.AtualizarDadosNovos(novosDados);
  }

  RecarregarPizzaOriginal(): void {
    this.RenderPizza();
  }

  DadosTotais(): void {
    const dados = [40, 50, 10, 60,];
    const total = dados.reduce((acc: number, value: number) => acc + value, 0);
    const percentuais = dados.map((value: number) => ((value / total) * 100).toFixed(1));
    const novosDados = {
      labels: ['Metal', 'Vidro', 'Orgânico', 'Plástico', 'Papel'],
      datasets: [{
        label: 'pizza',
        data: percentuais,
        backgroundColor: [
          'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)'
        ],
        hoverOffset: 4
      }]
    };


    this.pizzaChart.data = novosDados;
    this.pizzaChart.update();
  }
}
