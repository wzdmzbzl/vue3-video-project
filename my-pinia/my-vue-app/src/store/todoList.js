// import { defineStore } from "pinia";
import { defineStore } from "../pinia";

// 写法一
// export default defineStore({
//   id: 'todoList'
// })

// 写法二  Options style
export default defineStore('todoList', {
  state: () => ({
    todoList: []
  }),
  getters: {
    count() {
      return this.todoList.length
    }
  },
  actions: {
    addTodo(todo) {
      this.todoList.unshift(todo)
    },
    toggleTodo(id) {
      this.todoList = this.todoList.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    },
    removeTodo(id) {
      this.todoList = this.todoList.filter(todo => todo.id !== id)
    }
  }
})