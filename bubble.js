function init() {
  
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      var firstSample = sampleNames[0];
      buildMetadata(firstSample);
      buildCharts(firstSample);
      bubbleChart(firstSample);
      buildguage(firstSample);
    });
  }
  init();
  function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
    bubbleChart(newSample);
    buildguage(newSample);
  };
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  };
  

function buildCharts(sample){
d3.json("samples.json").then((data) => {
    var bactData = data.samples;
    var bactDataS= bactData.filter((sampleObj) => sampleObj.id == sample);
    var bactResult = bactDataS[0];
    var bactValue = bactResult.sample_values;
    var bactDataSD = bactResult.otu_ids;
    var Top10bactDato = bactValue.slice(0,10);
    var Top10bactData = Top10bactDato.reverse();
    console.log(Top10bactData);
    var Top10bactDataIDo= bactDataSD.slice(0,10);
    var Top10bactDataID = Top10bactDataIDo.reverse();
    console.log(Top10bactDataID);
    var BactID = Top10bactDataID.map(a=> "OTU "+ a)
    console.log(BactID);
    var trace= {
        x: Top10bactData,
        y: BactID,
        type:"bar",
        orientation: "h"  
    };
    var layout = {
        xaxis: {title:"Sample Value"}, 
        yaxis:{title:"OTU ID"},  
    
    }; 
    Plotly.newPlot("bar", [trace], layout);
    
    
});
};
function bubbleChart(sample){
d3.json("samples.json").then((data) => {
    var bactData = data.samples;
    var bactDataS= bactData.filter((sampleObj) => sampleObj.id == sample);
    var bactResult = bactDataS[0];
    var bactValue = bactResult.sample_values;
    var bactDataSD = bactResult.otu_ids;
    console.log(bactDataSD);
    var bactDataN = bactResult.otu_labels;
    
    var trace= {
        x: bactDataSD,
        y: bactValue,
        type:"scatter",
        mode: "markers",
        text: bactDataN,
        marker:{
          size: bactValue,
          color:bactDataSD
        }
    
            
    };
    var layout = {
      title:"Bacterial Cultures Per Sample",
        scattermode: "group",
        xaxis: {title:"OTU ID"}, 
        yaxis:{title:"Sample Val"}
    
    }; 
    Plotly.newPlot("bubble", [trace], layout);
    
    
});
};

function buildguage(sample){
d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var wFreq = result.wfreq;
    var data = [
  {
    type: "indicator",
    domain: { x: [0, 1], y: [0, 1] },
    mode: "gauge+number",
    value: wFreq,
    title: { text: "Belly Button Washing Frequency", font: { size: 20 } },
    gauge: {
      axis: { range: [null,10],tickwidth: 1, tickcolor: "black" },
      bar: { color: "black" },
      borderwidth: 1,
      bordercolor: "black",
      steps: [
        { range: [0,2], color: "red" },
        { range: [2,4], color: "orange" },
        { range: [4,6], color: "yellow" },
        { range: [6,8], color: "lightgreen" },
        { range: [8,10], color: "darkgreen" },
      ]
      
    }
    
  }
];

var layout = {
  
  paper_bgcolor: "white",
  width: 500,
  height: 425,
  margin: { t: 0, b: 0 }
  
};

Plotly.newPlot("gauge", data, layout);
    
});
};

