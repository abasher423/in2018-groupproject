<template>
  <div id="app">
    <v-app fluid>
      <page-header 
        v-if="$store.state.isUserLoggedIn"
      />
      <main>
      <v-content>
          <v-container> 
            <router-view/>
          </v-container>
        </v-content>
      </main>
    </v-app>
  </div>
</template>

<script>
import PageHeader from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
