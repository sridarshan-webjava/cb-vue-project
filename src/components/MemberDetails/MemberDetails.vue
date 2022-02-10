<template>
  <div class="member flex v-center">
    <div class="flex v-center">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <div class="member-img">{{name.substr(0,1)}}</div>
        <div>
            <div class="member-desc flex v-center">
                <h2>{{name}}</h2>
                <p>
                    ({{role}})
                </p>
            </div>
            <p class="member-email">{{email}}</p>
        </div>
    </div>
    <button :class="'dropdown-btn'+` ${showDropdown ? 'active':''}`" @click="showDropDown"><i class="fas fa-ellipsis-v"></i></button>
    <ul v-show="showDropdown" class="dropdown-menu">
        <li>
            <Button text="Edit details" @click="toggleUpdateModal"/>
        </li>
        <li>
            <Button text="Remove" @click="toggleAlertModal"/>
        </li>
    </ul>
    <FormModal v-show="showUpdateModal">
      <div class="flex member-update-form">
        <div>
          <h2 class="modal-title">Change role for support@chargebee.com</h2>
              <h3 :style="{color:'#7a7a7c',marginBottom:'1rem'}">Select user access level</h3>

              <access-select-input :name="name" :memberRole="memberRole" inputValue="Admin">
          <template v-slot:title>Admin</template>
          <template v-slot:description>Access everything in Chargebee</template>
              </access-select-input>

              <access-select-input :name="name" :memberRole="memberRole" inputValue="Tech Support">
          <template v-slot:title>Tech Support</template>
          <template v-slot:description>User can view "Subscriptions" and "Product Catalog" tabs. Can also
          view, add comments to, send, download individual Invoices/Credit Notes</template>
              </access-select-input>

              <access-select-input :name="name" :memberRole="memberRole" inputValue="Analyst">
          <template v-slot:title>Analyst</template>
          <template v-slot:description>In addition to Tech Support level access, user will have access to the
          SaaS metrics report.</template>
              </access-select-input>
        </div>
        <div class="flex btn-group">
          <Button background="#6724ea" color="#fff" text="Update" @click="confirmUpdate"/>
          <Button text="Cancel" @click="deleteUpdate"/>
        </div>
      </div>
    </FormModal>
    <FormModal v-show="showAlertModal">
        <div class="flex">
            <p class="alert-icon"><i class="fas fa-info-circle"></i></p>
            <p class="alert-content">support@chargebee.com will not be able to <br>access this site</p>
        </div>
        <div class="flex alert-button-group">
            <Button text="Cancel" @click="cancelDelete"/>
            <Button background="#f7692b" color="#fff" text="Remove Member" @click="confirmDelete"/>
        </div>
    </FormModal>
  </div>
</template>

<script>
import Button from "../Button/Button.vue";
import FormModal from '../FormModal/FormModal.vue';
import AccessSelectInput from "../AccessSelectInput/AccessSelectInput.vue";
export default {
    name:"MemberDetails",
    components:{
        Button,
        FormModal,
        AccessSelectInput,
    },
    props:["name","role","email","id"],
    data(){
        return {
            showDropdown:false,
            showUpdateModal:false,
            showAlertModal:false,
            memberRole:this.role,
        }
    },
    computed:{
        globalMemberRole(){
            return this.$store.getters.getMemberRole;
        }
    },
    // emits:['update-role','perform-update','perform-delete'],
    methods:{
        showDropDown(){
            // console.log("clicked");
            // this.$store.commit('showDropDown',!this.showDropdown);
            this.showDropdown = !this.showDropdown;
        },
        toggleUpdateModal(){
            if(this.showDropdown){
                this.showDropdown = false;
            }
            this.showUpdateModal = !this.showUpdateModal;
        },
        toggleAlertModal(){
            if(this.showDropdown){
                this.showDropdown = false;
            }
            this.showAlertModal = !this.showAlertModal;
        },
        confirmUpdate(){
            // this.$store.commit('toggleAlertModal',!this.showAlertModal);
            this.$store.commit('updateMembers',{
                id:this.id,
                role:this.globalMemberRole,
            });
            this.memberRole = this.globalMemberRole;
            this.$store.commit('setMemberRole','');
            // this.$store.commit('toggleUpdateModal',!this.showUpdateModal);
            this.toggleUpdateModal();
        },
        deleteUpdate(){
            // this.$store.commit('toggleUpdateModal',!this.showUpdateModal);
            this.toggleUpdateModal();
            this.memberRole = this.role;
        },
        // updateDetail(){
        //     // const updateMemberDetails = {
        //     //     id:this.id,
        //     //     role:this.globalMemberRole,
        //     // }
        //     this.memberRole = this.globalMemberRole;
        //     this.$store.commit('updateMemberDetail',updateMemberDetails);
        // },
        confirmDelete(){
            // this.$emit('perform-delete',{confirm:true,id:this.id});
            // this.toggleAlertModal();
            // this.$emit('perform-delete',{confirm:true,id:this.id});
            this.$store.commit('deleteMember',this.id);
            this.toggleAlertModal();
        },
        cancelDelete(){
            this.toggleAlertModal();
        }
    },
}
</script>

<style scoped>
.member{
    padding:1rem 1.75rem;
    justify-content: space-between;
    /* background:#fff; */
    position:relative;
}
.dropdown-btn{
    background:transparent;
    border:none;
    font-size:1.1rem;
    cursor:pointer;
    padding:0.5rem 1rem;
    border-radius:0.25rem;
}
.dropdown-btn.active{
    background:#dde2ed;
}
.dropdown-menu{
    list-style-type: none;
    margin:0;
    padding:0.5rem 0;
    position: absolute;
    bottom:-5vw;
    z-index:2;
    right:2vw;
    background:#fff;
    width:13rem;
    box-shadow:0 0 15px 0 rgba(0,0,0,0.25);
    border-radius:0.25rem;
    /* transition:0.s; */
}

.alert-icon{
    color:#f7692b;
    font-size:1.75rem;
    margin-right:1.25rem;
}

.alert-content{
    font-weight:600;
    font-size:1.1rem;
}
.alert-button-group{
    justify-content:end;
    margin:1.5rem 0 0 0;
}

.alert-button-group .btn + .btn{
    /* border:2px solid #333; */
    margin-left:1rem;
}

.dropdown-menu li+li{
    margin-top:0.5rem;
    /* border:2px solid black; */
}
    .member-img{
        width:2.5rem;
        height:2.5rem;
        font-size:1.25rem;
        border-radius:50%;
        margin-right:1.5rem;
        display:inline-flex;
        justify-content:center;
        align-items:center;
        background:#f7692b;
        color:#fff;
    }
    .member-desc h2{
        font-size:1.35rem;
        font-weight:500;
    }
    .member-desc p{
        font-size:1.1rem;
        font-style: italic;
        margin-left:0.5rem;
        color:#7a7a7c;
    }
    .member-email{
        color:#7a7a7c;
        font-size:600;
    }

</style>