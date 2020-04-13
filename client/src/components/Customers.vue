<template>
    <div id="customers">
        <v-snackbar v-model="snackbar">
            <span>{{snackbarText}} is late on payment</span>
            <v-btn text color="white" :timeout="0" @click="snackbar = false">close</v-btn>
        </v-snackbar>
        <v-app class="text-justify">
            <div class="display-2">Customers </div>
            <v-expansion-panels
                multiple>
                <v-expansion-panel
                    v-for="customer in customers"
                    :key="customer._id"
                >
                    <div >
                        <v-expansion-panel-header class="headline">{{customer.alias}}<v-spacer></v-spacer></v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="text-justify subtitle-1">
                                <ul style="list-style-type:none;">
                                    <li>Customer Name: {{customer.fullName}}</li>
                                     <li>Status: {{customer.status}}</li>
                                    <li v-if="customer.phone">Phone No: {{customer.phone}}</li>
                                    <li v-if="customer.discount">Discount: {{customer.discount}}</li>
                                </ul>
                            </div>
                        </v-expansion-panel-content>
                    </div>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-app>
    </div>
</template>


<script>
import CustomersService from '@/services/CustomersService'
export default {
    components: {
    },
    data(){
        return {
            customers: null,
            snackbar: true,
            latePayment: false,
            snackbarText: ""
        }
    },
    async mounted() {
        this.customers = (await CustomersService.index()).data.customers
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>