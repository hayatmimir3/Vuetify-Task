<template>
    <v-select
    class="mt-1"
    :label="label"
    v-model="proxyValue"
    outlined
    :items="innerOptions"
    hide-details
    ></v-select>
</template>



<script>
export default {
    name: "SelectInput",
    props: { 
        label: {
            type: String,
            default: ''
        },
        value: {

        },
        itemsValue: {
            type: '',
            default: ''
        },
    },
    data: function () {
        return {
            innerOptions: []
        }
    },
    computed: {
        proxyValue: {
          get() { return this.value; },
          set(newValue) { this.$emit('input', newValue); }
        }
    },
    mounted() {
        this.innerOptions = this.array(this.itemsValue);
    },
    methods: {
        array: function(ary) {
            if (ary !== undefined) {
                if (ary.includes('\n')){
                    const usingSplit = ary.toString().split("\n");
                    return usingSplit;
                } else {
                    fetch(`http://127.0.0.1:8000/api/resource/${ary}`, { 
                    headers: {
                        'Authorization': 'token d07e4210bcdb5b5:4b9afae7a03db3f',
                        "Content-Type": "application/json; charset=utf-8",
                        "Accept": "application/json",
                        "Access-Control-Allow-Origin": "*",  

                    }
                    })
                    .then(r => r.json())
                    .then(r => {
                        const arr = r.data // Extracting data as a JSON Object from the response
                        const values = [];
                        for (var i=0;i<arr.length;i++){  
                            values.push(arr[i].name);
                        };

                        this.innerOptions = values ;

                    });

                }
            }
            // const promis = new Promise((resolve) =>{
            //     if (ary !== undefined) {
            //         if (ary.includes('\n')){
            //             const usingSplit = ary.toString().split("\n");
            //             console.log(usingSplit);
            //             resolve(usingSplit);
            //         } else {
            //             async function linkedField() {
            //                 const response = await fetch(`http://127.0.0.1:8000/api/resource/${ary}`, 
            //                     {
            //                         headers: {
            //                             'Authorization': 'token d07e4210bcdb5b5:4b9afae7a03db3f',
            //                             "Content-Type": "application/json; charset=utf-8",
            //                             "Accept": "application/json",
            //                             "Access-Control-Allow-Origin": "*",  
            //                         }
            //                     }
            //                 );
            //                 const data = await response.json();
            //                 const arr = data.data // Extracting data as a JSON Object from the response
            //                 let values = [];
            //                 for (var i=0;i<arr.length;i++){  
            //                     values.push(arr[i].name);
            //                 }

            //                 return values ;

            //             }

            //             const printLinkedField = async () => {
            //                 const result = await linkedField();
            //                 //console.log(result);
            //                 resolve(result);
            //             };

            //             const result = printLinkedField();
            //             //console.log("hey",result);
            //         }
            //     }
            // });

            //console.log(this.options);


            //let result;
            // const getResult = (res) => {
            //     result = res;
            // };

            // if (ary !== undefined) {
            //     if (ary.includes('\n')){
            //         const usingSplit = ary.toString().split("\n");
            //         console.log(usingSplit);
            //         return usingSplit;
            //     } else {
            //         async function linkedField() {
            //             const response = await fetch(`http://127.0.0.1:8000/api/resource/${ary}`, 
            //                 {
            //                     headers: {
            //                         'Authorization': 'token d07e4210bcdb5b5:4b9afae7a03db3f',
            //                         "Content-Type": "application/json; charset=utf-8",
            //                         "Accept": "application/json",
            //                         "Access-Control-Allow-Origin": "*",  
            //                     }
            //                 }
            //             );
            //             const data = await response.json();
            //             const arr = data.data // Extracting data as a JSON Object from the response
            //             let values = [];
            //             for (var i=0;i<arr.length;i++){  
            //                 values.push(arr[i].name);
            //             }

            //             return values ;

            //         }

            //         // const printLinkedField = async () => {
            //         //     const result = await linkedField();
            //         //     console.log(result);
            //         //     getResult(result);
            //         //     console.log(getResult(result));
            //         // };

            //         // printLinkedField();
            //         // console.log(result);
            //         // return result;
            //         const result = await linkedField();
            //         return result;
            //     }
            // }
        }
    }
}
</script>