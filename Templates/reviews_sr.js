//https://www.anychart.com/blog/2019/04/30/create-javascript-word-cloud-chart-tutorial/

/*d3.json('https://perfectlypaired.herokuapp.com/reviews').then((data) => {
    console.log(data);
    
    var selector = d3.select("selDataset");

    var wine_list = []
    data.forEach((wine) => {
        var variety = wine.variety;
        wine_list.push(variety)
    });

    wine_list.forEach((wine) => {
        selector.append('option')
        .property('value', wine)
        .text(wine)
    })

buildWordCloud(wine_list[0]);
});

function buildWordCloud(selection) {
    d3.json('https://perfectlypaired.herokuapp.com/reviews').then((reviews) => {
        
        var filterWine = reviews.filter(reviews => reviews.variety===selection)
        console.log(filterSubject)

        var data = []
        Object.entries(filterWine).forEach(([k, v]) => {
            data.push(k, v)
        });

        var chart = anychart.tagCloud(data);
        
        // set a chart title
       chart.title(variety)
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
    anychart.buildWordCloud(selectedVariety);
};
*/
