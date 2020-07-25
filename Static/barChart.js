
   // Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  // var stock = d3.select("#wine_type_result").node().value;
  var stock = d3.select("#test").value;

  console.log(stock);

  // // clear the input value
  // d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  buildPlot(stock);
}

function buildPlot(stock) {
  d3.json('http://127.0.0.1:5000/barchart').then((reviewData) => {

    var filteredData = reviewData.filter(data => data.variety==stock)
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
        color:" rgb(172, 5, 5, .90)"
      }
      }

    // Set up data
    var data_bar=[trace_bar];

    // Set up layout
    var layout_bar = {
      //   title: `Top 10 Countries for ${selection}`,
        xaxis: {title: "Rating"}
      };

    // Plot
    Plotly.newPlot("bar", data_bar, layout_bar);



})

}

// Add event listener for submit button
d3.select("#button").on("click", handleSubmit);

  