import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [
            { 
              label: "west",
                data: [],
                backgroundColor: "red",
                borderColor: "red",
                fill: false
            },

            { 
              label: "national",
                data: [],
                backgroundColor: "blue",
                borderColor: "blue",
                fill: false
            },

            { 
              label: "east",
                data: [],
                backgroundColor: "yellow",
                borderColor: "yellow",
                fill: false
            },

            { 
              label: "central",
                data: [],
                backgroundColor: "violet",
                borderColor: "violet",
                fill: false
            },

            { 
              label: "south",
                data: [],
                backgroundColor: "green",
                borderColor: "green",
                fill: false
            },

            { 
              label: "north",
                data: [],
                backgroundColor: "purple",
                borderColor: "purple",
                fill: false
            }
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI 24 hrs by region'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function() {
      axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
          //console.log(response.data.items)
            response.data.items.forEach(data => { 
                this.datacollection.labels.push(data["timestamp"])
                let readings = {}
                readings = data["readings"]

                let psi = {}
                psi = readings["psi_twenty_four_hourly"]
                

                //west = 0
                console.log(psi["west"])
                this.datacollection.datasets[0].data.push(psi["west"])

                //national = 1
                this.datacollection.datasets[1].data.push(psi["national"])
                //east = 2
                this.datacollection.datasets[2].data.push(psi["east"])

                //central = 3
                this.datacollection.datasets[3].data.push(psi["central"])

                //south = 4
                this.datacollection.datasets[4].data.push(psi["south"])

                //north = 5
                this.datacollection.datasets[5].data.push(psi["north"])

            })
            console.log(this.datacollection.datasets[0].data)
            this.renderChart(this.datacollection, this.options)
        })

    }
  },
  created () {
    this.fetchItems()
  }
}


