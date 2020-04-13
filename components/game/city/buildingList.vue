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
                        生産総量：<span v-for="(cls,index) in buildInstance.prodItemIcon" :key="index"><i class="u-has-icon" :class="cls"></i>{{buildInstance.prodPerWorker*buildInstance.workerNum}}</span>
                    </div>
                    <div class="c-bulding-data__unit__record" v-if="isHasPropaty('sizeLevel')">
                        規模レベル：<span>Lv.{{buildInstance.sizeLevel}}</span>
                        <useBtn v-bind:actionName="'レベルUP'" v-bind:useItems="buildInstance.sizeLvCost" v-bind:clickMethod="levelUp" v-bind:actionAgument="0"/>
                    </div>
                    <div class="c-bulding-data__unit__record" v-if="isHasPropaty('effiLevel')">
                        効率レベル：<span>Lv.{{buildInstance.effiLevel}}</span>
                        <useBtn v-bind:actionName="'レベルUP'" v-bind:useItems="buildInstance.effiLvCost" v-bind:clickMethod="levelUp" v-bind:actionAgument="1"/>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import slider from '../common/slider';
import useBtn from '../common/resourceUseBtn';

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
        },
        levelUp(type){
            this.$store.dispatch('city/levelupValidation',{bldInst:this.buildInstance,neddCost:this.buildInstance.sizeLvCost,levelUpType:type});
        }
    },
    components:{slider,useBtn}
}
</script>