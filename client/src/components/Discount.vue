<template>
    <v-dialog v-model="discounttoggle" persistent max-width="600px">
        <template v-slot:activator="{ on }">
            <v-btn color="primary" small v-on="on">Discount Plan</v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Discount Plan</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                <v-row>
                    <div >
                        <p class="text-left headline">Current Discount Plan</p>
                    </div>
                    <v-col cols="12" sm="12">
                        <ul class="text-left subtitle-1" style="list-style-type: none;">
                            <li>Discounts for cumulative amount spend within a month: </li>
                            <li v-for="(value, name) in customer.discount" :key="name"> 
                                Above {{name}}.00 USD: {{value}}%
                            </li>
                        </ul>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <p class="text-left headline">Set a New Discount Plan</p>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-switch v-model="flexcheck" label="Flexible Discount"></v-switch>
                    </v-col>
                    <v-btn v-if="flexcheck" color="primary" small @click="increaseCounter">Add Band</v-btn>
                </v-row>
                <v-row v-for="n in counter" :key="n">
                        <v-col cols="12" sm="8">
                            <v-text-field v-model="form.threshhold[n - 1]" label="Limit Above Which Discount Applies(USD)"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-text-field v-model="form.discount[n - 1]" label="Discount(%)"></v-text-field>
                        </v-col>
                </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"  @click="rst">Close</v-btn>
                <v-btn color="primary"  @click="saveDiscount">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
import CustomersService from '@/services/CustomersService'
export default {
    data(){
        return {
            discounttoggle: false,
            flexcheck: false,
            counter: 1,
            form: {
                threshhold: [],
                discount: []
            }
        }
    },
    props: {
        customer: {
            type: Object
        }
    },
    methods: {
        async saveDiscount(){
            let obj = {}

            for(let i = 0; i < this.form.threshhold.length; i++){
                obj[this.form.threshhold[i]] = this.form.discount[i]
            }
            
            let pairs = [{propName: "discount", value: obj}]
            try{
                await CustomersService.update(this.$props.customer.id, pairs)
            } catch(error){
                console.log(error)
            }
            this.$emit('discountUpdate')
            this.rst()
        },
        rst(){
            this.form.threshhold = []
            this.form.discount = []
            this.discounttoggle = false
            this.flexcheck = false
            this.counter = 1
        },
        increaseCounter(){
            this.counter = this.counter + 1
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>