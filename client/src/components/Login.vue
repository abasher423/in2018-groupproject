<template>
  <v-app>
    <v-content>
      <v-container
        fluid
      >
        <v-row
          align="start"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="uniqueNumber"
                    v-model="uniqueNumber"
                    label="ID"
                    name="uniqueNumber"
                    prepend-icon="person"
                    type="text"
                  />

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
                <div v-if="error != null"> <v-icon>info</v-icon> {{error}} </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn 
                  color="primary"
                  @click="login">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Login',
  props: {
      source: String,
  },
  data () {
    return {
      uniqueNumber: '',
      password: '',
      error: null
    }
  }, 
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          uniqueNumber: this.uniqueNumber,
          password: this.password,
          _id: this._id
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
        name: 'menu'
      })
      } catch (error){
        this.error = error.response.data.message
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
