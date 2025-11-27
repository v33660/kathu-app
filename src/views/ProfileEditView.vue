<!-- src/views/ProfileEditView.vue -->
<template>
  <div class="p-6 min-h-screen bg-[#F7FBFC]">
    <h1 class="text-2xl font-bold mb-4 text-[#1DA1F2]">Profile Setup</h1>

    <div class="bg-white p-4 rounded-xl shadow-md">
      <p class="text-gray-600 text-sm mb-2">Signed in as:</p>
      <p class="font-semibold text-lg">{{ user?.email }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const user = computed(() => auth.user);
</script>