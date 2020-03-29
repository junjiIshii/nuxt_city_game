export const state = () =>({
    lazyTime:0,
        defined:[
            {id:0,
            jmes:'最初の都市を建設する場所を選択してください。',
            emes:'Select the place to buid your first City!'},

            {id:1,
                jmes:'都市を建設する場所を選択してください。',
                emes:'Select the place to buid your City!'
            },
        ],
        errorMes:[
            {id:0,
            jmes:'この場所に都市は建てらません。',
            emes:"Can not build city there."
            },
            {id:1,
                jmes:'これ以上労働者を増やせません',
                emes:'Select the place to buid your City!'
            },
            {id:2,
                jmes:'これ以上は下げられません。',
                emes:'Select the place to buid your City!'
            },
            {id:3,
                jmes:'これ以上は上げられません。',
                emes:'Select the place to buid your City!'
            },
            {id:4,
                jmes:'人口の上限を超えています。',
                emes:'Select the place to buid your City!'
            },
        ],
        template:[
            {id:0,
            jmes:'が新たに建設されました。',
            emes:'has been build.'
            }
        ],
        history:{
            messages:[],
            counts:0
        },
        shortMessage:{
            mes:''
        }
});

export const mutations ={
    mutateShortMes(state,payload){
        state.shortMessage.mes=payload.setMes;
    },
    setMessages(state,payload){
        state.history.messages.unshift(payload.setMes);
    },
    setLazyTime(state,payload){
        state.lazyTime = payload.time;
    }
};

export const getters ={
    getAnyMes:state=> (id,type)=>{
        switch(type){
            case 'DEF':
                return state.defined[id].jmes;
            case 'ERR':
                return state.errorMes[id].jmes;
            case 'TMP':
                return state.template[id].jmes;
        }
    },
    getMessages(state){
        return state.history.messages
    }
};

export const actions ={
    setShortMes(ctx,payload){
        let mes = ctx.getters.getAnyMes(payload.id,payload.type);
        ctx.commit('mutateShortMes',{setMes:mes});
    },
    iniSet(ctx){
        let mes = ctx.getters.getAnyMes(0,'DEF');
        ctx.commit('mutateShortMes',{setMes:mes});
    },
    canotBuildHere(ctx){
        let mes = ctx.getters.getAnyMes(0,'ERR');
        ctx.commit('mutateShortMes',{setMes:mes});
    },
    notifyBuildNewCity(ctx,payload){
        let origin = ctx.getters.getAnyMes(0,'TMP');
        let mixed = payload.name + origin;
        ctx.commit('mutateShortMes',{setMes:mixed});
    },
    setMes(ctx){
        ctx.commit('mutateShortMes',{setMes:'テスト'});
    },
    setErrMessages({commit,getters},val){
        let mes = getters.getAnyMes(val,'ERR');
        commit('setMessages',{setMes:mes});
    },
    setLazyErrMessages({commit,getters},payload){
        let interval = 3000;
        let lastTime = ctx.state.lazyTime;
        let present = new Date().getTime();

        if(lastTime + interval <= present){
            let mes = getters.getAnyMes(payload.id,'EER');
            commit('setMessages',{setMes:mes});
            commit('setLazyTime',{time:present});
        }
    }
};

