import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, ArcElement, Legend);

export const LineChart = ({ views = [] }) => {

  const labels = getLastYearMonth();;
  const options = {
    responsive: true,
    plugin: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: "Yearly Basis",
      },
    },
  }
  const data = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: views,
        borderColor: 'rgba(107,70,193,0.5)',
        backgroundColor: '#6b46c1',
      }
    ]
  };
  return (
    <Line options={options} data={data} />
  )
}

export const DoughnutChart = ({ users = [] }) => {
  const data = {
    labels: ['subscribed', 'not subscribed'],
    datasets: [
      {
        label: 'Subscriptions',
        data: users,
        borderColor: ['rgb(62,12,171)', 'rgb(214,43,129)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214, 43, 129, 0.3)'],
        borderWidth: 1,
      }
    ]
  };
  return (
    <Doughnut data={data} />
  )
}

function getLastYearMonth() {
  const labels = [];
  const months = ['Jan', "Feb", 'Mar', "Apr", "May", "Jun", "Jul", "Aug", 'Sep', 'Oct', 'Nov', "Dec"];
  const currentMonth = new Date().getMonth();
  for (let i = currentMonth; i >= 0; i--) {
    labels.unshift(months[i]);
  }
  for (let i = 11; i > currentMonth; i--) {
    labels.unshift(months[i]);
  }

  return labels;
}