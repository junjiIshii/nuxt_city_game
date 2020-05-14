<template>
    <div class="p-mordal__conteiner p-building_list is-ListMode">
        <div class="p-mordal__wrapper">
            <div class="c-close-btn" v-on:click="closeMordal">
                閉じる
            </div>
            
            <div class="p-list_wrapper" v-for="(list,index) in bldsList" :key="index"> 
                <div class="c-building_cell">
                    <div class="c-building_cell__icon">
                        <span class="u-has-icon" v-bind:class="list.iconClass" :style="{backgroundImage:buildingImg(list)}"></span>
                        {{list.name}}
                    </div>
                </div>
                <div class="c-basic_records">
                    <div class="c-bulding-data__unit__record">
                        <useBtn v-bind:actionName="'建設する'" v-bind:useItems="list.buildUpCost" v-bind:clickMethod="buildNew" v-bind:actionAgument="list"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import useBtn from '../common/resourceUseBtn'
import {CollectionBuilding} from '~/assets/class/building';

export default {
    name:'bldUpList',

    methods:{
        closeMordal(){
            this.$store.commit('gameOperator/changeActionState',-1)
        },
        buildNew(bldObj){
            let cityID = this.$store.state.gameOperator.selectedCityID;
            let bldID = bldObj.classID;
            let needsCost = bldObj.buildUpCost;
            this.$store.dispatch('city/buildUpValidation',{cityID:cityID,bldID:bldID,cost:needsCost,bldObj:bldObj})
        }
    },
    computed:{
        bldsList(){
            let blds = this.$store.state.gameOperator.buildingList;
            let cityID = this.$store.state.gameOperator.selectedCityID;
            let geoID = this.$store.state.gameOperator.selectedGeoID;
            let naturalResource = this.$store.getters['geo/getNaturalResourceObj'](geoID)
            //exclude CollectionBuilding building if there is no natural resource.
            let filterdBlds = blds.filter(data=>{
                
                switch(true){
                    case 'ableCollect' in data:
                        // Case of CollectionBuilding, check
                        // 1:Weather belonged geo has natural resource at first.
                        // 2:Weather this building can able to use the natural resuorce.
                        if(naturalResource !== undefined){
                            return data.ableCollect.indexOf(naturalResource.brID) >=0
                        }else{
                            return false;
                        }
                    default:
                        return true;
                }
            })
            return filterdBlds;
        },
        buildingImg(){
            return (obj)=>{
                let pathName = obj.iconImgPath;
                let fullPath = "/img/"+pathName;
                return 'url('+fullPath+')';
            }
        },
    },
    components:{useBtn}
}
</script>