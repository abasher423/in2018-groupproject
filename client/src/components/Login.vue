<template>
  <div>
    <h1>Login</h1>

    <input 
      type="email"
      name="email"
      v-model="email"
      placeholder="email" />
    <br>
    <input 
      type="password"
      name="password"
      v-model="password"
      placeholder="password" />
    <br>
    <button
      @click="login">
      Login
    </button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }, 
  // watch: {
  //   email (value){
  //     console.log("email has changed", value);
  //   }
  // },
  methods: {
    async login() {
       const response = await AuthenticationService.login({
         email: this.email,
         password: this.password
       })
       console.log(response.data)
    }
  }
  // mounted () {
  //   setTimeout(() => {
  //     this.email = 'hello world'
  //   }, 2000)
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
