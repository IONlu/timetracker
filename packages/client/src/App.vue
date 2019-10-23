<template>
    <v-app>
        <v-navigation-drawer
            app
            clipped
            v-model="drawer"
        >
            <!-- -->
        </v-navigation-drawer>

        <v-app-bar
            app
            clipped-left
            color="indigo darken-4"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline text-uppercase">
                <span>Timetracker</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                text
                href="https://github.com/vuetifyjs/vuetify/releases/latest"
                target="_blank"
            >
                <span class="mr-2">Latest Release</span>
            </v-btn>
        </v-app-bar>

        <v-content>
            <HelloWorld/>
        </v-content>
    </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
    components: {
        HelloWorld
    },

    data () {
        return {
            drawer: false
        }
    }
}
</script>
