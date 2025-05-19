<template>
  <div
    class="flex-1 bg-gray-200 p-2 rounded-2xl shadow-md min-h-[500px] min-w-[300px] border border-gray-200 relative"
  >
    <!-- Draggable Task List -->
    <draggable
      :list="tasks"
      group="tasks"
      item-key="id"
      class="flex flex-col space-y-1 min-h-[130px]"
      :animation="200"
      @add="onAdd"
    >
      <template #item="{ element }">
        <div
          class="relative p-2 bg-white rounded-xl shadow hover:shadow-md transition-shadow"
        >
          <!-- Task Dropdown -->
          <div class="absolute top-1 right-1">
            <div class="relative">
              <button
                class="hover:cursor-pointer text-lg"
                @click="toggleDropdown(element.id)"
              >
                ⋮
              </button>
              <div
                v-if="dropdownOpen === element.id"
                class="absolute right-0 mt-1 w-24 bg-white shadow rounded text-sm z-10"
              >
                <button
                  class="block w-full text-left rounded-lg bg-gray-100 px-3 py-1 hover:bg-gray-200"
                  @click="deleteTask(element.id)"
                >
                  Delete
                </button>
                <button
                  class="block w-full text-left rounded-lg bg-gray-100 px-3 py-1 hover:bg-gray-200"
                  @click="openEditModal(element)"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>

          <!-- Task Title and Description -->
          <h3
            class="text-sm font-semibold text-gray-800 text-left leading-snug"
          >
            {{ element.title }}
          </h3>
          <p class="text-xs text-gray-600 mt-0.5 text-left leading-snug">
            {{ truncatedDescription(element.description) }}
          </p>

          <!-- Meta Info -->
          <div class="mt-1 text-xs text-gray-500 text-left space-y-0.5">
            <p>
              Due:
              <span class="font-medium text-gray-700">{{
                element.dueDate
              }}</span>
            </p>
            <p>
              Assigned:
              <span class="font-medium text-gray-700">{{
                element.assignee
              }}</span>
            </p>

            <!-- Priority and Label in Same Line -->
            <div class="flex justify-between items-center mt-2">
              <!-- Label -->
              <p
                :class="{
                  'text-pink-600 font-semibold':
                    normalizeLabel(element.label) === 'yesterday',
                  'text-orange-600 font-semibold':
                    normalizeLabel(element.label) === 'today',
                  'text-blue-600 font-semibold':
                    normalizeLabel(element.label) === 'tomorrow',
                  'text-yellow-600 font-semibold':
                    normalizeLabel(element.label) === 'dayaftertomorrow',
                }"
                class="text-xs rounded-sm px-2 py-0.5 inline-flex items-center font-medium"
              >
                <img
                  :src="`https://i.pravatar.cc/20?img=${
                    Math.floor(Math.random() * 70) + 1
                  }`"
                  alt="Person"
                  class="w-5 h-5 rounded-full mr-1 object-cover"
                />
                {{ element.label }}
              </p>

              <label
                :class="{
                  'bg-gray-200 p-2 text-gray-700':
                    element.priority === 'Programming',
                  'bg-gray-200 p-1 text-gray-700':
                    element.priority === 'Design',
                }"
                class="rounded px-2 text-xs"
              >
                {{ element.priority }}
              </label>
            </div>
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
          <span class="text-sm mt-5 text-gray-500 font-bold">+ Add task</span>
        </div>
      </template>
    </draggable>

    <!-- Edit Modal -->
    <transition name="fade-slide">
      <div
        v-if="isEditModalOpen"
        class="fixed inset-0 flex items-center justify-center z-50"
        style="background-color: rgba(0, 0, 0, 0.5)"
      >
        <div
          class="max-w-md w-full mx-4 backdrop-blur-md bg-white p-6 rounded-2xl shadow-xl transition-all duration-300 border border-gray-300"
        >
          <div class="border-b border-gray-200 flex items-center pb-4 mb-4">
            <h2 class="text-xl font-semibold text-gray-900">Edit Task</h2>
            <button
              class="ml-auto text-gray-500 hover:text-gray-700"
              @click="closeEditModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Task Title
              </label>
              <input
                v-model="editableTask.title"
                type="text"
                placeholder="Enter task title"
                class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                v-model="editableTask.description"
                rows="3"
                placeholder="Enter task description"
                class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              ></textarea>
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Assignee
              </label>
              <input
                v-model="editableTask.assignee"
                type="text"
                placeholder="Assignee"
                class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                v-model="editableTask.dueDate"
                type="date"
                class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                v-model="editableTask.priority"
                class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option disabled value="">Select priority</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end items-center mt-6">
            <button
              class="text-gray-600 hover:text-gray-800 mr-2"
              @click="closeEditModal"
            >
              Cancel
            </button>
            <button
              class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
              @click="updateTask"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import draggable from "vuedraggable";

const props = defineProps({
  title: String,
  tasks: Array,
});
const emit = defineEmits(["add-task", "delete-task"]);

const dropdownOpen = ref(null);
const isEditModalOpen = ref(false);
const editableTask = reactive({
  id: null,
  title: "",
  description: "",
  assignee: "",
  dueDate: "",
  priority: "",
});

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
  return label?.toLowerCase().replace(/\s/g, "") || "";
}

function openEditModal(task) {
  editableTask.id = task.id;
  editableTask.title = task.title;
  editableTask.description = task.description;
  editableTask.assignee = task.assignee;
  editableTask.dueDate = task.dueDate;
  editableTask.priority = task.priority;
  isEditModalOpen.value = true;
  dropdownOpen.value = null;
}

function closeEditModal() {
  isEditModalOpen.value = false;
}

function updateTask() {
  const taskIndex = props.tasks.findIndex((t) => t.id === editableTask.id);
  if (taskIndex !== -1) {
    props.tasks[taskIndex] = {
      ...editableTask,
      label: props.tasks[taskIndex].label,
    };
  }
  closeEditModal();
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
