<template>
    <div class="p-item-use">
        <span class="c-actionBtn" v-on:click="clickBtn">{{actionName}}</span>
        <span class="c-need-item u-has-icon" v-for="(item,index) in useItems" :key="index" :class="iconClass(item.brID)">{{item.num}}</span>
    </div>
</template>

<script>
import {Resource} from '~/assets/class/basicResource';
export default {
    name:'resourceUseBtn',
    props:['actionName','useItems','clickMethod','actionAgument'],
    computed:{
        items(){
            let store = this.$store;
            return this.useItems.map(obj=>{
                Resource.getIconClass(obj.brID);
            })
        }
    },
    methods:{
        clickBtn(){
            let action = this.actionAgument;
            return this.clickMethod(action);
        },
        iconClass(id){
            return Resource.getIconClass(id)
        }
    }
}
</script>