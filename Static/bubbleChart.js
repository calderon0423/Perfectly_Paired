// d3.json("http://127.0.0.1:5000/bubblechart").then((reviewData) => {
d3.json("../Resources/winemag-data-bubblechart.json").then((reviewData) => {

    var idList = reviewData.map(data => data.variety);
    for (var i = 0; i < idList.length; i++) {
      selectBox = d3.select("#selDataset");
      selectBox.append("option").text(idList[i]);
    }
    // Set up default plot
    updatePlots(idList[0]);
    // var test = d3.select('h5').text();
    // console.log(test);

    // updatePlots(test);

  // Function for updating plots   
  function updatePlots(selection) {
    var filteredData = reviewData.filter(data => data.variety==selection)
    var variety = filteredData.map(data => data.variety);
    var points = filteredData.map(data => data.points);
    var price = filteredData.map(data => data.price);
    
    filteredData.sort(function(a, b) {
      return parseFloat(b.points) - parseFloat(a.points);
    });



  // -Bubble Chart:
   var trace_bubble = {
    x: points,
    y: price,
    mode: 'markers',
    text: variety,
    marker: {
      // size: sample_values,
      // color: otu_ids,
      opacity: [1, 0.8, 0.6, 0.4],
      color:" rgb(172, 5, 5, .90)"
    }
    }; 

    // Set up data
    var data_bubble = [trace_bubble];


    // Set up layout
    var layout_bubble = {
      title: `Price vs. Rating for ${selection}`,
      xaxis: {title: "Rating"},
      yaxis: {title: "Price($)"},
      showlegend: false,
      height: 600,
      width: 1200
      };
  

    // Plot
    Plotly.newPlot('bubble', data_bubble, layout_bubble);

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

  