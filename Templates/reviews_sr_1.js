//https://www.anychart.com/blog/2019/04/30/create-javascript-word-cloud-chart-tutorial/

// d3.json('https://perfectlypaired.herokuapp.com/reviews').then((data) => {

d3.json('../Resources/variety_adj.json').then((data) => {
    console.log(data);
    
    var selector = d3.select("#selDataset");

    var wine_list = []
    Object.entries(data).forEach(([key,value])=> {
        console.log(key);
        wine_list.push(key);
        selector.append('option')
        .property('value', key)
        .text(key)

    });


    // data.forEach((wine) => {
    //     var variety = wine.variety;
    //     wine_list.push(variety)
    // });

    // console.log(wine_list);

    // wine_list.forEach((wine) => {
    //     selector.append('option')
    //     .property('value', wine)
    //     .text(wine)
    // })

buildWordCloud(wine_list[1]);
});

function buildWordCloud(selection) {
    // d3.json('https://perfectlypaired.herokuapp.com/reviews').then((reviews) => {
    d3.json('../Resources/frequency_dict.json').then((reviews) => {
        
        // var filterWine = reviews.filter(reviews => reviews.variety===selection)
        // console.log(filterSubject)

        filterWine = reviews[selection]
        console.log(filterWine);

        const clearCloud = d3.select("#word-cloud")
        clearCloud.html("")

        var data = []
        Object.entries(filterWine).forEach(([k, v]) => {
            var data_adj = {}
            data_adj["x"] = k
            data_adj["value"] = v
            // data.push(k, v)
            data.push(data_adj)
        });

        // remove bottom part of chart OR add red vs white

        var chart = anychart.tagCloud(data);
        
        // set a chart title
       chart.title(selection) 
       // set an array of angles at which the words will be laid out
       chart.angles([0])
       // enable a color range
       chart.colorRange(true);
       // set the color range length
       chart.colorRange().length('80%');
     
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
                        .attr("style", "min-width: 20%")
                        .each(function(x) {
                            d3.select(this).append("div")
                                            .attr("class", "card-body")
                                            .each(function(i) {
                                                d3.select(this).append("input")
                                                                .property("type", "button")
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
                        .attr("style", "min-width: 20%")
                        .each(function(x) {
                            d3.select(this).append("div")
                                            .attr("class", "card-body")
                                            .each(function(i) {
                                                d3.select(this).append("input")
                                                                .property("type", "button")
                                                                .property("value", word)
                                                                .property("id", word)
                                                                .text(word);
                                            });
                        });
    });
    
};

buildAdjectives();

d3.select(window).on("load", buildAdjectives);