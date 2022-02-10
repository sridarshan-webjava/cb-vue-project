<template>
  <div class="container">
    <Header />
    <MembersList />
    <FormModal v-show="showInviteModal">
      <div class="flex">
        <div>
          <h2 class="modal-title">Invite a team member to use Chargebee</h2>
          <p class="modal-content">You can either let your team members access everything in this site, or assign
          specific roles to them.</p>
          <FormInput title="Email"/>
          <h3 :style="{color:'#7a7a7c',marginBottom:'1rem'}">Select user access level</h3>
          <access-select-input :memberRole="memberRole" inputValue="Admin">
            <template v-slot:title>Admin</template>
            <template v-slot:description>Access everything in Chargebee</template>
          </access-select-input>

          <access-select-input :memberRole="memberRole" inputValue="Tech Support">
            <template v-slot:title>Tech Support</template>
            <template v-slot:description>User can view "Subscriptions" and "Product Catalog" tabs. Can also
            view, add comments to, send, download individual Invoices/Credit Notes</template>
          </access-select-input>

          <access-select-input :memberRole="memberRole" inputValue="Analyst">
            <template v-slot:title>Analyst</template>
            <template v-slot:description>In addition to Tech Support level access, user will have access to the
            SaaS metrics report.</template>
          </access-select-input>
        </div>
        <div class="flex btn-group">
          <Button background="#6724ea" color="#fff" text="Invite" @click="addTeamMember"/>
          <Button text="Cancel" @click="cancelNewEntry"/>
        </div>
      </div>
    </FormModal>
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
import MembersList from "./components/MembersList/MembersList.vue";
import FormModal from "./components/FormModal/FormModal.vue";
import FormInput from './components/FormInput/FormInput.vue';
import Button from './components/Button/Button.vue';
import AccessSelectInput from './components/AccessSelectInput/AccessSelectInput.vue';

export default {
  name: 'App',
  components: {
    Header,
    MembersList,
    FormModal,
    FormInput,
    Button,
    AccessSelectInput,
  },
  data(){
    return {
      // members:[],
      // showModal:this.$store.getters.getModalState,
      // memberEmail:"",
      // memberRole:"",
      // updateDetail:null,
      // idCount:3,
    }
  },
  computed:{
    showInviteModal(){
      return this.$store.getters.getInviteModalState;
    },
    memberEmail(){
      return this.$store.getters.getMemberEmail;
    },
    memberRole(){
      return this.$store.getters.getMemberRole;
    },
    memberId(){
      return this.$store.getters.getIdCount;
    }
  },
  methods:{
    // toggleModal(value){
    //   this.showModal = value;
    // },
    resetDataValues(){
      this.$store.commit('setMemberEmail',"");
      this.$store.commit('setMemberRole',"");
    },
    // setMemberEmail(value){
    //   this.memberEmail = value;
    // },
    // setMemberRole(value){
    //   this.memberRole = value;
    // },
    addTeamMember(){
      const member = {
        id:this.memberId+1,
        name:this.memberEmail,
        role:this.memberRole,
        email:this.memberEmail,
      }
      this.$store.commit('addTeamMember',[member]);
      this.resetDataValues();
      this.$store.commit('toggleInviteModal',!this.showInviteModal);
    },
    cancelNewEntry(){
      this.resetDataValues();
      this.$store.commit('toggleInviteModal',!this.showInviteModal);
    },
    updateMemberDetail(value){
      this.updateDetail = value;
    },
    updateMembers(toUpdate){
      if(toUpdate){
        this.members = this.members.map(member => {
          if(member.id === this.updateDetail.id){
            member.role = this.updateDetail.role;
          }
          return member;
        });
      }
      else{
        this.updateDetail = {};
      }
    },
    // deleteMember(toDelete){
    //   if(toDelete.confirm){
    //     this.members = this.members.filter(member => member.id !== toDelete.id);
    //   }
    // }
  },
  // mounted(){
  //   this.$store.commit('addTeamMember',[
  //     {
  //       id:1,
  //       name:"Chargebee",
  //       role:"Analyst",
  //       email:"chargebee@xyz.com"
  //     },
  //     {
  //       id:2,
  //       name:"Sam",
  //       role:"Tech Support",
  //       email:"sam@xyz.com"
  //     },
  //   ]);
  // },

}
</script>

<style>
  *{
    box-sizing:border-box;
  }

  h1,
  h2,
  h3,
  h4,
  p,
  body,
  ul,
  label{
    margin:0;
  }
  
  body{
    font-family:sans-serif;
    font-size:1rem;
    font-weight:400;
    line-height:1.5;
    color:#000;
    background:#eeedf6;
    padding:1.5rem 0 0;
  }

  .container{
    width:85%;
    margin:0 auto;
  }

  .flex{
    display:flex;
  }

  .v-center{
      align-items: center;
  }

  .h-center{
      justify-content: center;
  }

  .modal-title{
    margin:0 0 0.75rem 0;
  }

  .modal-content{
    margin:0 0 1rem 0;
  }

  .btn-group{
    align-self:start;
    flex-basis: 40%;
    flex-direction: column;
    align-items: center;
    padding:1rem 0;
  }

  .btn-group .btn{
    width:60%;
  }

  .btn-group .btn + .btn{
    margin-top:1rem;
  }
</style>
