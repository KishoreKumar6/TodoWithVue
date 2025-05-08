<template>
  <div>
    <!-- Title and Actions Row -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 text-left">Tasks</h2>
        <p class="text-sm text-gray-500">
          Keep track of your team's tasks all in one place.
        </p>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex -space-x-2">
          <img
            v-for="(avatar, index) in avatars"
            :key="index"
            :src="avatar"
            class="w-8 h-8 rounded-full border-2 border-white"
            alt="Avatar"
          />
          <div
            class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white"
          >
            +2
          </div>
        </div>

        <button
          class="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700"
        >
          Invite Member
        </button>
        <button
          class="flex items-center gap-1 border px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
        >
          Share
        </button>
      </div>
    </div>

    <!-- Tabs, Filters, Search -->
    <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
      <!-- Tabs -->
      <div class="flex gap-4 text-gray-700 font-medium text-sm">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="$emit('change-tab', tab)"
          :class="[
            'px-3 py-2 rounded',
            activeTab === tab
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'hover:text-purple-600',
          ]"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Filter, Sort, Group -->
      <div class="flex gap-2 items-center">
        <select class="border rounded px-3 py-1 text-sm text-gray-700">
          <option>Filter</option>
        </select>
        <select class="border rounded px-3 py-1 text-sm text-gray-700">
          <option>Group by</option>
        </select>
        <select class="border rounded px-3 py-1 text-sm text-gray-700">
          <option>Sort</option>
        </select>

        <!-- Search -->
        <input
          type="text"
          placeholder="Search tasks..."
          v-model="searchText"
          @input="$emit('search', searchText)"
          class="border rounded px-3 py-1 text-sm text-gray-700 w-48"
        />
      </div>
    </div>
  </div>
  <hr class="mb-7 text-gray-300" />
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  activeTab: String,
});

const emit = defineEmits(["change-tab", "search"]);

const tabs = ["Board", "List", "Table"];

const searchText = ref("");

const avatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/76.jpg",
];
</script>
