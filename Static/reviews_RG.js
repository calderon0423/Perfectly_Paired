var feel = ['Ripe', 'Crisp', 'Mature', 'Traditional', 'Fresh', 'Smooth', 'Bright', 'Rubbery', 'Intense'];

var taste = ['Rich', 'Tropical', 'Sweet', 'Honeyed', 'Fruity', 'Dry', 'Earthy', 'Savory', 'Vanilla', 'Toasted', 'Bitter', 'Nutty'];

var point = [1,2,3,4];

var category = ['White', 'Red']




var country = ['Argentina', 'Australia', 'Austria', 'Brazil', 'Bulgaria', 'Canada', 'Chile', 'Croatia', 'Cyprus', 'Czech Republic', 'Egypt', 'England',
'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'India', 'Israel', 'Italy', 'Lebanon', 'Luxembourg', 'Macedonia', 'Mexico',
'Moldova', 'Morocco', 'New Zealand', 'Peru', 'Portugal', 'Romania', 'Serbia', 'Slovakia', 'Slovenia', 'South Africa', 'Spain',
'Switzerland', 'Turkey', 'US', 'Ukraine', 'Uruguay']

function buildAdjectives() {
    var tastes = taste;
    var taste_selector = d3.select("#taste");

    tastes.forEach(word => {
        taste_selector.append("div")
                        .attr("class", "card m-4 shadow")
                        .attr('id', 'adjs')
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
                        .attr('id', 'adjs')
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

function buildPoints() {
    var points = point;
    var point_selector = d3.select("#point");

    points.forEach(word => {
        point_selector.append("div")
                        .attr("class", "card m-4 shadow")
                        .attr('id', 'points')
                        .attr("style", "min-width: 40%")
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
                                            .attr("class", "card-body wine_points")
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

function buildCountry() {
    var countries = country;
    var country_selector = d3.select("#country")

    countries.forEach(word => {
        country_selector.append("div")
                        .attr("class", "card m-4 shadow")
                        .attr('id','countries')
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
                                            .attr("class", "card-body wine_country")
                                            .each(function(i) {
                                                d3.select(this).append("input")
                                                                .property("type", "button")
                                                                .property("value", word)
                                                                .property("id", word)
                                                                .text(word)
                                                                .on("click",function(){
                                                                    if (this.classList.contains("active")) {
                                                                        d3.select(this).attr("class", "inactive")
                                                                    } 
                                                                    else {
                                                                        d3.select(this).attr('class', 'active')
                                                                    } 
                                                                    var country_selected = []
                                                                    document.querySelectorAll('.active')
                                                                    console.log(this.value)
                                                                    country_selected.push(this.value)
                                                                    
                                                                    // function buildProvince(country_selected) {
                                                                    // d3.json('/province').then((countries) => {
                                                                    //     province_choice = countries[country_selected]
                                                                    //     console.log(province_choice)
                                                                    //     // filterCountry = country[country_selected]
                                                                    //     // console.log(filterWine);
                                                                    //     })
                                                                    // }
                                                                    // d3.json('/province').then((countries) => {
                                                                    // filterWine = countries[country_selected]
                                                                    // console.log(filterWine);
                                                                    // })
                                            
                                                                    // d3.json('/province').then((province) => {
                                                                    //     var filterProvince = province[country_selected]
                                                                    //     console.log(filterProvince);
                                                                    // })
                                                                })    
                                                                //         var data = []
                                                                //         Object.entries(filterWine).forEach(([k, v]) => {
                                                                //             var data_adj = {}
                                                                //             data_adj["x"] = k
                                                                //             data_adj["value"] = v
                                                                //             data.push(data_adj)
                                                                                                                    
                                            })
                            });
                        })
    
};
var country_selected = []
document.querySelectorAll('.active')
document.querySelectorAll('.wine_country')
console.log(this.value)
country_selected.push(this.value)

function buildProvince(selection) {
    d3.json('/province').then((countries) => {
        filterProvince = countries[selection]
        console.log(filterProvince);
        // const clearCloud = d3.select("#word-cloud")
        // clearCloud.html("")
        // var data = []
        // Object.entries(filterWine).forEach(([k, v]) => {
        //     var data_adj = {}
        //     data_adj["x"] = k
        //     data_adj["value"] = v
        //     data.push(data_adj)
        // });
    //     var chart = anychart.tagCloud(data);
    //     // set a chart title
    //    chart.title(selection) 
    //    // set an array of angles at which the words will be laid out
    //    chart.angles([0])
    //    // enable a color range
    //    // chart.colorRange(true);
    //    // set the color range length
    //    //  chart.colorRange().length('80%');
    //    // display the word cloud chart
    //    chart.container("word-cloud");
      
    //    chart.draw();
    })
};

buildProvince(country_selected[0])

// function buildProvince() {

//     var country_selector = d3.selectAll('.wine_country, .active')
//     console.log(country_selector)

//     var country_selected = country_selector.value
//     console.log(country_selected)
    
//     // d3.json('http://127.0.0.1:5000/province').then((provinces) => {
//         // let countries = []
//         // d3.select('#countries')
//         // .on('click', function(){
//         //     document.querySelectorAll('.active').forEach(country => {
//         //         countries.push(country.value)
//         // })
//         // console.log(countries)

//         d3.json('/province').then((data) => {
//             // var selector = d3.select("#selDataset");
//             // var wine_list = []
//             // var count = 0
//             Object.entries(data).forEach(([key,value])=> {
//                 if ( key == country_selected){
//                     console.log(value);
//                     // console.log(wine_list);
//                     // wine_list.push(key);
//                     // selector.append('option')
//                     // .property('value', key)
//                     // .text(key)
//                 }
//             });
//         })
//         var provinces = province.country_selected;
//         // var provinces = provinces[country_selected]
//         console.log(provinces)
//         var province_selector = d3.select("#province")
//         provinces.forEach(word => {
//             province_selector.append("div")
//                             .attr("class", "card m-4 shadow")
//                             .attr("style", "min-width: 20%")
//                             .each(function(x) {
//                                 d3.select(this).append("div")
//                                                 .attr("class", "card-body wine_province")
//                                                 .each(function(i) {
//                                                     d3.select(this).append("input")
//                                                                     .property("type", "button")
//                                                                     .on("click",function(){
//                                                                         if (this.classList.contains("active")) {
//                                                                             d3.select(this).attr("class", "inactive")
//                                                                         } 
//                                                                         else {
//                                                                             d3.select(this).attr('class', 'active')
//                                                                         } 
//                                                         })
//                                                 .property("value", word)
//                                                 .property("id", word)
//                                                 .text(word);
//                                                 });
//                                 });
//         });
// };

buildAdjectives();
buildCountry();
buildPoints();
// buildProvince();


// var country_selector = d3.select("#country")

// // var country_selected = country_selector.value;

// function buildProvince() {
//     d3.json('http://127.0.0.1:5000/province').then((provinces) => {
//         let countries = []
//         d3.select('#countries')
//         .on('click', function(){
//             document.querySelectorAll('.active').forEach(country => {
//                 countries.push(country.value)
//         })
//         console.log(countries)
//         // var provinces = province.country_selected;
//         var provinces = provinces[country_selected]
//         console.log(provinces)
//         var province_selector = d3.select("#province")
//         provinces.forEach(word => {
//             province_selector.append("div")
//                             .attr("class", "card m-4 shadow")
//                             .attr("style", "min-width: 20%")
//                             .each(function(x) {
//                                 d3.select(this).append("div")
//                                                 .attr("class", "card-body wine_province")
//                                                 .each(function(i) {
//                                                     d3.select(this).append("input")
//                                                                     .property("type", "button")
//                                                                     .on("click",function(){
//                                                                         if (this.classList.contains("active")) {
//                                                                             d3.select(this).attr("class", "inactive")
//                                                                         } 
//                                                                         else {
//                                                                             d3.select(this).attr('class', 'active')
//                                                                         } 
//                                                         })
//                                                 .property("value", word)
//                                                 .property("id", word)
//                                                 .text(word);
//                                                 });
//                                 });
//         });
//     })
//     })
// };




d3.select(window).on("load", buildAdjectives);

function submitChoices() {
    let adj_choices = []
    let country_choice = []
    let province_choice = []
    let points_choice = []

    document.querySelectorAll('#taste').forEach(item => {
        adj_choices.push(item.value)
      })
    document.querySelectorAll('#feel').forEach(item => {
        adj_choices.push(item.value)
      })
      adj_choices = adj_choices.join(' ')
    document.querySelectorAll('#country').forEach(item => {
        country_choice.push(item.value)
      })
      country_choice = country_choice.join(' ')
    document.querySelectorAll('#province').forEach(item => {
        province_choice.push(item.value)
      })
      province_choice = province_choice.join(' ')
    document.querySelectorAll('#points').forEach(item => {
        points_choice.push(item.value)
      })
      points_choice = points_choice.join(' ')

     console.log(adj_choices)
     fetch(`/predict_wine_variety?adjectives=${adj_choices}&country=${country_choice}&province=${province_choice}&points=${points_choice}`).then(data=>data.json()).then(d=>{
         console.log(d.wine_type)
         document.getElementById('wine_type_result').innerHTML=`<h3>${d.wine_type}</h3>`
     }) 
};
