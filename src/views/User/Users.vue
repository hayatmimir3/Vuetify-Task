<template>
  <form>
    <ul>
      <li v-for="(element, index) in Fields" :key="index">
        <component :is="element.type" :element="element" />
      </li>
    </ul>
  </form>
</template>


<script>

// Vue.component("radioInput", {
//   props: ["element"],
//   template: `
//     <label>{{ element.name }}
//       <input type="radio" :name="element.name" :checked="element.checked"> 
//       </input>
//     </label>
//   `
// });

// Vue.component("v-text-field", {
//   props: ["element"],
//   template: 
//   `
//       <v-text-field :label="element.label" outlined :v-model="element.v-model"> 
//       </v-text-field>
    
//   `
// });

// var v_text_field = new Vue ({
//     el: 'v_text_field',
//     props: ["element"],
//     template: 
//     `
//         <v-text-field :label="element.label" outlined :v-model="element.v-model"> 
//         </v-text-field>
        
//     `
// })

import JsonFields from '../User/UsersFields.json';
    export default {
      name: 'Users',
      // props: ['items'],
      data() {
        return {
          fields: JsonFields,
        }
      }
    };

</script>