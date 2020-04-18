<template>
    <div id="customers">
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
                                    <li v-if="customer.discount">
                                        <Discount  @discountUpdate="onDiscountUpdate" :customer="customer" /> 
                                    </li>
                                </ul>
                            </div>
                           
                        </v-expansion-panel-content>
                    </div>
                </v-expansion-panel>
            </v-expansion-panels>
            <v-snackbar-queue
            :items="items"
            :timeout="timeout"
            @remove="removeItem"
            ></v-snackbar-queue>
        </v-app>
    </div>
</template>

<script>
import CustomersService from '@/services/CustomersService'
import Discount from '@/components/Discount'
import _ from 'lodash'
export default {
    components: {
        Discount
    },
    data(){
        return {
            customers: null,
            id: 0,
            items: [],
            timeout: 300000,
            discounts: [],
            //snackbar: true
        }
    },
    async mounted() {
        this.customers = (await CustomersService.index()).data.customers
        
        for(let customer of this.customers){
            if(customer.lateOnPayment){
                this.addItem(customer)
            }
        }
    },
    methods: {
		    addItem (customer) {
		        const vm = this
		        vm.id++
		        vm.items.push({
		            id: vm.id,
		            color: 'info',
		            message: `${customer.fullName} is late on payment`
		        })  
		    },
		    removeItem (id) {
		        const vm = this
		        const index = _.findIndex(vm.items, {id})
		        
		        if (index !== -1) {
		            vm.items.splice(index, 1)
		        }   
            },
            async onDiscountUpdate(){
                this.customers = (await CustomersService.index()).data.customers
            }
 		}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>