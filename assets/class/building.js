// import Store from '~/store/index';
import City from './cityClass';
import {Resource} from './basicResource';

class BuildingInfo{
    /*
        classID: Types of Building instances. EX) 0=>Residence 1=>Farm.. 
        id: To Recognize building's Order in City.
        name: Building's name.
    */
    constructor(classID,id,cityID,name,iconClass,iconImgPath){
        this.classID = classID;
        this.id = id;
        this.cityID = cityID;
        this.name = name;
        this.iconClass = iconClass;
        this.iconImgPath= iconImgPath;
    }
}

class Residense extends BuildingInfo{
    constructor(classID,id,cityID,name,iconClass,iconImgPath){
        super(classID,id,cityID,name,iconClass,iconImgPath);
    }
}

class ProductBuilding extends BuildingInfo{
    constructor(classID,id,cityID,name,iconClass,iconImgPath,workerNum,maxWorkerNum,prodPerWorker,comsumeFood,prodItemID){
        super(classID,id,cityID,name,iconClass,iconImgPath);
        this.workerNum = workerNum;
        this.maxWorkerNum = maxWorkerNum;
        this.prodPerWorker = prodPerWorker;
        this.comsumeFood = comsumeFood;
        this.prodItemID = prodItemID;
        this.prodItemIcon = Resource.getIconClass(prodItemID);
    }
    getWorkerNum(){
        return this.workerNum;
    }
    incWorkerNum(){
        if(this.maxWorkerNum < this.workerNum+1){
            Store.dispatch('message/setMes')
        }else{
            this.workerNum += 1;
        }
    }
    DecWorkerNum(){
        this.workerNum -= 1;
    }
    changeWorkerNum(val,cityObj){
        let cityWorker = cityObj.inWorkPeople;
        let cityPeopeleResource = cityObj.localResource.filter(data=>{
                                return data.brID === 0;
                            })
        let cityPeopele = cityPeopeleResource[0].num;
        let willreslut = this.workerNum+val;
        let willTotal = cityWorker+val;


        if(willTotal<=cityPeopele){
            if(0<=willreslut && willreslut<=this.maxWorkerNum){
                this.workerNum += val;
                cityObj.setWorkingPeople(val);
            }else if(willreslut<0){
                return 2; //error message id
            }else if(this.maxWorkerNum<willreslut){
                return 3;//error message id
            }
        }else{
            return 4;//error message id
        }
    }
    getConsumeFood(){
        return this.workerNum*this.comsumeFood;
    }
    getProductNum(){
        return this.workerNum*this.prodPerWorker;
    }
}

// class transportBuild extends ProductBuilding{
//     constructor(classID,id,cityID,name,iconClass){
//         super(classID,id,cityID,name,iconClass);
//     }
// }

// INITIAL INSTANCE 
let CreateResidens = (orderID,cityID)=>{ return new Residense(0,orderID,cityID,'住居','c-residence_img','residense.png')};
let CreateFarm = (orderID,cityID)=>{ return new ProductBuilding(1,orderID,cityID,'農場','c-farm_img','farm.png',0,5,2,1,1)};//product Food:1
let CreateFactory = (orderID,cityID)=>{ return new ProductBuilding(2,orderID,cityID,'工場','c-factory_img','factory.png',0,5,10,2,2)};//product Productivity:2

// let residens =CreateResidens();
// let farm = CreateFarm();
// let factory = CreateFactory();

export{CreateResidens,CreateFarm,CreateFactory}
