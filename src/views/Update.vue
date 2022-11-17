<template>
    <div class="">
        <v-container>
            <v-form
            @submit.prevent="updatePost" 
            >
                <v-card class="elevation-12 mx-auto my-16" max-width="574">
                    <v-toolbar dark color="indigo" lighten-2>
                    <v-toolbar-title>Add a new {{doctypeName}}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text
                    >
                        <v-list 
                        flat
                        v-for="event in results"
                        :key="event.name"
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
                        <v-btn color="primary" type="updatePost" block>Update</v-btn>
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
    name: "Update",
    data() {
        return {
            hello: '',
            events: [],
            doctypeName: this.$route.params.doctype,
            name: this.$route.params.name,
            values: [],
            results: null,
            update: [],
            }
    },
    components: { Date, Data, Select, PassInput, Link },
    methods: {
        // Fetch data
        async getPost(){
            const data = await fetch(`http://127.0.0.1:8000/api/resource/${this.doctypeName}?fields=["*"]&filters=[["name", "=", "${this.name}"]]`, {
            headers: {
                'Authorization': 'token d07e4210bcdb5b5:4b9afae7a03db3f',
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",  

            }
            });
            const response = await data.json();
            this.values = response.data;
            //console.log(this.values);
        },

        //fetch fields
        async getFields() {
            const fields = await fetch(`http://127.0.0.1:8000/api/resource/DocType/${this.doctypeName}`, {
            headers: {
                'Authorization': 'token d07e4210bcdb5b5:4b9afae7a03db3f',
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",  

            }
            });
            const fieldsResponse = await fields.json();
            this.events = fieldsResponse.data.fields;
            //console.log(this.events);
        },

        // Combine the value with corresponding data
        extend() { 
            const result = this.events;
            const value = this.values;
            //console.log(value);
            for (var i = 0; i < value.length; i++){
                var objFields = value[i];
                //console.log(objFields)
                for (var keyFields in objFields){
                    //console.log(keyFields)
                    for (var field of result) {
                        if (keyFields == field.fieldname){
                            field.value = objFields[keyFields];
                            field.idName = objFields['name'];
                        }
                    }
                }
                this.results = result;
                //console.log(this.results);
            }
        },
        // Update request
        async updatePost() {
            const res = this.results.reduce((ac,a) => (ac[a.fieldname] = a.value,ac),{});
            this.update = res;
            //console.log(this.update);
            const fields = await fetch(`http://127.0.0.1:8000/api/resource/${this.doctypeName}/${this.name}`, {
            method: 'PUT',
            body: JSON.stringify({
                data: this.update
            }),
            headers: {
                'Authorization': 'token d07e4210bcdb5b5:4b9afae7a03db3f',
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",  
            },
            });
            if (fields.status ==200) {
                this.$router.push({name: 'List'});
            };
        },
    },
    async created() {

        await this.getPost();
        await this.getFields();
        this.extend();
    },
}
</script>