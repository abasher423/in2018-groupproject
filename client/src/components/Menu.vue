<template>
    <div id="menu">
        <v-app>
            <v-container>
            <v-row justify="center" >
                <v-col cols="12" sm="4">
        
                    <v-btn
                        block
                        color="primary"
                        class="ma-2"
                        >New Sale
                    </v-btn>
                    
                    <v-btn 
                        block
                        color="primary"
                        class="ma-2"
                        >Blank Stock
                    </v-btn>
            
                    <v-btn
                        v-if="!$store.state.user.priviledge === 'Advisor'"
                        block
                        color="primary"
                        class="ma-2"
                        >Transactions
                    </v-btn>

                    <v-btn
                        block
                        color="primary"
                        class="ma-2"
                        >Customers
                    </v-btn>

                    <v-btn
                        v-if="$store.state.user.priviledge === 'Admin'"
                        block
                        color="primary"
                        class="ma-2"
                        >Users
                    </v-btn>

                    <v-btn
                        block
                        color="primary"
                        class="ma-2"
                        >Reports
                    </v-btn>
                </v-col>
            </v-row>
            </v-container>
        </v-app>
    </div>
</template>


<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>