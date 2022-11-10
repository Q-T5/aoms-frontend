<template>
  <div style="background-image: url('/src/assets/login_wallpaper.jpg')">
    <div class="grid h-screen place-items-center backdrop-blur-sm">
      <div class="w-[40rem] shadow-xl rounded flex">
        <div class="p-2">
          <h1 class="text-3xl font-roboto tracking-wide text-center text-white">SYSTEM LOGIN</h1>
          <form class="flex flex-col space-y-3">
            <div class="inline-flex flex-col space-y-1">
              <p class="quote">
                "Animals are such agreeable friends—they ask no questions; they pass no criticisms."<br />
                <span class="self-end text-lg mr-1">~ By: George Eliot</span>
              </p>
              <label for="username-box" class="form-labels">Staff ID</label>
              <input type="text" id="username-box" placeholder="enter staff id" 
              class="form-input-boxes text-white text-lg" v-model="userCredentials.staffId" ref="usernameRef" />
            </div>
            <div class="inline-flex flex-col space-y-1 relative">
              <label for="password-box" class="form-labels">Password</label>
              <input :type="inputType" id="password-box" class="form-input-boxes text-white text-lg" 
              placeholder="enter password" v-model="userCredentials.password" />
              <font-awesome-icon icon="fa-solid fa-eye" class="absolute bottom-[15px] right-2" 
              @click="inputType == 'password' ? inputType = 'text' : inputType = 'password' " />
            </div>
              <router-link :to="{ 'name': 'GeneralView' }" type="submit" class="login-button" 
              @click="login()">Login</router-link>
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
      "userCredentials": {
        "staffId": "",
        "password": "",
      },
      "inputType": "password"
    }
  },
  "methods": {
    login() {
      if(this.userCredentials.staffId !== "" && this.userCredentials.password !== "") {
        fetch("http://localhost:8080/api/auth/signin", {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": JSON.stringify(this.userCredentials)
        }).then((response) => {
          if(response.status === 200) {
            this.$store.commit("LOGIN_USER", response.json());
            this.$store.commit("displayNotification", ["successful login", "daisyui-alert-success", "success.svg"]);
            this.$router.push({ name: "GeneralView" });
          } else if(response.status === 500) {
            this.$store.commit("displayNotification", ["invalid login", "daisyui-alert-error", "error.svg"]);
          }
        }).catch((error) => {
          console.log(`${ error }: Failed to log you in`);
        })
      } else {
        this.$store.commit("displayNotification", ["please enter your logins", "daisyui-alert-error", "error.svg"]);
      }
    }
  },
  mounted() {
    this.$refs.usernameRef.focus();
  }
}
</script>