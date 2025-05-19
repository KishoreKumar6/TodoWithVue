<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Task
      </h2>

      <form @submit.prevent="submit" class="space-y-4">
        <!-- Title Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            v-model="task.description"
            placeholder="Enter task description"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
          ></textarea>
        </div>

        <!-- Due Date and Assignee Fields -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              v-model="task.dueDate"
              type="date"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Assignee
            </label>
            <input
              v-model="task.assignee"
              type="text"
              placeholder="Assignee name"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
            />
          </div>
        </div>

        <!-- Priority and Label -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              v-model="task.priority"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
            >
              <option>Programming</option>
              <option>Design</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <select
              v-model="task.label"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150"
            >
              <option>Yesterday</option>
              <option>Today</option>
              <option>Tomorrow</option>
              <option>Day After Tomorrow</option>
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
            :disabled="loading"
            class="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition duration-150"
          >
            {{ loading ? "Saving..." : "Add Task" }}
          </button>
        </div>
      </form>

      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

const emit = defineEmits(["submit", "close"]);

const task = reactive({
  title: "",
  description: "",
  dueDate: "",
  assignee: "",
  priority: "Programming",
  label: "Yesterday",
});

const loading = ref(false);
const error = ref("");

async function submit() {
  loading.value = true;
  error.value = "";

  try {
    const res = await axios.post(
      "https://todowithvue-3.onrender.com/api/tasks/create",
      task
    );
    emit("submit", res.data); // Send the created task back to parent
    emit("close");
  } catch (err) {
    error.value = err.response?.data?.error || "Failed to save task.";
    console.error("Error saving task:", err);
  } finally {
    loading.value = false;
  }
}
</script>
