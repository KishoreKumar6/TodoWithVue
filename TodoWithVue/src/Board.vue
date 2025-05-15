<template>
  <div class="min-h-screen p-10">
    <Header
      :active-tab="currentView"
      @change-tab="changeTab"
      @search="handleSearch"
    />

    <div v-if="currentView === 'Board'">
      <div class="flex gap-4 overflow-x-auto pb-6 items-start">
        <!-- Section Rendering -->
        <div
          v-for="section in filteredSections"
          :key="section.id"
          class="min-w-[300px] relative"
        >
          <!-- Section Header (Title, + button, and Dropdown) -->
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-lg font-semibold">{{ section.title }}</h2>
            <div class="flex items-center space-x-2">
              <!-- External + button to add task remains in header -->
              <button
                class="text-gray-400 hover:text-gray-700"
                @click="openModal(section.id)"
                title="Add Task"
              >
                +
              </button>
              <div class="relative">
                <button
                  class="text-gray-400 hover:text-gray-700"
                  @click="toggleDropdown(section.id)"
                  title="More Options"
                >
                  ⋯
                </button>
                <!-- Dropdown -->
                <div
                  v-if="activeDropdown === section.id"
                  class="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-10"
                >
                  <button
                    class="w-full px-4 py-2 text-left hover:bg-gray-100"
                    @click="openEditSectionModal(section)"
                  >
                    Edit Section
                  </button>
                  <button
                    class="w-full px-4 py-2 text-left hover:bg-gray-100"
                    @click="confirmDeleteSection(section.id)"
                  >
                    Delete Section
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Task Section -->
          <Section
            :tasks="section.tasks"
            @add-task="openModal(section.id)"
            @delete-task="deleteTask(section.id, $event)"
          />
        </div>

        <!-- + Add Section -->
        <div
          class="min-w-[300px] h-fit p-5 bg-white rounded-2xl shadow-md flex items-center justify-center text-purple-600 hover:bg-purple-50 cursor-pointer"
          @click="showAddSectionModal = true"
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

    <!-- Add Task Modal -->
    <AddTaskModal
      v-if="isModalOpen"
      @submit="addTask"
      @close="isModalOpen = false"
    />

    <!-- Add Section Modal -->
    <div
      v-if="showAddSectionModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
       style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="bg-white p-6 rounded shadow-lg w-80">
        <h2 class="text-lg font-semibold mb-4">Add New Section</h2>
        <input
          v-model="newSectionTitle"
          placeholder="Enter section name"
          class="w-full border p-2 rounded mb-4"
        />
        <div class="flex justify-end gap-2">
          <button
            @click="showAddSectionModal = false"
            class="px-4 py-2 text-gray-600 hover:text-black"
          >
            Cancel
          </button>
          <button
            @click="addSection"
            class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Section Modal -->
    <div
      v-if="showEditSectionModal"
      class="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50"
       style="background-color: rgba(0, 0, 0, 0.5);"
    >
      <div class="bg-white p-6 rounded shadow-lg w-80">
        <h2 class="text-lg font-semibold mb-4">Edit Section</h2>
        <input
          v-model="editedSectionTitle"
          placeholder="Edit section name"
          class="w-full border p-2 rounded mb-4"
        />
        <div class="flex justify-end gap-2">
          <button
            @click="showEditSectionModal = false"
            class="px-4 py-2 text-gray-600 hover:text-black"
          >
            Cancel
          </button>
          <button
            @click="updateSection"
            class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "./components/Header.vue";
import Section from "./components/Section.vue";
import AddTaskModal from "./components/AddTaskModal.vue";
import ListView from "./components/ListView.vue";
import TableView from "./components/TableView.vue";

// State
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
const showAddSectionModal = ref(false);
const newSectionTitle = ref("");
const currentSectionId = ref(null);
const currentView = ref("Board");
const searchQuery = ref("");
const activeDropdown = ref(null);

const showEditSectionModal = ref(false);
const editedSectionTitle = ref("");
const editingSection = ref(null);

// Task Modal
function openModal(sectionId) {
  currentSectionId.value = sectionId;
  isModalOpen.value = true;
}

function addTask(task) {
  const section = sections.value.find((s) => s.id === currentSectionId.value);
  if (section) {
    section.tasks.push({ ...task, id: Date.now() });
  }
  isModalOpen.value = false;
}

// Delete Task
function deleteTask(sectionId, taskId) {
  const section = sections.value.find((s) => s.id === sectionId);
  if (section) {
    section.tasks = section.tasks.filter((t) => t.id !== taskId);
  }
}

// Add Section
function addSection() {
  if (newSectionTitle.value.trim()) {
    sections.value.push({
      id: Date.now(),
      title: newSectionTitle.value.trim(),
      tasks: [],
    });
    newSectionTitle.value = "";
    showAddSectionModal.value = false;
  }
}

// Dropdown Toggle
function toggleDropdown(sectionId) {
  activeDropdown.value =
    activeDropdown.value === sectionId ? null : sectionId;
}

// Delete Section
function confirmDeleteSection(sectionId) {
  sections.value = sections.value.filter((s) => s.id !== sectionId);
  activeDropdown.value = null;
}

// Edit Section
function openEditSectionModal(section) {
  editingSection.value = section;
  editedSectionTitle.value = section.title;
  showEditSectionModal.value = true;
  activeDropdown.value = null;
}

function updateSection() {
  if (editingSection.value && editedSectionTitle.value.trim()) {
    editingSection.value.title = editedSectionTitle.value.trim();
    showEditSectionModal.value = false;
    editedSectionTitle.value = "";
  }
}

// Tabs
function changeTab(tab) {
  currentView.value = tab;
}

// Search
function handleSearch(query) {
  searchQuery.value = query.toLowerCase();
}

// Filtered Sections
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
