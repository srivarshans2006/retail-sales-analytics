

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
            legend: {
                labels: {
                    color: '#000',        
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#000',        
                    font: {
                        size: 13,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                }
            },
            y: {
                ticks: {
                    color: '#000',        
                    font: {
                        size: 13,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                }
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
            legend: {
                labels: {
                    color: '#000',       
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#000',       
                    font: {
                        size: 13,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                }
            },
            y: {
                ticks: {
                    color: '#000',       
                    font: {
                        size: 13,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                }
            }
        }
    }
});