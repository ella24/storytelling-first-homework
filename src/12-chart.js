import * as d3 from 'd3'
var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
}

var width = 400 - margin.left - margin.right

var height = 200 - margin.top - margin.bottom

var svg = d3
  .select('#chart12')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Build your scales here
var rScale = d3
  .scaleSqrt()
  .domain([0, 10])
  .range([0, 50])

var xPositionScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([10, width])

var colorScale = d3.scaleOrdinal().range(['#ffeda0', '#feb24c', '#f03b20'])

d3.csv(require('./eating-data.csv'))
  .then(ready)
  .catch(function(err) {
    console.log('Failed with', err)
  })

// Add and style your marks here
function ready(datapoints) {
  console.log('Data is', datapoints)

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', function(d) {
      return rScale(d.hotdogs)
    })
    .attr('cy', height / 4)
    .attr('cx', function(d) {
      return xPositionScale(d.hamburgers)
    })
    .attr('fill', function(d) {
      return colorScale(d.animal)
    })
    .attr('opacity', 0.25)

  var xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
}
