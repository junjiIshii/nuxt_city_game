// import Store from '~/store/index';
import City from './cityClass';
import {Resource} from './basicResource';

class BuildingInfo{
    /*
        classID: Types of Building instances. EX) 0=>Residence 1=>Farm.. 
        id: To Recognize building's Order in City.
        name: Building's name.
    */
    constructor(classID,id,cityID,name,iconClass,iconImgPath,sizeLevel,sizeLvCost,maxSizeLv,isUnlock,buildUpCost){
        this.classID = classID;
        this.id = id;
        this.cityID = cityID;
        this.name = name;
        this.iconClass = iconClass;
        this.iconImgPath= iconImgPath;
        this.sizeLevel = sizeLevel;
        this.sizeLvCost = sizeLvCost;//[{'brID':int,'num':int},{'brID':int,'num':int}] never double resourceId;
        this.maxSizeLv = maxSizeLv;
        this.isUnlock = isUnlock;
        this.buildUpCost = buildUpCost;
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
    constructor(classID,id,cityID,name,iconClass,iconImgPath,sizeLevel,sizeLvCost,maxSizeLv,isUnlock,buildUpCost){
        super(classID,id,cityID,name,iconClass,iconImgPath,sizeLevel,sizeLvCost,maxSizeLv,isUnlock,buildUpCost);
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

//static claas for building that produces ,collects or processes any items
//these buildings product any items with working people.
class ProduvtiveBuilding extends BuildingInfo{
    constructor(classID,id,cityID,name,iconClass,iconImgPath,workerNum,maxWorkerNum,prodPerWorker,comsumeFood,sizeLevel,effiLevel,sizeLvCost,effiLvCost,maxSizeLv,maxEffiLv,isUnlock,buildUpCost){
        super(classID,id,cityID,name,iconClass,iconImgPath,sizeLevel,sizeLvCost,maxSizeLv,isUnlock,buildUpCost);
        this.workerNum = workerNum;
        this.maxWorkerNum = maxWorkerNum;
        this.prodPerWorker = prodPerWorker;
        this.comsumeFood = comsumeFood;
        this.sizeLevel = sizeLevel;
        this.effiLevel = effiLevel; //effiLevel: efficient Level
        this.effiLvCost = effiLvCost;//[{'brID':int,'num':int},{'brID':int,'num':int}] never double resourceId;
        this.maxSizeLv = maxSizeLv;
        this.maxEffiLv = maxEffiLv;
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
    spendBuildUpCost(resources){
        this.buildUpCost.forEach(data=>{
            let targetResource = resources.filter(res=>{
                return res.brID == data.brID;
            })
            targetResource[0].decNum(data.num);
        })
    }
}


// Simply product any basic resource (like food ) with worker.
export class ProductBuilding extends ProduvtiveBuilding{
    constructor(classID,id,cityID,name,iconClass,iconImgPath,workerNum,maxWorkerNum,prodPerWorker,comsumeFood,prodItemID,sizeLevel,effiLevel,sizeLvCost,effiLvCost,maxSizeLv,maxEffiLv,isUnlock,buildUpCost){
        super(classID,id,cityID,name,iconClass,iconImgPath,workerNum,maxWorkerNum,prodPerWorker,comsumeFood,sizeLevel,effiLevel,sizeLvCost,effiLvCost,maxSizeLv,maxEffiLv,isUnlock,buildUpCost);
        this.prodItemID = prodItemID;// ints in array
        this.prodItemIcon = Resource.getIconClasses(prodItemID);//strings in array
    }
}

// collect any natural resource (like suger, iron) with worker.
export class CollectionBuilding extends ProduvtiveBuilding{
    constructor(classID,id,cityID,name,iconClass,
                iconImgPath,workerNum,maxWorkerNum,prodPerWorker,
                comsumeFood,sizeLevel,effiLevel,
                sizeLvCost,effiLvCost,maxSizeLv,maxEffiLv,
                isUnlock,buildUpCost,ableCollect)
    {
        super(classID,id,cityID,name,iconClass,iconImgPath,workerNum,maxWorkerNum,prodPerWorker,comsumeFood,sizeLevel,effiLevel,sizeLvCost,effiLvCost,maxSizeLv,maxEffiLv,isUnlock,buildUpCost)
        this.ableCollect = ableCollect;
        this.prodItemID = [100];
        this.prodItemIcon = Resource.getIconClasses(this.prodItemID);//strings in array
        // this.collectItemID = undefined;
    }

    setItem(brID){
        this.prodItemID[0] = brID;
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

/*
    classID,
    id,
    cityID,
    name,
    iconClass,____5
    iconImgPath,
    workerNum,
    maxWorkerNum,
    prodPerWorker,
    comsumeFood,____10
    prodItemID,
    sizeLevel,
    effiLevel,
    sizeLvCost,
    effiLvCost,
    maxSizeLv,
    maxEffiLv,
    isUnlock
*/

let CreateResidens = {id:0,method:(orderID,cityID,isUnlock=true)=>{ 
    return new Residense(
        0,
        orderID,
        cityID,
        '住居',
        'c-residence_img',
        'residense.png',
        1,
        [{'brID':2,'num':15},{'brID':4,'num':20}],
        10,
        isUnlock,
        [{'brID':2,'num':300},{'brID':4,'num':300}]
    )}};
    
let CreateFarm = {id:1,method:(orderID,cityID,isUnlock=true)=>{ 
    return new ProductBuilding(
        1,
        orderID,
        cityID,
        '農場',
        'c-farm_img',
        'farm.png',
        0,
        5,
        2,
        1,
        [1],
        1,
        1,
        [{'brID':2,'num':15},{'brID':4,'num':20}],
        [{'brID':2,'num':30},{'brID':4,'num':40}],
        10,
        10,
        isUnlock,
        [{'brID':2,'num':250},{'brID':4,'num':100}]
    )}};//product Food:1

    let CreateFactory = {id:2,method:(orderID,cityID,isUnlock=true)=>{ 
    return new ProductBuilding(
        2,
        orderID,
        cityID,
        '工場',
        'c-factory_img',
        'factory.png',
        0,
        5,
        10,
        2,
        [2],
        1,
        1,
        [{'brID':2,'num':15},{'brID':4,'num':20}],
        [{'brID':2,'num':30},{'brID':4,'num':40}],
        10,
        10,
        isUnlock,
        [{'brID':2,'num':450},{'brID':4,'num':200}]
    )}};//product Productivity:2

    let CreatePlantation = {id:3,method:(orderID,cityID,isUnlock=true)=>{
        return new CollectionBuilding(
            3,
            orderID,
            cityID,
            '栽培所',
            'c-plantation_img',
            'plantation.png',
            0,
            5,
            10,
            2,
            1,
            1,
            [{'brID':2,'num':15},{'brID':4,'num':20}],
            [{'brID':2,'num':30},{'brID':4,'num':40}],
            15,
            15,
            isUnlock,
            [{'brID':2,'num':50},{'brID':4,'num':30}],
            [100,101,102,103,104,105]//sugure, wheat, fruits, livestock, dye, cotton
        )
    }}



// Building instance for list
let buildingList = [
    CreateResidens.method(0,undefined),
    CreateFarm.method(1,undefined),
    CreateFactory.method(2,undefined),
    CreatePlantation.method(3,undefined)
]

let buildMethodList = [
    CreateResidens,
    CreateFarm,
    CreateFactory,
    CreatePlantation
]

export{CreateResidens,CreateFarm,CreateFactory,buildMethodList,buildingList}
