import {Resource,globalResource} from './basicResource';
export default class City{
    constructor(id,name,geoID,buildings,localResource){
        this.id = id;
        this.name = name;
        this.geoID = geoID;
        this.buildings = buildings;
        this.localResource = localResource;
        this.inWorkPeople = 0;
    }

    setWorkingPeople(val){
        this.inWorkPeople += val;
    }

    getFreePeople(){

    }

    doFoodCosume(){
        let peopelObj = this.localResource.filter(data=>{
            return data.brID == 0 //brID 1 :People
        })
        let foodStore = this.localResource.filter(data=>{
            return data.brID == 1 //brID 1 :Food
        })
        let result = 0;
        let allWorkers = 0;

        this.buildings.forEach(obj=>{
            if('comsumeFood' in obj){
                let worker = obj.workerNum;
                let foodCons = obj.comsumeFood;
                allWorkers += worker;
                result += foodCons*worker;
            }
        })
        let peopleNum = peopelObj[0].getNum();
        let frees = peopleNum - allWorkers;
        
        foodStore[0].foodConsume(result+frees);
    }

    productItems(){
        this.buildings.forEach(obj=>{
            if('workerNum' in obj && !('ableCollect' in obj)){
                let worker = obj.workerNum;
                let raito = obj.prodPerWorker;
                let prodsNum = worker * raito;
                let productItems = obj.prodItemID;

                productItems.forEach(item=>{
                    let isGlobal = Resource.isGlobalResource(item);
    
                    if(isGlobal){
                        let targetResource =  globalResource.filter(data=>{
                            return data.brID == item;
                        });
                        targetResource[0].productItem(prodsNum);
                    }else{
                        //LocalResource 
                        let targetResource = this.localResource.filter(data=>{
                            return data.brID == item;
                        })
                        targetResource[0].productItem(prodsNum);
                    }
                })
                
            }
        })
    }
}

class CityBudgets{
    constructor(ResidentTax,incomeTax){
        this.ResidentTax = ResidentTax;
        this.incomeTax = incomeTax;


    }
}