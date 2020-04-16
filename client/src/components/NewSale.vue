<template>
<div id="app">
    <v-app id="inspire">
        <div class="display-2">New Sale </div>
        <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="amount"
                :rules="nameRules"
                label="Amount"
                required
                ></v-text-field>
            </v-col>
    
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="currency"
                label="Currency"
                required
                ></v-text-field>
            </v-col>
    
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="conversion"
                label="Conversion Rate to USD"
                required
                ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
                <v-select
                :items="['444', '440', '420', '201', '101', '451', '452']"
                v-model="type"
                v-on:change="update"
                label="Blank Type"
                required
                ></v-select>
            </v-col>

            <v-col
                cols="12"
                md="8"
            >
                <v-select
                :items="blanks"
                v-model="blank"
                label="Blank Number"
                required
                ></v-select>
            </v-col>
            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="tax"
                label="Tax"
                required
                ></v-text-field>
            </v-col>

            <v-col
                cols="12"
                md="4"
            >
                <v-text-field
                v-model="taxloc"
                label="Tax Local"
                required
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-dialog
                ref="picker"
                v-model="modal"
                :return-value.sync="date"
                persistent
                width="290px"
                >
                <template v-slot:activator="{ on }">
                    <v-text-field
                    v-model="date"
                    label="Date"
                    readonly
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker v-model="date">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.picker.save(date)">OK</v-btn>
                </v-date-picker>
                </v-dialog>
            </v-col>
            <v-col
                cols="12"
                md="8"
            >
                <v-select
                :items="customers"
                v-model="customer"
                v-on:change="test"
                label="Customer"
                required
                ></v-select>
            </v-col>
            </v-row>
            <div v-if="type != null && ['444', '440', '420', '201', '101'].includes(type)" class="display-1"> Journey details </div>
            <div v-if="type != null && ['444', '440', '420', '201', '101'].includes(type)">
            <v-row v-for="index in counter" :key="index">
                <v-col cols="12" md="12"><div class="headline"> Leg {{index}} </div></v-col>
                
                <v-col cols="12" md="6">
                    <v-text-field
                    label="Origin"
                    required
                    ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                    <v-text-field
                    label="Destination"
                    required
                    ></v-text-field>
                </v-col>
            </v-row>
            </div>
            <v-row>
                <v-col cols="12" md="2">
                    <v-btn
                    block
                    color="primary"
                    @click="reset"
                    >
                        Reset Form
                    </v-btn>
                </v-col>
                <v-col cols="12" md="2">
                    <v-dialog v-model="paymenttoggle" persistent max-width="600px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" block v-on="on">Proceed to Payment</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">Payment Details</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                <v-row>
                                    <v-col>
                                        <div>
                                            <p class="text-left headline">Amount: {{amount}} {{currency}}</p>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" sm="12">
                                    <v-select label="Payment Type" v-model="paymentType" required :items="['Card', 'Cash', 'Delayed']"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="12">
                                    <v-text-field v-if="paymentType === 'Card'" v-model="cardNumber" label="Card Number"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12">
                                    <v-text-field
                                        v-if="paymentType === 'Card'"
                                        label="Card Type"
                                        v-model="cardType"
                                        required
                                    ></v-text-field>
                                    </v-col>
                                </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary"  @click="paymenttoggle = false">Close</v-btn>
                                <v-btn color="primary"  @click="saveTransaction">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>     
            </v-row>
        </v-container>
        </v-form>
    </v-app>
</div>
</template>

<script>
import CustomersService from '@/services/CustomersService'
import BlanksService from '@/services/BlanksService'
import TransactionsService from '@/services/TransactionsService'
import CommissionService from '@/services/CommissionService'
export default {

data: () => ({
    amount: null,
    currency: null,
    conversion: null,
    blanks: ['Please specify blank type'],
    customers: ['Casual Customer'],
    customersId: [],
    type: null,
    blank: null,
    tax: null,
    taxloc: null,
    customer: null,
    valid: false,
    counter: 4,
    coupons: [],
    paymenttoggle: false,
    paymentType: null,
    cardNumber: null,
    cardType: null,
    date: null,
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false,

    nameRules: [
      v => !!v || 'Name is required',
    ],
  }),
    async mounted() {
        //this.transactions = (await TransactionsService.index()).data.transactions
        let custs = (await CustomersService.index()).data.customers
        for(let customer of custs){
                this.customers.push(customer.alias)
                this.customersId.push(customer.id)
        }
    },

    methods: {
      async update(){
        let bks = (await BlanksService.index()).data.blanks
        this.blanks = []
        for(let blank of bks){
            if((blank.advisor!= null && !blank.used) && (this.type === blank.type && blank.advisor._id === this.$store.state.user._id)){
                this.blanks.push(blank.number)
            }
        }

        if(['444', '440'].includes(this.type)){
            this.counter = 4
        } else if (['420', '201'].includes(this.type)){
            this.counter = 2
        } else if (this.type === '101'){
            this.counter = 1
        }
      },

      reset () {
        this.$refs.form.reset()
      },

      proceed () {

      },

      test() {
        console.log(this.customer)
        console.log(this.customersId)
        console.log(this.customersId[this.customers.indexOf(this.customer) - 1])
      },

      async saveTransaction(){
          const b = (await BlanksService.getSingleByUniqueNo(this.type + "" + this.blank)).data.blank._id
          let customer = null
          let datePaid = null

          if(this.customer != 'Casual Customer'){
              customer = this.customersId[this.customers.indexOf(this.customer) - 1]
          } 

          if(this.paymentType != 'Delayed'){
              datePaid = this.date
          }

          let commission = (await CommissionService.index()).data.interline

          let transaction = {
             currency: this.currency,
             amount: this.amount,
             date: this.date,
             conversionRate: this.conversion,
             blank: b,
             customer: customer, 
             datePaid: datePaid,
             paymentType: this.paymentType,
             cardNumber: this.cardNumber,
             cardType: this.cardType,
             commission: commission,
             taxLocal: this.taxloc,
             taxOther: this.tax
          }

          await TransactionsService.create(transaction)

          let pairs = [{propName: "used", value: true}]

          await BlanksService.updateBlank(this.type + "" + this.blank, pairs)

          this.paymenttoggle = false
          this.reset()
      }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>