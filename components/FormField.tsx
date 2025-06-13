
  import React from 'react';
  
  interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    isTextarea?: boolean;
    rows?: number;
    error?: string | null;
  }
  
  const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    isTextarea = false,
    rows = 4,
    error
  }) => {
    const commonProps = {
      id,
      name: id,
      value,
      onChange,
      placeholder,
      required,
      className: `w-full p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary transition-colors bg-white placeholder-gray-400 text-brand-dark`,
    };
  
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-brand-dark mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {isTextarea ? (
          <textarea {...commonProps} rows={rows}></textarea>
        ) : (
          <input type={type} {...commonProps} />
        )}
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>
    );
  };
  
  export default FormField;
      