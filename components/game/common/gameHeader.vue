<template>
    <header class="l-game-header">
        <div class="p-game-heder__icon-conteiner u-header_geo" v-if="viewmode===0">
            {{turnNum}}
            <div v-for="(menu,index) in geoHeader" :key="index" v-on:click="selectActions(menu.actionID)" :class="menu.actionID===selectedAction?'is-selected_action':''">
                <i class="game-heder__icon fas" :class="menu.class">
                    <span class="game-heder__icon-guide">{{menu.name}}</span>
                </i>
            </div>
        </div>

        <div class="p-game-heder__icon-conteiner u-header_city" v-if="viewmode===1">
            {{turnNum}}
            <div v-for="(menu,index) in cityHeader" :key="index" v-on:click="selectActions(menu.actionID)" :class="menu.actionID===selectedAction?'is-selected_action':''">
                <i class="game-heder__icon fas" :class="[menu.class]">
                    <span class="game-heder__icon-guide">{{menu.name}}</span>
                </i>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name:'gameHeader',
    props:['viewmode'],
    data(){
        return{
            geoHeader:[
                {name:'新しい都市を建設',class:'fa-plus',actionID:1},
                {name:'調査',class:'fa-search',actionID:2},
                {name:'新しい交通を整備',class:'fa-road',actionID:3},
                {name:'物流',class:'fa-truck-loading',actionID:4},
                {name:'Cityを選択',class:'fa-city',actionID:5},
                {name:'次のターンへ',class:'fa-forward',actionID:100},
            ],
            cityHeader:[
                {name:'新しい建物を建設',class:'fa-plus',actionID:6},
                {name:'税金',class:'fa-money-bill',actionID:7},
                {name:'物流',class:'fa-truck-loading',actionID:8},
                {name:'全体マップへ',class:'fa-globe',actionID:9},
                {name:'次のターンへ',class:'fa-forward',actionID:100},
            ],
        }
    },
    computed:{
        selectedAction(){
            return this.$store.state.gameOperator.actionState;
        },
        turnNum(){
            return this.$store.state.gameOperator.turn;
        }
    },
    methods:{
        selectActions(actID){
            let cache = this.$store.state.gameOperator.actionState;
            if(actID!==cache && actID !== 100 && actID !==9){
                this.$store.commit('gameOperator/changeActionState',actID);
            }else if(actID ===9){
                // this.$store.commit('gameOperator/mutateViewMode',0);
                this.$store.commit('gameOperator/changeActionState',-1);
                this.$store.dispatch('gameOperator/changeToGeoMode');
            }else if(actID ===100){
                this.$store.dispatch('gameOperator/goNextTurn');
            }else{
                this.$store.commit('gameOperator/changeActionState',-1);
            }
        }
    }
}
</script>