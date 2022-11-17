<template>
  <Update v-bind:items="'items123'"/>
</template>


<script>
import Data from '../Employee/EmployeeData.json';
import Update from '@/views/Employee/Update.vue';
export default {
    name: "Employee",
    data() {
        return {
            items: Data
        };
    },
    components: { Update },
}
</script>