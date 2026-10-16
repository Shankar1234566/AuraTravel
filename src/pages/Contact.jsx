import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';

export function Contact() {
  const { showToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedMessage, setSubmittedMessage] = useState(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: 'How does AuraTravel calculate indicative trip budgets?',
      a: 'Our budget estimates reflect mid-to-high season accommodations, daily culinary experiences, transit passes, and signature activities. They are illustrative reference brackets to assist trip planning.'
    },
    {
      q: 'Can I export or print my saved itineraries?',
      a: 'Yes, itineraries configured in the Trip Planner are saved inside your browser storage. You can access, edit, or adjust them anytime without losing your sequencing.'
    },
    {
      q: 'Does AuraTravel handle live airline or hotel reservations?',
      a: 'This application is a specialized frontend discovery and trip-planning platform. Live booking integrations and ticket issuance are simulated for frontend demonstration purposes.'
    },
    {
      q: 'How are the 12 destinations selected?',
      a: 'Each destination is chosen for unique geographic variety, cultural richness, distinct seasonal appeal, and visual splendor—ranging from Swiss glaciers to Dal Lake and Kyoto bamboo paths.'
    }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify an inquiry subject.';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message with at least 10 characters.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast('Please correct form validation errors.', 'warning');
      return;
    }

    setErrors({});
    const simulatedResponse = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      timestamp: new Date().toLocaleTimeString()
    };
    setSubmittedMessage(simulatedResponse);
    showToast(`Inquiry simulated successfully for ${formData.name}!`, 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <SectionHeading
        eyebrow="CONCIERGE INQUIRY"
        title="Contact AuraTravel"
        description="Have a question regarding destination recommendations, trip planning, or technical capabilities? Connect with our team."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information & Concierge info */}
        <div className="space-y-6">
          <div className="bg-midnight-card border border-midnight-border rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-xl font-serif text-warm-white">Direct Communication</h3>
            <p className="text-xs text-muted leading-relaxed">
              Our travel specialists respond to private itinerary requests and technical questions.
            </p>

            <div className="space-y-4 text-xs text-warm-white/80">
              <div className="flex items-start gap-3.5">
                <Mail className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted block text-[10px] uppercase tracking-wider">Email Concierge</span>
                  <span className="font-mono text-warm-white">concierge@auratravel.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted block text-[10px] uppercase tracking-wider">Global Hotline</span>
                  <span className="font-mono text-warm-white">+1 (800) 428-AURA</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted block text-[10px] uppercase tracking-wider">Studio Headquarters</span>
                  <span className="text-warm-white">AuraTravel Design Labs, San Francisco & Zurich</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-midnight-border text-[11px] text-muted">
              <p>Demo Simulation Note: Form submissions are processed locally inside state to demonstrate form validation and UI feedback.</p>
            </div>
          </div>
        </div>

        {/* Form Column (2 spans) */}
        <div className="lg:col-span-2 bg-midnight-card border border-midnight-border rounded-2xl p-6 sm:p-8">
          <h3 className="text-2xl font-serif text-warm-white mb-2">Send an Inquiry</h3>
          <p className="text-xs text-muted mb-6">All fields marked with an asterisk (*) are validated.</p>

          {submittedMessage && (
            <div className="mb-6 p-4 rounded-xl bg-teal/10 border border-teal/30 flex items-start gap-3 text-xs text-warm-white">
              <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
              <div>
                <strong className="text-teal font-semibold">Message Processed (Simulation):</strong>
                <p className="mt-0.5">
                  Thank you, <strong>{submittedMessage.name}</strong>. Your inquiry regarding "<em>{submittedMessage.subject}</em>" has been logged at {submittedMessage.timestamp}.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
                />
                {errors.name && <span className="text-xs text-rose-400 mt-1 block">{errors.name}</span>}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. eleanor@example.com"
                  className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
                />
                {errors.email && <span className="text-xs text-rose-400 mt-1 block">{errors.email}</span>}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                Inquiry Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Custom 10-day itinerary planning for Swiss Alps"
                className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal"
              />
              {errors.subject && <span className="text-xs text-rose-400 mt-1 block">{errors.subject}</span>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted font-medium mb-1.5">
                Message Content *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please describe your travel intentions, preferences, or technical feedback..."
                rows={5}
                className="w-full bg-midnight px-3.5 py-2.5 rounded-xl text-sm text-warm-white border border-midnight-border focus:outline-none focus:border-teal placeholder:text-muted/60"
              />
              {errors.message && <span className="text-xs text-rose-400 mt-1 block">{errors.message}</span>}
            </div>

            <Button type="submit" variant="primary" size="md" icon={Send} iconPosition="right">
              Submit Simulated Inquiry
            </Button>
          </form>
        </div>
      </div>

      {/* Frequently Asked Questions (Accordion) */}
      <div className="pt-12 border-t border-midnight-border max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <span className="text-xs uppercase tracking-widest font-semibold text-teal mb-2 block">
            NEED IMMEDIATE GUIDANCE?
          </span>
          <h2 className="text-3xl font-serif text-warm-white font-medium">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-midnight-card border border-midnight-border rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-teal"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif font-medium text-base text-warm-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-teal shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-warm-white/80 leading-relaxed border-t border-midnight-border/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
