<template>
  <label>
      {{title}}
      <input type="text" :placeholder="'Enter ' + title" :value="memberEmail" @input="setMemberEmail">
  </label>
</template>

<script>
export default {
    name:"FormInput",
    props:['title'],
    computed:{
        memberEmail(){
            return this.$store.getters.getMemberEmail;
        }
    },
    methods:{
        setMemberEmail(e){
            this.$store.commit('setMemberEmail',e.target.value);
        }
    }
}
</script>

<style scoped>
    label{
        font-weight:600;
        font-size:0.85rem;
        color:#7a7a7c;
        display:block;
        margin:0 0 2rem 0;
    }
    input{
        font-size:1rem;
        display:block;
        margin-top:0.5rem;
        padding:0.25rem 0.5rem;
        width:80%;
        border:2px solid #b4b4b6;
        border-radius:0.25rem;
    }
</style>