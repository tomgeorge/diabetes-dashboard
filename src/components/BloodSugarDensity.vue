<template>
  <div id="blood-sugar-container">
    <div id="blood-sugar-density"></div>
    <div id="blood-sugar-scatter"></div>
  </div>
</template>
<script>
import * as d3 from 'd3';
import axios from 'axios';
export default {
  data: () => {
    return {
      width: 1000,
      height: 500,
      margin: {
        top: 30,
        right: 30,
        bottom: 30,
        left: 50
      },
    }
  },
  props: ['bloodSugars'],
  mounted: function() {
    this.generateBarChart()
    this.generateScatter()
  },
  methods: {
    generateBarChart: function () {
      const self = this
      const svg = d3.select("#blood-sugar-density")
        .append("svg")
          .attr("width", self.width + self.margin.left + self.margin.right)
          .attr("height", self.height + self.margin.top + self.margin.bottom)
        .append("g")
          .attr("transform", "translate("+ self.margin.left + "," + self.margin.top + ")");

      const x = d3.scaleBand()
        .domain(self.bloodSugars.map(o => o.value))
        .range([0, self.width]);

      svg.append("g")
        .attr("transform", "translate(0," + self.height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10, 0),rotate(-45)");

      const y = d3.scaleLinear()
        .domain([0, d3.max(self.bloodSugars, x => x.count)])
        .range([self.height, 0]);

      svg.append("g")
        .call(d3.axisLeft(y));

      svg.selectAll("blood-sugar-density")
        .data(self.bloodSugars)
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.value); })
          .attr("y", function(d) { return y(d.count); })
          .attr("width", x.bandwidth())
          .attr("height", function (d) { return self.height - y(d.count) })
          .attr("fill", "#69b3a2")
          .attr("text-anchor", "middle")
          .text("Number of Blood Sugar Occurences");
    },
    generateScatter: function() {
      const self = this
      const svg = d3.select("#blood-sugar-scatter")
        .append("svg")
          .attr("width", self.width + self.margin.left + self.margin.right)
          .attr("height", self.height + self.margin.top + self.margin.bottom)
        .append("g")
          .attr("transform", "translate("+ self.margin.left + "," + self.margin.top + ")");

      const x = d3.scaleLinear()
        .domain([0,400])
        .range([0, self.width]);
  
      svg.append("g")
        .attr("transform", "translate(0," + self.height + ")")
        .call(d3.axisBottom(x))

      const y = d3.scaleLinear()
        .domain([0, d3.max(self.bloodSugars, x => x.count)])
        .range([self.height, 0]);

      svg.append('g')
        .call(d3.axisLeft(y));
      
      svg.append('g')
        .selectAll('dot')
        .data(self.bloodSugars)
        .enter()
        .append('circle')
          .attr('cx', function(d) { return d.value })
          .attr('cy', function(d) { return d.count  })
          .attr('r', 1.5)
          .style('fill', '#69b3a2')
    },
    getBloodSugars: function() {
      const self = this
      axios.get(`${process.env.VUE_APP_API_URL}/blood-sugar-counts`).then(function(response) {
        self.bloodSugars = response.data
      });
    }
  }
}
</script>
