<template>
    <div class="select-role flex">
        <input type="radio" :name="name" @change="setMemberRole" :value="inputValue" :checked="inputValue === memberRole">
        <div>
            <h4><slot name="title"></slot></h4>
            <p><slot name="description"></slot></p>
        </div>
    </div>
</template>

<script>
export default {
    name:"AccessSelectInput",
    props:["inputValue","memberRole","name"],
    methods:{
        setMemberRole(e){
            console.log(e.target.value);
            this.$store.commit('setMemberRole',e.target.value);
        },
    },
}
</script>

<style scoped>
    input{
        margin-right:1.25rem;
    }
    .select-role{
        padding:1.25rem 0;
    }
    .select-role + .select-role{
        border-top:1.5px solid #cacaca;
    }
</style>