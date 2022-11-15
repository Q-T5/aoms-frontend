<template>
  <div class="w-full h-screen flex px-4 py-2 space-x-4">
    <div class="w-[55%] h-full py-2 flex rounded-lg shadow-sm shadow-gray-700">
      <form @submit.prevent class="w-[50rem] h-full flex flex-col space-y-3 justify-center">
        <div class="flex justify-center h-fit max-h-fit">
          <img src="/src/assets/profile-pic-placeholder.svg" alt="Profile Picture" class="w-[8rem] daisyui-mask daisyui-mask-circle" />
        </div>
        <div class="flex flex-col px-10 relative">
          <label for="staff-id" class="form-labels">Staff ID</label>
          <input type="text" id="staff-id" placeholder="auto-generated" v-model="staff.staffId" class="form-input-boxes" />
          <button class="autogen-button" @click="generateStaffId()">Auto-Generate</button>
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
        <div class="flex mt-1 px-10">
          <div class="flex flex-col justify-center w-1/3">
            <h1 class="form-labels">Account Status</h1>
            <div class="flex space-x-5 items-center mt-2">
              <div class="flex">
                <label for="account-status" class="mr-2">Active: </label>
                <input type="radio" name="account-status" id="account-status" class="daisyui-radio daisyui-radio-primary"
                v-model="staff.accountStatus" value="true" />
              </div>
              <div class="flex">
                <label for="account-status" class="mr-2">Inactive: </label>
                <input type="radio" name="account-status" id="account-status" class="daisyui-radio daisyui-radio-primary"
                v-model="staff.accountStatus" value="false" />
              </div>
            </div>
          </div>
          <div class="w-2/3 ml-7 flex flex-col">
            <label for="staff-role" class="form-labels">Staff Role</label>
            <div class="flex justify-between h-full items-end w-full">
              <div class="flex">
                <label for="account-status" class="mr-2">Editor: </label>
                <input type="checkbox" id="staff-role" v-model="staff.staffRole" class="daisyui-checkbox rounded" value="editor" />
              </div>
              <div class="flex">
                <label for="account-status" class="mr-2">Admin: </label>
                <input type="checkbox" id="staff-role" v-model="staff.staffRole" class="daisyui-checkbox rounded" value="admin" />
              </div>
              <div class="flex">
                <label for="account-status" class="mr-2">Manager: </label>
                <input type="checkbox" id="staff-role" v-model="staff.staffRole" class="daisyui-checkbox rounded" value="manager" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex space-x-8 mt-1 px-10">
          <div class="w-full flex flex-col relative">
            <label for="recovery-phrase" class="form-labels">Recovery String</label>
            <input type="text" id="recovery-phrase" placeholder="auto-generated" v-model="staff.recoveryPhrase" class="form-input-boxes" />
            <button class="autogen-button right-2">Auto-Generate</button>
          </div>
        </div>
        <div class="flex justify-center px-10">
          <button class="user-form-action-button" @click="signupUser()">Save</button>
        </div>
      </form>
    </div>
    <div class="w-[49%] h-full py-2 rounded-lg shadow-sm shadow-gray-700 flex flex-col p-2">
      <div class="w-full h-fit relative">
        <input type="text" name="staff-id" maxlength="25" placeholder="Search Staff By Id" class="search-system-users" />
        <button class="search-button rounded-md top-1 mr-1">Search</button>
      </div>
      <div class="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 flex flex-wrap py-2 px-0.5 justify-between space-y-2">
        <div class="w-[48%] h-fit border-[1px] border-blue-500 flex p-2 rounded-lg relative"
        @mouseenter="displayEditButtons = true" @mouseleave="displayEditButtons = false">
          <div class="flex flex-col justify-center w-2/3">
            <h1 class="text-lg">STAFF-12345</h1>
            <h2 class="italic text-base">John Doe</h2>
          </div>
          <div>
            <img src="/src/assets/profile-pic-placeholder.svg" alt="Profile Picture" class="w-[5rem] daisyui-mask daisyui-mask-circle" />
          </div>
          <div class="w-full absolute left-0 top-[25%] h-fit justify-center space-x-6 flex"
          :class="displayEditButtons == true ? 'flex' : 'hidden'">
            <button class="user-list-edit-btn bg-blue-500 hover:bg-blue-500"><font-awesome-icon icon="fa-solid fa-pencil" /></button>
            <button class="user-list-edit-btn bg-red-500 hover:bg-red-500"><font-awesome-icon icon="fa-solid fa-trash" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserManagementMixin from '../mixins/UserManagementMixin.js';
export default {
  "name": "UserSettings",
  mixins: [UserManagementMixin]
}
</script>

<style scoped>
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 10px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
}
</style>