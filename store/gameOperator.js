import {globalResource} from '~/assets/class/basicResource';

export const state = () =>({
    turn:1,
    isGameStart:false,
    isFirstCityBuild:false,
    isMordalOpen:false,
    isJapanese:true,
    selectedGeoID:undefined,
    selectedCityID:-1,
    actionState:0,
    viewmode:0,
    globalResource:undefined
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
    setSelectedGeoID(state,payload){
        state.selectedGeoID = payload.geoID;
    },
    setSelectedCityID(state,val){
        state.selectedCityID = val;
    },
    mutateViewMode(state,viewMode){
        state.viewmode = viewMode;
    },
    proceedNextTurn(state){
        state.turn +=1;
        // state.globalResource.anger.num = 5;
        console.log(state.globalResource[2].getNum())
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
    getGlobaResource(state){
        return state.globalResource
    },
    getisFirstCityBuild(state){
        return state.isFirstCityBuild
    }
};

export const actions ={
    operateBtnClick(ctx,act){
        switch(act){
            case 'GAMESTART':
                ctx.commit('gameStart')
        }
    },
    iniSet(ctx){
        ctx.commit('gameStart');
    },
    act_selectHere(ctx,payload){
        ctx.commit('setSelectedGeoID',{geoID:payload.geoID});
    },
    act_mordalChange(ctx){
        ctx.commit('mordalChange');
    },
    act_CityBuild(ctx,payload){
        ctx.commit('mordalChange');
        ctx.commit('setSelectedGeoID',{geoID:payload.geoID});
    },
    act_selectCityAndOpen(ctx,payload){
        ctx.commit('mutateViewMode',{viewMode:payload.viewMode})
        ctx.commit('setSelectedGeoID',{geoID:payload.geoID});
        ctx.commit('setSelectedCityID',{cityID:payload.cityID})
    },
    changeToCityMode({commit},val){
        commit('mutateViewMode',1);
        commit('setSelectedCityID',val)
    },
    goNextTurn({commit}){
        commit('proceedNextTurn');
        commit('city/turnConsume',null,{root:true})
    }
};
