<template>
	<div>
   <ul>

    <li><router-link to="/" exact>Home  </router-link> </li>
        

        <li><router-link to="/orders" exact> orders</router-link></li>
        <li><router-link to="/dashboard" exact> Dashboard</router-link></li>
  </ul>

	
	
		<ul id="itemsList">
			<li v-for="item in items" :key="item.id">
				<h2 id="itemName">{{ item.name}} </h2><br>
				<img v-bind:src="item.imageURL"> <br>

				<h2 id="price">${{item.price}}</h2>

				<Counter v-bind:item = "item" v-on:counter="onCounter"></Counter>
			</li>
		</ul>
	

		

	<Basket  id="shoppingBasket" v-bind:itemsSelected = "itemsSelected"></Basket>
   </div>

	

</template>

<script>
	import Counter from './QuantityCounter.vue'
	import Basket from './Basket.vue'
  import database from '../firebase.js'
	export default {
		name: "PageC",
		/*props: {
			items: {
				type: String
			}
		},*/
		data() {
			return {
				itemsSelected: [],
        items:[]
			}
		},
		
		methods: {
			onCounter: function (item, count) {
				if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
                } else {

        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          var item_count = curr_item[1];

          if (item_name === item.name && item_count > 0) {
             //var replacement = [item.name, count, item.price];
            // this.itemsSelected.splice(i, 1, replacement);
            this.itemsSelected.splice(i, 1);

            this.itemsSelected.splice(i, 0, [item.name, count, item.price]);
            break;
              // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected

        } else if (item_name === item.name && item_count === 0) {
           // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
           this.itemsSelected.splice(i, 1);
           break;



          } else if (item_name != item.name && i!= this.itemsSelected.length - 1){
              continue;
          }
          else{
            if (i == this.itemsSelected.length - 1 && item_name == item.name) {
               this.itemsSelected[i][1] = count;
             
            } else {
                 this.itemsSelected.push([item.name, count, item.price]);
            }
          }
          }

          

          // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
          
        }
      },

      fetchItems:function(){ 
        database.collection('menu').get().then((querySnapShot)=>{
           let item={} 
           querySnapShot.forEach(doc=>{
            item=doc.data() 
            this.items.push(item)
            }) 
         }) 
      }
      
    },
    
    created(){
      this.fetchItems()    
    },
			
		
		components: {
			Counter,
			Basket
		}

	}
</script>


<style scoped>

	#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>