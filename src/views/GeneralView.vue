<template>
  <div class="w-full h-screen">
    <div class="flex flex-col overflow-y-scroll w-full scrollbar-thin scrollbar-thumb-gray-500 relative p-4">
      <h1 class="text-2xl font-roboto tracking-wide text-left">
        Your Stats At a Glance <font-awesome-icon icon="fa-solid fa-eye" />
      </h1>
      <div class="w-full flex space-x-1">
        <div class="w-1/2 h-[20rem] border-[1px] border-blue-500 rounded-md relative">
          <canvas id="barAnimalNumber"><!-- horizontal bar chart for comparing animal numbers --></canvas>
        </div>
        <div class="w-1/2 h-[20rem] border-[1px] border-blue-500 rounded-md relative">
          <canvas id="pieAnimalDistNumber"><!-- pie chart for comparing animal numbers --></canvas>
        </div>
      </div>
      <div class="w-full flex flex-col space-y-1 mt-1">
        <div class="w-full flex space-x-1">
          <div class="w-2/3 h-[26rem] border-[1px] border-blue-500 rounded-md relative">
            <div class="w-full flex justify-center">
              <input type="text" id="factor" placeholder="Enter factor to predict with"
              v-model="predictionFactor" />
              <button @click="applyPrediction(predictionFactor)">Predict</button>
            </div>
            <canvas id="numberPredictor"><!-- adoption trend line chart --></canvas>
          </div>
          <div class="w-1/3 h-[26rem] border-[1px] border-blue-500 rounded-md relative">
            <canvas id="diseaseComparison"><!-- horizontal bar graph diseases comparison --></canvas>
          </div>
        </div>
        <!-- <div class="w-full rounded-md border-[1px] border-blue-500 h-[26rem] relative">
          <canvas> animal projected population growth line graph </canvas>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import GeneralViewMixin from '../mixins/GeneralViewMixin';
export default {
  name: "GeneralView",
  mixins: [GeneralViewMixin]
}
</script>
<style>
  ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
</style>