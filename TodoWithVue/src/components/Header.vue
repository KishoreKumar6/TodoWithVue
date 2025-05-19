<template>
  <div>
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-4">
        <button class="text-gray-600 hover:text-gray-800">
          <!-- Back Button -->
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button class="text-gray-600 hover:text-gray-800">
          <i
            class="fa-brands fa-apple text-white bg-black text-2xl p-3 rounded-lg"
          ></i>
        </button>

        <div>
          <h2 class="text-xl font-semibold text-gray-800 text-left">Apple</h2>
          <p class="text-sm text-gray-500">5 boards   24 members</p>
        </div>
      </div>

      <!-- Right Side: Search + Share + Settings -->
      <div class="flex items-center gap-3">
        <div class="relative">
          <!-- Add extra left padding to make room for the icon -->
          <input
            type="text"
            placeholder="Search"
            v-model="searchText"
            @input="$emit('search', searchText)"
            class="border rounded px-10 py-1 text-sm text-gray-700 w-48 border-gray-400"
          />
          <!-- Position the icon absolutely within the container -->
          <span
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            <!-- Using an inline SVG for the search icon -->
            <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>

        <button
          class="text-gray-600 hover:text-gray-800 border border-gray-400 p-1 rounded-lg"
        >
          <i class="fa-solid fa-share-from-square h-5 w-5 text-gray-400"></i>
        </button>

        <button
          class="text-gray-600 hover:text-gray-800 border border-gray-400 p-1 rounded-lg"
        >
          <i class="fa-solid fa-gear text-gray-400"></i>
        </button>
      </div>
    </div>

    <!-- Divider -->
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  activeTab: String,
});

const emit = defineEmits(["search"]);

const searchText = ref("");
</script>
