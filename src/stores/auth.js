


















































// src/stores/auth.js
import { defineStore } from "pinia";
import { supabase } from "@/services/supabaseClient";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
  }),

  actions: {
    async fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      this.user = user;
    },

    async signUp(email, password, username) {
      this.loading = true;

      // 1️⃣ Create the user in auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        this.loading = false;
        throw error;
      }

      // 2️⃣ Wait for session to be available
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        this.loading = false;
        throw sessionError;
      }
      
      const user = data.user;
      
      // 3️⃣ Insert into profiles table
      if (user) {
        const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id: user.id, username }]);
        if (profileError) {
          this.loading = false;
          console.log("point 2, ", user.id);
          throw profileError;
        }
      }

      this.user = user;
      this.loading = false;
      return user;
    },

    async signOut() {
      await supabase.auth.signOut();
      this.user = null;
    },
  },
});
