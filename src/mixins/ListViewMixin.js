export default {
    data() {
      return {
        "animalList": [],
        "searchVal": "",
      }
    },
    "methods": {
      refreshList() {
        const authToken = this.$store.getters.getAuthToken;
        try {
          fetch("/api/animals/getAllAnimals", {
            "method": "GET",
            "headers": {
              "Authorization": authToken
            }
          })
          .then((response) => {
            if(response.status === 204) {
            this.$store.commit('displayNotification', ['no animal data to display', 'daisyui-alert-info', 'info.svg']);
            } else if(response.status === 200) {
              return response.json();
            } else {
              this.$store.commit('displayNotification', ['unexpected error', 'daisyui-alert-error', 'error.svg']);
            }
          })
          .then((data) => {
            this.animalList = data;
          })
        } catch (error) {
          console.log(`An error occured: ${error}`);
        }
      },
      deleteAnimal(index) {
        const idToDelete = this.animalList[index].animalId;
        const authToken = this.$store.getters.getAuthToken;
        try {
          this.$store.commit("deleteMedicalRecords", idToDelete);
          fetch(`/api/animals/deleteAnimal/${ idToDelete }`, {
            "method": "DELETE",
            "headers": {
              "Authorization": authToken
            }
          })
          .then((response) => {
            if(response.status === 200) {
              this.$store.commit('displayNotification', ['successfully deleted animal data', 
              'daisyui-alert-success', 'success.svg']);
              this.refreshList();
            } else {
              this.$store.commit('displayNotification', ['unexpected error', 'daisyui-alert-error', 'error.svg']);
            }
          })
        } catch(error) {
          console.log(`An error occured: ${error}`);
        }
      },
      updateAnimal(index) {
        this.emitter.emit("updateThisAnimal", this.animalList[index]);
      },
    },
    computed: {
      filteredRows() {
        return this.animalList.filter(animal => {
          const id = animal.animalId.toString();
          return id.startsWith(this.searchVal) || animal.commonName.startsWith(this.searchVal);
        });
      }
    },
    mounted() {
      const authToken = this.$store.getters.getAuthToken;
      try {
        fetch("/api/animals/getAllAnimals", {
          "method": "GET",
          "headers": {
            "Authorization": authToken
          }
        })
        .then((response) => {
          if(response.status === 204) {
            this.$store.commit('displayNotification', ['no animal data to display', 'daisyui-alert-info', 'info.svg']);
          } else if(response.status === 200) {
            return response.json();
          } else {
            this.$store.commit('displayNotification', ['unexpected error fetching data', 'daisyui-alert-error', 'error.svg']);
          }
        })
        .then((data) => {
          this.animalList = data;
        })
      } catch (error) {
        console.log(`An error occured: ${error}`);
      }
  
      this.emitter.on("refreshList", () => {
        this.refreshList();
      })
    }
  }