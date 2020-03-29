export class Resource{
    constructor(rID,iconClass,name,num){
        this.brID = rID;
        this.iconClass = iconClass;
        this.name = name;
        this.num = num;
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

    getNum(){return this.num;}

    incNum(val){this.num +=val;}
    decNum(val){this.num -=val;}

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
}

export class LocalResource extends Resource{
    constructor(brID,iconClass,name,num,cityID){
        super(brID,iconClass,name,num);
        this.cityID = cityID;
    }
}

export class GlobalResource extends Resource{
    constructor(brID,iconClass,name,num){
        super(brID,iconClass,name,num);
    }
}

// let wealth = new GlobalResource(4,'u-icon-wealth','資金',100);
// let research = new GlobalResource(5,'u-icon-research','研究力',0);
// let anger = new GlobalResource(6,'u-icon-anger','不満',0);
// let score = new GlobalResource(7,'u-icon-score','スコア',0);
// let glResource = [wealth,research,anger,score]
let CreateLocalGlobalResource = ()=>{
    return [
        new GlobalResource(4,'u-icon-wealth','資金',100),
        new GlobalResource(5,'u-icon-research','研究力',0),
        new GlobalResource(6,'u-icon-anger','不満',0),
        new GlobalResource(7,'u-icon-score','スコア',0)
    ]
}
const globalResource = CreateLocalGlobalResource();
let CreateLocalBasicResource = (cityID)=>{
    return [
        new LocalResource(0,'u-icon-people','人口',10,cityID),
        new LocalResource(1,'u-icon-food','食料',100,cityID),
        new LocalResource(2,'u-icon-prodpow','生産力',0,cityID),
        new LocalResource(3,'u-icon-happiness','幸福度',0,cityID)
    ]
}

export {CreateLocalBasicResource,globalResource}


