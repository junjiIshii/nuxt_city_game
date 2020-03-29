<template>
    <!-- <gameHeader v-show="isHeaderOpen" v-bind:class="viewMode"/> -->
    <div>
        <gameHeader v-bind:viewmode="viewMode"/>
        <p v-on:click="createGeo">マップ生成</p>
        <geo v-if="viewMode === 0"/>
        <city v-if="viewMode === 1" v-bind:cityID="selectedCityID"/>
    </div>
</template>

<script>
import gameHeader from './common/gameHeader';
import geo from './geo/geo';
import city from './city/city';
import inputMordal from '~/components/game/common/inputMordal';

export default {
    
    name:'gameApp',
    computed:{
        isHeaderOpen(){ return this.$store.state.gameOperator.isFirstCityBuild},
        selectedCityID(){return this.$store.state.gameOperator.selectedCityID},
        viewMode(){
            //0=>geo, 1=>city
            return this.$store.getters['gameOperator/getViewMode'];
        },
    },
    methods:{
        createGeo(){
            this.$store.dispatch('geo/actCreateGeo');
            this.$store.commit('gameOperator/gameStart');
        },
    },
    components:{gameHeader,geo,city}
}
</script>
