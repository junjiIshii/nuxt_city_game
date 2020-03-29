<template>
    <div>
        <div class="c-geo_cell" :style="geoCellSize" :class="[terrianClassName,isHasCity]" v-on:click="returnCellID"></div>
    </div>
</template>

<script>
export default {
    name:'geoCell',
    props:['cellSize','mft','cellObj','getCellID'],
    data(){
        return{
            cellID:this.cellObj.id,
            // cityID:this.cellObj.cityID,
            terrianClassName:this.cellObj.terrian.getClassName()
        }
    },
    computed:{
        geoCellSize(){
            let square = (this.mft*this.cellSize) +'px'
            return {
                width:square,
                height:square
            }
        },
        isHasCity(){
            return (this.cellObj.cityID !== undefined)?'u-hascity':'';
        }
    },
    methods:{
        returnCellID(){
            return this.getCellID(this.cellID);
        },
    }
}
</script>