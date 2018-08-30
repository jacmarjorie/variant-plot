function lollipop_plot(selector, gene, data){

  var vsID = {6: "Cervix", 16: "Stomach", 10: "Liver", 15: "Skin", 1: "Bladder", 2: "Brain", 5: "Head and Neck", 12: "Lung", 4: "Breast", 7: "Colorectal", 9: "Kidney", 17: "Uterus", 8: "Esophagus", 13: "Pancreas", 14: "Prostate", 11: "Ovary", 3: "Bone", 0: "Blood"}

  var start = gene_census[gene]['start'], end = gene_census[gene]['end'], diff = end-start


  if (data.length > 0){

    var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      vs_str = ''
      $.each(d.vs_tracker, function(ps){
        if (ps != 'All'){
          vs_str += "<strong> "+ps+" : </strong><span style='color:yellow'> " + d.vs_tracker[ps] + " </span><br/>"
        }
      })
      return "<strong> Ref/Alt: </strong> <span style='color:red'> " + d.referenceBases + " / " + d.alternateBases + " </span><br/><strong> Position: </strong> <span style='color:red'> " +d.referenceName +":"+ d.start + "-" + d.end + " </span><br/>"+vs_str;
    })

  }

  var margin = {
      top: 20,
      right: 0,
      bottom: 30,
      left: 55
    },
    width = 1280 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    // X Scale
    var x = d3.scale.linear()
      .domain([start, end+width+50])
      .range([0, width-margin.left])

    // Our Y scale
    var y = d3.scale.linear()
              .rangeRound([height-50, 0]);

    if(data.length > 0){
      y.domain([0, d3.max(data, function(d) { d.calls = +d.calls; return d.calls + 2; })])
    }else{
      y.domain([0, 1]);
    }

    // Our color bands
    var color = d3.scale.category20();

    // Use our X scale to set a bottom axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // Same for our left axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format('d'))

    var mainSVG = d3.select(selector).append("svg")
      .attr('width', width)
      .attr('height', height);

    // Add our chart to the #chart div
    var svg = mainSVG.append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      // .attr("transform", "translate(0," + margin.top + ")")
    
    if (data.length > 0){
      svg.data(data)
         .call(tip);
    }


    //svg.call(zoom)

    svg.append('g')
      .attr('fill', 'none')
      .style('stroke', 'silver')
      .style('stroke-width', '20px')
      .attr('transform', 'translate(0,'+String(height-margin.bottom+5)+")")
      .call(xAxis);
    
    svg.append('g')
      .attr("fill", "none")
      .style('stroke', 'black')
      .style('stroke-width', '1px')
      .attr('transform', 'translate('+(-margin.bottom+5)+",0)")
      .call(yAxis);

    svg.append("g")
      .attr("class", "y axis")
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 4)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("# Mutations");


    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 50)
      .attr("y", height - 6)
      .text(gene);


  if (data.length > 0){

    svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("fill", 'gray')
      .attr("x", function(d) { 
        d.start = +d.start
        return x(d.start); })
      .attr("width", 1.5)
      .attr("y", function(d) { 
        d.calls = +d.calls
        return y(d.calls); })
      .attr("height", function(d) {
        d.calls = +d.calls 
        return height - y(d.calls); 
      });

    svg.selectAll("circle").data(data).enter()
      .append("svg:circle")
      .attr("r", 4)
      .attr("fill",function(d,i){return color(i);})
      .attr("cx", function(d) { return x(d.start); })
      .attr("cy", function(d) { return y(d.calls); }) 
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
  }

}


// Cancer Explorer Mutation Frequency Plot Generator

function plotCounts(selector, min, max, cancer_type){

  var groups = [cancer_type];
  var data = cancer_type + '_gene_counts';
  var title = 'Raw Mutation Count';
  var pad = 70;

  if (cancer_type == 'All' || cancer_type == 'All_norm' || cancer_type == 'All_norm_tail'){
    title = 'Relative Mutation Count'
    if (cancer_type == 'All_norm_tail'){
      pad = 90
    }
    groups = ['cervix', 'stomach', 'kidney', 'prostate', 'liver', 'bladder', 'brain', 'lung', 'blood', 'colorectal', 'skin', 'uterus', 'esophagus', 'pancreas', 'head', 'ovary', 'bone', 'breast']  
  }

  return c3.generate({
    bindto: selector,
    size: {
      //height: 15000
      //height: Number(max-min)*55
      //width: 1600,
      height: 400
    },
    padding: {
        top: 40,
        right: 40,
        bottom: 50,
        left: pad,
    },
    data: {
      json: window[data],
      type: 'bar',
      keys: {
        x: 'name', 
        value: groups,
      },
      groups:[groups],
      colors: {
        cervix: '#e11b47',  stomach: '#3208e1',  kidney: '#ed5e3c',  prostate: '#c0278a',  liver: '#7c0fa8',  bladder: '#9d4fed',  brain: '#5413c8',  lung: '#7d7152',  blood: '#e3af12',  colorectal: '#d1b482',  skin: '#91fb27',  uterus: '#958b90',  esophagus: '#6be375',  pancreas: '#96aede',  head: '#70721b',  ovary: '#a670aa',  bone: '#430f32',  breast: '#183c93'
      }
    },
    axis: {
      rotated: false,
      x: {
        //show: false,
        type: 'category',
        label: {
          text: 'Gene',
          position: 'outer-center'
        },
        tick:{
          values: []
        }
      },
      y: {
        label: {
          text: title,
          position: 'outer-middle',
      }
  }
    },
    grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
    bar: {
        width: {
            ratio: .5 // this makes bar width 50% of length between ticks
        }
    },
    zoom: {
      enabled: true,
      rescale: true
    }
  });
}

