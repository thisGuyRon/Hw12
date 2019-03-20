function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
    var url = "/metadata/" + sample;
    var metaBody = d3.select("#sample-metadata");
    metaBody.html("");
    d3.json(url).then(function(response) {
      Object.entries(response).forEach(entry => {
        let key = entry[0];
        let value = entry[1];
        var row = metaBody.append("tr");
        var cell = row.append("td");
        cell.text(key + ": " + value);
        //use key and value here
      });
    })



    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    //Plotly.deleteTraces("pie", 0);
  //  var pieChart = d3.select("#pie");
  //var bubbleChart = d3.select("#bubble");
  //pieChart.html("");
  //bubbleChart.html("");
    console.log("called build charts successful");
    var url = "/samples/" + sample;
    d3.json(url).then(function(response){

    console.log(response);
    var ds_sample_values = response.sample_values.slice(0,10);
    var ds_otu_ids = response.otu_ids.slice(0,10);
    var ds_otu_labels = response.otu_labels.slice(0,10);
    console.log(ds_sample_values);
    console.log(ds_otu_ids);
    console.log(ds_otu_labels);
    console.log("checkpoint#4");
    console.log(response.sample_values);
    data = [{
      "labels": ds_otu_ids,
      "values": ds_sample_values,
      "hoverinfo": ds_otu_labels,
      "type":"pie"
    }];
    Plotly.plot("pie", data);
    data2 = [{
      "x": response.otu_ids,
      "y": response.sample_values,
      "text": response.otu_labels,
      "mode": "markers",
      "marker": {
        "size": response.sample_values,
        "color": response.otu_ids
      }
       
    }]
    Plotly.plot("bubble", data2);

  })

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
  console.log("init");
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
var pieChart = d3.select("#pie");
  var bubbleChart = d3.select("#bubble");
  pieChart.selectAll("svg").remove();
  //pieChart.html("");
  //bubbleChart.html("");
  buildCharts(newSample);
  buildMetadata(newSample);
  console.log("option changed");
}

// Initialize the dashboard
init();