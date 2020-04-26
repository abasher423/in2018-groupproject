<template>
    <div>
        <v-app>
            <v-content>
                <v-container fluid >
                    <h1> Blank Stock Report</h1> 
                    <v-simple-table dense>
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <td rowspan="3" class="text-center">NN</td>
                                <th class="text-center" colspan="2" scope="colgroup">Received Blanks</th>
                                <th class="text-center" colspan="5" scope="colgroup">Assigned/Used Blanks</th>
                                <th class="text-center" colspan="5" scope="colgroup">Final Amounts</th>
                            </tr>
                            <tr>
                                <th class="text-center" scope="colgroup" colspan="2">Agent's Stock</th>
                                <th class="text-center" scope="colgroup" colspan="5">(Sub Agents')</th>
                                <th class="text-center" scope="colgroup" colspan="2">Agent's Amount</th>
                                <th class="text-center" scope="colgroup" colspan="3">Sub Agent's Amount</th>
                            </tr>
                            <tr>
                                <th class="text-center" scope="col">From/To Blanks Nbrs</th>
                                <th class="text-center" scope="col">Amnt</th>
                                <th class="text-center" scope="col">Code</th>
                                <th class="text-center" scope="col">Assigned (From/To)</th>
                                <th class="text-center" scope="col">Amnt</th>
                                <th class="text-center" scope="col">Used (From/To)</th>
                                <th class="text-center" scope="col">Amnt</th>
                                <th class="text-center" scope="col">From/To</th>
                                <th class="text-center" scope="col">Amnt</th>
                                <th class="text-center" scope="col">Code</th>
                                <th class="text-center" scope="col">From/To</th>
                                <th class="text-center" scope="col">Amnt</th>
                            </tr>
                            
                            </thead>
                            <tbody>
                            <tr v-for="index in counter" :key="index">
                                <td>{{index}}</td>
                                <td>{{ranges.added.ranges[index - 1]}}</td>
                                <td>{{ranges.added.amounts[index - 1]}}</td>
                                <td>{{ranges.assigned.advisors[index - 1]}}</td>
                                <td>{{ranges.assigned.ranges[index - 1]}}</td>
                                <td>{{ranges.assigned.amounts[index - 1]}}</td>
                                <td>{{ranges.used.ranges[index - 1]}}</td>
                                <td>{{ranges.used.amounts[index - 1]}}</td>
                                <td>{{ranges.totals.ranges[index - 1]}}</td>
                                <td>{{ranges.totals.amounts[index - 1]}}</td>
                                <td>{{ranges.totalsByAgents.advisors[index - 1]}}</td>
                                <td>{{ranges.totalsByAgents.ranges[index - 1]}}</td>
                                <td>{{ranges.totalsByAgents.amounts[index - 1]}}</td>
                            </tr>

                            <tr id="footer">
                                <th scope="row">Totals</th>
                                <td></td>
                                <td>{{ranges.added.amounts.reduce((a,b) => a + b, 0)}}</td>
                                <td></td>
                                <td></td>
                                <td>{{ranges.assigned.amounts.reduce((a,b) => a + b, 0)}}</td>
                                <td></td>
                                <td>{{ranges.used.amounts.reduce((a,b) => a + b, 0)}}</td>
                                <td></td>
                                <td>{{ranges.totals.amounts.reduce((a,b) => a + b, 0)}}</td>
                                <td></td>
                                <td></td>
                                <td>{{ranges.totalsByAgents.amounts.reduce((a,b) => a + b, 0)}}</td>
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
import BlanksService from '@/services/BlanksService'
export default {
    data:() => ({
        reportData: null,
        err: null,
        datemin: "01-01-2020",
        datemax: "26-04-2020",
        ranges: {
                    added: {
                                ranges: [],
                                amounts: []
                            },
                    assigned: {
                                ranges: [],
                                amounts: [],
                                advisors: []
                                },
                    used: {
                                ranges: [],
                                amounts: []
                            },
                    totals: {
                                ranges: [],
                                amounts: []
                            },
                    totalsByAgents: {
                                ranges: [],
                                amounts: [],
                                advisors: []
                                },
                },
        counter: 0
    }),
    async mounted() {
        try{
            this.reportData = (await BlanksService.getReportData(this.datemin + "!" + this.datemax)).data
            console.log(this.reportData)
        } catch(error){
            this.err = error.response.data.message
        }

        let min = this.reportData.added[0]

        let max = this.reportData.added[0]

        for(const i of this.reportData.added){
            if(i - max > 1 || i - max < 0){
                this.ranges.added.ranges.push(min + "-" + max)
                this.ranges.added.amounts.push(max - min + 1)
                min = i
                max = i
            } else {
                max = i
            }
        }
        this.ranges.added.ranges.push(min + "-" + max)
        this.ranges.added.amounts.push(max - min + 1)
        console.log(this.ranges.added)

        let advisor = this.reportData.assigned[0].advisor

        min = this.reportData.assigned[0].uniqueNumber

        max = this.reportData.assigned[0].uniqueNumber

        for(const i of this.reportData.assigned){
            if((i.uniqueNumber - max > 1 || i.uniqueNumber - max < 0) || i.advisor != advisor){
                this.ranges.assigned.ranges.push(min + "-" + max)
                this.ranges.assigned.amounts.push(max - min + 1)
                this.ranges.assigned.advisors.push(advisor)
                advisor = i.advisor
                min = i.uniqueNumber
                max = i.uniqueNumber
            } else {
                max = i.uniqueNumber
            }
        }
        this.ranges.assigned.ranges.push(min + "-" + max)
        this.ranges.assigned.amounts.push(max - min + 1)
        this.ranges.assigned.advisors.push(advisor)
        console.log(this.ranges.assigned)

        this.reportData.used.sort()

        min = this.reportData.used[0]

        max = this.reportData.used[0]

        for(const i of this.reportData.used){
            if(i - max > 1 || i - max < 0){
                this.ranges.used.ranges.push(min + "-" + max)
                this.ranges.used.amounts.push(max - min + 1)
                min = i
                max = i
            } else {
                max = i
            }
        }
        this.ranges.used.ranges.push(min + "-" + max)
        this.ranges.used.amounts.push(max - min + 1)
        console.log(this.ranges.used)

        min = this.reportData.totals[0].uniqueNumber

        max = this.reportData.totals[0].uniqueNumber

        for(const i of this.reportData.totals){
            if((i.uniqueNumber - max > 1 || i.uniqueNumber - max < 0)){
                this.ranges.totals.ranges.push(min + "-" + max)
                this.ranges.totals.amounts.push(max - min + 1)
                min = i.uniqueNumber
            } 
            max = i.uniqueNumber
        }
        this.ranges.totals.ranges.push(min + "-" + max)
        this.ranges.totals.amounts.push(max - min + 1)
        console.log(this.ranges.totals)

        advisor = null

        min = null

        max = null

        for(const i of this.reportData.totals){
            if(advisor){
                if((i.uniqueNumber - max > 1 || i.uniqueNumber - max < 0) || i.advisor != advisor){
                    this.ranges.totalsByAgents.ranges.push(min + "-" + max)
                    this.ranges.totalsByAgents.amounts.push(max - min + 1)
                    this.ranges.totalsByAgents.advisors.push(advisor)
                    advisor = i.advisor
                    min = i.uniqueNumber
                }
                max = i.uniqueNumber
                
            } else {
                if(i.advisor){
                    advisor = i.advisor
                    min = i.uniqueNumber
                    max = i.uniqueNumber
                }
            }
        }
        if(advisor){
            this.ranges.totalsByAgents.ranges.push(min + "-" + max)
            this.ranges.totalsByAgents.amounts.push(max - min + 1)
            this.ranges.totalsByAgents.advisors.push(advisor)
        }
        console.log(this.ranges.totalsByAgents)

        this.counter = Math.max(this.ranges.added.ranges.length, 
                                this.ranges.assigned.ranges.length, 
                                this.ranges.used.ranges.length, 
                                this.ranges.totals.ranges.length, 
                                this.ranges.totalsByAgents.ranges.length, 
                                )
    } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
#footer td{
    border: 1px solid black;
}

</style>