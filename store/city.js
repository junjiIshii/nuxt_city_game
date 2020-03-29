import City from '~/assets/class/cityClass';
import {CreateResidens,CreateFarm,CreateFactory} from '~/assets/class/building';
import {CreateLocalBasicResource} from '~/assets/class//basicResource';

export const state = () =>({
    cityData:[],
    citytotal:0,
    buildingListMode:false,
    selectedBld:undefined
})

export const mutations ={
    createNewCity(state,payload){
        let origin = state.cityData;
        let geoID = payload.geoID;
        let newID = payload.newCityID;
        let cityName = payload.inputName;
        let basicBld = [
                        CreateResidens(0,newID),
                        CreateFarm(1,newID),
                        CreateFactory(2,newID),
                        ];
        let localResource = CreateLocalBasicResource(newID);

        //create city object 
        let CreateCityObj =()=>{ 
            return new City(newID,cityName,geoID,basicBld,localResource)
        };
        let cityObj = CreateCityObj();
        origin.push(cityObj);
        state.citytotal++;
    },
    changeListMode(state){
        state.buildingListMode = !state.buildingListMode;
    },
    setSelectedBld(state,inst){
        state.selectedBld = inst;
    },
    turnConsume(state){
        state.cityData.forEach(obj=>{
            obj.doFoodCosume();
        })
    }
}

export const getters = {
    getCityName:state=>cityID=>{
        if(cityID !== undefined){
            let cityData = state.cityData.filter(data=>{
                return data.id == cityID
            })
            return cityData[0].name
        }else{
            return '';
        }
    },
    getCityObject:state=>cityID=>{
        if(cityID !== undefined){
            let cityData = state.cityData.filter(data=>{
                return data.id == cityID
            })
            return cityData[0];
        }
    },
    getBuildingInstances:state=>cityID=>{
        if(cityID !== undefined){
            let cityData = state.cityData.filter(data=>{
                return data.id == cityID
            })
            return cityData[0].buildings
        }
    },
    getLocalResourceInstances:state=>cityID=>{
        if(cityID !== undefined){
            let cityData = state.cityData.filter(data=>{
                return data.id == cityID
            })
            return cityData[0].localResource
        }
    },
    getLocalPeopleNum:(state,getters)=>cityID=>{
        let localResource = getters.getLocalResourceInstances(cityID);
        if(localResource !== undefined){
            let people = localResource.filter(data=>{
                return data.brID === 0;
            })
            return people[0].num;
        }
    },
    getWorkingPeople:state=>cityID=>{
        if(cityID !== undefined){
            let cityData = state.cityData.filter(data=>{
                return data.id == cityID
            })
            return cityData[0].inWorkPeople
        }
    },
    getFreePeople:(state,getters)=>cityID=>{
        let total = getters.getLocalPeopleNum(cityID);
        let working = getters.getWorkingPeople(cityID);
        return total-working;
    },
    getAllFoodCounsume:(state,getters)=>cityID=>{
        let buildings = getters.getBuildingInstances(cityID);
        let comsume = 0;
        buildings.forEach(obj=>{
            if('comsumeFood' in obj){
                let worker = obj.workerNum;
                let foodCons = obj.comsumeFood;
                comsume += foodCons*worker;
            }
        })
        return comsume;
    },
    getResourceWillProduct:(state,getters)=>(rID,cityID)=>{
        //rID:Resource ID
        let buildings = getters.getBuildingInstances(cityID);
        let target = buildings.filter(data=>{
            return data.prodItemID == rID
        })
        let productNum =0;
        target.forEach(ele=>{
            productNum +=ele.workerNum*ele.prodPerWorker
        })
        return productNum;
    },
    isDoubleNameExist:(state)=>name=>{
        if(state.cityData.length >0){
            let exits = state.cityData.filter(data=>{
                return data.name === name;
            })
            return exits.length !== 0
        }else{
            return false;
        }
    }
}

export const actions ={
    act_createNewCity(ctx,payload){
        if(!ctx.rootState.gameOperator.isFirstCityBuild){
            //At first game starting, no resources needed ot build city. This is special aciton for first time.
            
            //change PlayerActionState to normal mode from first building mode.
            ctx.commit('gameOperator/mutateAction',{act:'SLECTING_CITY'},{ root: true });
            //Commit mutation to register new city.
            //Gives selected geo id(location) and city's inputed name.
            ctx.commit('createFirstCity',{
                        name:payload.name,
                        geoID:ctx.rootState.gameOperator.selectedGeoID
                        })
            
            //Close the mordal for inputting city's name.
            ctx.commit('gameOperator/mordalChange',null,{ root: true });
            //Set city ID to geo data.
            ctx.commit('geo/setCityID',{
                        geoID:ctx.rootState.gameOperator.selectedGeoID,
                        cityID:ctx.state.citytotal
                        },{ root: true });
            ctx.commit('gameOperator/mutateisFirstCityBuild',null,{ root: true });
        }else{
            //In normal building mode, it needs resource to build the city and validation is done here.
            console.log('this is normal building mode.');
        }
    },

    createNewCityActions({state,commit},payload){
        let newCityID = state.citytotal;
        payload['newCityID'] = newCityID;

        commit('createNewCity',payload);
        commit('geo/setCityID',{geoID:payload.geoID,cityID:newCityID},{root:true})
    },
}

