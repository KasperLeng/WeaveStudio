"use client";

import { FormEvent, useRef, useState } from "react";

const CONTACT_FORM_URL =
  process.env.NEXT_PUBLIC_CONTACT_FORM_URL?.trim() || "";

export default function Contact() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const nameOk = name.trim().length > 0;
  const emailOk = email.trim().length > 0 && emailValid;
  const messageOk = message.trim().length > 0;
  const ready = nameOk && emailOk && messageOk;

  const hideMessages = () => {
    setSuccess(false);
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    hideMessages();
    if (!ready) return;

    if (!CONTACT_FORM_URL) {
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData(e.currentTarget);
      const res = await fetch(CONTACT_FORM_URL, {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSuccess(true);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const msg =
          typeof data.error === "string"
            ? data.error
            : "Something went wrong. Please try again or email us directly.";
        setError(msg);
      }
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" data-nav-section="contact" className="scroll-mt-20 py-20">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-12 px-10 md:grid-cols-2">
        <div>
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-clarity">
            Get In Touch
          </p>
          <h2 className="max-w-[380px] text-[32px] font-medium leading-[1.25] tracking-[-0.01em] text-black">
            Let&apos;s build something together.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.7] text-midnight">
            Tell us about your project — even if it&apos;s just a rough idea. We&apos;ll get back
            to you within one business day.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label className="mb-[6px] block text-[12px] text-midnight" htmlFor="contact-name">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            value={name}
            onChange={(e) => {
              hideMessages();
              setName(e.target.value);
            }}
            className="mb-[14px] w-full rounded-[6px] border border-mist bg-white px-[14px] py-[10px] text-[14px] text-black placeholder:text-mist focus:border-clarity focus:outline-none"
          />

          <label className="mb-[6px] block text-[12px] text-midnight" htmlFor="contact-email">
            Email
          </label>
          <input
            ref={emailRef}
            id="contact-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              hideMessages();
              setEmail(e.target.value);
              setEmailValid(e.target.checkValidity());
            }}
            className="mb-[14px] w-full rounded-[6px] border border-mist bg-white px-[14px] py-[10px] text-[14px] text-black placeholder:text-mist focus:border-clarity focus:outline-none"
          />

          <label className="mb-[6px] block text-[12px] text-midnight" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Tell us about your project..."
            value={message}
            onChange={(e) => {
              hideMessages();
              setMessage(e.target.value);
            }}
            className="mb-[14px] w-full rounded-[6px] border border-mist bg-white px-[14px] py-[10px] text-[14px] text-black placeholder:text-mist focus:border-clarity focus:outline-none"
          />

          <button
            type="submit"
            disabled={!ready || submitting}
            aria-disabled={!ready || submitting}
            className="w-full rounded-[6px] bg-anchor py-[14px] text-[15px] font-medium text-white transition-colors hover:bg-clarity disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-anchor"
          >
            Send Message →
          </button>

          {success && (
            <p className="mt-3 text-[14px] font-medium text-anchor">
              Message sent! We&apos;ll be in touch soon.
            </p>
          )}
          {error && (
            <p className="mt-3 text-[14px] font-medium text-[#c62828]">{error}</p>
          )}
        </form>
      </div>
    </section>
  );
}
