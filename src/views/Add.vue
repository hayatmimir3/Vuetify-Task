<template>
    <div class="">
        <v-container>
            <v-form
            @submit.prevent="createPost" 
            >
                <v-card class="elevation-12 mx-auto my-16" max-width="574">
                    <v-toolbar dark color="indigo" lighten-2>
                    <v-toolbar-title>Add a new {{doctypeName}}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text
                    >
                        <v-list 
                        flat
                        v-for="(event, index) in events"
                        :key="index"
                        v-if="event.reqd === 1"
                        >
                            <v-list-item
                            >
                                <v-list-item-content>
                                    <component
                                    :is="event.fieldtype"
                                    v-model="event.value"
                                    :label= "event.label"
                                    :itemsValue="event.options"
                                    />
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>     
                    </v-card-text>
                    <v-card-actions class="mx-16">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="createPost" block>Add</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-container>
    </div>
</template>
  
  
<script>
import Data from '@/components/inputComponents/BaseInput.vue';
import Select from '@/components/inputComponents/SelectInput.vue';
import Date from '@/components/inputComponents/DateInput.vue';
import PassInput from '@/components/inputComponents/PassInput.vue';
import Link from '@/components/inputComponents/LinkInput.vue';

export default {
    name: "Add",
    data() {
        return {
            events: [],
            doctypeName: this.$route.params.doctype,
            values: [],
            }
    },
    components: { Date, Data, Select, PassInput, Link },
    created() {
        this.getPosts()
    },
    methods: {
        // Get data
        getPosts() {
            fetch(`http://127.0.0.1:8000/api/resource/DocType/${this.doctypeName}`, {
            headers: {
                'Authorization': 'token d07e4210bcdb5b5:4b9afae7a03db3f',
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",  

            }
            })
            .then(r => r.json())
            .then(r => {
                const data = r.data.fields;
                const newArr = data.map(v => {
                    // const fieldvalue = v['fieldname'];
                    // if(v.fieldtype == 'date'){
                    //     v[fieldvalue] = null
                    // }else {
                    //     v[fieldvalue] = ''
                    // }
                    v.value = '';
                    return v
                })

                this.events = newArr
            });
        },
        // Create post request
        async createPost() {
            const res = this.events.reduce((ac,a) => (ac[a.fieldname] = a.value,ac),{})
            this.values = res
            const create = await fetch('http://127.0.0.1:8000/api/resource/Employee', {
            method: 'POST',
            body: JSON.stringify({
                data: this.values
            }),
            headers: {
                'Authorization': 'token d07e4210bcdb5b5:4b9afae7a03db3f',
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",  
            },
            });
            if (create.status ==201) {
                this.$router.push({name: 'Add'});
            };
        },
    },
}
</script>