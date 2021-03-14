<template>
	<div id="app">

		
		<button id="plus" v-on:click="increase"> +</button>
		<label id="num"> {{ count }} </label>

		
		<button id="minus" v-on:click="decrease"> - </button>
	</div>

	
</template>

<script>
	
	export default {
		name: 'QuantityCounter',

		props: {
			item: {
				
			}
		},
		data() {
			return {
				count:'0'
				
			}
		},
		
		methods: {
			increase: function() {
				if (this.count < 10) {
					this.count++;
				} else {
					alert("You cannot buy more than 10 items");
				}

				this.$emit('counter', this.item, this.count);
				
			},

			decrease: function() {
				if (this.count > 0) {
					this.count--;
				
				}
				this.$emit('counter', this.item, this.count);
			}
		}

	}
</script>


<style>

#num {
	font-size: 30px;
}
#plus {
	background-color: blue; 
	color:white;
	font-size: 30px;
  }

  #minus {
	background-color: blue; 
	color:white;
	font-size: 30px;
  }
	
</style>