<template>
    <div class="l-city_conteiner">
        <p>{{cityName}}</p>
        <div class="l-city_controllers">
            <subController
                v-bind:localResources="localResources"
                v-bind:workPeople="getOnWorkePeople"
            />
            <div>
                <div v-on:click="changeBuildListMode">表示変更</div>
                <mainController v-bind:buildObj="cityBuilding"></mainController>
            </div>
        </div>
    </div>
</template>

<script>
import mainController from './main';
import subController from './sub';

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
        }
    },
    methods:{
        changeBuildListMode(){
            this.$store.commit('city/changeListMode');
        }
    },
    components:{mainController,subController}
}
</script>