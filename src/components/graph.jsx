import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Graph = () => {
  const data = {
    labels: ['BLEU-1', 'BLEU-2', 'METEOR'],
    datasets: [
      {
        label: 'VGG-16',
        data: [0.58944, 0.42786, 0.41194],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'RESNET-50',
        data: [0.46763, 0.34961, 0.35383],
        backgroundColor: '#ef4444',
      },
      {
        label: 'INCEPTION-V3',
        data: [0.40028, 0.29122, 0.30697],
        backgroundColor: '#f59e0b',
      },
      {
        label: 'DENSENET-201',
        data: [0.53474, 0.41029, 0.42972],
        backgroundColor: '#10b981',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Model Performance Metrics',
        font: {
          size: 20,
          family: 'Poppins, sans-serif',
          weight: '600',
        },
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            family: 'Poppins, sans-serif',
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Model Performance Analysis</h1>
      </header>
      <div className="w-full max-w-4xl h-96 p-6 bg-white rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <Bar data={data} options={options} className="max-w-full" />
      </div>
    </div>
  );
};

export default Graph;
