<template>
    <div>
    <slot name="content" v-if="condition">
    </slot>
    <v-layout v-else align-center justify-center class="heightFull">
        <div class="">
            <h2>{{Message}}</h2>
        </div>
    </v-layout>
    </div>
</template>
<script>
export default {
    props: ['message', 'condition'],
    computed: {
        Message: function(){
            if (this.message == undefined || this.message == ''){
                return 'No data to show, try click in get data ;)'
            }else{
                return this.message
            }
        }
    }
}
</script>