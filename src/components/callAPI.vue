<template>
  <div class="chart">
    <h1 id="linechart">Line Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "./callAPI.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
#linechart {
	font-size: 60px;
	font-family: Arial;
	text-align: center;
	background-color: blue;
	color: white;
}
</style>