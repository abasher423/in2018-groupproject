<template>
  <v-toolbar fixed class="primary">
    <v-toolbar-title class="mr-4">
      <router-link 
        class="home"
        tag="span"
        :to="{
          name: 'menu'
        }">
        <v-icon large dark>home</v-icon>
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer> 
    <v-toolbar-title class="white--text">AirVia</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      
      <v-btn 
        v-if="$store.state.isUserLoggedIn"
        color='primary' 
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}
</style>