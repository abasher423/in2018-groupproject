<template>
    <div id="transactions">
        <v-app class="text-justify">
            <div class="display-2">Transactions <v-switch v-model="unpaidOnly" class="ma-2" label="Show unpaid only"></v-switch> </div>
            <v-expansion-panels
                multiple>
                <v-expansion-panel
                    v-for="transaction in transactions"
                    :key="transaction._id"
                >
                    <div
                        v-if="(($store.state.user.priviledge != 'Advisor') || ($store.state.user.uniqueNumber === transaction.blank.advisor.uniqueNumber)) && (transaction.paid === 'No' || !unpaidOnly)"
                    >
                        <v-expansion-panel-header class="headline">Blank Number: {{transaction.blank.uniqueNumber}}<v-spacer></v-spacer>{{transaction.date}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="text-justify subtitle-1">
                                <ul style="list-style-type:none;">
                                    <li>Advisor: {{transaction.blank.advisor.name}}</li>
                                    <li v-if="transaction.customer">Customer: {{transaction.customer.fullName}}</li>
                                    <li>Paid: {{transaction.paid}} 
                                        <div>
                                            <Payment :transaction="transaction" v-if="transaction.paid === 'No'"/>
                                        </div>
                                    </li>
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
import TransactionsService from '@/services/TransactionsService'
import Payment from '@/components/Payment'
export default {
    components: {
        Payment
    },
    data(){
        return {
            transactions: null,
            unpaidOnly: false,
        }
    },
    async mounted() {
        this.transactions = (await TransactionsService.index()).data.transactions
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>