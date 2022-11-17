<template>
   <v-app id="inspire">
         <v-container>
            <v-card class="elevation-12 mx-auto mt-16" max-width="374">
                <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                <v-form>
                    <v-text-field
                        prepend-icon="mdi-account"
                        name="login"
                        label="Login"
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        id="password"
                        prepend-icon="mdi-lock"
                        name="password"
                        label="Password"
                        type="password"
                    ></v-text-field>
                </v-form>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" to="/">Login</v-btn>
                </v-card-actions>
            </v-card>
         </v-container>
   </v-app>
</template>  



<script>
  export default {
    name: 'Login',
    data () {
        return{

        }
    },
   props: {
      source: String,
   },
  }
</script>