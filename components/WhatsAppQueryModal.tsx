
import React, { useState } from 'react';
import FormField from './FormField'; // Reusing FormField component

interface WhatsAppQueryModalProps {
  phoneNumber: string;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  query: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  query?: string;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


const WhatsAppQueryModal: React.FC<WhatsAppQueryModalProps> = ({ phoneNumber, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    query: '',
  });
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof FormErrors]) {
      setErrors({ ...errors, [e.target.name]: undefined });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    } else {
      setReceiptFile(null);
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
    if (!formData.query.trim()) {
      newErrors.query = 'Query is required.';
    } else if (formData.query.trim().length < 10) {
      newErrors.query = 'Query must be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      let message = `Hello BookHaven Support,\n\n`;
      message += `Name: ${formData.name}\n`;
      message += `Email: ${formData.email}\n`;
      if (formData.phone) {
        message += `Phone: ${formData.phone}\n`;
      }
      message += `Query: ${formData.query}\n`;
      if (receiptFile) {
        message += `Receipt Attached: Yes (Filename: ${receiptFile.name})\n`;
        message += `(Please note: Actual file upload is not part of this simulation via WhatsApp link. User should be instructed to send the file directly in chat if needed.)`;
      } else {
        message += `Receipt Attached: No\n`;
      }
      
      const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${numericPhoneNumber}?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, '_blank');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[100] transition-opacity duration-300 ease-in-out" role="dialog" aria-modal="true" aria-labelledby="whatsapp-modal-title">
      <div className="bg-brand-light p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 ease-in-out scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-dark hover:text-brand-secondary transition-colors"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <h2 id="whatsapp-modal-title" className="text-2xl font-bold text-brand-primary font-serif mb-6 text-center">Contact Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="name"
            label="Your Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Jane Doe"
            required
            error={errors.name}
          />
          <FormField
            id="phone"
            label="Your Phone (Optional)"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., +1-555-1234"
          />
          <FormField
            id="email"
            label="Your Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., jane.doe@example.com"
            required
            error={errors.email}
          />
          <div>
            <label htmlFor="receipt" className="block text-sm font-medium text-brand-dark mb-1">
              Payment Receipt (Optional)
            </label>
            <input
              type="file"
              id="receipt"
              name="receipt"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary transition-colors bg-white text-brand-dark file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-accent file:text-brand-primary hover:file:bg-opacity-80"
            />
            {receiptFile && <p className="text-xs text-gray-600 mt-1">Selected: {receiptFile.name}</p>}
          </div>
          <FormField
            id="query"
            label="Your Query"
            isTextarea
            value={formData.query}
            onChange={handleChange}
            placeholder="Please describe your issue or question (min. 10 characters)..."
            required
            rows={4}
            error={errors.query}
          />
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-brand-dark font-semibold py-3 px-6 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md transition-colors flex-grow"
            >
              Submit & Chat on WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppQueryModal;
