
<template>
  <div class="modal-mask" v-show="state.modalShow">
    <div
      class="ui-modal"
      ref="uiModal"
      :style="{
        width: width + 'px',
        borderRadius: borderRadius + 'px',
        marginLeft: -width / 2 + 'px',
        top: position === 'center'?'50%':'50px',
        marginTop: position === 'center'? - state.uiModalHeight / 2 + 'px': ''
      }"
    >
      <header 
        class="header"
        :style="{
          color: headerTextColor,
          backgroundColor: headerColor
        }"
        >
        <h1>{{ headerText }}</h1>
        <a 
          href="###"
          :style="{
            color: headerTextColor
          }"
          @click="close"
          >&times;</a>
      </header>
      <article class="content">
        <p
          :style="{
            color: contentTextColor
          }"
        >{{ contentText }}</p>
      </article>
      <div class="btn-group" v-if="btnGroupShow">
        <button class="btn btn-confirm" :style="{backgroundColor: headerColor}" @click="confirm">{{ confirmText }}</button>
        <button class="btn btn-cancel" @click="close">{{ cancelText }}</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
const uiModal = ref<any>(null);
const state = ref({
  uiModalHeight: 0,
  modalShow: false
});
onMounted(() => {
  state.value.uiModalHeight= uiModal.value.offsetHeight;
  state.value.modalShow = props.show
  console.log(state.value.uiModalHeight);
});
type Props = {
  show?: boolean;
  width?: number;
  borderRadius?: string;
  headerColor?: string;
  headerText?: string;
  headerTextColor?: string;
  contentText?: string;
  contentTextColor?: string;
  position?: string;
  btnGroupShow?: boolean;
  confirmText?: string;
  cancelText?: string;
};

const props = withDefaults(defineProps<Props>(), {
  show: false,
  width: 300,
  borderRadius:"0",
  headerColor:"#000",
  headerText:"",
  headerTextColor:"#fff",
  contentText:"",
  contentTextColor:"#000",
  position:"top",
  btnGroupShow:true,
  confirmText:"确定",
  cancelText:"取消",
});

const emits = defineEmits<{
  (e: "confirm", user: Object):void,
  (e: "close"):void
}>()

const confirm = () => {
  state.value.modalShow = false
  emits("confirm", {
    username: "Jack",
    password: "123456"
  })
};
const close = () => {
  state.value.modalShow = false
  emits("close")
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  a {
    text-decoration: none;
    outline: none;
    color: #333
  }

  h1, p {
    font-weight: normal;
    margin: 0
  }

  button {
    outline: none;
    border: none
  }

  .ui-modal {
    position: fixed;
    left: 50%;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 1px 2px 3px #333;

    .header {
      height: 44px;
      padding: 0 15px;
      box-sizing: border-box;

      h1 {
        display: inline-block;
        font-size: 18px;
        line-height: 44px
      }

      a {
        float: right;
        font-size: 20px;
        margin-top: 6px
      }
    }

    .content {
      padding: 15px;
      box-sizing: border-box
    }

    .btn-group {
      height: 30px;
      padding: 10px 15px;
      border-top: 1px solid #ddd;

      .btn {
        float: right;
        height: 30px;
        min-width: 80px;
        font-size: 14px;
        border-radius: 3px;
        cursor: pointer;

        &.btn-confirm {
          color: #fff;
          margin-left: 15px;
        }

        &.btn-cancel {
          background-color: #ddd;
          color: #666;
        }
      }
    }
  }
}
</style>
