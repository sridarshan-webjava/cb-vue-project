<template>
  <div class="modal-bg flex v-center h-center">
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    name:"FormModal",
}
</script>

<style scoped>
  .modal-bg{
    background:rgba(0,0,0,0.5);
    position:fixed;
    inset:0;
    z-index:10;
  }
  .modal{
    background:#fff;
    padding:1.5rem;
    border-radius:0.5rem;
  }
  .modal-title{
    color:red;
  }
</style>