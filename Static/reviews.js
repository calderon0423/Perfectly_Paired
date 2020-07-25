// Create dropdown of wine selection
d3.json('http://127.0.0.1:5000/winelist').then((data) => {
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
    d3.json('http://127.0.0.1:5000/wordcloud').then((reviews) => {
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
         document.getElementById('wine_type_result').innerHTML=`<h3>${d.wine_type}</h3>`
     }) 
}

