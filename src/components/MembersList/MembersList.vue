<template>
    <div>
        <ul>
            <li v-for="member in members" :key="member.id">
                <!-- <MemberDetails 
                    @update-role="displayUpdate"
                    @perform-update="performUpdate"
                    @perform-delete="performDelete"
                    :id="member.id" 
                    :name="member.name" 
                    :role="member.role" 
                    :email="member.email"/> -->
                <MemberDetails 
                    :id="member.id" 
                    :name="member.name" 
                    :role="member.role" 
                    :email="member.email"/>
            </li>
        </ul>
    </div>
</template>

<script>
import MemberDetails from '../MemberDetails/MemberDetails.vue'
export default {
    name:"MembersList",
    components:{
        MemberDetails,
    },
    computed:{
        members(){
            return this.$store.getters.getMembers;
        }
    },
    // emits:['update-member-detail','confirm-update','confirm-delete'],
    // methods:{
    //     displayUpdate(value){
    //         this.$emit('update-member-detail',value);
    //     },
    //     performUpdate(choice){
    //         this.$emit('confirm-update',choice)
    //     },
    //     performDelete(choice){
    //         this.$emit('confirm-delete',choice)
    //     },
    // }
}
</script>

<style scoped>
    ul{
        padding:0;
        list-style-type:none;
        background:#fff;
        border-radius:0.75rem;
    }
    li + li{
        border-top:1.5px solid #cacaca;
    }
</style>