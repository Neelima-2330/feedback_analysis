// Sample data - Replace with actual server data via EJS or AJAX
const sentimentCtx = document.getElementById('sentimentChart');
if (sentimentCtx) {
  new Chart(sentimentCtx, {
    type: 'doughnut',
    data: {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [{
        label: 'Feedback Sentiment',
        data: [60, 25, 15], // Replace with actual values
        backgroundColor: ['#38bdf8', '#a3a3a3', '#ef4444'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14,
              family: 'Segoe UI',
              weight: '500'
            },
            color: '#333'
          }
        },
        tooltip: {
          backgroundColor: '#111827',
          titleFont: { weight: 'bold' },
          bodyFont: { size: 13 }
        }
      }
    }
  });
}

const feedbackTrendCtx = document.getElementById('feedbackTrendChart');
if (feedbackTrendCtx) {
  new Chart(feedbackTrendCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Replace with actual months
      datasets: [{
        label: 'Feedback Count',
        data: [10, 20, 15, 25, 30], // Replace with actual data
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: '#6366f1'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#555',
            font: { size: 13 }
          },
          grid: {
            color: '#e5e7eb'
          }
        },
        x: {
          ticks: {
            color: '#555',
            font: { size: 13 }
          },
          grid: {
            display: false
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            font: {
              size: 14,
              family: 'Segoe UI'
            },
            color: '#333'
          }
        },
        tooltip: {
          backgroundColor: '#1f2937',
          bodyFont: { size: 13 }
        }
      }
    }
  });
}

const productSentimentCtx = document.getElementById('productSentimentChart');
if (productSentimentCtx) {
  new Chart(productSentimentCtx, {
    type: 'bar',
    data: {
      labels: ['Product A', 'Product B', 'Product C'], // Replace
      datasets: [{
        label: 'Positive',
        data: [12, 19, 3],
        backgroundColor: '#22c55e'
      }, {
        label: 'Neutral',
        data: [5, 8, 4],
        backgroundColor: '#eab308'
      }, {
        label: 'Negative',
        data: [2, 3, 7],
        backgroundColor: '#ef4444'
      }]
    },
    options: {
      responsive: true,
      barThickness: 32,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 14,
              family: 'Segoe UI'
            },
            color: '#333'
          }
        },
        tooltip: {
          backgroundColor: '#111827',
          bodyFont: { size: 13 }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: '#444',
            font: { size: 13 }
          },
          grid: {
            display: false
          }
        },
        y: {
          stacked: true,
          ticks: {
            beginAtZero: true,
            color: '#444',
            font: { size: 13 }
          },
          grid: {
            color: '#e5e7eb'
          }
        }
      }
    }
  });
}
