import * as d3 from 'd3'
;(function() {
  var height = 400
  var width = 400

  // This is weird compared to what we did
  // in class, but just know that 'svg'
  // is the svg element and you can
  // do all the normal stuff with it
  var svg = d3
    .select('#chart4')
    .select('svg')
    .attr('height', height + 50)
    .attr('width', width + 50)
    .append('g')
    .attr('transform', 'translate(25, 25)')

  var datapoints = [
    { hotdogs: 10, hamburgers: 10, animal: 'dog', name: 'Stevie' },
    { hotdogs: 3, hamburgers: 3, animal: 'cat', name: 'Nicholas' },
    { hotdogs: 2, hamburgers: 2, animal: 'cat', name: 'Bubbletree' },
    { hotdogs: 10, hamburgers: 3, animal: 'cow', name: 'Particle' },
    { hotdogs: 7, hamburgers: 5, animal: 'dog', name: 'Jumpup' },
    { hotdogs: 4, hamburgers: 9, animal: 'dog', name: 'Parlay' },
    { hotdogs: 3, hamburgers: 1, animal: 'cat', name: 'Hio' }
  ]

  // Build your scales here
  var yPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([height, 10])

  var xPositionScale = d3
    .scaleLinear()
    .domain([0, 10])
    .range([10, width])

  var colorScale = d3
    .scaleOrdinal()
    .domain(datapoints)
    .range(['#FFD1C7'])

  // Add your circles and style them here

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cy', function(d) {
      return yPositionScale(d.hotdogs)
    })
    .attr('cx', function(d) {
      return xPositionScale(d.hamburgers)
    })
    .attr('fill', colorScale())
})()
