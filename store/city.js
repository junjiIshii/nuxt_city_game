import City from '~/assets/class/cityClass';
import {Residense} from '~/assets/class/building';

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
    turnCityActivity(state){
        //city orders the CityBuildings to product and consume items.
        state.cityData.forEach(obj=>{
            obj.productItems();
            obj.doFoodCosume();
        })
    },
    levelUpResidenseSize(state,inst){
        //inst must be Residense instance;
        console.log('residense size');
    },
    levelUpSize(state,inst){
        //inst must be building instance will be upped;
        //except for Residense; 
        console.log('levelUpSize size');

    },
    levelUpEfficent(state,inst){
        //inst must be building instance will be upped;
        console.log('levelUpSize size');
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
            if('prodItemID' in data) return data.prodItemID.indexOf(rID) != -1;
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
    createNewCityActions({state,commit},payload){
        let newCityID = state.citytotal;
        payload['newCityID'] = newCityID;

        commit('createNewCity',payload);
        commit('geo/setCityID',{geoID:payload.geoID,cityID:newCityID},{root:true})
    },
    levelupValidation({state,commit,getters,rootGetters,dispatch},payload){
        let cityID = payload.bldInst.cityID;
        let localResources = getters['getLocalResourceInstances'](cityID);
        let globalResources = rootGetters['gameOperator/getGlobalResource'];
        let resources = [...localResources,...globalResources];
        let costs = payload.neddCost;

        let isHasNum = costs.map(cost=>{
                        let needResource = cost.brID;
                        let needNum = cost.num;
                        let targetResource = resources.filter(data=>{
                            return data.brID == needResource;
                        })
                        let userHasNum = targetResource[0].num;
                        return userHasNum >= needNum;
                    });
        if(isHasNum.includes(false)){
            //There are shortages of Resource;
            dispatch('message/setErrMessages',5,{root:true})
        }else{
            let targetbuilding = payload.bldInst;
            switch(payload.levelUpType){
                case 0: //size up
                    if(targetbuilding instanceof Residense){
                        commit('levelUpResidenseSize',targetbuilding)
                    }else{
                        commit('levelUpSize',targetbuilding)
                    }
                break;

                case 1: //efficient up
                    commit('levelUpEfficent',targetbuilding)
                break
            }
        }
    }
}

