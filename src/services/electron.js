export default {
  functions: {
    async getTodoList() {
      let toBeReturned;
      await window.electron.invoke('load-todos').then((result) => {
        if (result.errorMessage) {
          toBeReturned = result.errorMessage;
        } else {
          toBeReturned = JSON.parse(result.data);
        }
      });

      return toBeReturned;
    },

    async writeTodoList(todoList) {
      await window.electron.invoke('save-todos', todoList);
    },
  },
};
