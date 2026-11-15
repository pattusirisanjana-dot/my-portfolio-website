export interface ContactFormValues {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

export interface FeedbackFormValues {
  name: string;
  email: string;
  mobile: string;
  category: string;
  feedback: string;
  rating: number | null;
}

export interface ContactSubmissionResponse {
  success: boolean;
  message: string;
}