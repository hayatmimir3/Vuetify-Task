<template>
  <div class="" >
    <v-data-table
      :headers="headers"
      :items="data"
      class="elevation-1"
    >
    <template v-slot:item.update="{ item }">
      <router-link :to="{ name: 'Update', params: {doctype: doctypeName, name: item.name}}" v-bind:name="item.name">
        <v-icon
        small
        class="mr-2"
        >
          mdi-pencil
        </v-icon>
      </router-link>
    </template>
    </v-data-table>
  </div>
</template>  
    
<script>

export default {
  name: 'list',
  data() {
      return {
        //fields: null,
        doctypeName: this.$route.params.doctype,
        data: [],
    }
  },
  created() {
    // import(`@/views/${this.doctypeName}/Data.json`).then((module) => {
    //     this.fields = module.default;
    //   });
    //   import(`@/views/${this.doctypeName}/Data.json`).then((module) => {
    //     this.data = module.default.data;
    //   });
    this.getPosts()
  },
  methods: {
    getPosts() {
        fetch(`http://127.0.0.1:8000/api/resource/${this.doctypeName}?fields=["*"]`, {
          headers: {
              'Authorization': 'token d07e4210bcdb5b5:4b9afae7a03db3f',
              "Content-Type": "application/json; charset=utf-8",
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*",  

          }
        })
        .then(r => r.json())
        .then(r => {

            this.data = r.data
        });
      },
  },
  computed: {
      headers() {
        let unique = Array.from(this.data.reduce((a, c) => {
          Object.keys(c).forEach(e => {
            if (c[e] !== null & c[e] !== "" & c[e] !== 0 & typeof c[e] === 'string') {
              a.add(e)
            }
          });
          return a
        }, new Set()));

        unique.push('update');
        const notAllowed = ['naming_series', 'modified','creation','owner','modified_by']
        unique = unique.filter((el) => !notAllowed.includes(el));

        return Array.from(unique).map(i => {
          return {
            text: i.toString().toUpperCase(),
            value: i,
          }
        });
      }
    },  
}
</script>