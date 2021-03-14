<template>
  <div class="chart">
    <h1 id="barchart">Barchart</h1>
    <chart></chart>
  </div>
</template>

<script>
import chart from "./BarChart.js";
export default {
  components: {
    chart
  }
};
</script>

<style>
#barchart {
	font-size: 60px;
	font-family: Arial;
	text-align: center;
	background-color: gray;
	color: white;
}
</style>