<template>
  <div class="flex flex-col items-center py-2">
    <div class="w-4/5">
      <!-- form for basic data required to create an animal -->
      <h1 class="text-2xl font-roboto tracking-wide text-center">Animal Details</h1>
      <div class="w-full flex justify-center my-1" v-show="displayFormError" >
        <div class="form-error-notif">
          <img src="/src/assets/error.svg" alt="success-icon" class="w-6" />
          <p>Fill all fields in this section</p>
        </div>
      </div>
      <form @submit.prevent="onSubmit">
        <div class="flex flex-col">
          <label for="animal-id" class="form-labels">Animal ID</label>
          <input type="text" id="animal-id" placeholder="will be auto-generated" disabled v-model="animal.animalId"
          class="disabled-inputs" />
        </div>
        <div class="flex space-x-8 mt-1">
          <div class="w-1/2 flex flex-col">
            <label for="pet-name" class="form-labels">Pet Name</label>
            <input type="text" id="pet-name" placeholder="e.g Sunny or Rufus" v-model="animal.petName"
            class="form-input-boxes" ref="petnameRef" />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="common-name" class="form-labels">Common Name</label>
            <input type="text" id="common-name" placeholder="e.g dog or cat" 
            v-model="animal.commonName" class="form-input-boxes" />
          </div>
        </div>
        <div class="flex space-x-8 mt-1">
          <div class="w-1/2 flex flex-col">
            <label for="age" class="form-labels">Age</label>
            <input type="text" id="age" placeholder="animal's age (years)" v-model="animal.age"
            class="form-input-boxes" />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="date-brought" class="form-labels">Date Brought Into Orphanage</label>
            <input type="date" id="date-brought" v-model="animal.animalDetail.dateBrought"
            class="date-pickers" />
          </div>
        </div>
      </form>
    </div>

    <!-- form for animal records -->
    <div class="w-4/5">
      <h1 class="text-2xl font-roboto tracking-wide text-center">Animal Adoption Details</h1>
      <form @submit.prevent="onSubmit">
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

    <!-- form for animal progress records -->
    <div class="w-4/5">
      <h1 class="text-2xl font-roboto tracking-wide text-center">Medical Progress Records</h1>
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
        <div class="flex flex-col mt-1">
          <div class="flex space-x-8">
            <div class="w-1/2 flex flex-col">
              <label for="animal-weight" class="form-labels">Weight</label>
              <input type="text" id="animal-weight" placeholder="animal's weight(Kg)" 
              v-model="animalProgress.clinicalState.weight" class="form-input-boxes" />
            </div>
            <div class="w-1/2 flex flex-col">
              <label for="number-of-children" class="form-labels">Number of Children</label>
              <input type="text" id="number-of-children" placeholder="e.g 2" 
              v-model="animalProgress.clinicalState.numberOfChildren" class="form-input-boxes" />
            </div>
          </div>
          <div class="flex flex-col mt-1">
            <label for="medical-state" class="form-labels">Medical State</label>
            <input type="text" id="medical-state" placeholder="e.g has broken nose" 
            v-model="animalProgress.clinicalState.medicalState" class="form-input-boxes" />
          </div>
          <div class="flex space-x-8 mt-1">
            <div class="flex flex-col w-1/2">
              <label for="where-found" class="form-labels">Where Found</label>
              <input type="text" id="where-found" placeholder="e.g MiddleOf Nowhere, GlassCounty" 
              v-model="animalProgress.whereFound" class="form-input-boxes" />
            </div>
            <div class="flex flex-col w-1/2">
              <label for="foods" class="form-labels">Foods</label>
              <input type="text" id="foods" placeholder="separate list with comma" 
              v-model="animalProgress.foods" class="form-input-boxes" />
            </div>
          </div>
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
  "name": "AnimalEditor",
  "mixins": [AnimalEditorMixin],
  mounted() {
    this.$refs.petnameRef.focus();
    this.emitter.on("updateThisAnimal", (targetAnimal) => {
      this.action = "update";
      this.displayFormError = false;
      this.animal = targetAnimal;
      this.animal.animalId = targetAnimal.id;
      this.animal.animalDetail.animalId = targetAnimal.animalDetail.id;
      this.animalProgress.animalId = targetAnimal.id;
      this.getMedicalRecord(targetAnimal.id);
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
    background: #f1f1f1;
    border-radius: 10px;
  }
</style>
</style>