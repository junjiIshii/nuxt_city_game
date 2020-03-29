<template>
    <div class="p-mordal__conteiner">
        <div class="p-mordal__wrapper">
            <div class="c-close-btn" v-on:click="closeMordal">
                閉じる
            </div>
            <p class="c-mordal__desctionption">{{desctionption}}</p>
            <input type="text" :placeholder="placeholder" v-model="inputed" v-on:keyup.enter.shift="submmitVal">
            <button class="c-mordal__decide" v-on:click="submmitVal">決定</button>
            <p>{{error}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'inputMordal',
    props:['desctionption','placeholder','validation','success'],
    data(){
        return{
            inputed:'',
            error:''
        }
    },
    methods:{
        submmitVal(){
            let val = this.inputed;
            let result = this.validation(val);
            switch(this.validation(val)){
                case 0: //0 must be Success 
                    this.success(val);
                default:
                    this.error = result;
            }
        },
        closeMordal(){
            this.$store.commit('geo/changeInputCityMordal')
        }
    }
}
</script>