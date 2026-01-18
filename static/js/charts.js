

new Chart(document.getElementById("categoryChart") ,{
    type:"bar",
    data:{
        labels : Object.keys(categoryData),
        datasets:[
            {
                label:"Category Sales",
                data:Object.values(categoryData),
                backgroundColor: 'rgba(255, 215, 0, 0.7)',
                borderColor: 'rgb(255, 215, 0)'
            }
        ]
    },
    options: {
  plugins: {
    title: {
      display: true,
      text: "Category-wise Sales Distribution",
      color: "#010000",
      font: { size: 22, weight: "600" }
    },
    legend: {
      labels: {
        color: "#010000",
        font: { size: 14, weight: "500" }
      }
    }
  },
  scales: {
    x: {
      ticks: { color:"#010000" },
      grid: { color: "rgba(255,255,255,0.15)" }
    },
    y: {
      ticks: { color:"#010000" },
      grid: { color: "rgba(255,255,255,0.15)" }
    }
  }
}

    
});


new Chart(document.getElementById("monthlyChart") ,{
    type:"line",
    data:{
        labels : Object.keys(monthlyData),
        datasets:[
            {
                label:"Monthly Sales",
                data:Object.values(monthlyData),
                backgroundColor: 'rgba(255, 215, 0, 0.7)',
                borderColor: 'rgb(255, 215, 0)'
            }
        ]
    },

    options: {
  plugins: {
    title: {
      display: true,
      text: "Monthly Sales Overview",
      color:"#010000",
      font: { size: 22, weight: "600" }
    },
    legend: {
      labels: {
        color: "#010000",
        font: { size: 14, weight: "500" }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: "#010000" },
      grid: { color: "rgba(255,255,255,0.15)" }
    },
    y: {
      ticks: { color:"#010000" },
      grid: { color: "rgba(255,255,255,0.15)" }
    }
  }
}

});