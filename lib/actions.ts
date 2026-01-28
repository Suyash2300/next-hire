// lib/actions.ts
"use server";

import { JobFormData } from "@/types";

// Server Action to create a job (Mock version)
export async function createJob(data: JobFormData, userId: string) {
  // In a real mock scenario, we'd add to detailed mock storage if it was persistent back-end,
  // but since we switched to local storage, this server action might not even be called if we handle it client side.
  // However, keeping the signature valid:
  return {
    id: Math.random().toString(36).substr(2, 9),
    ...data,
    userId,
    createdAt: new Date().toISOString()
  };
}
