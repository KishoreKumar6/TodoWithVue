<template>
  <div class="flex-1 bg-gray-200 p-5 rounded-2xl shadow-md min-h-[500px] min-w-[300px] border border-gray-200">
    <!-- Section Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
    </div>

    <!-- Draggable Task List -->
    <draggable
      :list="tasks"
      group="tasks"
      item-key="id"
      class="space-y-3 min-h-[130px] flex flex-col"
      :animation="200"
      @add="onAdd"
    >
      <template #item="{ element }">
        <div
          class="relative p-4 bg-gradient-to-br from-purple-100 to-white rounded-xl shadow hover:shadow-lg transition-shadow"
        >
          <!-- Task Dropdown -->
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
                class="absolute right-0 mt-2 w-24 bg-white shadow rounded text-sm z-10"
              >
                <button
                  class="block w-full text-left rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
                  @click="deleteTask(element.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <!-- Label with Dot -->
          <div class="flex items-center text-left">
            <p
              :class="{
                'bg-blue-100 text-blue-800': normalizeLabel(element.label) === 'notstarted',
                'bg-orange-100 text-orange-800': normalizeLabel(element.label) === 'inresearch',
                'bg-green-100 text-green-800': normalizeLabel(element.label) === 'complete',
                'bg-pink-100 text-pink-800': normalizeLabel(element.label) === 'ontrack'
              }"
              class="text-sm rounded-sm px-3 py-1 inline-flex items-center font-medium"
            >
              <span
                class="w-2 h-2 rounded-full mr-2"
                :class="{
                  'bg-blue-800': normalizeLabel(element.label) === 'notstarted',
                  'bg-orange-800': normalizeLabel(element.label) === 'inresearch',
                  'bg-green-800': normalizeLabel(element.label) === 'complete',
                  'bg-pink-800': normalizeLabel(element.label) === 'ontrack'
                }"
              ></span>
              {{ element.label }}
            </p>
          </div>

          <!-- Task Title and Description -->
          <h3 class="text-lg font-semibold text-gray-800 text-left">
            {{ element.title }}
          </h3>
          <p class="text-sm text-gray-600 mt-1 text-left">
            {{ truncatedDescription(element.description) }}
          </p>

          <!-- Meta Info -->
          <div class="mt-2 text-xs text-gray-500 space-y-1 text-left">
            <p class="mb-2">
              Due Date: <span class="font-medium text-gray-700">{{ element.dueDate }}</span>
            </p>
            <p class="mb-2">
              Assignee: <span class="font-medium text-gray-700">{{ element.assignee }}</span>
            </p>
            <p class="text-right">
              <label
                :class="{
                  'bg-blue-200 text-blue-800': element.priority === 'Low',
                  'bg-orange-200 text-orange-800': element.priority === 'Medium',
                  'bg-red-200 text-red-600': element.priority === 'High'
                }"
                class="rounded p-1"
              >
                {{ element.priority }}
              </label>
            </p>
          </div>
        </div>
      </template>

      <!-- Empty Section Drop Zone -->
      <template #footer>
        <div
          v-if="tasks.length === 0"
          class="flex flex-col h-5 bg-gray-200 rounded-lg hover:bg-gray-200 cursor-pointer"
          @click="$emit('add-task')"
        >
          <span class="text-sm text-gray-500 font-bold">+ Add task</span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const props = defineProps({
  title: String,
  tasks: Array,
});
const emit = defineEmits(["add-task", "delete-task"]);

const dropdownOpen = ref(null);

function toggleDropdown(id) {
  dropdownOpen.value = dropdownOpen.value === id ? null : id;
}

function deleteTask(id) {
  emit("delete-task", id);
  dropdownOpen.value = null;
}

function onAdd(evt) {
  if (evt.added) {
    evt.added.element.label = props.title;
  }
}

function truncatedDescription(desc) {
  if (!desc) return "";
  const words = desc.split(" ");
  return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : desc;
}

function normalizeLabel(label) {
  return label?.toLowerCase().replace(/\s/g, '') || '';
}
</script>
