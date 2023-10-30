import { ref, onMounted, onUnmounted } from "vue";

// 获取本地时间
export function useTime() {
  let timer: any; // 定时器
  const year = ref(0); // 年份
  const month = ref(0); //月份
  const week = ref(""); // 星期几
  const day = ref(0); // 天数
  const hour = ref<number | string>(0); // 小时
  const minute = ref<number | string>(0); // 分钟
  const second = ref(0); //秒

  // 更新时间
  const updateTime = () => {
    const date = new Date();
    year.value = date.getFullYear();
    month.value = date.getMonth() + 1;
    // charAt()方法返回指定索引位置的char值。 索引范围为0~length()-1
    week.value = "日一二三四五六".charAt(date.getDay());
    day.value = date.getDate();
    // padStart另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。第一个参数是长度, 第二个是要填充的字符
    // Intl.NumberFormat 对象能使数字在特定的语言环境下格式化
    hour.value =
      (date.getHours() + "")?.padStart(2, "0") ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(
        date.getHours()
      );
    minute.value =
      (date.getMinutes() + "")?.padStart(2, "0") ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(
        date.getMinutes()
      );
    second.value = date.getSeconds();
  };

  updateTime();

  onMounted(() => {
    clearInterval(timer);
    timer = setInterval(() => updateTime(), 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return { month, day, hour, minute, second, week };
}
