export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  createdAt?: string; // optional for now (will come from DB later)
  userId?: string;    // optional until auth + DB is added
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  description: string;
}

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
