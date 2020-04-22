<template>
    <div>
        <v-app>
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
                    <tr v-for="index in 5" :key="index">
                        <td>no</td>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                    </tr>

                    <tr class="footer">
                        <th scope="row">Totals</th>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                        <td>test1</td>
                        <td>test2</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-app>
    </div>
</template>


<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table, th, td {
    border: thin solid black;
    border-collapse: collapse;
}
.footer{
    border: 2px solid black;
}

</style>