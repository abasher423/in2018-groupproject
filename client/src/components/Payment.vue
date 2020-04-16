<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" small dark v-on="on">Complete Payment</v-btn>
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
                        <p class="text-left headline">Amount: {{transaction.amount}}.00 GBP</p>
                    </div>
                </v-col>
                <v-col cols="12" sm="12">
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
                <v-col cols="12" sm="12">
                  <v-select label="Payment Type" v-model="paymentType" required :items="['Card', 'Cash']"></v-select>
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
                <div v-if="error != null">
                  <v-icon>info</v-icon>
                  {{error}}
                </div>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"  @click="dialog = false">Close</v-btn>
            <v-btn color="primary"  @click="update">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>


<script>
import TransactionsService from '@/services/TransactionsService'
export default {
    data(){
        return {
            dialog: false,
            paymentType: null,
            cardType: null,
            cardNumber: null,
            date: new Date().toISOString().substr(0, 10),
            modal: false,
            error: null
        }
    },

    props: {
        transaction: {
            type: Object
        }
    },

    methods: {
        async update() {
          try{
            const transactionId = this.$props.transaction._id
            this.$emit('paidUpdate', transactionId, this.paymentType, this.cardType, this.cardNumber, this.date)
            this.dialog = false
          } catch(error){
            this.error = error.response.data.message
          }
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>