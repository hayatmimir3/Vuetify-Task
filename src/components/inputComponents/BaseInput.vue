<template>
    <v-text-field
    class="mt-1"
    :label="label"
    outlined
    v-model="proxyValue"
    hide-details
    >
    </v-text-field>
</template>



<script>
export default {
    name: "BaseInput",
    data() {
        return {
        };
    },
    props: { 
        label: {
            type: String,
            default: ''
        },
        value: {
        }
    },
    computed: {
        proxyValue: {
          get() { return this.value; },
          set(newValue) { this.$emit('input', newValue); }
        }
    },

}
</script>