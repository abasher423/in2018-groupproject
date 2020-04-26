<template>
    <div id="transactions">
        <v-app class="text-justify">
            <v-container>
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
                                        <div v-if="transaction.refunded === false && transaction.paid == 'Yes'">
                                            <v-btn 
                                            color="primary"  
                                            dark
                                            small 
                                            v-model="refund"
                                            @click="refundlog(transaction)"
                                            >Refund</v-btn>
                                        </div>
                                    </li>
                                    <li v-if="transaction.paid == 'No'"><Payment @paidUpdate="onPaidUpdate" :transaction="transaction"/></li>
                                </ul>
                            </div>
                        </v-expansion-panel-content>
                    </div>
                </v-expansion-panel>
            </v-expansion-panels>
            <div v-if="error != null">
                  <v-icon>info</v-icon>
                  {{error}}
            </div>
            </v-container>
        </v-app>
    </div>
</template>


<script>
import TransactionsService from '@/services/TransactionsService'
import RefundService from '@/services/RefundService'
import Payment from '@/components/Payment'
export default {
    components: {
        Payment
    },
    data(){
        return {
            transactions: null,
            unpaidOnly: false,
            added: null,
            userId: null,
            error: null,
            refund: null,
            date: new Date().toISOString().substr(0, 10),
        }
    },
    async mounted() {
        try{
           this.transactions = (await TransactionsService.index()).data.transactions
        // const response = await TransactionsService.index();
        // this.transactions = response.data.transactions;
        console.log(this.transactions);

        // this.transactions.forEach(transaction => {
        // this.amount = transaction.amount 
        // console.log(this.amount)
        // })

        this.userId = this.$store.state.user.priviledge
        } catch(error){
            this.error = error.response.data.message
        }
           
    },
    methods: {
        async onPaidUpdate (transactionId, paymentType, cardType, cardNumber, date) {
            let pairs = [{propName: "paymentType", value: null}, {propName: "cardType", value: null}, {propName: "cardNumber", value: null}, {propName: "datePaid", value: null}]
            pairs[0].value = paymentType
            pairs[1].value = cardType
            pairs[2].value = cardNumber
            pairs[3].value = date
            try {
                await TransactionsService.update(transactionId, pairs)
            } catch (error) {
                this.error = error.response.data.message
            }
            try{
                this.transactions = (await TransactionsService.index()).data.transactions
            } catch(error){
                this.error = error.response.data.message
            }
        },
        async refundlog(transaction){
            try{
               await RefundService.create(this.date, transaction.blank.uniqueNumber)
               let pairs = [{propName: "refunded", value: true}]
               await TransactionsService.updateRefunded(transaction._id, pairs)
               this.$router.push({
                    name: 'menu'
                })
               
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