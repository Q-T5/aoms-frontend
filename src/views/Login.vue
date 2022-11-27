<template>
  <div style="background-image: url('/src/assets/login_wallpaper.jpg');">
    <div class="grid h-screen place-items-center backdrop-blur-sm">
      <div class="w-[40rem] shadow-xl rounded flex">
        <div class="p-2 w-full">
          <h1 class="text-3xl font-roboto tracking-wide text-center text-white">SYSTEM LOGIN</h1>
          <form class="flex flex-col space-y-2 w-full" @submit.prevent @keypress.enter="login">
            <div class="flex flex-col">
              <label for="username-box" class="form-labels">Staff ID</label>
              <input type="text" id="username-box" placeholder="enter staff id" 
              class="form-input-boxes text-white text-lg" v-model="userCredentials.staffId" ref="usernameRef" />
            </div>
            <div class="flex flex-col space-y-1 relative">
              <label for="password-box" class="form-labels">Password</label>
              <input :type="inputType" id="password-box" class="form-input-boxes text-white text-lg" 
              placeholder="enter password" v-model="userCredentials.password" :disabled="forgotPassword" />
              <font-awesome-icon icon="fa-solid fa-eye" class="absolute bottom-[15px] right-2" 
              @click="inputType == 'password' ? inputType = 'text' : inputType = 'password' " />
            </div>
            <router-link :to="{ 'name': 'GeneralView' }" type="submit" class="login-button" 
            @click="login">Login</router-link>
            <div class="flex flex-col space-y-1 relative">
              <div class="w-full flex space-x-2 justify-center">
                <label for="forgot-password" class="form-labels">Forgot Password: </label>
                <input type="checkbox" id="forgot-password" class="daisyui-checkbox daisyui-checkbox-secondary daisyui-checkbox-sm rounded border-blue-500" v-model="forgotPassword" />
              </div>
              <div class="flex w-full flex-col" v-show="forgotPassword">
                <div class="flex w-full justify-between space-x-4">
                  <div class="w-1/2 flex flex-col">
                    <label for="new-password" class="form-labels">New Password</label>
                    <input type="password" id="new-password" placeholder="type new password" 
                    v-model="passwordResetCredentials.newPassword" class="form-input-boxes" />
                  </div>
                  <div class="w-1/2 flex flex-col">
                    <label for="conf-new-pass" class="form-labels">Confirm New Password</label>
                    <input type="password" id="conf-new-pass" placeholder="retype new password" 
                    v-model="passwordResetCredentials.confirmNewPassword" class="form-input-boxes" />
                  </div>
                </div>
                <button class="passreset-button" @click="resetPassword"
                :disabled="
                this.userCredentials.staffId === '' || 
                this.passwordResetCredentials.newPassword === '' || 
                this.passwordResetCredentials.confirmNewPassword === '' || 
                this.passwordResetCredentials.newPassword !== this.passwordResetCredentials.confirmNewPassword">Reset Password</button>
              </div>
            </div>
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
  name: "Login",
  data() {
    return {
      userCredentials: {
        staffId: "",
        password: "",
      },
      inputType: "password",
      forgotPassword: false,
      passwordResetCredentials: {
        newPassword: "",
        confirmNewPassword: ""
      },
      disablePasswordField: false,
    }
  },
  "methods": {
    login: function() {
      fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.userCredentials)
      }).then((response) => {
        if(response.status !== 200) {
          throw "error login you in";
        } else {
          return response.json();
        } 
      }).then((data) => {
        this.$store.commit("LOGIN_USER", data);
        this.$store.commit("displayNotification", ["successful login", "daisyui-alert-success", "success.svg"]);
        this.$router.push({ name: "GeneralView" });
      }).catch((error) => {
        this.$store.commit("displayNotification", ["server responded with an error", "daisyui-alert-error", "error.svg"]);
      });
    },
    resetPassword: function() {
      const resetObject = {
        staffId: this.userCredentials.staffId,
        newPassword: this.passwordResetCredentials.newPassword
      }

      fetch("/api/auth/passReset", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(resetObject)
      }).then((response) => {
        if(response.status !== 200) {
          this.$store.commit("displayNotification", ["error reseting password, please try again", "daisyui-alert-error", "error.svg"]);
        }
        this.$store.commit("displayNotification", ["successfully reset your password", "daisyui-alert-success", "success.svg"]);
        this.forgotPassword = false
      })
    }
  },  
  mounted() {
    this.$refs.usernameRef.focus();
  },
}
</script>