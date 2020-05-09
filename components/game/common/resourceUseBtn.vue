<template>
    <div class="p-item-use">
        <span class="c-actionBtn" v-on:click="clickBtn">{{actionName}}</span>
        <span class="c-need-item u-has-icon" v-for="(item,index) in useItems" :key="index" :class="items(item)" >{{item.num}}</span>
    </div>
</template>

<script>
import {Resource,GlobalResource,LocalResource} from '~/assets/class/basicResource';
export default {
    name:'resourceUseBtn',
    props:['actionName','useItems','clickMethod','actionAgument'],
    computed:{
        items(){
            return OBJ =>{
                let store = this.$store;
                let icon = Resource.getIconClass(OBJ.brID);

                let isEnough = (obj) =>{
                    if(Resource.isGlobalResource(obj.brID)){
                        return store.getters['gameOperator/isResourceEnoughInGlobal'](obj.brID,obj.num);
                    }else{
                        let cityID = store.state.gameOperator.selectedCityID;
                        return store.getters['city/isResourceEnoughInCity'](obj.brID,cityID,obj.num);
                    }
                }
                return [icon,isEnough(OBJ)]
            }
        },
    },
    methods:{
        clickBtn(){
            let action = this.actionAgument;
            return this.clickMethod(action);
        },
        iconClass(id){
            return Resource.getIconClass(id)
        }
    }
}
</script>