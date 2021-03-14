
<template>


	<div id=app>
		<h1>header</h1>
	
        
   

		<ul>
			
			
			<li v-for="(item, index) in datapacket.lst" :key="item.id">
				<!-- Comment items are {{item}} -->
					
					{{item.name}} : {{item.quantity}}  <br>
					<input v-bind:id=index row=20 cols=50 placeholder = 0 type="number" min="0">
				
			</li>
			
			
		
			
		</ul>

			<button v-on:click="updateOrder">Update Order</button>
	</div>
    </template>
<script>
import database from "../firebase.js"


export default {
	
	data() {
        return {
			datapacket: []
    
			}
	},

	

	methods: {
        fetchItems:function(){ 
        //alert(this.$route.params.id + "routes");
        //var id = this.$route.params.id;
        database.collection('orders').doc(this.$route.params.id.toString()).get().then(querySnapshot => {
           this.datapacket = querySnapshot.data(); 
       })
    },

    updateOrder:function() {
    
       let copy = [];
       copy = this.datapacket.lst;
       console.log("length is " + this.datapacket.lst.length)
       for (let i = 0; i < this.datapacket.lst.length; i++) {
          console.log(i);

         // alert(document.getElementById(i).value);
         // alert(copy[i].quantity +" original");

          copy[i].quantity = document.getElementById(i).value;
         // alert(copy[i].quantity + " after");


      }
      database.collection('orders').doc(this.$route.params.id).update({
        lst: copy
        }).then(this.$router.replace({ path: '/orders' }));


    }


         },

    created() {
	this.fetchItems()
	}
}
</script>
