import {ProessingResource} from './basicResource';

export default class Geo{
    constructor(allX,allY,cells){
        this.allX = allX;
        this.allY = allY;
        this.cells = cells;
    }
    static createGeoMap(X,Y){
        return new Geo(X,Y,GeoCell.createGeoCell(X,Y))
    }

    setCityID(geoID,cityID){
        this.cells[geoID].cityID = cityID;
    }


}

export class GeoCell{
    constructor(id,x,y,cityID,terrian){
        this.id = id;
        this.x = x;
        this.y = y;
        this.cityID = cityID;
        this.terrian = terrian;
    }

    static createGeoCell(allX,allY){
        let cellsData = [];
        let cellsNum = allX*allY;

        for(let i=0; i<cellsNum; i++){
            let X = i%(allX)+1;
            let Y = Math.floor(i/allY)+1;
            cellsData.push(new GeoCell(i,X,Y,undefined,Terrian.createRandomTerrian(0.7)))
        }
        return cellsData;
    }

    callIsAbleBuilCityTerrian(){
        return this.terrian.isAbleBuilCityTerrian()
    }
}

export class Terrian{
    constructor(id,name,className,naturalResource){
        this.id = id;
        this.name = name;
        this.className = className;
        this.ablebuild = [1,3];
        this.naturalResource = naturalResource
    }

    static createRandomTerrian(rd){
        let n = Math.random();
        let r = Math.random();
        let resource = (r<0.1)? ProessingResource.createProessingResourceByName('砂糖'):undefined;
        if(n<rd){
            return new Terrian(1,'平地','u-plane',resource);
        }else{
            return new Terrian(2,'海','u-sea',undefined);
        }
    }

    getClassName(){
        return this.className;
    }

    isAbleBuilCityTerrian(){
        let terrian = this.id;
    
        //OK:: 1:plane,3:mountain 
        let able = this.ablebuild;
        return able.some(ele=>ele==terrian);
    }
}
