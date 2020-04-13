// import Store from '~/store/index';
import City from './cityClass';
import {Resource} from './basicResource';

class BuildingInfo{
    /*
        classID: Types of Building instances. EX) 0=>Residence 1=>Farm.. 
        id: To Recognize building's Order in City.
        name: Building's name.
    */
    constructor(classID,id,cityID,name,iconClass,iconImgPath,sizeLevel,sizeLvCost){
        this.classID = classID;
        this.id = id;
        this.cityID = cityID;
        this.name = name;
        this.iconClass = iconClass;
        this.iconImgPath= iconImgPath;
        this.sizeLevel = sizeLevel;
        this.sizeLvCost = sizeLvCost;//[{'brID':int,'num':int},{'brID':int,'num':int}] never double resourceId;
    }
    sizeLvCostUp(){
        let costUpRaito = 1.2;
        this.sizeLvCost.forEach(data=>{
            let costUp = Math.floor(data.num * costUpRaito);
            data.num = costUp;
        })
    }
}

export class Residense extends BuildingInfo{
    constructor(classID,id,cityID,name,iconClass,iconImgPath,sizeLevel,sizeLvCost){
        super(classID,id,cityID,name,iconClass,iconImgPath,sizeLevel,sizeLvCost);
    }
    incResidenseSizeLv(peopleInst,resources){
        this.sizeLevel +=1;
        peopleInst.incNum(10);
        this.sizeLvCost.forEach(data=>{
            let targetResource = resources.filter(res=>{
                return res.brID == data.brID;
            })
            targetResource[0].decNum(data.num);
        })
    }
}

export class ProductBuilding extends BuildingInfo{
    constructor(classID,id,cityID,name,iconClass,iconImgPath,workerNum,maxWorkerNum,prodPerWorker,comsumeFood,prodItemID,sizeLevel,effiLevel,sizeLvCost,effiLvCost){
        super(classID,id,cityID,name,iconClass,iconImgPath,sizeLevel,sizeLvCost);
        this.workerNum = workerNum;
        this.maxWorkerNum = maxWorkerNum;
        this.prodPerWorker = prodPerWorker;
        this.comsumeFood = comsumeFood;
        this.prodItemID = prodItemID;// ints in array
        this.prodItemIcon = Resource.getIconClasses(prodItemID);//strings in array
        this.sizeLevel = sizeLevel;
        this.effiLevel = effiLevel; //effiLevel: efficient Level
        this.effiLvCost = effiLvCost;//[{'brID':int,'num':int},{'brID':int,'num':int}] never double resourceId;
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
    incSizeLv(resources){
        //resources = [LocalResources(associated with cityID),globalResources]
        this.sizeLevel +=1;
        this.maxWorkerNum +=5;
        this.sizeLvCost.forEach(data=>{
            let targetResource = resources.filter(res=>{
                return res.brID == data.brID;
            })
            targetResource[0].decNum(data.num);
        })
    }
    incEfficiLv(resources){
        this.effiLevel +=1;
        this.prodPerWorker +=1;
        this.sizeLvCost.forEach(data=>{
            let targetResource = resources.filter(res=>{
                return res.brID == data.brID;
            })
            targetResource[0].decNum(data.num);
        })
    }
    EfficLvCostUp(){
        let costUpRaito = 1.2;
        this.effiLvCost.forEach(data=>{
            let costUp = Math.floor(data.num * costUpRaito);
            data.num = costUp;
        })
    }
}

//Initial any Building Cost 
const residensSizeUpCost = [{'brID':2,'num':15},{'brID':4,'num':20}];

const commonSizeUpCost = [{'brID':2,'num':15},{'brID':4,'num':20}];
const commonEffiUpCost = [{'brID':2,'num':30},{'brID':4,'num':40}];

const farmSizeUpCost = [{'brID':2,'num':15},{'brID':4,'num':20}];
const farmEffiUpCost = [{'brID':2,'num':30},{'brID':4,'num':40}];

const factSizeUpCost = [{'brID':2,'num':15},{'brID':4,'num':20}];
const factEffiUpCost = [{'brID':2,'num':30},{'brID':4,'num':40}];

// INITIAL INSTANCE 
let CreateResidens = (orderID,cityID)=>{ return new Residense(0,orderID,cityID,'住居','c-residence_img','residense.png',1,[{'brID':2,'num':15},{'brID':4,'num':20}])};
let CreateFarm = (orderID,cityID)=>{ return new ProductBuilding(1,orderID,cityID,'農場','c-farm_img','farm.png',0,5,2,1,[1],1,1,[{'brID':2,'num':15},{'brID':4,'num':20}],[{'brID':2,'num':30},{'brID':4,'num':40}])};//product Food:1
let CreateFactory = (orderID,cityID)=>{ return new ProductBuilding(2,orderID,cityID,'工場','c-factory_img','factory.png',0,5,10,2,[2],1,1,[{'brID':2,'num':15},{'brID':4,'num':20}],[{'brID':2,'num':30},{'brID':4,'num':40}])};//product Productivity:2

// let residens =CreateResidens();
// let farm = CreateFarm();
// let factory = CreateFactory();

export{CreateResidens,CreateFarm,CreateFactory}
