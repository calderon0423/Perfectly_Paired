d3.json("https://perfectlypaired.herokuapp.com/type_prediction").then((data) => {

})

var button = d3.select("#button-type");

function PredictButton() {

    d3.event.preventDefault();

    d3.json("https://perfectlypaired.herokuapp.com/type_prediction").then((data) => {
        var fixed_acidity = d3.select("#fixed_acidity").property("value");
        var volatile_acidity = d3.select("#volatile_acidity").property("value");
        var citric_acid = d3.select("#citric_acid").property("value");
        var residual_sugar = d3.select("#residual_sugar").property("value");
        var chlorides = d3.select("#chlorides").property("value");
        var free_sulfur_dioxide = d3.select("#free_sulfur_dioxide").property("value");
        var total_sulfur_dioxide = d3.select("#total_sulfur_dioxide").property("value");
        var density = d3.select("#density").property("value");
        var ph = d3.select("#ph").property("value");
        var sulphates = d3.select("#sulphates").property("value");
        var alcohol = d3.select("#alcohol").property("value");
    })
}