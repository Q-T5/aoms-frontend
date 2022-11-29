import Chart from "chart.js";
export default {
    name: "GeneralView",
    data() {
      return {
        barAnimalNumber: {
          xValues: ["Italy", "France", "Spain", "USA", "Argentina"],
          yValues: [55, 49, 44, 24, 15],
          barColors: ["red", "green", "blue", "orange", "brown"]
        },
        pieAnimalDistNumber: {
            xValues: ["Italy", "France", "Spain", "USA", "Argentina"],
            yValues: [55, 49, 44, 24, 15],
            pieColors: ["red", "green", "blue", "orange", "brown"]
        }
      }
    },
    mounted() {
      new Chart("barAnimalNumber", {
        type: "bar",
        data: {
          labels: this.barAnimalNumber.xValues,
          datasets:[{
            backgroundColor: this.barAnimalNumber.barColors,
            data: this.barAnimalNumber.yValues,
          }]
        },
        options: {
          legend: { display: false},
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "World Wine Production 2018"
          }
        }
      });

      new Chart("pieAnimalDistNumber", {
        type: "pie",
        data: {
            labels: this.pieAnimalDistNumber.xValues,
            datasets: [
                {
                    backgroundColor: this.pieAnimalDistNumber.pieColors,
                    data: this.pieAnimalDistNumber.yValues
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "World Wide Production 2018"
            }
        }
      });
    }
}