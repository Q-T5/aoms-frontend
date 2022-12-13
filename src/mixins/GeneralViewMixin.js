import Chart from "chart.js";
export default {
  name: "GeneralView",
  data() {
    return {
      animalNumber: {
        xValues: ["Dogs", "Cats", "Parrots", "Lions", "Lizard-Family", "Antellope", "Gazelle", "Giraffe", "Other-Birds", "Apes"],
        yValues: [2, 4, 6, 0, 3, 9, 7, 2, 5, 4],
        barColors: ["red", "green", "blue", "orange", "brown", "purple", "pink", "yellow", "violet", "teal"]
      },
      animalNumberPredictor: {
        xValues: ["Dogs", "Cats", "Parrots", "Lions", "Lizard-Family", "Antellope", "Gazelle", "Giraffe", "Other-Birds", "Apes"],
        yValues: [2, 4, 6, 0, 3, 9, 7, 2, 5, 4],
        barColors: ["red", "green", "blue", "orange", "brown", "purple", "pink", "yellow", "violet", "teal"]
      },
      diseaseComparison: {
        xValues: ["Dogs", "Cats", "Parrots", "Lions", "Lizard-Family", "Antellope", "Gazelle", "Giraffe", "Other-Birds", "Apes"],
        yValues: [0, 3, 2, 7, 2, 1, 5, 9, 2, 1],
        barColors: ["red", "green", "blue", "orange", "brown", "purple", "pink", "yellow", "violet", "teal"]
      },
      predictionFactor: null,
      factors: [2, 4, 6, 0, 3, 9, 7, 2, 5, 4]
    }
  },
  methods: {
    applyPrediction(factor) {
      const alteredArray = this.animalNumberPredictor.yValues.map((value) => {
        return value += factor;
      });
      console.log(`altered array ${ alteredArray }`);
      this.animalNumberPredictor.yValues = alteredArray;

      console.log(this.animalNumberPredictor.yValues);
      // this.createPredictionChart();
    },

    resetFactors() {
      this.animalNumberPredictor.yValues = this.factors;
      this.createPredictionChart();
    },
    createPredictionChart: function() {
      new Chart("numberPredictor", {
        type: "line",
        data: {
          labels: this.animalNumberPredictor.xValues,
          datasets: [
            {
              borderColor: "green",
              data: this.animalNumberPredictor.yValues
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "Animal Population Trend Predictor"
          },
          legend: {
            display: false
          }
        }
      });
    }
  },
  mounted() {
    new Chart("barAnimalNumber", {
      type: "bar",
      data: {
        labels: this.animalNumber.xValues,
        datasets:[{
          backgroundColor: this.animalNumber.barColors,
          data: this.animalNumber.yValues,
        }]
      },
      options: {
        legend: { 
          display: false 
        },
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Animal Number Summary Graph"
        }
      }
    });

    new Chart("pieAnimalDistNumber", {
      type: "pie",
      data: {
        labels: this.animalNumber.xValues,
        datasets: [
            {
              backgroundColor: this.animalNumber.barColors,
              data: this.animalNumber.yValues
            }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Animal Data Pie Chart Overiew"
        }
      }
    });
    this.createPredictionChart();

    new Chart("diseaseComparison", {
      type: "horizontalBar",
      data: {
        labels: this.diseaseComparison.xValues,
        datasets:[{
          backgroundColor: this.diseaseComparison.barColors,
          data: this.diseaseComparison.yValues,
        }]
      },
      options: {
        legend: { 
          display: false 
        },
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Animal Diseases Summary"
        }
      }
    })
  }
}