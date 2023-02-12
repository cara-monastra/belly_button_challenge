// pull for the data 
function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      
      let metadata = data.metadata;
      let results_ = metadata.filter(sampleObj => sampleObj.id == sample);
      let result = results_[0];
      let panelBox = d3.select("#sample-metadata").html("");
  
      for (key in result){
        panelBox.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
      };
    });
  };
  
  function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let samples = data.samples;
      let results_ = samples.filter(sampleObj => sampleObj.id == sample);
      let result = results_[0];
  
      let otu_ids = result.otu_ids;
      let otu_labels = result.otu_labels;
      let sample_values = result.sample_values;
  
      // Horiz. Bar Chart 
      let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      let barData = [{
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h',
      }];
  
      let barLayout = {
        margin: { t: 30, l: 120 },
        title: "Top 10 Bacteria Colonies Found"
      };
  
      Plotly.newPlot("bar", barData, barLayout);
  
      // Bubble Chart
      let bubbleData = [{
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        text: otu_labels,
        marker: {
          size: sample_values,
          color: otu_ids
        }
      }];
  
      let bubbleLayout = {
        title: "Bacteria Colonies per Sample",
        hovermode: "closest",
        xaxis: {title: "OTU IDs" },
        yaxis: {title: "Sample Values"}
      };
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
  };
  
  
  function init() {
    let selector = d3.select("#selDataset");
  
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
      let sampleIDs = data.names;
      
      for (let i = 0; i < sampleIDs.length; i++) {
        selector
          .append("option")
          .text(sampleIDs[i])
          .property("value", sampleIDs[i]);
      };
  
      // Initial sample visuals
      let new_sample = sampleIDs[0];
      buildCharts(new_sample);
      buildMetadata(new_sample);
    });
  };
  
  function optionChanged(new_sample) {
    buildCharts(new_sample);
    buildMetadata(new_sample);
  };
  
  init();