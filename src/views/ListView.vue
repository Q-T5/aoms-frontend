<template>
  <div class="flex flex-col p-2">
    <div class="relative border-blue-500 border-[1px] rounded-full self-center outline-none mb-0.5 w-fit">
      <input type="text" placeholder="Search by animal id or common name... " class="search-box" maxlength="25"
      v-model="searchVal" />
    </div>
    <div class="flex flex-col justify-between h-full">
      <table class="w-full">
        <tr class="bg-blue-500 font-poppins">
          <th class="table-headers">Animal Picture</th>
          <th class="table-headers">Animal Id</th>
          <th class="table-headers">Pet Name</th>
          <th class="table-headers">Common Name</th>
          <th class="table-headers">Age(Years)</th>
          <th class="table-headers">Date Brought</th>
          <th class="text-base py-0 text-center font-roboto font-normal text-white">Action</th>
        </tr>
        <tr class="table-row" v-for="(animal, index) in filteredRows" :key="animal.index">
          <td> <img src="../assets/animal-pic-placeholder.svg" alt="animal-picture" class="w-14 ml-7 border-[1px] border-blue-500 rounded-md"> </td>
          <td> {{ animal.animalId }} </td>
          <td> {{ animal.petName }}</td>
          <td> {{ animal.commonName }}</td>
          <td> {{ animal.age }}</td>
          <td> {{ animal.dateBrought }}</td>
          <td class="text-center">
            <router-link :to="{ 'name': 'EditorView' }" class="text-blue-500/80 hover:text-blue-500 text-md" 
            @click="updateAnimal(index)"><font-awesome-icon icon="fa-solid fa-pencil" /></router-link> |
            <button class="text-red-500/80 hover:text-red-500 text-md" @click="deleteAnimal(index)">
            <font-awesome-icon icon="fa-solid fa-trash" /></button>
          </td>
        </tr>
      </table>
      <div class="daisyui-btn-group w-full flex justify-center">
        <button class="daisyui-btn rounded-md"><font-awesome-icon icon="fa-solid fa-angle-double-left" /></button>
        <button class="daisyui-btn uppercase">Page 1</button>
        <button class="daisyui-btn rounded-md"><font-awesome-icon icon="fa-solid fa-angle-double-right" /></button>
      </div>
    </div>
  </div>
</template>

<script>
import ListViewMixin from '../mixins/ListViewMixin.js';
export default {
  "name": "ListView",
  "mixins": [ListViewMixin]
}
</script>