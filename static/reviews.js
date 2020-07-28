// Create dropdown of wine selection
d3.json('/winelist').then((data) => {
    var selector = d3.select("#selDataset");
    var wine_list = []
    var count = 0
    Object.entries(data).forEach(([key,value])=> {
        count = count+1
        if ( count > 1){
            // console.log(key);
            // console.log(wine_list);
            wine_list.push(key);
            selector.append('option')
            .property('value', key)
            .text(key)
        }
    });
buildWordCloud(wine_list[0]);
});
function buildWordCloud(selection) {
    d3.json('/wordcloud').then((reviews) => {
        filterWine = reviews[selection]
        console.log(filterWine);
        const clearCloud = d3.select("#word-cloud")
        clearCloud.html("")
        var data = []
        Object.entries(filterWine).forEach(([k, v]) => {
            var data_adj = {}
            data_adj["x"] = k
            data_adj["value"] = v
            data.push(data_adj)
        });
        var chart = anychart.tagCloud(data);
        // set a chart title
       chart.title(selection) 
       // set an array of angles at which the words will be laid out
       chart.angles([0])
       // enable a color range
       // chart.colorRange(true);
       // set the color range length
       //  chart.colorRange().length('80%');
       // display the word cloud chart
       chart.container("word-cloud");
       chart.tooltip(true);
       chart.tooltip().useHtml(true);
       chart.tooltip().format("Frequency: {%value} <br> \nPercent of Total: {%yPercentOfTotal}%");
       chart.tooltip().fontSize(16);
       chart.container("word-cloud");
      
       chart.draw();
    })
};
function optionChanged(selectedVariety) {
    console.log(selectedVariety);
    buildWordCloud(selectedVariety);
};
// ----------------------------

var feel = ['Ripe', 'Crisp', 'Mature', 'Full-Bodied', 'Elegant', 'Rare', 'Soft', 'Vibrant', 'Smooth', 'Traditional', 'Fresh', 
            'Bright', 'Rubbery', 'Fragrant', 'Delicate', 'Layered', 'Intense', 'Balanced', 'Aromatic', 'Well-Known', 'Little-Known'];

var taste = ['Rich', 'Tropical', 'Sweet', 'Herbal', 'Floral', 'Honeyed', 'Fruity', 'Dry', 'Earthy', 'Savory', 'Tannic', 'Meaty',
            'Vanilla', 'Candied', 'Toasted', 'Smoky', 'Bitter', 'Ginger', 'Nutty', 'Lemony', 'Citric', 'Rose', 'Exotic'];
        


function buildAdjectives() {
    var tastes = taste;
    var taste_selector = d3.select("#taste");

    tastes.forEach(word => {
        taste_selector.append("div")
                        .attr("class", "card m-4 shadow")
                        .attr("id", "adjs")
                        .attr("style", "min-width: 25%")
                        .on("click",function(){
                            if (this.classList.contains("show")) {
                                d3.select(this).attr("class", "card m-4 shadow noshow")
                            } 
                            else {
                                d3.select(this).attr('class', 'card m-4 shadow show')
                            } 
                        })
                        .each(function(x) {
                            d3.select(this).append("div")
                                            .attr("class", "card-body wine_adjectives")
                                            .each(function(i) {
                                                d3.select(this).append("input")
                                                                .property("type", "button")
                                                                .on("click",function(){
                                                                    if (this.classList.contains("active")) {
                                                                        d3.select(this).attr("class", "inactive")
                                                                    } 
                                                                    else {
                                                                        d3.select(this).attr('class', 'active')
                                                                    } 
                                                                })
                                                                .property("value", word)
                                                                .property("id", word)
                                                                .text(word);
                                            });
                        });
    });

    var feels = feel;
    var feel_selector = d3.select("#feel");

    feels.forEach(word => {
        feel_selector.append("div")
                        .attr("class", "card m-4 shadow")
                        .attr("id", "adjs")
                        .attr("style", "min-width: 25%")
                        .on("click",function(){
                            if (this.classList.contains("show")) {
                                d3.select(this).attr("class", "card m-4 shadow noshow")
                            } 
                            else {
                                d3.select(this).attr('class', 'card m-4 shadow show')
                            } 
                        })
                        .each(function(x) {
                            d3.select(this).append("div")
                                            .attr("class", "card-body wine_adjectives")
                                            .each(function(i) {
                                                d3.select(this).append("input")
                                                                .property("type", "button")
                                                                .on("click",function(){
                                                                    if (this.classList.contains("active")) {
                                                                        d3.select(this).attr("class", "inactive")
                                                                    } 
                                                                    else {
                                                                        d3.select(this).attr('class', 'active')
                                                                    } 
                                                                })
                                                                .property("value", word)
                                                                .property("id", word)
                                                                .text(word);
                                            });
                        });
    });
    
};

buildAdjectives();

function submitChoices() {
    let choices = []
    document.querySelectorAll('.active').forEach(item => {
        choices.push(item.value)
      })
     choices = choices.join(' ')
     console.log(choices)
     fetch(`/predict_type?adjectives=${choices}`).then(data=>data.json()).then(d=>{
         console.log(d.wine_type)
         document.getElementById('wine_type_result').innerHTML=`<h3 id="test">${d.wine_type}</h3>`

d3.json(`/barchart?variety=${d.wine_type}`).then((reviewData) => {

    // var filteredData = reviewData.filter(data => data.variety==d.wine_type)
    // var variety = filteredData.map(data => data.variety);
    // var points = reviewData.map(data => data.points);
    
    reviewData.sort(function(a, b) {
      return parseFloat(b.points) - parseFloat(a.points);
    });


    var topTenData = reviewData.slice(0, 10).reverse(); 
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

d3.json(`bubblechart?variety=${d.wine_type}`).then((reviewData) => {

    // var filteredData = reviewData.filter(data => data.variety==stock)
    var variety = reviewData.map(data => data.variety);
    var points = reviewData.map(data => data.points);
    var price = reviewData.map(data => data.price);
      
    reviewData.sort(function(a, b) {
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
            padding: '100vw'
            };
        
    
        // Plot
        Plotly.newPlot('bubble', data_bubble, layout_bubble);



})



     }) 
}

