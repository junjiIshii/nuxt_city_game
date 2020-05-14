<template>
    <div class="p-resource-info">
        <div class="c-local-resource c-resource-info" v-for="lr in localResources" :key="lr.brID">
            <span class="u-has-icon" v-bind:class="lr.iconClass"></span><div class="c-resource-info__name">{{resourceNuminfo(lr)}}</div><span>{{resourceWillChange(lr)}}</span>
        </div>

        <div class="c-global-resource c-resource-info" v-for="gr in globalResource" :key="gr.brID">
            <span class="u-has-icon" v-bind:class="gr.iconClass"></span><div class="c-resource-info__name">{{resourceNuminfo(gr)}}</div>
        </div>

        <div v-if="natural_resource !== ''" class="c-local_natural_resource c-resource-info">
            <p class="c-nr_info">天然資源</p>
            <div class="c-nr_icon u-has-resource" :class="natural_resource.iconClass">{{natural_resource.name}}</div>
        </div>
    </div>
</template>

<script>
// gr => 'glovalResource' such as money
// lr => 'localResoure' such as food

export default {
    name:'city_sub',
    props:['localResources','workPeople'],
    computed:{
    globalResource(){
        return this.$store.getters['gameOperator/getGlobalResource']
    },
    resourceNuminfo(){
        let self = this;

        return (obj)=>{
            let workers = self.workPeople;
            let num = obj.num;
        if(obj.brID ===0){
            //brID: Basic Resource ID
            //0:People
            let freePeople = num - workers;
            return String(freePeople)+'/'+String(num);
        }else{
            return String(num)
        }
        }
    },
    resourceWillChange(){
        let self = this;
        let cityID = this.$store.getters['gameOperator/getSelectedCityID'];
        let foodUse = this.$store.getters['city/getAllFoodCounsume'](cityID);
        let freePeople = this.$store.getters['city/getFreePeople'](cityID);
        return (obj)=>{
            switch(obj.brID){
                case 1://Instance Food
                    let foodProd = this.$store.getters['city/getResourceWillProduct'](1,cityID); //rID:1 is food
                    let all = foodProd - freePeople -foodUse;

                    if(all>0)all ='+'+all;
                    return String('('+all+')');
                case 2://Instance Productivity
                    let protivProd = this.$store.getters['city/getResourceWillProduct'](2,cityID); //rID:1 is food
                    return String('('+protivProd+')');
            }
        }
    },
    natural_resource(){
        let cityID = this.$store.state.gameOperator.selectedCityID;
        let geoID = this.$store.getters['city/getCityGeoID'](cityID);
        let nrObj = this.$store.getters['geo/getNaturalResourceObj'](geoID);
        let result = (nrObj !== undefined)?{iconClass:nrObj.iconClass, name:nrObj.name}:'';
        return result;
    }
    }
}
</script>