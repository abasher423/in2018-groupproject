<template>
    <div id="customers">
        <v-app class="text-justify">
            <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Blank Type</th>
                  <th class="text-left">Commission Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value,name) in commission" :key="name">
                  <td>{{name}}</td>
                  <td>{{value}}</td>
                </tr>
              </tbody>
              <div>
                 <CommissionEdit></CommissionEdit>
              </div>
            </template>
          </v-simple-table>
        </v-app>
    </div>
    <!-- <v-list v-for=" (value, name) in commission" :key="name"> -->
</template>



<script>
import CommissionService from '@/services/CommissionService'
import CommissionEdit from '@/components/CommissionEdit'
export default {
    components: {
      CommissionEdit
    },
    data(){
        return {
            commission: null,
            interlineText: '',
            domesticText: ''
        }
    },
    async mounted() {
        this.commission = (await CommissionService.index()).data
       // console.log(this.commission)
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>