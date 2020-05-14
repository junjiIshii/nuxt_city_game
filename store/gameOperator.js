import {Resource,globalResource} from '~/assets/class/basicResource';
import {buildingList} from '~/assets/class/building';


export const state = () =>({
    turn:1,
    isGameStart:false,
    isFirstCityBuild:false,
    isMordalOpen:false,
    isJapanese:true,
    selectedGeoID:undefined,
    selectedCityID:undefined,
    actionState:0,
    viewmode:0, //0=>geo ,1=>city
    globalResource:undefined,
    buildingList:buildingList
});

export const mutations ={
    gameStart(state){
        // state.isGameStart = true;
        // state.actionState='SETTING_INI'
        state.globalResource = globalResource;
    },

    gameClose(state){
        state.isGameStart = false;
    },
    mutateisFirstCityBuild(state){
        state.isFirstCityBuild = !state.isFirstCityBuild;
    },
    changeActionState(state,val){
        state.actionState = val
    },
    mordalChange(state){
        state.isMordalOpen = !state.isMordalOpen;
    },
    setSelectedGeoID(state,val){
        state.selectedGeoID = val;
    },
    setSelectedCityID(state,val){
        state.selectedCityID = val;
    },
    mutateViewMode(state,viewMode){
        state.viewmode = viewMode;
    },
    proceedNextTurn(state){
        Resource.debugMoneyInc(20);
        state.turn +=1;
    }
};

export const getters ={
    getActionState(state){
        return state.actionState;
    },
    getViewMode(state){
        return state.viewmode;
    },
    getSelectedCityID(state){
        return state.selectedCityID
    },
    getGlobalResource(state){
        return state.globalResource
    },
    getisFirstCityBuild(state){
        return state.isFirstCityBuild
    },
    isResourceEnoughInGlobal:(state) => (brID,needs) =>{
            let globalResource = state.globalResource.filter(data=>{
                return data.brID == brID
            })
            let having = globalResource[0].num
            return (needs <=  having)?'u-ENOUHG':'u-LESS';
    }
};
export const actions ={
    changeToCityMode({commit},payload){
        commit('mutateViewMode',1);
        commit('setSelectedCityID',payload.cityID)
        commit('setSelectedGeoID',payload.geoID);
    },
    changeToGeoMode({commit}){
        commit('mutateViewMode',0);
        commit('setSelectedCityID',undefined);
        commit('setSelectedGeoID',undefined);
    },
    goNextTurn({commit}){
        commit('proceedNextTurn');
        commit('city/turnCityActivity',null,{root:true})
    }
};
