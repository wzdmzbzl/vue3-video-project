<template>
  <div>
    <Modal
      :show="true"
      :width="350"
      borderRadius="10"
      headerColor="#007bff"
      headerText="This is a SUPER MODAL"
      headerTextColor="#fff"
      contentText="This is a SUPER MODAL This is a SUPER MODAL"
      contentTextColor="#333"
      position="center"
      :btnGroupShow="true"
      confirmText="确定"
      cancelText="取消"
      @confirm="modalConfirm"
      @close="modalCancel"
    ></Modal>
  </div>
</template>

<script setup lang="ts">

const modalConfirm = (formData: Object) => {
  console.log('modal modalConfirm');
  console.log(formData);
  
}

const modalCancel = () => {
  console.log('modal modalCancel');
  
}
</script>

<style scoped>

</style>