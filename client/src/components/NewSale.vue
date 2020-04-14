<template>
<div id="app">
    <v-app id="inspire">
        <v-form v-model="valid">
        <v-container>
            <v-row>
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="firstname"
                :rules="nameRules"
                :counter="10"
                label="Amount"
                required
                ></v-text-field>
            </v-col>
    
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="lastname"
                :rules="nameRules"
                :counter="10"
                label="Currency"
                required
                ></v-text-field>
            </v-col>
    
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Conversion Rate to USD"
                required
                ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
                <v-select
                :items="['444', '440', '420', '201', '101', '451', '452']"
                v-model="type"
                v-on:change="update"
                label="Blank Type"
                required
                ></v-select>
            </v-col>

            <v-col
                cols="12"
                md="8"
            >
                <v-select
                :items="blanks"
                label="Blank Number"
                required
                ></v-select>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                label="Tax"
                required
                ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                label="Tax Local"
                required
                ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
            </v-col>
            <v-col
                cols="12"
                md="8"
            >
                <v-select
                :items="customers"
                label="Customer"
                required
                ></v-select>
            </v-col>
            
            </v-row>
        </v-container>
        </v-form>
    </v-app>
</div>
</template>

<script>
import UsersService from '@/services/UsersService'
import BlanksService from '@/services/BlanksService'
import TransactionsService from '@/services/TransactionsService'
export default {

data: () => ({
    blanks: ['Please specify blank type'],
    customers: null,
    type: null,
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
    async mounted() {
        //this.transactions = (await TransactionsService.index()).data.transactions
        let customers = (await UsersService.index()).data.users
        for(let user of users){
            if(user.priviledge === 'Advisor'){
                this.advisorNo.push(user.name)
                this.advisorId.push(user._id)
            }
        }
    },
  methods: {
      update(){
          console.log(this.type)
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>