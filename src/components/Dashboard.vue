<template>
<div id=app>
	
	<ul id="ordersUl">
  
    <li><router-link to="/" exact>Home  </router-link> </li>
        

        <li><router-link to="/orders" exact> orders</router-link></li>
        <li><router-link to="/dashboard" exact> Dashboard</router-link></li>
  </ul>
  <h1>dashboard</h1>
  <BarChart></BarChart>

  <CallAPI></CallAPI>

</div>
</template>


<script>
	import BarChart from './charts/BarChart.vue'
	import CallAPI from './callAPI.vue'

	export default {
		components: {
			BarChart,
			CallAPI
		}
	}
	</script>