<template>
    <v-text-field
    class="mt-1"
    :label="label"
    outlined
    v-model="proxyValue"
    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="[rules.required, rules.min]"
    :type="show1 ? 'text' : 'password'"
    hint="At least 8 characters"
    counter
    @click:append="show1 = !show1"
    ></v-text-field>
</template>



<script>
export default {
    name: "BaseInput",
    data() {
        return {
            show1: false,
            rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters', 
                }
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