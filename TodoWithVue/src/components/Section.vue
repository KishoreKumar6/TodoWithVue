<template>
  <div
    class="flex-1 bg-red-100 p-5 rounded-2xl shadow-md min-w-[300px] border border-gray-200"
  >
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
      <button
        @click="$emit('add-task')"
        class="text-purple-600 hover:cursor-pointer text-2xl bg-white rounded-full w-7 hover:bg-gray-100"
        title="Add Task"
      >
        +
      </button>
    </div>

    <draggable
      v-model="localTasks"
      :group="{ name: 'tasks', pull: true, put: true }"
      item-key="id"
      class="space-y-3 min-h-[100px]"
      @add="onAdd"
    >
      <template #item="{ element }">
        <div
          class="relative p-4 bg-gradient-to-br from-purple-100 to-white rounded-xl shadow hover:shadow-lg transition-shadow"
        >
          <!-- Dropdown for task actions -->
          <div class="absolute top-2 right-2">
            <div class="relative">
              <button
                class="hover:cursor-pointer"
                @click="toggleDropdown(element.id)"
              >
                ⋮
              </button>
              <div
                v-if="dropdownOpen === element.id"
                class="absolute right-0 mt-2 w-24 bg-white shadow rounded text-sm"
              >
                <button
                  class="block w-full text-left rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200 hover:rounded-lg"
                  @click="deleteTask(element.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <!-- Dynamic Label with Dot -->
          <div class="flex items-center text-left">
            <p
              :class="{
                'bg-blue-100 text-blue-800':
                  element.label.toLowerCase().replace(/\s/g, '') ===
                  'notstarted',
                'bg-orange-100 text-orange-800':
                  element.label.toLowerCase().replace(/\s/g, '') ===
                  'inresearch',
                'bg-green-100 text-green-800':
                  element.label.toLowerCase().replace(/\s/g, '') === 'complete',
                'bg-pink-100 text-pink-800':
                  element.label.toLowerCase().replace(/\s/g, '') === 'ontrack',
              }"
              class="text-sm rounded-sm px-3 py-1 inline-flex items-center font-medium"
            >
              <span
                class="w-2 h-2 rounded-full mr-2"
                :class="{
                  'bg-blue-800':
                    element.label.toLowerCase().replace(/\s/g, '') ===
                    'notstarted',
                  'bg-orange-800':
                    element.label.toLowerCase().replace(/\s/g, '') ===
                    'inresearch',
                  'bg-green-800':
                    element.label.toLowerCase().replace(/\s/g, '') ===
                    'complete',
                  'bg-pink-800':
                    element.label.toLowerCase().replace(/\s/g, '') ===
                    'ontrack',
                }"
              ></span>
              {{ element.label }}
            </p>
          </div>

          <!-- Task Title & Description -->
          <h3 class="text-lg font-semibold text-gray-800 text-left">
            {{ element.title }}
          </h3>
          <p class="text-sm text-gray-600 mt-1 text-left">
            {{ truncatedDescription(element.description) }}
          </p>

          <!-- Task Meta Details: Due Date, Assignee, Priority -->
          <div class="mt-2 text-xs text-gray-500 space-y-1 text-left">
            <p class="mb-2">
              Due Date:
              <span class="font-medium text-gray-700">{{
                element.dueDate
              }}</span>
            </p>
            <p class="mb-2">
              Assignee:
              <span class="font-medium text-gray-700">{{
                element.assignee
              }}</span>
            </p>
            <p class="text-right">
              <label
                :class="{
                  'bg-blue-200 text-blue-800': element.priority === 'Low',
                  'bg-orange-200 text-orange-800':
                    element.priority === 'Medium',
                  'bg-red-200 text-red-600': element.priority === 'High',
                }"
                class="rounded p-1"
              >
                {{ element.priority }}
              </label>
            </p>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import draggable from "vuedraggable";

const props = defineProps({
  title: String,
  tasks: Array,
});
const emit = defineEmits(["add-task", "delete-task"]);

const dropdownOpen = ref(null);

// Toggle the dropdown menu for task actions.
function toggleDropdown(id) {
  dropdownOpen.value = dropdownOpen.value === id ? null : id;
}

// Emit the delete task event and close the dropdown.
function deleteTask(id) {
  emit("delete-task", id);
  dropdownOpen.value = null;
}

// Two-way binding for tasks.
const localTasks = computed({
  get() {
    return props.tasks;
  },
  set(newVal) {
    props.tasks.splice(0, props.tasks.length, ...newVal);
  },
});

// When a task is added via drag-and-drop, set its label to the section's title.
function onAdd(evt) {
  if (evt.added) {
    evt.added.element.label = props.title;
  }
}

// Truncate description to the first 5 words and add an ellipsis.
function truncatedDescription(desc) {
  if (!desc) return "";
  const words = desc.split(" ");
  return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : desc;
}
</script>
