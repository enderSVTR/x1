export type StoredUser = {
  username: string;
  password: string;
  profileImage?: string;
  role?: "admin" | "user";
};

export const DEFAULT_ADMIN: StoredUser = {
  username: "Nabil1908",
  password: "Nabil_angeline",
  role: "admin",
};

const USERS_KEY = "motofix_users";
const SESSION_KEY = "motofix_session";

export function getUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [DEFAULT_ADMIN];
  }

  const savedUsers = window.localStorage.getItem(USERS_KEY);
  let users: StoredUser[] = [];

  if (savedUsers) {
    try {
      const parsed: unknown = JSON.parse(savedUsers);
      users = Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
    } catch {
      users = [];
    }
  }

  // Ensure default admin always exists and is up to date
  const adminIndex = users.findIndex(
    (u) => u.username.toLowerCase() === DEFAULT_ADMIN.username.toLowerCase(),
  );

  if (adminIndex === -1) {
    users = [DEFAULT_ADMIN, ...users];
    window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } else {
    if (
      users[adminIndex].password !== DEFAULT_ADMIN.password ||
      users[adminIndex].role !== "admin"
    ) {
      users[adminIndex].password = DEFAULT_ADMIN.password;
      users[adminIndex].role = "admin";
      window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  }

  return users;
}

export function saveUser(user: StoredUser) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify([...getUsers(), user]));
}

export function updateUserProfileImage(username: string, profileImage: string) {
  const users = getUsers().map((user) =>
    user.username.toLowerCase() === username.toLowerCase()
      ? { ...user, profileImage }
      : user,
  );

  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  const username = getSession();
  return username
    ? getUsers().find(
        (user) => user.username.toLowerCase() === username.toLowerCase(),
      ) || null
    : null;
}

export function isAdmin(): boolean {
  const current = getCurrentUser();
  return (
    current?.username.toLowerCase() === DEFAULT_ADMIN.username.toLowerCase() ||
    current?.role === "admin"
  );
}

export function setSession(username: string) {
  window.localStorage.setItem(SESSION_KEY, username);
}

export function getSession() {
  return window.localStorage.getItem(SESSION_KEY)?.trim() || null;
}

export function hasValidSession() {
  const username = getSession();

  if (!username) {
    return false;
  }

  const isRegisteredUser = getUsers().some(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );

  if (!isRegisteredUser) {
    clearSession();
    return false;
  }

  return true;
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}
