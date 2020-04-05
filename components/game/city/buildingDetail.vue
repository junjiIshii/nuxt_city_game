<template>
    <div class="p-detail_conteiner">
        <span class="c-close_btn" v-on:click="clickCloseBtn"><i class="fas fa-chevron-left c-close_btn__icon"></i>戻る</span>
        <div class="p-icon_row">
            <div class="c-building_cell">
                <div class="c-building_cell__icon">
                    <span class="u-has-icon" v-bind:class="oneBuilding.iconClass" :style="{backgroundImage:buildingImg}"></span>{{oneBuilding.name}}
                </div>
            </div>

            <div class="c-basic_records">
                <div class="c-bulding-data__unit__record" v-if="isHasPropaty('workerNum')">
                    労働者：<span class="c-bulding-data__unit__record">{{oneBuilding.workerNum}}／{{oneBuilding.maxWorkerNum}}</span>
                    <slider
                        v-bind:max="oneBuilding.maxWorkerNum" v-bind:min="0" 
                        v-bind:presentVal="oneBuilding.workerNum"
                        v-bind:getMethod="changerNum"
                    />
                </div>
                <div class="c-bulding-data__unit__record" v-if="isHasPropaty('prodPerWorker')">
                    1人あたりの生産単量：<span>{{oneBuilding.prodPerWorker}}</span>
                </div>
                <div class="c-bulding-data__unit__record" v-if="isHasPropaty('comsumeFood')">
                    1人あたりの食料消費：<span>{{oneBuilding.comsumeFood}}</span>
                </div>
                <div class="c-bulding-data__unit__record" v-if="isHasPropaty('prodPerWorker')">
                    生産総量：<span v-for="(cls,index) in oneBuilding.prodItemIcon" :key="index"><i class="u-has-icon" :class="cls"></i>{{oneBuilding.prodPerWorker*oneBuilding.workerNum}}</span>
                </div>
                <div class="c-bulding-data__unit__record" v-if="isHasPropaty('comsumeFood')">
                    総食料消費：<span>{{oneBuilding.comsumeFood*oneBuilding.workerNum}}</span>
                </div>
                <div class="c-bulding-data__unit__record" v-if="isHasPropaty('sizeLevel')">
                    規模レベル：<span>Lv.{{oneBuilding.sizeLevel}}</span>
                    <useBtn v-bind:actionName="'レベルUP'" v-bind:useItems="oneBuilding.sizeLvCost" v-bind:clickMethod="levelUp" v-bind:actionAgument="0"/>
                </div>
                <div class="c-bulding-data__unit__record" v-if="isHasPropaty('effiLevel')">
                    効率レベル：<span>Lv.{{oneBuilding.effiLevel}}</span>
                    <useBtn v-bind:actionName="'レベルUP'" v-bind:useItems="oneBuilding.effiLvCost" v-bind:clickMethod="levelUp" v-bind:actionAgument="1"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import slider from '../common/slider';
import useBtn from '../common/resourceUseBtn';

export default {
    name:'buildingDetail',
    props:['oneBuilding','closeMethod'],
    computed:{
        buildingImg(){
            let pathName = this.oneBuilding.iconImgPath;
            let fullPath = "/img/"+pathName;
            return 'url('+fullPath+')';
        },
        isHasPropaty(){
            return (propaty)=>{
                return (String(propaty) in this.oneBuilding)
            }
        }
    },
    methods:{
        clickCloseBtn(){
            this.closeMethod();
        },
        changerNum(val){
            let cityID = this.oneBuilding.cityID;
            let cityObj = this.$store.getters['city/getCityObject'](cityID);
            let err = this.oneBuilding.changeWorkerNum(val,cityObj);
            (err)?this.$store.dispatch('message/setErrMessages',err):'';
        },
        levelUp(type){
            this.$store.dispatch('city/levelupValidation',{bldInst:this.oneBuilding,neddCost:this.oneBuilding.sizeLvCost,levelUpType:type});
        }
    },
    components:{slider,useBtn}
}
</script>