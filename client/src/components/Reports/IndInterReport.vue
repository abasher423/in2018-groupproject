<template>
    <div>
        <v-app>
            <v-content>
                <v-container fluid > 
                    <h1> Individual Interline Report</h1>
                    <v-select
                        :items="['250', '211']"
                        v-model="advisor"
                        v-if="this.$store.state.user.priviledge === 'Manager'"
                        v-on:change="update"
                        label="Advisor"
                        required
                    ></v-select>
                    <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <td rowspan="3" class="text-center">NN</td>
                                <th class="text-center" colspan="4" scope="colgroup">Air Via Documents</th>
                                <th class="text-center" colspan="2" scope="colgroup">Forms Of Payment</th>
                                <td class="text-center" rowspan="1" colspan="2">Taxes (USD)</td>
                                <td class="text-center" rowspan="3">Total Paid (USD)</td>
                                <th class="text-center" rowspan="1" :colspan="commissions.length" scope="colgroup">Commissions Assessable Amounts</th>
                            </tr>
                            <tr>
                                <td class="text-center" rowspan="2">Original Issued Number</td>
                                <td class="text-center" rowspan="2">Fare Base (Local Currency)</td>
                                <td class="text-center" rowspan="2">Conversion Rate to USD</td>
                                <td class="text-center" rowspan="2">Fare (USD)</td>
                                <td class="text-center" rowspan="2">Cash (USD)</td>
                                <td class="text-center" rowspan="2">Credit Card (USD)</td>
                                <td class="text-center" rowspan="2">LZ(USD)</td>
                                <td class="text-center" rowspan="2">OTHS(USD)</td>
                                <td v-for="comm in commissions" :key="comm" class="text-center" rowspan="2">{{(comm * 100)}}%</td>
                            </tr>
                            
                            </thead>
                            <tbody>
                            <tr v-for="transaction in transactions" :key="transaction.blank.uniqueNumber">
                                <td></td>
                                <td>{{transaction.blank.uniqueNumber}}</td>
                                <td>{{transaction.amount}}</td>
                                <td>{{transaction.conversionRate}}</td>
                                <td>{{(transaction.amount / transaction.conversionRate).toFixed(2)}}</td>
                                <td><div v-if="transaction.paymentType === 'Cash'">{{((transaction.taxLocal / transaction.conversionRate) + (transaction.amount / transaction.conversionRate) + (transaction.taxOther / transaction.conversionRate)).toFixed(2)}}</div></td>
                                <td><div v-if="transaction.paymentType === 'Card'">{{((transaction.taxLocal / transaction.conversionRate) + (transaction.amount / transaction.conversionRate) + (transaction.taxOther / transaction.conversionRate)).toFixed(2)}}</div></td>
                                <td>{{(transaction.taxLocal / transaction.conversionRate).toFixed(2)}}</td>
                                 <td>{{(transaction.taxOther / transaction.conversionRate).toFixed(2)}}</td>
                                <td>{{ ((transaction.taxLocal / transaction.conversionRate) + (transaction.amount / transaction.conversionRate) + (transaction.taxOther / transaction.conversionRate)).toFixed(2)}}</td>
                                <td v-for="comm in commissions" :key="comm"><div v-if="transaction.commission === comm">{{(transaction.amount / transaction.conversionRate).toFixed(2)}}</div></td>
                            </tr>

                            <tr class="footer">
                                <td class="text-left" colspan="2">Number of TKTS: {{transactions.length}}</td>
                                <td></td>
                                <td></td>
                                <td>{{tot.fare.toFixed(2)}}</td>
                                <td>{{tot.cash.toFixed(2)}}</td>
                                <td>{{tot.card.toFixed(2)}}</td>
                                <td>{{tot.tax.toFixed(2)}}</td>
                                <td>{{tot.taxOth.toFixed(2)}}</td>
                                <td>{{tot.total.toFixed(2)}}</td>
                                <td v-for="sum in commsTot" :key="sum">{{sum.toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td  colspan="8" rowspan="2"></td>
                                <td  colspan="2"> Total Commission Amounts</td>
                                 <td v-for="(sum, name) in commsTot" :key="sum">{{(sum * parseFloat(name)).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                 <td  colspan="2"> Net Amounts for Agent Debit</td>
                                 <td v-for="(sum, name) in commsTot" :key="sum">{{(sum - sum * parseFloat(name)).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="text-right" colspan="6">Total Nett Amount for Bank Remittence to "Air Via" (USD)</td>
                                <td class="text-left" colspan="2">{{net.toFixed(2)}}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>


<script>
import TransactionsService from '@/services/TransactionsService'
export default {
    data:() => ({
        reportData: null,
        err: null,
        datemin: "01-01-2020",
        datemax: "26-04-2020",
        transactions: null,
        commissions: null,
        counter: 0,
        commsTot: null,
        tot: null,
        net: 0,
        advisor: null
    }),
    
    async mounted() {
        if(this.$store.state.user.priviledge === 'Advisor'){
            this.advisor = this.$store.state.user.uniqueNumber
            this.init()
        }
    }, 

    methods:{
        async init() {
            const vm = this
            try{
                this.transactions = ((await TransactionsService.getIndDomReport(this.datemin + "!" + this.datemax)).data.transactions).filter(function (tr){
                    return tr.blank.advisor.uniqueNumber == vm.advisor &&
                        ['440', '420', '444'].includes(tr.blank.uniqueNumber.slice(0,3));
                }).sort((a, b) => (a.blank.uniqueNumber > b.blank.uniqueNumber) ? 1 : -1)
                console.log(this.transactions)
            } catch(err){
                console.log(err)
            }

            let mySet = new Set()
            let commsTot = {}
            let tot = {
                        fare: 0,
                        cash: 0,
                        card: 0,
                        tax: 0,
                        taxOth: 0, 
                        total: 0,
                    }

            for(const tr of this.transactions){
                
                tot.fare = (tot.fare) + ((tr.amount / tr.conversionRate))
                if(tr.paymentType === 'Cash'){
                    tot.cash = tot.cash + ((tr.taxLocal / tr.conversionRate)) + ((tr.amount / tr.conversionRate)) + ((tr.taxOther / tr.conversionRate))
                } else {
                    tot.card = tot.card + ((tr.taxLocal / tr.conversionRate)) + ((tr.amount / tr.conversionRate)) + ((tr.taxOther / tr.conversionRate))
                }

                tot.tax = tot.tax + ((tr.taxLocal / tr.conversionRate))

                tot.taxOth = tot.taxOth + ((tr.taxOther / tr.conversionRate))

                tot.total = tot.total + ((tr.taxLocal / tr.conversionRate)) + ((tr.amount / tr.conversionRate)) + ((tr.taxOther / tr.conversionRate))

                
                if(tr.commission === undefined){
                    continue
                } else {
                    mySet.add(tr.commission)
                    if(commsTot[tr.commission] === undefined){
                        commsTot[tr.commission] = ((tr.amount / tr.conversionRate))
                    } else {
                        commsTot[tr.commission] = commsTot[tr.commission] + ((tr.amount / tr.conversionRate))
                    }
                }
            }

            this.net = tot.total

            for(const [com, sum] of Object.entries(commsTot)){
                this.net = this.net - sum * com
            }

            this.commissions = Array.from(mySet)
            this.commsTot = commsTot
            this.tot = tot

            console.log(this.commissions.length)
            console.log(commsTot)
            console.log(tot)


        },

        update(){
            this.init()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table, th, td {
    border: thin solid black;
}
.footer{
    border: 2px solid black;
}

</style>