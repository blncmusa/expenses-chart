fetch('data.json')
  .then(response => response.json())
  .then(expenses => {

    const monthlyBalance = document.getElementById("monthly-balance")
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0)
    monthlyBalance.textContent = `£${total}`;

    const chartData = {
      labels: expenses.map(expense => expense.day),
      datasets: [{
        label: "Spending - Last 7 days",
        data: expenses.map(expense => expense.amount),
        backgroundColor: "hsl(10, 79%, 65%)",
        borderWidth: 1,
        hoverBackgroundColor: "hsl(186, 34%, 60%)",
        borderRadius: 5,
        borderColor: 'rgba(0, 0, 0, 0)'
      }]
    };
    
    const chartOptions = {
        scales: {
          y: {
            ticks: {
              beginAtZero: true,
              display: false
            },
            grid: {
              display: false,
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        },
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 30,
                        weight: 700
                    },
                    boxWidth: 0
                }
            }
        }
      };
      
    
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions
    });
  });
