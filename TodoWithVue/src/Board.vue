<template>
  <div class="min-h-screen p-10">
    <Header
      :active-tab="currentView"
      @change-tab="changeTab"
      @search="handleSearch"
    />

    <div v-if="currentView === 'Board'">
      <div class="flex gap-6 overflow-x-auto pb-6 items-start">
        <Section
          v-for="section in filteredSections"
          :key="section.id"
          :title="section.title"
          :tasks="section.tasks"
          @add-task="openModal(section.id)"
          @delete-task="deleteTask(section.id, $event)"
        />

        <!-- + Add Section -->
        <div
          class="min-w-[300px] h-fit p-5 bg-white rounded-2xl shadow-md flex items-center justify-center text-purple-600 hover:bg-purple-50 cursor-pointer"
          @click="addSection"
        >
          + Add Section
        </div>
      </div>
    </div>

    <div v-else-if="currentView === 'List'">
      <ListView :sections="filteredSections" />
    </div>

    <div v-else-if="currentView === 'Table'">
      <TableView :sections="filteredSections" />
    </div>

    <AddTaskModal
      v-if="isModalOpen"
      @submit="addTask"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "./components/Header.vue";
import Section from "./components/Section.vue";
import AddTaskModal from "./components/AddTaskModal.vue";
import ListView from "./components/ListView.vue";
import TableView from "./components/TableView.vue";

const sections = ref([
  {
    id: 1,
    title: "To do",
    tasks: [
      {
        id: 101,
        title: "Design Homepage",
        description: "Create the layout for the homepage.",
        dueDate: "2025-06-01",
        priority: "High",
        label: "Not Started",
        assignee: "John Doe",
      },
    ],
  },
  { id: 2, title: "In Progress", tasks: [] },
  { id: 3, title: "Complete", tasks: [] },
]);

const isModalOpen = ref(false);
const currentSectionId = ref(null);
const currentView = ref("Board");
const searchQuery = ref("");
let newSectionCount = 1;

// Opens the modal for the given section id.
function openModal(sectionId) {
  currentSectionId.value = sectionId;
  isModalOpen.value = true;
}

// Adds a new task to the current section.
function addTask(task) {
  const section = sections.value.find((s) => s.id === currentSectionId.value);
  if (section) {
    section.tasks.push({ ...task, id: Date.now() });
  }
  isModalOpen.value = false;
}

// Deletes a task from the specified section.
function deleteTask(sectionId, taskId) {
  const section = sections.value.find((s) => s.id === sectionId);
  if (section) {
    section.tasks = section.tasks.filter((t) => t.id !== taskId);
  }
}

// Adds a new section.
function addSection() {
  sections.value.push({
    id: Date.now(),
    title: `New Section ${newSectionCount++}`,
    tasks: [],
  });
}

// Changes the current view/tab.
function changeTab(tab) {
  currentView.value = tab;
}

// Handles the search query.
function handleSearch(query) {
  searchQuery.value = query.toLowerCase();
}

// Filters sections based on search query.
const filteredSections = computed(() => {
  if (!searchQuery.value) return sections.value;
  return sections.value.map((section) => ({
    ...section,
    tasks: section.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.value)
    ),
  }));
});
</script>
