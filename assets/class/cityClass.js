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
}