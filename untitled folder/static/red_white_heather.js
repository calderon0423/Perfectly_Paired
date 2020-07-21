//DISPLAYING SLIDERS' VALUES ON SCREEN
var slider1 = document.getElementById("fixed_acidity");
var output1 = document.getElementById("tart");
output1.innerHTML = slider1.value;

slider1.oninput = function() {
  output1.innerHTML = this.value;
}

var slider2 = document.getElementById("volatile_acidity");
var output2 = document.getElementById("sour");
output2.innerHTML = slider2.value;

slider2.oninput = function() {
  output2.innerHTML = this.value;
}

var slider3 = document.getElementById("citric_acid");
var output3 = document.getElementById("fresh");
output3.innerHTML = slider3.value;

slider3.oninput = function() {
  output3.innerHTML = this.value;
}

var slider4 = document.getElementById("residual_sugar");
var output4 = document.getElementById("sweet");
output4.innerHTML = slider4.value;

slider4.oninput = function() {
  output4.innerHTML = this.value;
}

var slider5 = document.getElementById("chlorides");
var output5 = document.getElementById("chlor");
output5.innerHTML = slider5.value;

slider5.oninput = function() {
  output5.innerHTML = this.value;
}

var slider6 = document.getElementById("free_sulfur_dioxide");
var output6 = document.getElementById("free_sulfur");
output6.innerHTML = slider6.value;

slider6.oninput = function() {
  output6.innerHTML = this.value;
}

var slider7 = document.getElementById("total_sulfur_dioxide");
var output7 = document.getElementById("total_sulfur");
output7.innerHTML = slider7.value;

slider7.oninput = function() {
  output7.innerHTML = this.value;
}

var slider8 = document.getElementById("density");
var output8 = document.getElementById("den");
output8.innerHTML = slider8.value;

slider8.oninput = function() {
  output8.innerHTML = this.value;
}

var slider9 = document.getElementById("ph_level");
var output9 = document.getElementById("ph");
output9.innerHTML = slider9.value;

slider9.oninput = function() {
  output9.innerHTML = this.value;
}

var slider10 = document.getElementById("sulphates");
var output10 = document.getElementById("sulp");
output10.innerHTML = slider10.value;

slider10.oninput = function() {
  output10.innerHTML = this.value;
}

var slider11 = document.getElementById("alcohol");
var output11 = document.getElementById("alc");
output11.innerHTML = slider11.value;

slider11.oninput = function() {
  output11.innerHTML = this.value;
}

//SELECT ALL VALUES FOR EACH PHYSIOCHEMICAL PROPERTY AND PUT THEM IN A LIST TO FEED INTO MODEL
var text_x = [];

function submit() {

  var fixed_acidity = d3.select("#fixed_acidity").property("value");
  //var fixed_acidity = d3.select("#tart").property("value");
  text_x.push(fixed_acidity);
  //d3.select("#fixed_acidity").value = "";
  
  var volatile_acidity = d3.select("#volatile_acidity").property("value");
  //var volatile_acidity = d3.select("#sour").property("value");
  text_x.push(volatile_acidity);
  //d3.select("#volatile_acidity").node().value = "";

  var citric_acid = d3.select("#citric_acid").property("value");
  //var citric_acid = d3.select("#fresh").property("value");
  text_x.push(citric_acid);
  //d3.select("#citric_acid").node().value = "";

  var residual_sugar = d3.select("#residual_sugar").property("value");
  //var residual_sugar = d3.select("#sweet").property("value");
  text_x.push(residual_sugar);
  //d3.select("#residual_sugar").node().value = "";

  var chlorides = d3.select("#chlorides").property("value");
  //var chlorides = d3.select("#chlor").property("value");
  text_x.push(chlorides);
  //d3.select("#chlorides").node().value = "";

  var free_sulfur_dioxide = d3.select("#free_sulfur_dioxide").property("value");
  //var free_sulfur_dioxide = d3.select("#free_sulfur").property("value");
  text_x.push(free_sulfur_dioxide);
  //d3.select("#free_sulfur_dioxide").node().value = "";

  var total_sulfur_dioxide = d3.select("#total_sulfur_dioxide").property("value");
  //var total_sulfur_dioxide = d3.select("#total_sulfur").property("value");
  text_x.push(total_sulfur_dioxide);
  //d3.select("#total_sulfur_dioxide").node().value = "";

  var density = d3.select("#density").property("value");
  //var density = d3.select("#den").property("value");
  text_x.push(density);
  //d3.select("#density").node().value = "";
  
  var ph = d3.select("#ph_level").property("value");
  //var ph = d3.select("#ph").property("value");
  text_x.push(ph);
  //d3.select("#ph_level").node().value = "";

  var sulphates = d3.select("#sulphates").property("value");
  //var sulphates = d3.select("#sulp").property("value");
  text_x.push(sulphates);
  //d3.select("#sulphates").node().value = "";

  var alcohol = d3.select("#alcohol").property("value");
  //var alcohol = d3.select("#alc").property("value");
  text_x.push(alcohol);
  //d3.select("#alcohol").node().value = "";
  
  text_x = text_x
}

fetch('/predict_red_white').then(data=>data.json()).then(d=>{
  console.log(d);
}); 
















