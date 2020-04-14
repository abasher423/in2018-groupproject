<template>
    <div id="menu">
        <v-app>
            <v-container>
            <v-row justify="center" >
                <v-col cols="12" sm="4">

                    <v-dialog v-model="addtoggle" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" block class="ma-2" v-on="on">Add Blanks</v-btn>
                        </template>
                        <v-card>
                        <v-card-title>
                            <span class="headline">Add Blanks</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range Start" v-model="blankmin" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range End" v-model="blankmax" required></v-text-field>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click="addtoggle = false">Close</v-btn>
                            <v-btn color="primary"  @click="addBlanks">Save</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="removetoggle" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" block class="ma-2" v-on="on">Remove Blanks</v-btn>
                        </template>
                        <v-card>
                        <v-card-title>
                            <span class="headline">Remove Blanks</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range Start" v-model="blankmin" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range End" v-model="blankmax" required></v-text-field>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click="removetoggle = false">Close</v-btn>
                            <v-btn color="primary"  @click="removeBlanks">Save</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                    
                     <!--v-if="!$store.state.user.priviledge === 'Advisor'"-->
                    <v-dialog v-model="searchtoggle" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" block class="ma-2" v-on="on">Search for a blank</v-btn>
                        </template>
                        <v-card>
                        <v-card-title>
                            <span class="headline">Search</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Number" v-model="blankmin" required></v-text-field>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click="searchtoggle = false">Close</v-btn>
                            <v-btn color="primary"  @click="searchBlank">Search</v-btn>

                            <v-dialog
                                v-model="blankinfotoggle"
                                persistent 
                                max-width="600px"
                            >
                                <v-card>
                        
                                <v-card-text v-if="blank != null">
                                     <span class="headline"> Blank Information</span>
                                     <div class="text-justify subtitle-1">
                                        <ul style="list-style-type:none;">
                                            <li>Advisor: {{blank.advisor.name}}</li>
                                        </ul>
                                    </div>
                                    <div v-if="transaction != null">
                                    <span class="headline"> Associated Transaction</span>
                                     <div class="text-justify subtitle-1">
                                        <ul style="list-style-type:none;">
                                            <li>Customer: {{transaction.customer.fullName}}</li>
                                        </ul>
                                    </div>
                                    </div>
                                </v-card-text>
                        
                                <v-divider></v-divider>
                        
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                    color="primary"
                                    @click="blankinfotoggle = false"
                                    >
                                    Close
                                    </v-btn>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="assigntoggle" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" block class="ma-2" v-on="on">Assign Blanks</v-btn>
                        </template>
                        <v-card>
                        <v-card-title>
                            <span class="headline">Assign Blanks</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range Start" v-model="blankmin" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range End" v-model="blankmax" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-select label="Advisor" v-model="indadvisorNo" required :items="advisorNo"></v-select>
                                </v-col>
                            </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click="assigntoggle=false">Close</v-btn>
                            <v-btn color="primary"  @click="assignBlanks">Save</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-btn
                        v-if="$store.state.user.priviledge === 'Admin'"
                        block
                        color="primary"
                        class="ma-2"
                        :to="{
                            name: 'users'
                        }"
                        >Stock Turnover Reports
                    </v-btn>
                </v-col>
            </v-row>
            </v-container>
        </v-app>
    </div>
</template>


<script>
import UsersService from '@/services/UsersService'
import BlanksService from '@/services/BlanksService'
import TransactionsService from '@/services/TransactionsService'
export default {
    components: {
    },
    data(){
        return {
            blank: null,
            transaction: null,
            blankmin: null,
            blankmax: null,
            multiBlank: null,
            advisorNo: [],
            indadvisorNo: null,
            advisorId: [],
            addtoggle: false,
            removetoggle: false,
            searchtoggle: false,
            blankinfotoggle: false,
            blankviewtoggle: false,
            assigntoggle: false,
            err: null
            
        }
    },
    async mounted() {
        //this.transactions = (await TransactionsService.index()).data.transactions
        let users = (await UsersService.index()).data.users
        for(let user of users){
            if(user.priviledge === 'Advisor'){
                this.advisorNo.push(user.name)
                this.advisorId.push(user._id)
            }
        }
    },
    methods: {
        async addBlanks() {
            try {
                for (let index = this.blankmin; index <= this.blankmax; index++) {
                    await BlanksService.create({uniqueNumber: index})
                }
                this.addtoggle = false
                this.blankmin = null
                this.blankmax = null
            } catch (err) {
                console.log(err)
            }
        },

        async removeBlanks() {
            try {
                for (let index = this.blankmin; index <= this.blankmax; index++) {
                    await BlanksService.remove(index)
                }
                this.removetoggle = false
                this.blankmin = null
                this.blankmax = null
            } catch (err) {
                console.log(err)
            }
        },

        async searchBlank() {
            try {
                this.blank = (await BlanksService.getSingleByUniqueNo(this.blankmin)).data.blank
                this.transaction = (await TransactionsService.getSingleByBlank(this.blank._id)).data.transaction
                this.searchtoggle = false
                this.blankinfotoggle = true
                this.blankmin = null
                this.blankmax = null
            } catch (err) {
                console.log(err.message)
            }
        },

        async assignBlanks(){
            let pairs = [{propName: "advisor", value: null}]
            let id = this.advisorId[this.advisorNo.indexOf(this.indadvisorNo)]
            pairs[0].value = id
            try {
                for (let index = this.blankmin; index <= this.blankmax; index++) {
                    await BlanksService.updateBlank(id, pairs)
                }
                this.assigntoggle = false
                this.blankmin = null
                this.blankmax = null
            } catch (err) {
                console.log(err)
            }
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>