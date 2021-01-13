<template>
  <div id="blood-sugar-histogram">
    <div id="chart" class="chart">
    </div>
  </div>
</template>

<script>
// import * as d3 from 'd3'
export default {
  data: () => {
    return {
      bloodSugarsAll: [
      ],
      width: 500,
      height: 500,
      margin: {
        top: 50,
        right: 50,
        left: 50,
        bottom: 50
      }
    }
  },
  props: ['bloodSugars'],
  mounted: function () {
    this.populateBloodSugars();
    this.generateHistogram();
  },
  methods: {
    populateBloodSugars: function() {
      const self=this
      self.bloodSugars.forEach(bloodSugar => {
        for (let i = 0; i < bloodSugar.count; i++) {
          self.bloodSugarsAll.push(bloodSugar.value);
        }
      });
    },
    generateHistogram: function() {
      /*
      const self=this
      const svg = d3.select("#chart")
        .append("svg")
        .attr("width", self.width + self.margin.left, self.margin.right)
        .attr("height", self.height + self.margin.top + self.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

      const x = d3.scaleLinear()
        .domain(d3.min(self.bloodSugarsAll), d3.max(self.bloodSugarsAll))
        .range(0, self.width);

      svg.append("g")
        .attr("transform", "translate(0," + self.height + ")")
      .call(d3.axisBottom(x));

      const histogram = d3.histogram()
      .value()
      .domain(x.domain())
      .thresholds(x.ticks(70));

      const bins = histogram(self.bloodSugarsAll)

      const y = d3.scaleLinear()
        .range([self.height, 0])
        .domain([0, d3.max(bins, function(d) { return d.length;})]);
      svg.append('g')
      .call(d3.axisLeft(y));

      svg.selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
        .attr('x', 1)
        .attr('transform', function(d) { return 'translate(' + x(d.x0) + ',' + y(d.length) + ')'; })
        .attr('width', function(d) { return x(d.x1) - x(d.x0) -1; })
        .attr('height', function(d) { return self.height - y(d.length); })
        .style('fill', '#69b3a2');
    */


    }
  }
}
</script>
