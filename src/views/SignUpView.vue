<!-- src/views/SignUpView.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F7FBFC] px-6">
    <div class="w-full max-w-sm bg-white p-6 rounded-xl shadow-md">
      <h1 class="text-2xl font-bold text-center mb-4 text-[#1DA1F2]">
        Kathu — Create Account
      </h1>

      <form @submit.prevent="handleSignUp" class="space-y-4">
        <div>
          <label class="block text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full p-3 border rounded-lg"
          />
        </div>

        <div>
          <label class="block text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full p-3 border rounded-lg"
          />
        </div>

        <button
          class="w-full bg-[#1DA1F2] text-white py-3 rounded-lg font-semibold"
          :disabled="auth.loading"
        >
          {{ auth.loading ? "Creating..." : "Create Account" }}
        </button>

        <p v-if="errorMsg" class="text-red-500 text-sm text-center mt-2">
          {{ errorMsg }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { supabase } from "@/services/supabaseClient";

const auth = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMsg = ref("");

async function createProfile(userId) {
  await supabase.from("profiles").insert({
    id: userId,
    full_name: "",
    username: "",
    avatar_url: "",
    bio: "",
    setup_complete: false,
  });
}

async function handleSignUp() {
  errorMsg.value = "";

  try {
    const user = await auth.signUp(email.value, password.value);

    if (!user) return;

    await createProfile(user.id);

    router.push("/profile-edit");
  } catch (err) {
    errorMsg.value = err.message;
  }
}
</script>

<style>
input {
  outline: none;
}
</style>