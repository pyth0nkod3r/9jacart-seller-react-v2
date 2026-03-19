import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import MainHeader from "@/components/MainHeader";
import Footer from "@/components/homepage/Footer";

// Simple validation functions
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateField = (fieldName: string, value: string): string | undefined => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  if (fieldName === "Email" && !validateEmail(value)) {
    return "Please enter a valid email address";
  }
  return undefined;
};

interface ContactFormData {
  fullName: string;
  emailAddress: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  fullName?: string;
  emailAddress?: string;
  subject?: string;
  message?: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    emailAddress: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof ContactFormErrors]) {
      const fieldError = validateField(name === "emailAddress" ? "Email" : name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: ContactFormErrors = {
      fullName: validateField("Full Name", formData.fullName),
      emailAddress: validateField("Email", formData.emailAddress),
      subject: validateField("Subject", formData.subject),
      message: validateField("Message", formData.message),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setStatus("submitting");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setStatusMessage("Thank you for your message! We'll get back to you soon.");
      setFormData({ fullName: "", emailAddress: "", subject: "", message: "" });
    } catch {
      setStatus("error");
      setStatusMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <motion.main
        id="main-content"
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our platform? Want to learn more about becoming a vendor?
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                {status === "success" ? (
                  <div className="text-center py-8">
                    <span className="text-4xl">✅</span>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">{statusMessage}</p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className="mt-1"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="emailAddress">Email Address</Label>
                      <Input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className="mt-1"
                      />
                      {errors.emailAddress && (
                        <p className="mt-1 text-sm text-red-600">{errors.emailAddress}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="mt-1"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Your message"
                        rows={5}
                        className="mt-1"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full"
                    >
                      {status === "submitting" ? "Sending..." : "Send Message"}
                    </Button>

                    {status === "error" && (
                      <p className="text-red-600">{statusMessage}</p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-4 text-muted-foreground">
                  <p>📧 support@sellerhub.ng</p>
                  <p>📞 +234 800 000 0000</p>
                  <p>📍 Lagos, Nigeria</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Business Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM (WAT)</p>
                  <p>Saturday: 10:00 AM - 4:00 PM (WAT)</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default ContactPage;
