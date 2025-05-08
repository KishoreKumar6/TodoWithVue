<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Responsive grid layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="section in sections"
        :key="section.id"
        class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <!-- Section title with border -->
        <h3 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          {{ section.title }}
        </h3>
        <!-- Task List -->
        <ul class="space-y-4">
          <li
            v-for="task in section.tasks"
            :key="task.id"
            class="bg-gray-50 rounded-lg p-4 shadow hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-center mb-2">
              <!-- Task title -->
              <span class="font-semibold text-gray-700">{{ task.title }}</span>
              <!-- Task due date -->
              <span class="text-sm text-gray-500">{{ task.dueDate }}</span>
            </div>
            <div>
              <!-- Task priority badge -->
              <span
                class="inline-block bg-blue-200 text-blue-800 text-xs font-medium rounded-full px-2 py-1"
              >
                {{ task.priority }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  sections: Array,
});
</script>
