<template>
  <button :style="{background:background, color:color}" class="btn">{{text}}</button>
</template>

<script>
export default {
    name:"Button",
    props:["text","background","color","eventName"],
    // computed:{
    //     showModal(){
    //         return this.$store.getters.getModalState;
    //     }
    // },
    // methods:{
    //     displayModalBox(){
    //         this.$store.commit('toggleModalBox',!this.showModal);
    //     },
    // },
}
</script>

<style scoped>
    .btn{
        background:transparent;
        border:none;
        font-size:1.1rem;
        font-weight:500;
        /* box-shadow:0 0 5px 0 rgba(0,0,0,0.25); */
        border-radius:0.25rem;
        padding:0.45rem 0.75rem;
        cursor:pointer;
    }
</style>