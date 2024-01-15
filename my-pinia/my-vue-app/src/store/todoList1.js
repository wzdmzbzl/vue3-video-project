// import { defineStore } from "pinia";
import { defineStore } from "../pinia";
import { computed, ref } from "vue";


// Setup style
export default defineStore("todoList1", () => {
  const todoList = ref([]);
  const count = computed(() => todoList.value.length);

  function addTodo(todo) {
    todoList.value.unshift(todo);
  }
  function toggleTodo(id) {
    todoList.value = todoList.value.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
  }
  function removeTodo(id) {
    todoList.value = todoList.value.filter((todo) => todo.id !== id);
  }


  return {
    count,
    todoList,
    addTodo,
    toggleTodo,
    removeTodo
  }
});
