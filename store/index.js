import {Resource} from '~/assets/class/basicResource';

export const strict = false
export const getters = {
    getResourceIcon:state=>id=>{
        return Resource.getIconClasses(id)[0];
    },
    getResourceIcons:state=>ids=>{
        return Resource.getIconClasses(ids);
    }
}