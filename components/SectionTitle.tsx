
  import React from 'react';
  
  interface SectionTitleProps {
    title: string;
    subtitle?: string;
  }
  
  const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
    return (
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-primary font-serif mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-md text-brand-secondary max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded"></div>
      </div>
    );
  };
  
  export default SectionTitle;
      