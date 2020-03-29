<template>
    <div class="p-city_mainController">
        <div class="p-city_mainController__wrapper" v-if="!isDetailOpen" :class="isListModeClass">
            <bldLists v-for="(inst,index) in buildObj" :key="index" v-bind:buildInstance="inst" v-bind:openMethods="openDetail"/>
        </div>
        <div class="p-city_detail__conteiner" v-if="isDetailOpen">
            <bldingDetail v-bind:oneBuilding="slectedBld" v-bind:closeMethod="closeDetail"/>
        </div>
    </div>
</template>

<script>
import bldLists from './buildingList';
import bldingDetail from './buildingDetail';

export default {
    name:'mainController',
    props:['buildObj'],
    data(){
        return{
            isDetailOpen:false,
            slectedBld:undefined
        }
    },
    computed:{
        isListModeClass(){
            return {'is-ListMode':this.$store.state.city.buildingListMode}
        }
    },
    methods:{
        openDetail(inst){
            this.isDetailOpen = true;
            this.slectedBld = inst;

            // this.slectedBld = inst;
        },
        closeDetail(){
            this.isDetailOpen = false;
        }
    },
    components:{bldLists,bldingDetail}
}
</script>