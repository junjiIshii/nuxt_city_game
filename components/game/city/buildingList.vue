<template>
        <div class="p-list_wrapper"> 
            <div class="c-building_cell" v-if="!listMode" v-on:click="selectedBuilding">
                <div class="c-building_cell__icon">
                    <span class="u-has-icon" v-bind:class="buildInstance.iconClass" :style="{backgroundImage:buildingImg}"></span>
                    {{buildInstance.name}}
                </div>
            </div>

            <div class="c-building_list" v-if="listMode">
                <div class="c-building_cell" v-on:click="selectedBuilding">
                    <div class="c-building_cell__icon">
                        <span class="u-has-icon" v-bind:class="buildInstance.iconClass" :style="{backgroundImage:buildingImg}"></span>
                        {{buildInstance.name}}
                    </div>
                </div>
                <div class="c-basic_records">
                    <div class="c-bulding-data__unit__record" v-if="isHasPropaty('workerNum')">
                        労働者：<span>{{buildInstance.workerNum}}／{{buildInstance.maxWorkerNum}}</span>
                        <slider
                            v-bind:max="buildInstance.maxWorkerNum" v-bind:min="0" 
                            v-bind:presentVal="buildInstance.workerNum"
                            v-bind:getMethod="changerNum"
                        />
                    </div>
                    <div class="c-bulding-data__unit__record" v-if="isHasPropaty('prodPerWorker')">
                        生産総量：<span><i class="u-has-icon" :class="buildInstance.prodItemIcon"></i>{{buildInstance.prodPerWorker*buildInstance.workerNum}}</span>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import slider from '../common/slider';
export default {
    name:'bldLists',
    props:['buildInstance','openMethods'],
    computed:{
        listMode(){
            return this.$store.state.city.buildingListMode
        },
        buildingImg(){
            let pathName = this.buildInstance.iconImgPath;
            let fullPath = "/img/"+pathName;
            return 'url('+fullPath+')';
        },
        isHasPropaty(){
            return (propaty)=>{
                return (String(propaty) in this.buildInstance)
            }
        }
    },
    methods:{
        selectedBuilding(){
            this.openMethods(this.buildInstance);
        },
        changerNum(val){
            let cityID = this.buildInstance.cityID;
            let cityObj = this.$store.getters['city/getCityObject'](cityID);
            let err = this.buildInstance.changeWorkerNum(val,cityObj);
            (err)?this.$store.dispatch('message/setErrMessages',err):'';
        }
    },
    components:{slider}
}
</script>