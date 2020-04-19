export class Resource{
    constructor(rID,iconClass,name,num,storeType){
        this.brID = rID;
        this.iconClass = iconClass;
        this.name = name;
        this.num = num;
        this.storeType = storeType; // 0=> able to stack; 1=>not able to stack
    }
    static getIconClasses(ids){
        let classes = [
            'u-icon-people',
            'u-icon-food',
            'u-icon-prodpow',
            'u-icon-happiness',
            'u-icon-wealth',
            'u-icon-research',
            'u-icon-anger',
            'u-icon-score'
        ]
        let icons = ids.map(ele=>classes[ele]);
        return icons;
    }
    static getIconClass(id){
        let classes = [
            'u-icon-people',
            'u-icon-food',
            'u-icon-prodpow',
            'u-icon-happiness',
            'u-icon-wealth',
            'u-icon-research',
            'u-icon-anger',
            'u-icon-score'
        ]
        return classes[id];
    }
    static isGlobalResource(id){
        return (id >= 4);
    }

    getNum(){return this.num;}
    incNum(val){this.num +=val;}
    decNum(val){this.num -=val;}
    
    productItem(val){
        let isStackItem = (this.storeType !== 1);
        (isStackItem)?this.num += val: this.num = val;
    }

    foodConsume(val){
        let result = this.num -val;
        if(result >= 0){
            this.num -=val;
        }else if(result < 0 && this.num > 0){
            this.num =0;
            globalResource[2].incNum((-1)*result);
        }else{
            globalResource[2].incNum(val);
        }
    }

    static debugMoneyInc(val){
        globalResource[0].incNum(val);
    }
}

export class LocalResource extends Resource{
    constructor(brID,iconClass,name,num,storeType,cityID){
        super(brID,iconClass,name,num,storeType);
        this.cityID = cityID;
    }
}

export class GlobalResource extends Resource{
    constructor(brID,iconClass,name,num,storeType){
        super(brID,iconClass,name,num,storeType);
    }
}

export class proessingResource extends Resource{
    constructor(brID,iconClass,name,num,storeType,fpi,ppi,mpi,hpi,materials,volume,mass){
        super(brID,iconClass,name,num,storeType);
        this.fpi=fpi; //Conversion to Food per this item(resource). 
        this.ppi=ppi; //Conversion to Productivity per this item. 
        this.mpi=mpi; //Conversion to money per this item. 
        this.hpi=hpi; //Conversion to happiness per this item. 
        this.materials=materials; //array
        this.volume=volume;
        this.mass=mass;
    }
    static createProessingResource(brID){
        let idStart = 8;
        
        const lists=[
            {name:'砂糖',toFood:'5',toProd:0,toMoney:2,toHapi:2,materials:[],vol:1,mass:1,} 
        ]
    }
}


let CreateLocalGlobalResource = ()=>{
    return [
        new GlobalResource(4,'u-icon-wealth','資金',100,0),
        new GlobalResource(5,'u-icon-research','研究力',0,0),
        new GlobalResource(6,'u-icon-anger','不満',0,0),
        new GlobalResource(7,'u-icon-score','スコア',0,0)
    ]
}
const globalResource = CreateLocalGlobalResource();
let CreateLocalBasicResource = (cityID)=>{
    return [
        new LocalResource(0,'u-icon-people','人口',10,0,cityID),
        new LocalResource(1,'u-icon-food','食料',100,0,cityID),
        new LocalResource(2,'u-icon-prodpow','生産力',0,1,cityID),
        new LocalResource(3,'u-icon-happiness','幸福度',0,1,cityID)
    ]
}

export {CreateLocalBasicResource,globalResource}


