<template>
    <div class="l-geo_conteiner" :class="{isMordalOpen:isgeoMapMordalOpen}">
        <inputMordal
            v-bind:desctionption="'街の名前を入力'"
            v-bind:placeholder="'ここに入力'"
            v-bind:validation="cityNameValidation"
            v-bind:success="cityNameInputSuc"
            v-if="inputCityMordal"
        />
        <div class="l-geo_conteiner__wrapper" :style="geoWrapperSize">
            <geoCell 
                v-for="cell in getGeoCellData" 
                :key="cell.id" 
                v-bind:cellObj="cell"
                v-bind:cellSize="baseCellSize"
                v-bind:mft="magnification"
                v-bind:getCellID="clickedCellOperation"/>
        </div>
    </div>
</template>

<script>
import geoCell from './geoCell';
import inputMordal from '~/components/game/common/inputMordal';
export default {
    name:'geo',
    data(){
        return{
            width:this.$store.state.geo.geoWidth,
            length:this.$store.state.geo.geoLength,
            magnification:1,
            baseCellSize:50,
            selectedGeoCell:undefined,
        }
    },
    computed:{
        inputCityMordal(){
            return this.$store.state.geo.inputCityMordal
        },
        getGeoCellData(){
            return this.$store.state.geo.geoData.cells
        },
        //mft = magnification
        geoWrapperSize(){
            let widthPx = (this.width*this.magnification*this.baseCellSize)+1 +'px'
            let heightPx = (this.length*this.magnification*this.baseCellSize)+1 +'px'

            return {
                width:widthPx,
                height:heightPx
            }
        },
        isgeoMapMordalOpen(){
            if(this.inputCityMordal){
                return true;
            }
        }
    },
    methods:{
        clickedCellOperation(id){
            /*
            0=>build first city
            1=>build new city
            2=>search
            3=>create new raod,
            4=>cretate new distribution,
            5=>change city mode
            6=>next turn
            */
            this.selectedGeoCell = id;
            let actionState = this.$store.state.gameOperator.actionState;
            let isAbleBuild = this.$store.getters['geo/getIsAbleBuildCity'](id);
            let isHasCity = this.$store.getters['geo/getIsHasCity'](id);
            switch(actionState){
                case 0:

                    if(isAbleBuild){
                        this.$store.commit('geo/changeInputCityMordal');
                    }else{
                        this.$store.dispatch('message/setErrMessages',0);
                    }
                    break;
                case 1:
                    // TODO validate by Resource
                    if(isAbleBuild){
                        this.$store.commit('geo/changeInputCityMordal')
                    }else{
                        this.$store.dispatch('message/setErrMessages',0)
                    }
                    break;
                case 5:
                    if(isHasCity){
                        let cityID = this.$store.getters['geo/getCityIdByGeo'](id);
                        this.$store.dispatch('gameOperator/changeToCityMode',cityID);
                    }
                    break;
                default:
                    if(isHasCity){
                        let cityID = this.$store.getters['geo/getCityIdByGeo'](id);
                        this.$store.dispatch('gameOperator/changeToCityMode',cityID);
                    }
                    break;
            }
        },
        cityNameValidation(val){
            let isDubleNameExist = this.$store.getters['city/isDoubleNameExist'](val)
            if(val !== '' && !isDubleNameExist){
                return 0;
            }else if(val == ''){
                return '都市名を入力してください。'
            }else{
                return '都市名が重複しています。'
            }
        },
        cityNameInputSuc(val,id){
            this.$store.commit('geo/changeInputCityMordal');
            this.$store.commit('gameOperator/changeActionState',-1);
            this.$store.dispatch('city/createNewCityActions',{inputName:val,geoID:this.selectedGeoCell})
        }
    },
    mounted(){
        let conteinerWidth = $('.l-geo_conteiner').width();
        $('.l-geo_conteiner').height(conteinerWidth);
        $(window).resize(()=>{
            let conteinerWidth = $('.l-geo_conteiner').width();
            $('.l-geo_conteiner').height(conteinerWidth);
        })
    },
    components:{geoCell,inputMordal}
}

</script>

<style lang="stylus">

</style>