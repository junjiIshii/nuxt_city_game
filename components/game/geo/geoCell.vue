<template>
        <div class="c-geo_cell" :style="geoCellSize" :class="[terrianClassName,isHasCity,naturalResource]" v-on:click="returnCellID"></div>
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
        },
        naturalResource(){
            let naturalResource = this.cellObj.terrian.naturalResource;
            return (naturalResource !== undefined)?'u-has-resource '+naturalResource.iconClass:'';
        }
    },
    methods:{
        returnCellID(){
            return this.getCellID(this.cellID);
        },
    }
}
</script>