
import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [
            //"Pork Fried Rice", "Mapo Tofu", "Sambal KangKung", 
            //"Cereal Prawn", "Dry Beef Hor Fun", "Prawn omelette"
            ],
            datasets: [{
                label: "Quantity",
                backgroundColor: ['yellow', 'purple', 'green', 'pink', 'blue', 'red'],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Orders'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales:{
                  yAxes:[{
                      ticks:{
                          min:0
                      }
                   }],
                   
              }
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        let item={} 
        querySnapShot.forEach(doc => {

          //alert(JSON.stringify(doc.data().lst))
          item = doc.data().lst;
          item.forEach(details => {
            //alert("hi")

           // alert(JSON.stringify(details.name) + JSON.stringify(details.quantity))
            const len = this.datacollection.labels.length
            //alert(JSON.stringify(details.data()))
            

            if (len === 0) {
              //alert(JSON.stringify(details.name))
              this.datacollection.labels.push(details.name)
              
              this.datacollection.datasets[0].data.push(details.quantity);

            } else {
              for (let i = 0; i < len; i++) {
                const curr_lab = this.datacollection.labels[i];
                var curr_quantity = parseInt(this.datacollection.datasets[0].data[i])
               //alert(JSON.stringify(curr_lab))
                if (curr_lab == details.name) {
                  //if label exists, update quantity
                  
                  //alert("data[i] is " + i + " name: " + details.name + "quantity " + JSON.stringify(curr_quantity))
                   curr_quantity = curr_quantity + parseInt(details.quantity)
                 // alert("updateddata[i] is " + i + " name: " + details.name + "quantity " + JSON.stringify(curr_quantity))
                 
                  this.datacollection.datasets[0].data.splice(i, 1);

                  this.datacollection.datasets[0].data.splice(i, 0, curr_quantity);
                  //this.datacollection.datasets[0].data.push(details.quantity)

                  break;
                } else if (curr_lab != details.name && i != len - 1) {
                  continue;
                }
                else if (curr_lab != details.name && i == len - 1) {
                  //when the label doesnt exists
                  this.datacollection.labels.push(details.name)
                  
                  this.datacollection.datasets[0].data.push(details.quantity)

                }
              }

            }

          })
          

            
        })
        alert("final data is " + this.datacollection.datasets[0].data);
        this.renderChart(this.datacollection, this.options)
      })
    }, 
   
  },
  created () {
    this.fetchItems()
  }
}

