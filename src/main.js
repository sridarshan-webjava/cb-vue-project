import{createApp} from 'vue'
import App from './App.vue'
import {createStore} from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    key:'team-members',
    storage: window.sessionStorage
})

const store = createStore({
    state:{
        showInviteModal:false,
        members:[{
            id:1,
            name:"Chargebee",
            role:"Analyst",
            email:"chargebee@xyz.com"
          },
          {
            id:2,
            name:"Sam",
            role:"Tech Support",
            email:"sam@xyz.com"
          },],
        memberRole:"",
        memberEmail:"",
        updateDetail:"",
        idCount:2,
    },
    mutations:{
        toggleInviteModal(state,payload){
            state.showInviteModal = payload;
        },
        setMemberEmail(state,payload){
            state.memberEmail = payload;
        },
        setMemberRole(state,payload){
            console.log(payload);
            state.memberRole = payload;
        },
        addTeamMember(state,payload){
            state.members = state.members.concat(payload);
        },
        updateMemberDetail(state,payload){
            console.log(payload);
            state.updateDetail = payload;
        },
        updateMembers(state,payload){
            state.members = state.members.map(member => {
                if(member.id === payload.id){
                    console.log(payload.role,member.role);
                    member.role = payload.role;
                }
                return member;
            });
        },
        deleteMember(state,payload){
            // if(payload.confirm){
                state.members = state.members.filter(member => member.id !== payload);
            // }
        },
    },
    getters:{
        getInviteModalState:state => state.showInviteModal,
        getMembers:state => state.members,
        getMemberEmail:state=> state.memberEmail,
        getMemberRole:state => state.memberRole,
        getUpdatedDetails:state => state.updateDetail,
        getIdCount:state => state.idCount,
    },
    plugins:[vuexLocal.plugin]
})
createApp(App).use(store).mount('#app');

