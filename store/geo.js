import Geo from '~/assets/class/geoClass';
export const state = () =>({
    geoWidth:10,
    geoLength:10,
    geoCellUnit:50,
    geoData:Geo.createGeoMap(state.geoWidth,state.geoLength),
    inputCityMordal:false
});

export const mutations = {
    createGeo(state){
        state.geoData = Geo.createGeoMap(state.geoWidth,state.geoLength);
    },

    setCityID(state,payload){
        state.geoData.setCityID(payload.geoID,payload.cityID);
    },

    changeInputCityMordal(state){
        state.inputCityMordal = !state.inputCityMordal;
    }
};

export const getters = {
    getWidth:state=>{
        return state.geoWidth;
    },
    getWidthSize:state=>{
        let wisthNum = state.geoWidth;
        let size = wisthNum*state.geoCellUnit
        return size+'px';
    },
    getLength:state=>{
        return state.geoLength;
    },
    getLengthSize:state=>{
        let wisthNum = state.geoLength;
        let size = wisthNum*state.geoCellUnit
        return size+'px'
    },
    getGeoData:state=>{
        return state.geoData;
    },
    getGeoDataByCityID:state=>cityID=>{
        if(cityID !== undefined){
            let geoData = state.geoData.cells.filter(data=>{
                return data.cityID == cityID
            })
            return geoData[0];
        }
    },
    getCityIdByGeo:state=>geoID=>{
        if(geoID !== undefined){
            let geoData = state.geoData.cells.filter(data=>{
                return data.id == geoID
            })
            return geoData[0].cityID;
        }
    },
    getGeoTerrain:state=>id=>{
        return state.geoData.cells[id].terrian
    },
    getIsHasCity:state=>id=>{
        if(state.geoData.cells.length > 0){
            let cityID = state.geoData.cells[id].cityID;
            return (cityID !== undefined);
        }else{
            return false;
        }
    },
    getIsAbleBuildCity:(state,getters)=>id=>{
        let isAbleTerrian = state.geoData.cells[id].callIsAbleBuilCityTerrian();
        let isHasCity = getters.getIsHasCity(id);
        return (isAbleTerrian && !isHasCity);
    },
    getCityIDAtGeo:state=>id=>{
        return state.geoData[id].cityID;
    },
    getNaturalResourceObj:(state,getters)=>id=>{
        let terrian = getters.getGeoTerrain(id);
        return terrian.naturalResource;
    }
};

export const actions = {
    clickChangeColir(ctx,payload){
        ctx.commit('chengeColor',{geoID:payload.geoID,color:payload.color});
    },
    actCreateGeo({commit}){
        commit('createGeo');
    }
};
