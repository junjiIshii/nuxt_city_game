<template>
    <div class="l-city_conteiner" :class="{isMordalOpen:isgeoMapMordalOpen}">
        <p class="c-city_name">{{cityName}}</p>
        <div class="l-city_controllers">
            <subController
                v-bind:localResources="localResources"
                v-bind:workPeople="getOnWorkePeople"
            />
            <div class="p-main_controller__conteiner">
                <div v-on:click="changeBuildListMode">表示変更</div>
                <mainController v-bind:buildObj="cityBuilding"></mainController>
            </div>

            <bldUpList v-if="actionStateInCity===6" />
        </div>
    </div>
</template>

<script>
import mainController from './main';
import subController from './sub';
import bldUpList from './buildUpList';

export default {
    name:'city',
    props:['cityID'],
    computed:{
        cityName(){
            return this.$store.getters['city/getCityName'](this.cityID);
        },
        cityBuilding(){
            return this.$store.getters['city/getBuildingInstances'](this.cityID);
        },
        localResources(){
            return this.$store.getters['city/getLocalResourceInstances'](this.cityID);
        },
        getOnWorkePeople(){
            return this.$store.getters['city/getWorkingPeople'](this.cityID);
        },
        actionStateInCity(){
            return this.$store.getters['gameOperator/getActionState'];
        },
        isgeoMapMordalOpen(){
            let action = this.$store.getters['gameOperator/getActionState'];
            let allowActions =[6,7,8];
            return allowActions.indexOf(action) >= 0;
        }
    },
    methods:{
        changeBuildListMode(){
            this.$store.commit('city/changeListMode');
        }
    },
    components:{mainController,subController,bldUpList}
}
</script>