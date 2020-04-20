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
                  <v-list v-for=" (value, name) in commission" :key="name">
                    <v-list-item-content>
                      <v-list class="text-left">{{name}}</v-list>
                      
                    </v-list-item-content>
                            
                  </v-list>
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
            commission: null,
            dialog: false,
            interlineText: '',
            domesticText: ''
        }
    },
    async mounted() {
        this.commission = (await CommissionService.index()).data
        //console.log(this.commission)
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>