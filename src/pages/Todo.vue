<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
      v-model="newTask"
      @keyup.enter="addTask"
      class="col"
      square
      filled
      bg-color="white"
      placeholder="Add Task"
      dense>
        <template v-slot:append>
          <q-btn
          @click="addTask"
         round
         dense
         flat
         icon="add" />
        </template>
      </q-input>
    </div>
     <q-list
      class="bg-white"
      separator
      bordered>
      <q-item
      v-for="(task, index) in tasks"
      :key="task.title"
      v-ripple
      @click="changeTaskState(task)"
      :class="{'done bg-blue-1' : task.done}"
      clickable>
        <q-item-section avatar>
          <q-checkbox
          v-model="task.done"
          color="primary"
          class="no-pointer-events"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
        </q-item-section>
        <q-item-section
          v-if="task.done"
          side>
          <q-item-label>
            <q-btn
            @click.stop="deleteTask(index)"
             flat
             round
             dense
             color="primary"
             icon="delete" />
           </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div
    v-if="!tasks.length"
    class="no-tasks absolute-center">
      <q-icon
      name="check"
      size="100px"
      color="primary"/>
      <div class="text-h5 text-primary text-centr">No tasks</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import todoDataHelper from '../helpers/todoDataHelper';

export default defineComponent({
  name: 'TodoPage',

  data() {
    return {
      newTask: '',
      tasks: [],
    };
  },

  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.componentSetup({
      });
    });
  },
  methods: {
    async saveList() {
      try {
        await todoDataHelper.functions.saveTodoList(this.tasks, this.$q.platform);
      } catch (error) {
        alert(error);
      }
    },

    async loadList() {
      try {
        const result = await todoDataHelper.functions.loadTodoList(this.$q.platform);

        if (result === 'ENOENT') {
          this.$q.notify({
            message: 'Add a todo item',
            color: 'primary',
            position: 'center',
          });
        } else {
          this.tasks = result;
        }
      } catch (error) {
        if (error.message === 'File does not exist') {
          this.$q.notify({
            message: 'Add a todo item',
            color: 'primary',
            position: 'center',
          });
        } else {
          alert(error);
        }
      }
    },

    async componentSetup() {
      await this.loadList();
    },

    async deleteTask(index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete that task?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        this.tasks.splice(index, 1);
        this.$q.notify({
          message: 'Task deleted.',
          color: 'primary',
          position: 'bottom',
        });
        await this.saveList();
      });
    },

    async addTask() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to add that task?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        this.tasks.push({ title: this.newTask, done: false });
        this.$q.notify({
          message: 'Task added.',
          color: 'primary',
          position: 'bottom',
        });
        this.newTask = '';
        await this.saveList();
      });
    },

    async changeTaskState(task) {
      task.done = !task.done;
      await this.saveList();
    },
  },
});
</script>

<style lang="scss">
.done{
  .q-item__label{
    text-decoration: line-through;
    color: #bbb
  }
}

.no-tasks {
  opacity: 0.5;
}
</style>
