<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Task
      </h2>
      <form @submit.prevent="submit" class="space-y-4">
        <!-- Title Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Title</label
          >
          <input
            v-model="task.title"
            type="text"
            required
            placeholder="Enter task title"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
          />
        </div>
        <!-- Description Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Description</label
          >
          <textarea
            v-model="task.description"
            placeholder="Enter task description"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
          ></textarea>
        </div>
        <!-- Due Date and Assignee Fields in a Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Due Date</label
            >
            <input
              v-model="task.dueDate"
              type="date"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Assignee</label
            >
            <input
              v-model="task.assignee"
              type="text"
              placeholder="Assignee name"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
            />
          </div>
        </div>
        <!-- Priority and Label Fields in a Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Priority</label
            >
            <select
              v-model="task.priority"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Label</label
            >
            <select
              v-model="task.label"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
            >
              <option>Not Started</option>
              <option>In Research</option>
              <option>On Track</option>
              <option>Complete</option>
            </select>
          </div>
        </div>
        <!-- Action Buttons -->
        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-150"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// Define emits for submit and close events
const emit = defineEmits(["submit", "close"]);

// Reactive task object including Assignee field
const task = reactive({
  title: "",
  description: "",
  dueDate: "",
  assignee: "",
  priority: "Low",
  label: "Not Started",
});

// Emit the current task when form is submitted
function submit() {
  emit("submit", { ...task });
}
</script>
