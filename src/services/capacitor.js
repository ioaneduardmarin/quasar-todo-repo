import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export default {
  functions: {
    async getTodoList() {
      return Filesystem.readFile({
        path: 'toDoList.txt',
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
    },

    async writeTodoList(todoList) {
      await Filesystem.writeFile({
        path: 'toDoList.txt',
        directory: Directory.Data,
        data: todoList,
        encoding: Encoding.UTF8,
      });
    },

  },
};
