<template>
  <div class="flex flex-col">
    <div class="relative border-blue-500 border-2 rounded-full self-center outline-none mb-1 w-fit">
      <input type="number" placeholder="Search by animal id... " class="search-box" maxlength="25"
      v-model="searchId" />
      <button class="search-button">Search</button>
    </div>
    <table class="table-auto w-full">
      <tr class="bg-blue-500 font-poppins">
        <th class="table-headers">Animal Id</th>
        <th class="table-headers">Pet Name</th>
        <th class="table-headers">Common Name</th>
        <th class="table-headers">Age(Years)</th>
        <th class="table-headers">Date Brought</th>
        <th class="text-base py-0 text-center font-roboto font-normal text-white">Action</th>
      </tr>
      <tr class="table-row" v-for="(animal, index) in animalList" :key="animal.index">
        <td>{{ animal.id }}</td>
        <td> {{ animal.petName }}</td>
        <td> {{ animal.commonName }}</td>
        <td> {{ animal.age }}</td>
        <td> {{ animal.animalDetail.dateBrought }}</td>
        <td class="text-center">
          <router-link :to="{ 'name': 'AnimalEditor' }" href="#" class="text-blue-500 underline" 
          @click="updateAnimal(index)"><font-awesome-icon icon="fa-solid fa-pencil" /></router-link> |
          <button href="#" class="text-red-500 underline" @click="deleteAnimal(index)">
          <font-awesome-icon icon="fa-solid fa-trash" /></button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  "name": "ListView",
  data() {
    return {
      "animalList": []
    }
  },
  "methods": {
    refreshList() {
      try {
        fetch("/api/animals/getAllAnimals")
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
      const idToDelete = this.animalList[index].id;
      try {
        this.$store.commit("deleteMedicalRecords", idToDelete);
        fetch(`/api/animals/deleteAnimal/${ idToDelete }`, {
          "method": "DELETE"
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
    }
  },
  mounted() {
    try {
      fetch("/api/animals/getAllAnimals")
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
</script>