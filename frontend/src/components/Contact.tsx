import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { socialProfiles } from "../data/portfolio";
import {
  getApiErrorMessage,
  submitContactForm,
  submitFeedbackForm,
} from "../services/api";
import type { ContactFormValues, FeedbackFormValues } from "../types";
import SocialIcon from "./SocialIcon";
import "../styles/contact.css";

const EMPTY_FORM: ContactFormValues = {
  name: "",
  email: "",
  mobile: "",
  subject: "",
  message: "",
};

const EMPTY_FEEDBACK: FeedbackFormValues = {
  name: "",
  email: "",
  mobile: "",
  category: "",
  feedback: "",
  rating: null,
};

const FEEDBACK_CATEGORIES = [
  "Website Feedback",
  "Design",
  "Content",
  "Suggestion",
  "Other",
];

export default function Contact() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);
  const [feedbackValues, setFeedbackValues] =
    useState<FeedbackFormValues>(EMPTY_FEEDBACK);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);

  const updateField = (
    field: keyof ContactFormValues,
    value: string,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFeedback(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await submitContactForm(values);
      if (!response.success) {
        setFeedback({
          kind: "error",
          message: response.message || "We couldn't send your message. Please try again.",
        });
        return;
      }
      setValues(EMPTY_FORM);
      setFeedback({ kind: "success", message: response.message });
    } catch (error) {
      setFeedback({
        kind: "error",
        message: getApiErrorMessage(
          error,
          "We couldn't send your message. Please try again.",
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingFeedback) return;

    setIsSubmittingFeedback(true);
    setFeedbackStatus(null);

    try {
      const response = await submitFeedbackForm(feedbackValues);
      if (!response.success) {
        setFeedbackStatus({
          kind: "error",
          message: response.message || "We couldn't send your feedback. Please try again.",
        });
        return;
      }
      setFeedbackValues(EMPTY_FEEDBACK);
      setFeedbackStatus({ kind: "success", message: response.message });
    } catch (error) {
      setFeedbackStatus({
        kind: "error",
        message: getApiErrorMessage(
          error,
          "We couldn't send your feedback. Please try again.",
        ),
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const updateFeedbackField = (
    field: keyof FeedbackFormValues,
    value: string | number | null,
  ) => {
    setFeedbackValues((current) => ({ ...current, [field]: value }));
    setFeedbackStatus(null);
  };

  return (
    <section className="content-section contact-section" id="contact">
      <div className="section-shell contact-inner">
        <p className="eyebrow"><span /> 05 / YOUR TURN</p>
        <h2>Have an idea?<br /><em>Let&apos;s make it matter.</em></h2>
        <p>I&apos;m always glad to connect with curious people and talk about thoughtful technology.</p>
        <div className="connect-block">
          <h3>Connect with me</h3>
          <div className="connect-grid">
            {socialProfiles.map((profile) => {
              return (
                <a
                  className="connect-card"
                  href={profile.href}
                  key={profile.platform}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label={`Visit Sanjana's ${profile.name} profile (opens in a new tab)`}
                >
                  <SocialIcon className="connect-icon" platform={profile.platform} size={19} />
                  <span className="connect-name">{profile.name}</span>
                  <span className="connect-description">{profile.description}</span>
                  <span className="connect-action">Visit profile <ArrowUpRight aria-hidden="true" size={14} /></span>
                </a>
              );
            })}
            <a
              className="connect-card"
              href="#contact-form"
              aria-label="Write a message using the contact form"
            >
              <Mail aria-hidden="true" className="connect-icon" size={19} strokeWidth={1.7} />
              <span className="connect-name">Email</span>
              <span className="connect-description">Send a note through the contact form.</span>
              <span className="connect-action">Write a message <ArrowUpRight aria-hidden="true" size={14} /></span>
            </a>
          </div>
        </div>
        <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              autoComplete="name"
              maxLength={100}
              name="name"
              onChange={(event) => updateField("name", event.target.value)}
              required
              value={values.name}
            />
          </label>
          <label>
            Email
            <input
              autoComplete="email"
              maxLength={254}
              name="email"
              onChange={(event) => updateField("email", event.target.value)}
              required
              type="email"
              value={values.email}
            />
          </label>
          <label>
            Mobile number <span className="field-optional">(optional)</span>
            <input
              autoComplete="tel"
              maxLength={25}
              name="mobile"
              onChange={(event) => updateField("mobile", event.target.value)}
              placeholder="+1 555 123 4567"
              type="tel"
              value={values.mobile}
            />
          </label>
          <label>
            Subject
            <input
              maxLength={150}
              minLength={2}
              name="subject"
              onChange={(event) => updateField("subject", event.target.value)}
              required
              value={values.subject}
            />
          </label>
          <label>
            Message
            <textarea
              maxLength={5000}
              name="message"
              onChange={(event) => updateField("message", event.target.value)}
              required
              rows={5}
              value={values.message}
            />
          </label>
          <button className="button button-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            <span aria-hidden="true">{isSubmitting ? "…" : "↗"}</span>
          </button>
          {feedback && (
            <p
              className={`contact-feedback contact-feedback--${feedback.kind}`}
              role={feedback.kind === "error" ? "alert" : "status"}
              aria-live={feedback.kind === "error" ? "assertive" : "polite"}
            >
              <span aria-hidden="true">{feedback.kind === "success" ? "✓" : "!"}</span>
              {feedback.message}
            </p>
          )}
        </form>
        <details className="feedback-details">
          <summary>Have a moment? Share some feedback</summary>
          <p>Your feedback helps improve the portfolio. Sharing your phone number is optional.</p>
          <form className="contact-form feedback-form" onSubmit={handleFeedbackSubmit}>
            <label>
              Name
              <input
                autoComplete="name"
                maxLength={100}
                onChange={(event) => updateFeedbackField("name", event.target.value)}
                required
                value={feedbackValues.name}
              />
            </label>
            <label>
              Email
              <input
                autoComplete="email"
                maxLength={254}
                onChange={(event) => updateFeedbackField("email", event.target.value)}
                required
                type="email"
                value={feedbackValues.email}
              />
            </label>
            <label>
              Mobile number <span className="field-optional">(optional)</span>
              <input
                autoComplete="tel"
                maxLength={25}
                onChange={(event) => updateFeedbackField("mobile", event.target.value)}
                placeholder="+1 555 123 4567"
                type="tel"
                value={feedbackValues.mobile}
              />
            </label>
            <label>
              Feedback category
              <select
                onChange={(event) => updateFeedbackField("category", event.target.value)}
                required
                value={feedbackValues.category}
              >
                <option disabled value="">Choose a category</option>
                {FEEDBACK_CATEGORIES.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
            <label>
              Feedback
              <textarea
                maxLength={5000}
                onChange={(event) => updateFeedbackField("feedback", event.target.value)}
                required
                rows={4}
                value={feedbackValues.feedback}
              />
            </label>
            <label>
              Rating <span className="field-optional">(optional)</span>
              <select
                onChange={(event) =>
                  updateFeedbackField(
                    "rating",
                    event.target.value ? Number(event.target.value) : null,
                  )
                }
                value={feedbackValues.rating ?? ""}
              >
                <option value="">No rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating} / 5</option>
                ))}
              </select>
            </label>
            <button className="button button-primary" disabled={isSubmittingFeedback} type="submit">
              {isSubmittingFeedback ? "SENDING..." : "SEND FEEDBACK"}
              <span aria-hidden="true">{isSubmittingFeedback ? "…" : "↗"}</span>
            </button>
            {feedbackStatus && (
              <p
                className={`contact-feedback contact-feedback--${feedbackStatus.kind}`}
                role={feedbackStatus.kind === "error" ? "alert" : "status"}
                aria-live={feedbackStatus.kind === "error" ? "assertive" : "polite"}
              >
                <span aria-hidden="true">{feedbackStatus.kind === "success" ? "✓" : "!"}</span>
                {feedbackStatus.message}
              </p>
            )}
          </form>
        </details>
        <span className="contact-note">PATTUSURI SANJANA <i>·</i> PORTFOLIO 2026</span>
      </div>
    </section>
  );
}