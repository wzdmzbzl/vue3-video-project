import { onMounted, onUnmounted, ref } from "vue";

// 用户网络是否可用

export function useOnLine() {
  const online = ref(true);
  const showStatus = (val: any) => {
    online.value = typeof val === "boolean" ? val : val.target.online;
  };

  // 在页面加载后, 设置正确的网络状态,   navigator.onLine 获取网络状态, 在线返回true, 离线返回false
  navigator.onLine ? showStatus(true) : showStatus(false);

  onMounted(() => {
    // 开始监听网络状态的变化
    window.addEventListener("online", showStatus);

    window.addEventListener("offline", showStatus);
  });
  onUnmounted(() => {
    // 移除监听网络状态的变化
    window.removeEventListener("online", showStatus);

    window.removeEventListener("offline", showStatus);
  });

  return { online };
}
