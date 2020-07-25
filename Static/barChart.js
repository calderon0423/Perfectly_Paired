d3.json("http://127.0.0.1:5000/barchart").then((reviewData) => {
    console.log(reviewData);

    var idList = reviewData.map(data => data.variety);
    for (var i = 0; i < idList.length; i++) {
      selectBox = d3.select("#selDataset");
      selectBox.append("option").text(idList[i]);
    }
    // Set up default plot
    updatePlots(idList[0]);

  // Function for updating plots   
  
  function updatePlots(selection) {
    console.log(selection);
    var filteredData = reviewData.filter(data => data.variety==selection)
    // var variety = filteredData.map(data => data.variety);
    var points = filteredData.map(data => data.points);
    
    filteredData.sort(function(a, b) {
      return parseFloat(b.points) - parseFloat(a.points);
    });


    var topTenData = filteredData.slice(0, 10).reverse(); 
    var topTenValues = topTenData.map(row => row.points);
    var topTenCountries = topTenData.map(row => row.country);
   
    // Set up trace
    // -Horizontal bar chart:
    var trace_bar={
      y:topTenCountries,
      x:topTenValues,
      type:"bar",
      orientation: 'h',
      marker: {
        color: 'rgb(153, 76, 0)'
      }
      }

    // Set up data
    var data_bar=[trace_bar];

    // Set up layout
    var layout_bar = {
        title: "Top 10 Countries",
        xaxis: {title: "Wine Rating"}
      };

    // Plot
    Plotly.newPlot("bar", data_bar, layout_bar);

    // On button click, call refreshData()
    d3.selectAll("#selDataset").on("change", refreshData);

    function refreshData() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var varieties = dropdownMenu.property("value");
    // Initialize an empty array for the person's data

    for (var i = 0; i < idList.length; i++) {
      if (varieties === idList[i]) {
      
        updatePlots(idList[i]);
        return
      }
    }
  }



    }
   });


  