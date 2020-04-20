<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" block class="ma-2" dark v-on="on">Edit Commission</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit Commission Rates</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                    <div>
                        <p class="text-left headline">Rates</p>
                    </div>
                     <v-text-field v-for="(value, key) in formData" :key="key"
                          v-bind:label=" 'Blank Type - '+key" v-model.number="formData[key]"
                          ></v-text-field>

                        <v-card-actions>
                            <v-btn color="primary"  
                            @click="editCommission"
                            >Save</v-btn>
                            <v-btn color="primary"  @click="dialog = false">Close</v-btn>
                        </v-card-actions>

                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
         
        </v-card>
      </v-dialog>
</template>


<script>
import CommissionService from '@/services/CommissionService'
export default {
    components: {
    },
    data(){
        return {
             dialog: false,
             commission: null,
            formData: {
                444: null,
                440: null,
                420: null,
                201: null,
                101: null,
                451: null,
                452: null
            }

        }
    },
    async mounted() {
        
    },
    methods: {
        async editCommission(){
            try{
               await CommissionService.create(this.formData);
               
            }
           catch(error){
            console.log(error.response)
          }
    }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>