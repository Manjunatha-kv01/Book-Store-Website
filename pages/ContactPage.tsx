
  import React, { useState } from 'react';
  import SectionTitle from '../components/SectionTitle';
  import FormField from '../components/FormField';
  import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_ADDRESS } from '../constants';
  
  interface FormData {
    name: string;
    email: string;
    message: string;
  }
  
  interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
  }
  
  const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (errors[e.target.name as keyof FormErrors]) {
        setErrors({ ...errors, [e.target.name]: undefined });
      }
    };
  
    const validateForm = (): boolean => {
      const newErrors: FormErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required.';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid.';
      }
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required.';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Message must be at least 10 characters long.';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        console.log('Form submitted:', formData); // Simulate form submission
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' }); // Reset form
        setTimeout(() => setIsSubmitted(false), 5000); // Reset submission message
      }
    };
  
    return (
      <div className="space-y-12">
        <SectionTitle title="Get In Touch" subtitle="We'd love to hear from you! Send us a message or find us." />
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-semibold text-brand-primary font-serif mb-6">Send Us a Message</h3>
            {isSubmitted && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                id="name"
                label="Full Name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                error={errors.name}
              />
              <FormField
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                error={errors.email}
              />
              <FormField
                id="message"
                label="Your Message"
                isTextarea
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                required
                rows={5}
                error={errors.message}
              />
              <div>
                <button
                  type="submit"
                  className="w-full bg-brand-secondary hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
  
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-semibold text-brand-primary font-serif mb-4">Contact Information</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Email:</strong> <a href={`mailto:${COMPANY_EMAIL}`} className="text-brand-secondary hover:underline">{COMPANY_EMAIL}</a></p>
                <p><strong>Phone:</strong> <a href={`tel:${COMPANY_PHONE}`} className="text-brand-secondary hover:underline">{COMPANY_PHONE}</a></p>
                <p><strong>Address:</strong> {COMPANY_ADDRESS}</p>
              </div>
            </div>
  
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-semibold text-brand-primary font-serif mb-4">Our Location</h3>
              {/* Placeholder for map */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Google Map Placeholder (e.g., embed iframe here)</p>
              </div>
               <p className="mt-2 text-sm text-gray-500">Note: This is a fictional address for demo purposes.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactPage;
      