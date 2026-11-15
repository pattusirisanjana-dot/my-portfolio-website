import axios from "axios";
import type {
  ContactFormValues,
  ContactSubmissionResponse,
  FeedbackFormValues,
} from "../types";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export async function submitContactForm(
  values: ContactFormValues,
): Promise<ContactSubmissionResponse> {
  const response = await apiClient.post<ContactSubmissionResponse>(
    "/api/contact",
    values,
  );
  return response.data;
}

export async function submitFeedbackForm(
  values: FeedbackFormValues,
): Promise<ContactSubmissionResponse> {
  const response = await apiClient.post<ContactSubmissionResponse>(
    "/api/feedback",
    values,
  );
  return response.data;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError<{ detail?: unknown }>(error)) return fallback;

  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return "Please check the form fields and try again.";
  return fallback;
}