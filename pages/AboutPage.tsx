
  import React from 'react';
  import SectionTitle from '../components/SectionTitle';
  
  const AboutPage: React.FC = () => {
    return (
      <div className="space-y-12 bg-white p-8 md:p-12 rounded-lg shadow-xl">
        <SectionTitle title="About BookHaven" subtitle="Our Story, Mission, and Passion for Books" />
  
        <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-brand-primary font-serif mb-3">Our Journey</h2>
            <p>
              BookHaven was born from a lifelong love affair with the written word. Founded in 2023, our little corner of the internet
              started as a dream to create a space where book lovers could not only find their next read but also feel part of a
              community that shares their passion. We believe that books are more than just paper and ink; they are windows to other
              worlds, catalysts for change, and companions on life's journey.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold text-brand-primary font-serif mb-3">Our Mission</h2>
            <p>
              Our mission is simple: to connect readers with stories that inspire, entertain, and enlighten. We strive to offer a
              diverse collection of books, from timeless classics to contemporary masterpieces, ensuring there's something for
              everyone. We are committed to fostering a love for reading and supporting authors who bring these incredible stories to life.
            </p>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold text-brand-primary font-serif mb-3">Meet the (Fictional) Founder</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-brand-light p-6 rounded-md">
              <img 
                src="https://picsum.photos/seed/founder/150/150" 
                alt="Founder - Jane Doe" 
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
              <div>
                <h3 className="text-xl font-semibold text-brand-dark">Jane Doe - Chief Bookworm</h3>
                <p className="text-sm text-brand-secondary mb-2">Lover of coffee, cats, and compelling narratives.</p>
                <p>
                  "Ever since I was a child, books have been my sanctuary. My goal with BookHaven is to share that magic with others.
                  There's a unique joy in discovering a book that speaks to your soul, and I want to help make those connections happen."
                </p>
              </div>
            </div>
          </section>
  
          <section>
            <h2 className="text-2xl font-semibold text-brand-primary font-serif mb-3">Why Choose BookHaven?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><span className="font-semibold text-brand-dark">Curated Selection:</span> Every book on our shelves is chosen with care.</li>
              <li><span className="font-semibold text-brand-dark">Community Focused:</span> We aim to build a welcoming space for all readers.</li>
              <li><span className="font-semibold text-brand-dark">Passion Driven:</span> We genuinely love books and want to share that joy.</li>
              <li><span className="font-semibold text-brand-dark">Support for Authors:</span> We champion the creators behind the stories.</li>
            </ul>
          </section>
  
          <p className="text-center pt-6">
            Thank you for visiting BookHaven. We hope you find your next favorite story here!
          </p>
        </div>
      </div>
    );
  };
  
  export default AboutPage;
      