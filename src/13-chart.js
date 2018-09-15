import * as d3 from 'd3'
var margin = { top: 20, right: 20, bottom: 40, left: 70 }

var width = 400 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

var svg = d3
  .select('#chart13')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Build your scales here

var widthScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([0, width])

var colorScale = d3.scaleOrdinal().range(['#ffeda0', '#feb24c', '#f03b20'])

var yPositionScale = d3.scaleBand().range([height, 0])

d3.csv(require('./eating-data.csv'))
  .then(ready)
  .catch(function(err) {
    console.log('Failed with', err)
  })

function ready(datapoints) {
  // Add and style your marks here

  var names = datapoints.map(function(d) {
    return d.name
  })

  yPositionScale.domain(names)

  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('width', function(d) {
      return widthScale(d.hamburgers)
    })
    .attr('fill', function(d) {
      return colorScale(d.animal)
    })
    .attr('height', yPositionScale.bandwidth())
    .attr('x', 0)
    .attr('y', function(d) {
      return yPositionScale(d.name)
    })

  var yAxis = d3.axisLeft(yPositionScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  var xAxis = d3.axisBottom(widthScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
}
