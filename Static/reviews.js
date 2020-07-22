// //https://www.anychart.com/blog/2019/04/30/create-javascript-word-cloud-chart-tutorial/

// // d3.json('https://perfectlypaired.herokuapp.com/reviews').then((data) => {

// d3.json('../Resources/variety_adj.json').then((data) => {
//     console.log(data);
    
//     var selector = d3.select("selDataset");

//     var wine_list = []
//     Object.entries(wine).forEach(([key,value])=> {
//         console.log(key);
//         selector.append('option')
//         .property('value', wine)
//         .text(key)

//     });


//     // data.forEach((wine) => {
//     //     var variety = wine.variety;
//     //     wine_list.push(variety)
//     // });

//     // console.log(wine_list);

//     // wine_list.forEach((wine) => {
//     //     selector.append('option')
//     //     .property('value', wine)
//     //     .text(wine)
//     // })

// buildWordCloud(wine_list[0]);
// });

// function buildWordCloud(selection) {
//     d3.json('https://perfectlypaired.herokuapp.com/reviews').then((reviews) => {
        
//         var filterWine = reviews.filter(reviews => reviews.variety===selection)
//         console.log(filterSubject)

//         var data = []
//         Object.entries(filterWine).forEach(([k, v]) => {
//             data.push(k, v)
//         });

//         var chart = anychart.tagCloud(data);
        
//         // set a chart title
//        chart.title(variety)
//        // set an array of angles at which the words will be laid out
//        chart.angles([0])
//        // enable a color range
//        chart.colorRange(true);
//        // set the color range length
//        chart.colorRange().length('80%');
     
//        // display the word cloud chart
//        chart.container("word-cloud");
//        chart.draw();
//     })
// };

// function optionChanged(selectedVariety) {
//     console.log(selectedVariety);
//     anychart.buildWordCloud(selectedVariety);
// };
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
                        .attr("style", "min-width: 20%")
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

d3.select(window).on("load", buildAdjectives);

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

