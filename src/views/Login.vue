<template>
  <div class="flex">
    <div class="w-1/3 relative">
      <img src="../assets/cat_image.jpg" alt="cat-image" class="h-screen w-fit object-cover" />
      <p class="quote">
      "One small pet changes coming home to an empty house to coming home."<br />
      <span class="self-end text-lg mr-1">~ Original by: Pam Brown</span>
      </p>
    </div>
    <div class="grid h-screen place-items-center w-2/3">
      <div class="w-[40rem] shadow-md p-2 rounded">
        <h1 class="text-3xl font-roboto tracking-wide text-center">STAFF LOGIN</h1>
        <form class="flex flex-col space-y-3">
          <div class="inline-flex flex-col space-y-1">
            <label for="username-box" class="form-labels">Staff ID</label>
            <input type="text" id="username-box" placeholder="enter staff id" 
            class="form-input-boxes" v-model="username" ref="usernameRef" />
          </div>
          <div class="inline-flex flex-col space-y-1">
            <label for="password-box" class="form-labels">Password</label>
            <input type="password" id="password-box" class="form-input-boxes" 
            placeholder="enter password" v-model="password" />
          </div>
          <div>
            <router-link :to="{ 'name': 'Management' }" type="submit" class="login-button" 
            @click="$store.commit('displayNotification', ['successfully logged in', 
            'daisyui-alert-success', 'success.svg'])">Login</router-link>
            <router-link :to="{ 'name': 'Signup' }" class="signup-button">Sign Up</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer class="w-full flex fixed bottom-0.5 font-nunito font-semibold justify-center text-lg">
    <p>Made with <span class="text-red-500">&hearts;</span> in 
      <font-awesome-icon icon="fa-brands fa-java" /> and 
      <font-awesome-icon icon="fa-brands fa-vuejs" />
    </p>
  </footer>
</template>

<script>
export default {
  "name": "Login",
  data() {
    return {
      "username": "",
      "password": ""
    }
  },
  mounted() {
    this.$refs.usernameRef.focus();
  }
}
</script>