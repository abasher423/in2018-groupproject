<template>
    <div id="menu">
        <v-app>
            <v-container>
            <v-row justify="center" >
                <v-col cols="12" sm="4">

                    <v-dialog v-model="addtoggle" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn 
                            v-if="$store.state.user.priviledge === 'Admin'"
                            color="primary" block class="ma-2" v-on="on">Add Blanks</v-btn>
                        </template>
                        <v-card>
                        <v-card-title>
                            <span class="headline">Add Blanks</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-form ref="add" v-model="valid">
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range Start" v-model="blankmin" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range End" v-model="blankmax" required></v-text-field>
                                </v-col>
                            </v-row>
                            </v-form>
                            </v-container>
                        </v-card-text>
                        <div v-if="error != null"> <v-icon>info</v-icon> {{error}} </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click="addtoggle = false" v-on:click="resetAdd">Close</v-btn>
                            <v-btn color="primary"  @click="addBlanks">Save</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>

                    <v-dialog v-model="removetoggle" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn 
                            v-if="$store.state.user.priviledge === 'Admin'"
                            color="primary" block class="ma-2" v-on="on">Remove Blanks</v-btn>
                        </template>
                        <v-card>
                        <v-card-title>
                            <span class="headline">Remove Blanks</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-form ref="remove" v-model="valid">
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range Start" v-model="blankmin" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Range End" v-model="blankmax" required></v-text-field>
                                </v-col>
                            </v-row>
                            </v-form>
                            </v-container>
                        </v-card-text>
                        <div v-if="error != null"> <v-icon>info</v-icon> {{error}} </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click="removetoggle = false" v-on:click="resetRemove">Close</v-btn>
                            <v-btn color="primary"  @click="removeBlanks">Save</v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
                    
                     <!--v-if="!$store.state.user.priviledge === 'Advisor'"-->
                    <v-dialog v-model="searchtoggle" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn 
                            v-if="$store.state.user.priviledge != 'Advisor'"
                            color="primary" block class="ma-2" v-on="on">Search for a blank</v-btn>
                        </template>
                        <v-card>
                        <v-card-title>
                            <span class="headline">Search</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-form ref="search" v-model="valid">
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <v-text-field label="Blank Number" v-model="blankmin" required></v-text-field>
                                </v-col>
                            </v-row>
                            </v-form>
                            </v-container>
                        </v-card-text>
                        <div v-if="error != null"> <v-icon>info</v-icon> {{error}} </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click="searchtoggle = false" v-on:click="resetSearch">Close</v-btn>
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
                            <v-btn 
                            v-if="$store.state.user.priviledge === 'Manager'"
                            color="primary" block class="ma-2" v-on="on">Assign Blanks</v-btn>
                        </template>
                        <v-card>
                        <v-card-title>
                            <span class="headline">Assign Blanks</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                            <v-form ref="assign" v-model="valid">
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
                            </v-form>
                            </v-container>
                        </v-card-text>
                        <div v-if="error != null"> <v-icon>info</v-icon> {{error}} </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click="resetAssign">Close</v-btn>
                            <v-btn color="primary"  @click="checkBlanks">Save</v-btn>

                            <v-dialog
                                v-model="checktoggle"
                                persistent 
                                max-width="600px"
                            >
                                <v-card>
                                
                                <v-card-title>Are you sure you want to reassign these?</v-card-title>
                                <v-list v-for="blank in blanks" :key="blank.number">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-title>{{blank.number}} - {{blank.advisor}}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list>
                        
                                <v-divider></v-divider>
                        
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                    color="primary"
                                    @click="checktoggle = false"
                                    >
                                    Cancel
                                    </v-btn>
                                    <v-btn
                                    color="primary"
                                    @click="assignBlanks"
                                    >
                                    Reassign
                                    </v-btn>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>
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
            checktoggle: false,
            error: null,
            blanks: [],
            valid: null,
            
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
                this.error = err.response.data.message
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
                this.error = err.response.data.message
            }
        },

        async searchBlank() {
            try {
                this.blank = (await BlanksService.getSingleByUniqueNo(this.blankmin)).data.blank
                //this.transaction = (await TransactionsService.getSingleByBlank(this.blank._id)).data.transaction
                this.searchtoggle = false
                this.blankinfotoggle = true
                this.blankmin = null
                this.blankmax = null
            } catch (err) {
                this.error = err.response.data.message
            }
            try{
                this.transaction = (await TransactionsService.getSingleByBlank(this.blank._id)).data.transaction
            } catch(error){}
        },

        async checkBlanks(){
            let blanks = []
            try {
                for (let index = this.blankmin; index <= this.blankmax; index++) {
                    let blank = (await BlanksService.getSingleByUniqueNo(index)).data.blank
                    if(blank.advisor != null){
                        blanks.push({advisor: blank.advisor.name, number: blank.uniqueNumber})
                    }
                }

                if(blanks.length > 0){
                    this.checktoggle = true
                    this.blanks = blanks
                } else {
                    this.assignBlanks()
                }
            } catch (err) {
                this.error = err.response.data.message
            }
        },

        async assignBlanks(){
            this.checktoggle = false
            let pairs = [{propName: "advisor", value: null}]
            let id = this.advisorId[this.advisorNo.indexOf(this.indadvisorNo)]
            pairs[0].value = id
            try {
                for (let index = this.blankmin; index <= this.blankmax; index++) {
                    await BlanksService.updateBlank(index, pairs)
                }
                this.assigntoggle = false
                this.blankmin = null
                this.blankmax = null
            } catch (err) {
                this.error = err.response.data.message
            }
        }, 

        resetAdd(){
            this.$refs.add.reset()
            this.addtoggle=false
            this.valid = null
            this.error = null
        },

        resetRemove(){
            this.$refs.remove.reset()
            this.removetoggle=false
            this.valid = null
            this.error = null
        },

        resetSearch(){
            this.$refs.search.reset()
            this.searchtoggle=false
            this.valid = null
            this.error = null
        },

        resetAssign(){
            this.$refs.assign.reset()
            this.assigntoggle=false
            this.valid = null
            this.error = null
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>