<template>
    <div>
        <v-app>
            <v-content>
                <v-container fluid > 
                    <h1> Global Interline Report </h1>
                    <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <td rowspan="3" class="text-center">NN</td>
                                <th class="text-center" colspan="3" scope="colgroup">Air Via Documents</th>
                                <th class="text-center" colspan="2" scope="colgroup">Forms Of Payment</th>
                                <td class="text-center" rowspan="1" colspan="2">Taxes (USD)</td>
                                <td class="text-center" rowspan="3">Total Paid (USD)</td>
                                <th class="text-center" rowspan="1" :colspan="2" scope="colgroup">Commissions Assessable Amounts</th>
                            </tr>
                            <tr>
                                <td class="text-center" rowspan="2">Advisor Number</td>
                                <td class="text-center" rowspan="2">Doc numbers ACPNS</td>
                                <td class="text-center" rowspan="2">Total Documnt's Amount (USD)</td>
                                <td class="text-center" rowspan="2">Cash (USD)</td>
                                <td class="text-center" rowspan="2">Credit Card (USD)</td>
                                <td class="text-center" rowspan="1">LZ</td>
                                <td class="text-center" rowspan="1">Others</td>
                                <td v-for="comm in commissions" :key="comm" class="text-center" rowspan="2">{{(comm * 100)}}%</td>
                            </tr>
                            
                            </thead>
                            <tbody>
                            <tr v-for="(trs, number) in grouped" :key="number">
                                <td></td>
                                <td>{{number}}</td>
                                <td>{{trs.transactions.length}}</td>
                                <td>{{(trs.total).toFixed(2)}}</td>
                                <td>{{(trs.cash).toFixed(2)}}</td>
                                <td>{{(trs.card).toFixed(2)}}</td>
                                <td>{{(trs.tax).toFixed(2)}}</td>
                                <td>{{(trs.taxO).toFixed(2)}}</td>
                                <td>{{(trs.totalP).toFixed(2)}}</td>
                                <td v-for="comm in commissions" :key="comm"><div v-if="trs.totComms[comm]">{{(trs.totComms[comm]).toFixed(2)}}</div></td>
                            </tr>
                            
                            <!-- I could not get the total to work for global reports -->
                            <!-- <tr class="footer">
                                <td class="text-left" >Number of TKTS:</td>
                                <td>{{}}</td>
                                <td>{{tot.docs}}</td>
                                <td>{{(tot.fare).toFixed(2)}}</td>
                                <td>{{(tot.cash).toFixed(2)}}</td>
                                <td>{{(tot.card).toFixed(2)}}</td>
                                <td>{{(tot.tax).toFixed(2)}}</td>
                                <td>{{(tot.total).toFixed(2)}}</td>
                                <td v-for="sum in commsTot" :key="sum">{{sum.toFixed(2)}}</td>
                            </tr> -->
                            <!-- <tr>
                                <td  colspan="6" rowspan="2"></td>
                                <td  colspan="2"> Total Commission Amounts</td>
                                 <td v-for="(sum, name) in commsTot" :key="sum">{{(sum * parseFloat(name)).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                 <td  colspan="2"> Net Amounts for Agent Debit</td>
                                 <td v-for="(sum, name) in commsTot" :key="sum">{{(sum - sum * parseFloat(name)).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="text-right" colspan="4">Total Nett Amount for Bank Remittence to "Air Via" (USD)</td>
                                <td class="text-left" colspan="2">{{net.toFixed(2)}}</td>
                            </tr> -->
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
import UsersService from '@/services/UsersService'
export default {
    data:() => ({
        reportData: null,
        err: null,
        datemin: "01-01-2020",
        datemax: "26-04-2020",
        transactions: null,
        advisors: null,
        grouped: null,
        mySet: new Set(),
        commissions: null,
        counter: 0,
        commsTot: null,
        tot: {},
        net: 0
    }),
    
    async mounted() {
        this.init()
    }, 

    methods:{
        async init() {
            const vm = this
            
            try{
                
                this.transactions = ((await TransactionsService.getIndDomReport(this.datemin + "!" + this.datemax)).data.transactions)
                this.advisors = (await UsersService.index()).data.users.filter(function (usr){ return usr.priviledge === 'Advisor'})
                this.grouped = {}
                for(const usr of this.advisors){
                    this.grouped[usr.uniqueNumber] = {}
                    
                    this.grouped[usr.uniqueNumber].transactions = this.transactions
                    .filter(function (tr){
                        return tr.blank.advisor.uniqueNumber == usr.uniqueNumber &&
                            ['444', '440', '420'].includes(tr.blank.uniqueNumber.slice(0,3));
                    }).sort((a, b) => (a.blank.uniqueNumber > b.blank.uniqueNumber) ? 1 : -1)

                    

                    this.grouped[usr.uniqueNumber].total = 0
                    this.grouped[usr.uniqueNumber].cash = 0
                    this.grouped[usr.uniqueNumber].card = 0
                    this.grouped[usr.uniqueNumber].tax = 0
                    this.grouped[usr.uniqueNumber].taxO = 0
                    this.grouped[usr.uniqueNumber].totalP = 0
                    this.grouped[usr.uniqueNumber].totComms = {}

                    for(const tr of this.grouped[usr.uniqueNumber].transactions){
                
                        this.grouped[usr.uniqueNumber].total = this.grouped[usr.uniqueNumber].total + ((tr.amount / tr.conversionRate))
                        if(tr.paymentType === 'Cash'){
                            this.grouped[usr.uniqueNumber].cash = this.grouped[usr.uniqueNumber].cash + ((tr.amount / tr.conversionRate)) + ((tr.taxLocal / tr.conversionRate)) + ((tr.taxOther / tr.conversionRate))
                        } else {
                            this.grouped[usr.uniqueNumber].card = this.grouped[usr.uniqueNumber].card + ((tr.amount / tr.conversionRate)) + ((tr.taxLocal / tr.conversionRate)) + ((tr.taxOther / tr.conversionRate))
                        }

                        this.grouped[usr.uniqueNumber].taxO = this.grouped[usr.uniqueNumber].taxO + ((tr.taxOther / tr.conversionRate))
                        this.grouped[usr.uniqueNumber].tax = this.grouped[usr.uniqueNumber].tax + ((tr.taxLocal / tr.conversionRate))

                        this.grouped[usr.uniqueNumber].totalP = this.grouped[usr.uniqueNumber].totalP + ((tr.taxLocal / tr.conversionRate)) + ((tr.amount / tr.conversionRate)) + ((tr.taxOther / tr.conversionRate))

                        if(tr.commission === undefined){
                            continue
                        } else {
                            this.mySet.add(tr.commission)
                            if(this.grouped[usr.uniqueNumber].totComms[tr.commission] === undefined){
                                this.grouped[usr.uniqueNumber].totComms[tr.commission] = ((tr.amount / tr.conversionRate))
                            } else {
                                this.grouped[usr.uniqueNumber].totComms[tr.commission] = this.grouped[usr.uniqueNumber].totComms[tr.commission] + ((tr.amount / tr.conversionRate))
                            }
                        }
                    }
                }
                this.commissions = Array.from(this.mySet)
                console.log(this.grouped)
                //console.log(this.transactions)

                // let tot = {
                //         docs: 0,
                //         fare: 0,
                //         cash: 0,
                //         card: 0,
                //         tax: 0,
                //         total: 0,
                //     }

                // for(const adv in this.grouped){
                //     //tot.docs = tot.docs + adv.transactions.length 
                //     tot.fare = tot.fare + parseFloat(adv.total)
                //     tot.cash = tot.cash + adv.cash
                //     tot.card = tot.card + adv.card
                //     tot.tax = tot.tax + adv.tax
                //     tot.total = tot.total + adv.totalP
                // }

                // // for(const [com, sum] of Object.entries(commsTot)){
                // //     this.net = this.net - sum * com
                // // }

                // // this.commissions = Array.from(mySet)
                // // this.commsTot = commsTot
                // this.tot = tot
                // console.log(this.tot)
                // // console.log(this.commissions.length)
                // // console.log(commsTot)
                // // console.log(tot)
            } catch(err){
                console.log(err)
            }


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