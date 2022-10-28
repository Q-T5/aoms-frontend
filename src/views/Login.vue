<template>
  <div class="flex justify-center" style="background-image: url('/src/assets/login_wallpaper.jpg');">
    <div class="grid h-screen place-items-center">
      <div class="w-[50rem] shadow-xl rounded flex">
        <div>
          <img src="../assets/cat_image.jpg" alt="cat-image" class="h-96 w-96" />
        </div>
        <div class="p-2">
          <h1 class="text-3xl font-roboto tracking-wide text-center text-white">STAFF LOGIN</h1>
          <form class="flex flex-col space-y-3">
            <div class="inline-flex flex-col space-y-1">
              <p class="quote">
                "Animals are such agreeable friends—they ask no questions; they pass no criticisms."<br />
                <span class="self-end text-lg mr-1">~ By: George Eliot</span>
              </p>
              <label for="username-box" class="form-labels">Staff ID</label>
              <input type="text" id="username-box" placeholder="enter staff id" 
              class="form-input-boxes text-white text-lg" v-model="username" ref="usernameRef" />
            </div>
            <div class="inline-flex flex-col space-y-1 relative">
              <label for="password-box" class="form-labels">Password</label>
              <input :type="inputType" id="password-box" class="form-input-boxes text-white text-lg" 
              placeholder="enter password" v-model="password" />
              <font-awesome-icon icon="fa-solid fa-eye" class="absolute bottom-[15px] right-2" @click="inputType == 'password' ? inputType = 'text' : inputType = 'password' " />
            </div>
              <router-link :to="{ 'name': 'GeneralView' }" type="submit" class="login-button" 
              @click="$store.commit('displayNotification', ['successfully logged in', 
              'daisyui-alert-success', 'success.svg'])">Login</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
  <footer class="w-full flex fixed bottom-0.5 font-nunito font-semibold justify-center text-lg">
    <p class="inline-flex text-white items-center text-sm">Made with <span class="text-red-500 mx-1">&hearts;</span> in 
      <img src="/src/assets/java-logo.svg" alt="Java Logo" class="w-4 mx-1"> and
      <img src="/src/assets/vue.svg" alt="Vue Logo" class="w-[0.80rem] mx-1">
    </p>
  </footer>
</template>

<script>
export default {
  "name": "Login",
  data() {
    return {
      "username": "",
      "password": "",
      "inputType": "password"
    }
  },
  mounted() {
    this.$refs.usernameRef.focus();
  }
}
</script>