<template>
  <header class="header v-center flex">
      <div class="intro-content flex v-center">
          <h1>Team Members</h1>
          <p>({{members.length}})</p>
      </div>
      <Button background="#6724ea" color="#fff" text="+ Invite Members" @click="toggleModal"/>
  </header>
</template>

<script>
import Button from "../Button/Button.vue";
export default {
    name:"Header",
    props:["membersCount"],
    components:{
        Button,
    },
    computed:{
        showInviteModal(){
            return this.$store.getters.getInviteModalState;
        },
        members(){
            return this.$store.getters.getMembers;
        }
    },
    methods:{
        toggleModal(){
            // console.log("clicked");
            this.$store.commit('toggleInviteModal',!this.showInviteModal);
        }
    }
}
</script>

<style scoped>
    .header{
        /* border:2px solid black; */
        justify-content: space-between;
        margin:2rem 0 4rem 0;
    }
    .intro-content h1{
        font-weight:600;
        color:#1A374D;
    }
    .intro-content p{
        font-size:1.75rem;
        font-weight:600;
        margin-left:0.75rem;
        color:#7a7a7c;
    }
</style>