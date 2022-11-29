<template>
  <div class="flex flex-col items-center py-2">
    <div class="w-4/5">
      <!-- form for basic data required to create an animal record -->
      <h1 class="text-2xl font-roboto tracking-wide text-center">Basic Records</h1>
      <form @submit.prevent>
        <div class="flex flex-col">
          <label for="animal-id" class="form-labels">Animal ID</label>
          <input type="text" id="animal-id" placeholder="will be auto-generated" disabled v-model="animal.animalId"
          class="disabled-inputs" />
        </div>
        <div class="flex space-x-8 mt-1">
          <div class="w-1/2 flex flex-col justify-between">
            <label for="common-name" class="form-labels" ref="commonNameRef">Common Name</label>
            <select name="common-names" id="common-name" v-model="animal.commonName" 
            class="rounded-sm border-2 border-t-0 border-x-0 bg-transparent outline-none border-gray-300 focus:border-blue-500">
              <option value="none" selected disabled hidden>Select Animal's Common Name</option>
              <optgroup label="Adoptable Animals">
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Parrot">Parrot</option>
              </optgroup>
              <optgroup label="Non-Adoptable Animals">
                <option value="Lion">Lion</option>
                <option value="Lizard-Family">Lizard Family</option>
                <option value="Antellope">Antellope</option>
                <option value="Gazelle">Gazelle</option>
                <option value="Giraffe">Giraffe</option>
                <option value="Other-Bird">Other Bird</option>
                <option value="Ape-">Ape</option>
              </optgroup>
            </select>
          </div>
          <div class="flex flex-col w-1/2">
            <label for="where-found" class="form-labels">Where Found</label>
            <input type="text" id="where-found" placeholder="e.g MiddleOf Nowhere, GlassCounty" 
            v-model="animal.whereFound" class="form-input-boxes" />
        </div>
        </div>
        <div class="flex space-x-8 mt-1">
          <div class="w-1/2 flex flex-col">
            <label for="age" class="form-labels">Age</label>
            <input type="text" id="age" placeholder="animal's age (years)" v-model="animal.age" class="form-input-boxes" />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="date-brought" class="form-labels">Date Brought Into Orphanage</label>
            <input type="date" id="date-brought" v-model="animal.dateBrought" class="date-pickers" />
          </div>
        </div>
      </form>
    </div>

    <!-- form for an animal adoption records -->
    <div class="w-4/5">
      <h1 class="text-2xl font-roboto tracking-wide text-center">Adoption Records</h1>
      <form @submit.prevent>
        <div class="flex space-x-8">
          <div class="w-1/2 flex flex-col">
            <label for="animal-id" class="form-labels">Animal Id</label>
            <input type="text" id="animal-id" placeholder="will be auto-generated" 
            v-model="animal.animalDetail.animalId" disabled class="disabled-inputs" />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="date-adopted" class="form-labels">Date Adopted</label>
            <input type="date" id="date-adopted" 
            v-model="animal.animalDetail.dateAdopted" class="date-pickers" />
          </div>
        </div>
        <div class="mt-1">
          <div class="flex flex-col w-full">
            <label for="adoptee-name" class="form-labels">Adoptee Name</label>
            <input type="text" id="adoptee-name" placeholder="e.g Jane Doe" 
            v-model="animal.animalDetail.adopteeName" class="form-input-boxes" />
          </div>
        </div>
        <div class="flex mt-1 space-x-8">
          <div class="flex flex-col w-1/2">
            <label for="contact-number" class="form-labels">Contact Number</label>
            <input type="text" id="contact-number" placeholder="e.g +254 7-1234-5673" 
            v-model="animal.animalDetail.contactNumber" class="form-input-boxes" />
          </div>
          <div class="flex flex-col w-1/2">
            <label for="location" class="form-labels">Residential Location</label>
            <input type="text" id="location" placeholder="e.g MiddleOf Nowhere, GlassCounty" 
            v-model="animal.animalDetail.residentialLocation" class="form-input-boxes" />
          </div>
        </div>
        <div class="mt-1 flex justify-start">
          <button v-if="action === 'create'" @click="createNewAnimal" class="form-button">Submit</button>
          <button v-else-if="action === 'update'" @click="updateAnimal" class="form-button">Update</button>
        </div>
      </form>
    </div>

    <!-- form for animal health progress records -->
    <div class="w-4/5">
      <h1 class="text-2xl font-roboto tracking-wide text-center">Medical Records</h1>
      <form @submit.prevent="onSubmit">
        <div class="flex justify-end mt-1">
          <button v-if="action === 'create'" class="save-or-update-button" @click="createNewMedRecord">Save</button>
          <button v-else-if="action === 'update'" class="save-or-update-button" @click="updateMedicalRecord">Update</button>
        </div>
        <div class="flex flex-col">
          <label for="animal-id" class="form-labels">Animal ID</label>
          <input type="text" id="animal-id" placeholder="will be auto-generated" v-model="animalProgress.animalId"
          class="disabled-inputs" disabled />
        </div>
        <div class="flex space-x-8 mt-1">
          <div class="flex flex-col w-1/2">
            <label for="foods" class="form-labels">Foods</label>
            <input type="text" id="foods" placeholder="separate list with comma" 
            v-model="animalProgress.foods" class="form-input-boxes" />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="animal-weight" class="form-labels">Weight</label>
            <input type="text" id="animal-weight" placeholder="animal's weight(Kg)" 
            v-model="animalProgress.weight" class="form-input-boxes" />
          </div>
        </div>
        <div class="flex flex-col mt-1">
          <div class="mt-2 px-[2.5rem] rounded-sm relative">
            <h1 class="text-lg font-roboto tracking-wide text-center">Checkup Updates</h1>
            <button class="scroll-buttons" id="btn-previous" @click="showPreviousRecord"
            :disabled="animalProgress.medicalProgress.length === 0 || currentRecord === 0">&lt;</button>
            <button class="scroll-buttons" id="btn-next" @click="showNextRecord"
            :disabled="animalProgress.medicalProgress.length === 0 || 
            currentRecord === animalProgress.medicalProgress.length - 1">&gt;</button>
            <!-- this form version is for displaying existing records -->
            <div v-if="showEntryForm === false">
              <div class="flex flex-col">
                <label for="checkup-date" class="form-labels">Checkup Date</label>
                <input type="date" id="checkup-date" v-model="medProgRec.checkupDate" 
                class="date-pickers" disabled />
              </div>
              <div class="flex flex-col mt-1">
                <label for="checkup-notes" class="form-labels">Checkup Notes</label>
                <textarea id="checkup-notes" cols="30" rows="5" placeholder="separate notes with a period [display version]" 
                v-text="medProgRec.checkupNotes" class="textarea-style" disabled></textarea>
              </div>
              <div class="flex flex-col mt-1">
                <label for="checkup-date" class="form-labels">Next Checkup Date</label>
                <input type="date" id="checkup-date" v-model="medProgRec.nextCheckupDate" 
                class="date-pickers" disabled />
              </div>
              <button class="misc-button" @click="showEntryForm = true,  addNewCheckupRecord()">New Checkup?</button>
            </div>
            <!-- this form section is for taking in input data -->
            <div v-else-if="showEntryForm === true">
              <div class="flex flex-col">
                <label for="checkup-date" class="form-labels">Checkup Date</label>
                <input type="date" id="checkup-date" v-model="medProg.checkupDate" class="date-pickers" />
              </div>
              <div class="flex flex-col mt-1">
                <label for="checkup-notes" class="form-labels">Checkup Notes</label>
                <textarea id="checkup-notes" cols="30" rows="5" placeholder="separate notes with a period [input version]" 
                v-model="medProg.checkupNotes" class="textarea-style"></textarea>
              </div>
              <div class="flex flex-col mt-1">
                <label for="checkup-date" class="form-labels">Next Checkup Date</label>
                <input type="date" id="checkup-date" v-model="medProg.nextCheckupDate" class="date-pickers" />
              </div>
              <div class="flex items-center space-x-3">
                <button class="misc-button" @click="newMedicalProgress(), showEntryForm = false">Save</button>
                <button class="misc-button" @click="showEntryForm = false">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AnimalEditorMixin from '../mixins/AnimalEditorMixin.js';
export default {
  "name": "EditorView",
  "mixins": [AnimalEditorMixin],
  mounted() {
    this.$refs.commonNameRef.focus();
    this.emitter.on("updateThisAnimal", (targetAnimal) => {
      this.action = "update";
      this.animal = targetAnimal;
      this.animal.animalId = targetAnimal.animalId;
      this.animal.animalDetail.animalId = targetAnimal.animalDetail.animalId;
      this.animalProgress.animalId = targetAnimal.animalId;
      this.getMedicalRecord(targetAnimal.animalId);
    })
  }
}
</script>

<style scoped>
  #btn-previous {
    left: 0.25rem;
  }
  #btn-next {
    right: 0.25rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
</style>