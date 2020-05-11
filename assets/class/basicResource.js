export class Resource{
    constructor(rID,iconClass,name,num,storeType){
        this.brID = rID;
        this.iconClass = iconClass;
        this.name = name;
        this.num = num;
        this.storeType = storeType; // 0=> able to stack; 1=>not able to stack
    }
    static getIconClasses(ids){
        let list = [...classes,...proessingResourcelists]

        let icons = ids.map(ele=>{
            let result = list.filter(data=>{
                return data.id == ele;
            })
            return result[0].class
        });
        return icons;
    }
    static getIconClass(id){
        let list = [...classes,...proessingResourcelists]

        let result = list.filter(data=>{
            return data.id == id;
        })
        return result[0].class;
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

let classes = [
    {id:0,class:'u-icon-people'},
    {id:1,class:'u-icon-food'},
    {id:2,class:'u-icon-prodpow'},
    {id:3,class:'u-icon-happiness'},
    {id:4,class:'u-icon-wealth'},
    {id:5,class:'u-icon-research'},
    {id:6,class:'u-icon-anger'},
    {id:7,class:'u-icon-score'}
]


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

let proessingResourcelists=[
    {id:100,class:'u-has-resource u-r--suger',name:'砂糖',num:2000,storeType:0,toFood:5,toProd:0,toMoney:2,toHapi:2,materials:[],vol:1,mass:2,terrian:[],cityID:undefined,geoID:undefined},
    {id:101,class:'dummy',name:'小麦',num:0,storeType:0,toFood:8,toProd:0,toMoney:2,toHapi:0,materials:[],vol:2,mass:2,terrian:[]},
    {id:102,class:'dummy',name:'フルーツ',num:0,storeType:0,toFood:2,toProd:0,toMoney:3,toHapi:3,materials:[],vol:3,mass:3,terrian:[]},
    {id:103,class:'dummy',name:'家畜',num:0,storeType:0,toFood:6,toProd:0,toMoney:3,toHapi:1,materials:[],vol:5,mass:5,terrian:[]},
    {id:104,class:'dummy',name:'染料',num:0,storeType:0,toFood:6,toProd:0,toMoney:3,toHapi:1,materials:[],vol:5,mass:5,terrian:[]},
    {id:105,class:'dummy',name:'綿',num:0,storeType:0,toFood:6,toProd:0,toMoney:3,toHapi:1,materials:[],vol:5,mass:5,terrian:[]},
]
// let idStart = 100;
// let proessingResourcelists = [];
// proessingResourceRawlists.forEach(ele => {
//     // ele.brID = idStart;
//     // Object.assign({brID:idStart},ele);
//     proessingResourcelists.push(Object.assign({brID:idStart},ele))
//     idStart++;
// });

export class ProessingResource extends Resource{
    constructor(brID,iconClass,name,num,storeType,fpi,ppi,mpi,hpi,materials,volume,mass,terrian,cityID,geoID){
        super(brID,iconClass,name,num,storeType);
        this.fpi=fpi; //Conversion to Food per this item(resource). 
        this.ppi=ppi; //Conversion to Productivity per this item. 
        this.mpi=mpi; //Conversion to money per this item. 
        this.hpi=hpi; //Conversion to happiness per this item. 
        this.materials=materials; //array
        this.volume=volume;
        this.mass=mass;
        this.getTerrian=terrian;//array
        this.cityID=cityID;
        this.geoID=geoID;
    }

    static createProessingResourceById(brID){
        let target = proessingResourcelists.filter(data=>{
            return data.brID == brID;
        })
        if(target.length !== 0){
            let obj = Object.values(target[0])
            return new ProessingResource(...obj) 
        }else{
            console.error('No exit such ID of resource :'+brID);
        }
    }

    static createProessingResourceByName(brName){
        let target = proessingResourcelists.filter(data=>{
            return data.name == brName;
        })

        if(target.length !== 0){
            let obj = Object.values(target[0])
            return new ProessingResource(...obj)
        }else{
            console.error('No exit such name of resource :'+brName);
        }
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

export {CreateLocalBasicResource,globalResource,proessingResourcelists}


