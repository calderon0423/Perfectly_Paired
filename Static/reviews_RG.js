var feel = ['Ripe', 'Crisp', 'Mature', 'Traditional', 'Fresh', 'Smooth', 'Bright', 'Rubbery', 'Intense'];

var taste = ['Rich', 'Tropical', 'Sweet', 'Honeyed', 'Fruity', 'Dry', 'Earthy', 'Savory', 'Vanilla', 'Toasted', 'Bitter', 'Nutty'];

var point = [1,2,3,4];

var category = ['White', 'Red']

var province = d3.json("../Resources/Country_Province.json")

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

    var points = point;
    var point_selector = d3.select("#point");

     points.forEach(word => {
        point_selector.append("div")
                        .attr("class", "card m-4 shadow")
                        .attr("style", "min-width: 20%")
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
    


    // points.forEach(word => {
    //     point_selector.append("div")
    //                     .attr("class", "card m-4 shadow")
    //                     .attr("style", "min-width: 20%")
    //                     .each(function(x) {
    //                         d3.select(this).append("div")
    //                                         .attr("class", "card-body wine_adjectives")
    //                                         .each(function(i) {
    //                                             d3.select(this).append("input")
    //                                                             .property("type", "button")
    //                                                             .on("click",function(){
    //                                                                 if (this.classList.contains("active")) {
    //                                                                     d3.select(this).attr("class", "inactive")
    //                                                                 } 
    //                                                                 else {
    //                                                                     d3.select(this).attr('class', 'active')
    //                                                                 } 
    //                                                             })
    //                                                             .property("value", word)
    //                                                             .property("id", word)
    //                                                             .text(word);
    //                                         });
    //                     });
    // });
};

function buildCountry() {
    var countries = country;
    var country_selector = d3.select("#country")

    countries.forEach(word => {
        country_selector.append("div")
                        .attr("class", "card m-4 shadow")
                        .attr("style", "min-width: 20%")
                        .each(function(x) {
                            d3.select(this).append("div")
                                            .attr("class", "card-body wine_country")
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
buildCountry();

var country_selector = d3.select("#country")
var country_selected = country_selector.value;

function buildProvince() {
    var provinces = province.country_selected;
    var province_selector = d3.select("#province")

    provinces.forEach(word => {
        province_selector.append("div")
                        .attr("class", "card m-4 shadow")
                        .attr("style", "min-width: 20%")
                        .each(function(x) {
                            d3.select(this).append("div")
                                            .attr("class", "card-body wine_province")
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
}

