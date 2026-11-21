import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export type UserProfile = {
  id: string;
  username: string;
  profile_image_url: string | null;
  role: "admin" | "user";
};

export async function registerUser(
  email: string,
  password: string,
  username: string,
) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim().toLowerCase(),
    password,
    options: { data: { username: username.trim() } },
  });
  if (error) throw error;
  return data;
}

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });
  if (error) throw error;
  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return getProfile(data.user);
}

export async function getProfile(user?: User): Promise<UserProfile | null> {
  let authUser = user;
  if (!authUser) {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    authUser = data.user;
  }

  // `profiles` is a read-only compatibility view over separate user/admin tables.
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, profile_image_url, role")
    .eq("id", authUser.id)
    .maybeSingle();

  if (error) throw error;
  if (profile) return profile as UserProfile;

  // Defensive fallback: newly registered users must never default to admin.
  const metadataUsername = authUser.user_metadata?.username;
  return {
    id: authUser.id,
    username:
      typeof metadataUsername === "string" && metadataUsername.trim()
        ? metadataUsername.trim()
        : authUser.email?.split("@")[0] || "Pengguna",
    profile_image_url: null,
    role: "user",
  };
}

export async function hasValidSession(): Promise<boolean> {
  const { data, error } = await supabase.auth.getUser();
  return !error && Boolean(data.user);
}

export async function isAdmin(): Promise<boolean> {
  return (await getCurrentUser())?.role === "admin";
}

export async function updateUserProfileImage(file: File): Promise<string> {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData.user) throw new Error("Silakan login kembali.");

  const profile = await getProfile(authData.user);
  if (!profile) throw new Error("Profil akun tidak ditemukan.");

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${authData.user.id}/avatar.${extension}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
      cacheControl: "3600",
    });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  const profileTable = profile.role === "admin" ? "admin_profiles" : "user_profiles";
  const { error: profileError } = await supabase
    .from(profileTable)
    .update({ profile_image_url: data.publicUrl })
    .eq("id", authData.user.id);
  if (profileError) throw profileError;

  return data.publicUrl;
}
