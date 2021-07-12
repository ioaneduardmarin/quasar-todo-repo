import capacitor from 'src/services/capacitor';
import electron from 'src/services/electron';

export default {
  functions: {
    async saveTodoList(list, platform) {
      if (platform.is.capacitor) {
        await capacitor.functions.writeTodoList(JSON.stringify(list));
      }
      if (platform.is.electron) {
        await electron.functions.writeTodoList(JSON.stringify(list));
      }
    },

    async loadTodoList(platform) {
      if (platform.is.capacitor) {
        return JSON.parse((await capacitor.functions.getTodoList()).data);
      }
      if (platform.is.electron) {
        // eslint-disable-next-line no-return-await
        return await electron.functions.getTodoList();
      }
      return null;
    },
  },
};
