

new Chart(document.getElementById("categoryChart") ,{
    type:"bar",
    data:{
        labels : Object.keys(categoryData),
        datasets:[
            {
                label:"Category Sales",
                data:Object.values(categoryData)
            }
        ]
    }
})


new Chart(document.getElementById("monthlyChart") ,{
    type:"line",
    data:{
        labels : Object.keys(monthlyData),
        datasets:[
            {
                label:"Monthly Sales",
                data:Object.values(monthlyData)
            }
        ]
    }
})