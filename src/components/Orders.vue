<template>
<div id=app>
	<ul id="ordersUl">
  
    <li><router-link to="/" exact>Home  </router-link> </li>
        

        <li><router-link to="/orders" exact> orders</router-link></li>
        <li><router-link to="/dashboard" exact> Dashboard</router-link></li>
  </ul>
        
   
	<h1>orders</h1>
		<ul>
			
     
			<li v-for="order in orders" :key="order.id">
				
				
				<div v-for="details in order[1]" :key="details.id">

						
                        <div v-for="item in details" :key="item.id">
						{{item.name}}: {{item.quantity}}
					</div>
					
					
					<button v-bind:del ="order[0]" v-on:click="deleteItem($event)">delete</button>
                    <button v-bind:mod ="order[0]" v-on:click="route($event)">Modify</button>
				</div>


				
				
			</li>
		</ul>
	</div>
</template>

<script>
import database from "../firebase.js"

export default {
		
    data() {
        return {
			orders: []
    
			}
		},
	methods: {
        fetchItems:function(){ 
        database.collection('orders').get().then((querySnapShot)=>{
           let item={} 
           querySnapShot.forEach(doc=>{
            item=doc.data() 
            item=[doc.id,doc.data()]
            alert(JSON.stringify(doc.data()))
             
            this.orders.push(item)

            }) 
         }) 
        },
        deleteItem:function(event) {
            let doc_id = event.target.getAttribute("del");
            //alert(doc_id + "id here");
             database.collection('orders').doc(doc_id).delete().then(() => {location.reload()});

      },

      route:function(event){

        const doc_id = event.target.getAttribute("mod");
        //this.$router.push({name: 'modify', params: {doc_id}});
        this.$router.push({path: `/modify/${doc_id}`});
      } 
	
	},

	created() {
		this.fetchItems()
	}
}
</script>


<style type="text/css">
	
	ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}



</style>