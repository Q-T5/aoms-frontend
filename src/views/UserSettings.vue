<template>
  <div class="w-full h-screen flex flex-col">
    <div class="w-full h-full py-2 flex justify-center">
      <form @submit.prevent class="w-[50rem] py-2 h-full flex flex-col space-y-3 shadow-lg rouded-lg">
        <div class="flex justify-center h-fit max-h-fit">
          <img src="/src/assets/profile-pic-placeholder.svg" alt="Profile Picture" class="w-[8rem] daisyui-mask daisyui-mask-circle" />
        </div>
        <div class="flex flex-col px-10 relative">
          <label for="staff-id" class="form-labels">Staff ID</label>
          <input type="text" id="staff-id" placeholder="auto-generated" v-model="staff.staffId" class="form-input-boxes" />
          <button class="autogen-button">Auto-Generate</button>
        </div>
        <div class="flex space-x-8 mt-1 px-10">
          <div class="w-1/2 flex flex-col">
            <label for="first-name" class="form-labels">First Name</label>
            <input type="text" id="first-name" placeholder="e.g John" v-model="staff.firstName" class="form-input-boxes" />
          </div>
          <div class="w-1/2 flex flex-col">
            <label for="last-name" class="form-labels">Last Name</label>
            <input type="text" id="last-name" placeholder="e.g Doe" v-model="staff.lastName" class="form-input-boxes" />
          </div>
        </div>
        <div class="flex flex-col px-10">
          <label for="staff-id" class="form-labels">Staff Password</label>
          <input type="text" id="staff-id" placeholder="type a strong password" v-model="staff.password" class="form-input-boxes" />
        </div>
        <div class="flex flex-col px-10">
          <h1 class="form-labels">Account Status</h1>
          <div class="flex space-x-5 items-center mt-2">
            <div class="flex">
              <label for="account-status" class="mr-2">Active: </label>
              <input type="radio" name="account-status" id="account-status" class="daisyui-radio daisyui-radio-primary"
              v-model="staff.accountStatus" />
            </div>
            <div class="flex">
              <label for="account-status" class="mr-2">Inactive: </label>
              <input type="radio" name="account-status" id="account-status" class="daisyui-radio daisyui-radio-primary"
              v-model="staff.accountStatus" />
            </div>
          </div>
        </div>
        <div class="flex space-x-8 mt-1 px-10">
          <div class="w-1/2 flex flex-col">
            <label for="staff-role" class="form-labels">Staff Role</label>
            <input type="text" id="staff-role" placeholder="pick a role" v-model="staff.staffRole" class="form-input-boxes" />
          </div>
          <div class="w-1/2 flex flex-col relative">
            <label for="recovery-phrase" class="form-labels">Recovery String</label>
            <input type="text" id="recovery-phrase" placeholder="auto-generated" v-model="staff.recoveryPhrase" class="form-input-boxes" />
            <button class="autogen-button right-2">Auto-Generate</button>
          </div>
        </div>
        <div class="flex justify-center px-10">
          <button class="user-form-action-button">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  "name": "UserSettings",
  data() {
    return {
      "searchId": "",
      "staff": {
        "staffId": "",
        "firstName": "",
        "lastName": "",
        "password": "",
        "accountStatus": "",
        "staffRole": "",
        "recoveryPhrase": ""
      }
    }
  }
}
</script>