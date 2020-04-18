<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" block class="ma-2" dark v-on="on">Commission</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Commission Rates</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                    <div>
                        <p class="text-left headline" >{{this.interlines}}</p>
                        <v-text-field label='change interlines rate' v-model="interlineText"></v-text-field>
                        
                    </div>
                      <p class="text-left headline">{{this.domestic}}</p>
                        <v-text-field label='change domestic rate' v-model="domesticText"></v-text-field>
                        <v-btn dark color='#2196F3'>Save</v-btn>
                        <v-btn dark color='#2196F3'>Close</v-btn>

                    <div>
                        
                    </div>
                    
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
            commission: [],
            dialog: false,
            interlineText: '',
            domesticText: ''
        }
    },
    async mounted() {
        this.interlines = (await CommissionService.index()).data.interlines
        this.domestic = (await CommissionService.index()).data.domestic
        console.log(this.commission)
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>