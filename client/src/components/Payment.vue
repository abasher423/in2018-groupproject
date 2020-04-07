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
            cardNumber: null
            //patch: [{propName: paymentType, value: null}, {propName: cardType, value: null}, {propName: cardNumber, value: null}]
        }
    },

    props: {
        transaction: {
            type: Object
        }
    },

    methods: {
        async update() {
            const transactionId = this.$props.transaction._id
            let pairs = [{propName: "paymentType", value: null}, {propName: "cardType", value: null}, {propName: "cardNumber", value: null}]
            pairs[0].value = this.paymentType
            pairs[1].value = this.cardType
            pairs[2].value = this.cardNumber
            try {
                await TransactionsService.update(transactionId, pairs)
                this.dialog = false
                this.$router.push({
                    name: 'transactions',
                })
            } catch (err) {
                console.log(err)
            }
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>