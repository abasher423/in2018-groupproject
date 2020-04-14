<template>
    <div id="users">
        <v-app class="text-justify">
            <div class="display-2">Users</div>
            <v-expansion-panels
                multiple>
                <v-expansion-panel
                    v-for="user in users"
                    :key="user._id"
                >
                    <div>
                        <v-expansion-panel-header class="headline">{{user.name}}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="text-justify subtitle-1">
                                <ul style="list-style-type:none;">
                                    <li>Status: {{user.priviledge}}</li>
                                    <li>ID: {{user.uniqueNumber}} </li>
                                </ul>
                            </div>
                        </v-expansion-panel-content>
                    </div>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-app>
    </div>
</template>


<script>
import UsersService from '@/services/UsersService'
export default {
    data(){
        return {
            users: null,
            userId: null
        }
    },
    async mounted() {
        this.users = (await UsersService.index()).data.users
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>