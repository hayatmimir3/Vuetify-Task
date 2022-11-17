<template>
    <nav>
        <v-navigation-drawer
        v-model="drawer"
        app
        >
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="text-h6">
                Human Resources
            </v-list-item-title>
            <v-list-item-subtitle>
                Manage full employee life cycle 
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
            dense
            nav
        >
            <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            no-action
            :prepend-icon="item.icon"
            >
                <template v-slot:activator>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item 
                v-for="child in item.items"
                :key="child.title"
                router :to="child.route">
                    <v-list-item-content>
                        <v-list-item-title>{{child.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
        </v-navigation-drawer>

        <v-app-bar app hide-on-scroll>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Human Resources</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text route :to="{name: 'Login'}">
                <span>Log in</span>
                <!-- <v-icon right></v-icon> -->
            </v-btn>
        </v-app-bar>
        
    </nav>
</template>

<script>
export default {
  data: () => ({ 
    drawer: null,
    items: [
      { 
        title: 'Employee', 
        active:true,
        items: [
            {title: 'Add', route: {name: 'Add', params: {doctype:'Employee'}}},
            {title: 'List', route: {name: 'List', params: {doctype:'Employee'}}},
            {title: 'update', route: {name: 'Update', params: {name:'10'}}}
        ] ,
        icon: 'mdi-account-group', },
      { title: 'Leave', icon: 'mdi-calendar-remove' },
      { title: 'About', icon: 'mdi-help-box' },
    ],
    admins: [
        ['Add'],
        ['List'],
        ['Update']
    ]
  }),
}
</script>