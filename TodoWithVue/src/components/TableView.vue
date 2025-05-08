<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white shadow rounded">
      <thead>
        <tr class="text-center bg-gray-100">
          <th class="p-3">Title</th>
          <th class="p-3">Section</th>
          <th class="p-3">Due Date</th>
          <th class="p-3">Assignee</th>
          <th class="p-3">Priority</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through each section and its tasks -->
        <template v-for="section in sections" :key="section.id">
          <tr v-for="task in section.tasks" :key="task.id" class="border-t">
            <td class="p-3">{{ task.title }}</td>
            <td class="p-3">{{ section.title }}</td>
            <td class="p-3">{{ task.dueDate }}</td>
            <td class="p-3">{{ task.assignee }}</td>
            <td class="p-3">{{ task.priority }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Define a prop for the sections array containing tasks
defineProps({
  sections: Array,
});
</script>
