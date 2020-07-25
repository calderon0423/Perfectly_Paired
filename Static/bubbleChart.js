// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  // var stock = d3.select("#wine_type_result").node().value;
  var stock =  d3.select('#wine_type_result');

  console.log(stock);

  // // clear the input value
  // d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(stock);
}

function buildPlot(stock) {
  d3.json('http://127.0.0.1:5000/bubblechart').then((reviewData) => {

    var filteredData = reviewData.filter(data => data.variety==stock)
    var variety = filteredData.map(data => data.variety);
    var points = filteredData.map(data => data.points);
    var price = filteredData.map(data => data.price);
    
    filteredData.sort(function(a, b) {
      return parseFloat(b.points) - parseFloat(a.points);
    });

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
          // title: `Price vs. Rating for ${selection}`,
          xaxis: {title: "Rating"},
          yaxis: {title: "Price($)"},
          showlegend: false,
          height: 600,
          width: 1200
          };
      
    
        // Plot
        Plotly.newPlot('bubble', data_bubble, layout_bubble);



})

}

// Add event listener for submit button
d3.select("#button").on("click", handleSubmit);