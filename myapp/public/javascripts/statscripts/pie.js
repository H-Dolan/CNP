class thePie{
  color = null; 
  radius = null;
  svg = null;
  constructor(id){
    // set the dimensions and margins of the graph
    this.width = 450;
    this.height = 450;
    this.margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    this.radius = Math.min(this.width, this.height) / 2 - this.margin;
     // set the color scale
    this.color = d3.scaleOrdinal()
     .domain(["a", "b", "c", "d", "e", "f"])
     .range(d3.schemeDark2);

    this.svg = d3.select("#pie")
      .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
      .append("g")
        .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");
  }
  plotPie(id){
    
    
    // append the svg object to the div called 'pie'
    

    // create 2 data_set
    var data1 = {a: 9, b: 20, c:30, d:8, e:12}
    var data2 = {a: 6, b: 16, c:20, d:14, e:19, f:12}

    this.update(data1)
  };
  update(data) {
    var parentObject = this;
    // Compute the position of each group on the pie:
    var pie = d3.pie()
      .value(function(d) {return d.value; })
      .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
    var data_ready = pie(d3.entries(data))

    // map to data
    var u = this.svg.selectAll("path")
      .data(data_ready)

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    u
      .enter()
      .append('path')
      .merge(u)
      .transition()
      .duration(1000)
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', function(d){ var colors = parentObject.color; return(colors(d.data.key)) })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 1)

    // remove the group that is not present anymore
    u
      .exit()
      .remove()

    // Initialize the plot with the first dataset
    
    

  };
};
function getData() {
  plotPie('#pie');
};

//function updateData() {
  // Initialize the plot with the first dataset
  //update(data1)
  //dashboard('#pie');
//}
