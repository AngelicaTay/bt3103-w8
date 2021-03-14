<template>
	<div>
		<h2>menu in basket</h2>
		<ul>
			<li v-for="item in itemsSelected" :key="item.name">

				{{ item[0]}} x {{item[1]}} 
				
			</li>
		</ul>

		<button id="subTotal" v-on:click="findTotal();sendOrder()">Calculate total + add order</button><br>
		<h1 v-show="display">Subtotal: ${{sub}}</h1>
		<h1 v-show="display">Grand Total:${{grand}}</h1>
	</div>

</template>

<script>
	import database from '../firebase.js'
	export default {
		name: 'Basket',
		props: {
			itemsSelected: {
				//type: Array
				
			}
		},
		data() {
			return {
				sub: 0,
				grand: 0,
				display: false,

				item:{
					name:"",
					quantity:0,
					price:0
				}
			
			}
		},
		
		methods: {
           findTotal: function() {
            this.sub = 0;
            this.grand = 0;
             
              for (let i = 0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i];
                const quantity = curr_item[1];
                const price = curr_item[2];
                this.sub += quantity * price;
              }

              this.grand = this.sub*1.07;
              this.grand.toFixed(2);
              if (this.display == false) {
                 this.display = true;
              }
           },

           sendOrder: function() {
            var lst=[];
            alert(this.itemsSelected + " saved to database");
             for (let i = 0; i < this.itemsSelected.length; i++) {
                const curr_item = this.itemsSelected[i];
                const quantity = curr_item[1];
                //const price = curr_item[2];
                const name = curr_item[0];

                lst.push({name, quantity});

                
              }

              database.collection('orders').add({
                  lst
                }).then(() => {location.reload()});

            
           }

			
		}

	}
</script>


<style>
	h1 {
		color: blue;
		font-family: avenir;
		font-size: 30px;
	}

	ul {
		font-family: avenir;
		font-size: 30px;
	}
</style>