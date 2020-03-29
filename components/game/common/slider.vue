<template>
    <div class="p-rich-slider">
        <i class="fas fa-minus-square c-slider-btn c-rich-slider__minus" v-on:click="clickMinuss"></i>
        <input class="c-rich-slider__slide" type="range" 
                v-bind:min="min" v-bind:max="max" 
                v-bind:value="presentVal" step="1"
                v-on:input.stop="returnValue($event)">
        <i class="fas fa-plus-square c-slider-btn c-rich-slider__minus" v-on:click="clickPuls"></i>
    </div>
</template>

<script>
export default {
    name:'slider',
    props:['max','min','presentVal','getMethod'],
    methods:{
        returnValue(event){
            let chache = Number(this.presentVal);
            let val= event.target.value;
            let differ = val-chache;
            if(differ>1)event.target.value = chache;
            return this.getMethod(differ);
        },
        clickPuls(){
            return this.getMethod(1);
        },
        clickMinuss(){
            return this.getMethod(-1);
        }
    }
}
</script>
