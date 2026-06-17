"use client";
import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

const aboutConfig = {
  sections: [
    {
      tag: "Heritage",
      heading: "A Legacy Woven in Time",
      paragraphs: [
        "The story of Kashmir Rugs began in 1985, when our founder embarked on a journey through the ancient cities of Iran, seeking out master weavers whose families had practiced their craft for generations.",
        "From the royal workshops of Isfahan to the tribal villages of the Zagros Mountains, we built relationships with artisans who maintain techniques passed down through millennia. Today, we continue this mission of preservation and celebration.",
      ],
      quote: "",
      attribution: "",
      image: "/images/about-heritage.jpg",
      backgroundColor: "#2c2420",
      textColor: "#ffffff",
    },
    {
      tag: "Philosophy",
      heading: "Quality Without Compromise",
      paragraphs: [],
      quote: "A genuine Persian rug is not merely a floor covering—it is a testament to human patience, artistry, and the enduring beauty of tradition.",
      attribution: "-- Amir Kashani, Founder",
      image: "/images/about-showroom.jpg",
      backgroundColor: "#f7f3ef",
      textColor: "#2c2420",
    },
  ],
};

const contactConfig = {
  heading: "Begin Your Journey",
  description: "Whether you're seeking a specific piece, need design consultation, or simply wish to learn more about our collection, we invite you to connect with us.",
  locationLabel: "Showroom",
  location: "745 Fifth Avenue, New York, NY 10151",
  emailLabel: "Email",
  email: "concierge@kashmirrugs.com",
  phoneLabel: "Phone",
  phone: "+1 (212) 555-0187",
  formFields: {
    nameLabel: "Name",
    namePlaceholder: "Your full name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your vision...",
  },
  submitText: "Send Message",
  submittingText: "Sending...",
  submittedText: "Sent",
  successMessage: "Thank you for reaching out. Our concierge will respond within 24 hours.",
  backgroundImage: "/images/contact-bg.jpg",
};

const AboutSection = ({ id, image, contentBg, textColor, reverse, children }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`min-h-screen flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      {/* Image Side */}
      <div
        className="w-full lg:w-3/5 h-[50vh] lg:h-auto min-h-[400px] bg-cover bg-top bg-fixed"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Content Side */}
      <div
        className="w-full lg:w-2/5 flex items-center justify-center p-8 md:p-12 lg:p-16"
        style={{ backgroundColor: contentBg, color: textColor }}
      >
        <div
          className={`max-w-md transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const BeginJourney = () => {
  const contactRef = useRef(null);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsContactVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="relative">
      {/* About Sections */}
      <section id="about" className="relative">
        {aboutConfig.sections.map((section, index) => (
          <AboutSection
            key={index}
            id={`about-${index}`}
            image={section.image}
            contentBg={section.backgroundColor}
            textColor={section.textColor}
            reverse={index % 2 !== 0}
          >
            <span className="inline-block mb-4 text-sm tracking-[0.2em] font-medium uppercase opacity-70">
              {section.tag}
            </span>
            <h2 className="font-serif text-3xl md:text-[40px] leading-tight mb-6">
              {section.heading}
            </h2>
            {section.quote ? (
              <>
                <p className="text-lg font-light leading-relaxed opacity-90 mb-6">
                  &ldquo;{section.quote}&rdquo;
                </p>
                {section.attribution && (
                  <p className="text-base font-light opacity-70">
                    {section.attribution}
                  </p>
                )}
              </>
            ) : (
              section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-lg font-light leading-relaxed opacity-90 mb-6">
                  {paragraph}
                </p>
              ))
            )}
          </AboutSection>
        ))}
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactConfig.backgroundImage})` }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 py-24">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
            {/* Left Side - Info */}
            <div
              className={`lg:w-1/2 text-white transition-all duration-700 ${
                isContactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="font-serif text-5xl md:text-6xl lg:text-[80px] mb-8 leading-none">
                {contactConfig.heading}
              </h2>

              <p className="text-xl font-light leading-relaxed opacity-90 mb-12 max-w-md">
                {contactConfig.description}
              </p>

              {/* Contact Info */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <MapPin size={20} strokeWidth={1.5} className="text-[#8b6d4b]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider opacity-60 mb-1">{contactConfig.locationLabel}</span>
                    <span className="font-light">{contactConfig.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail size={20} strokeWidth={1.5} className="text-[#8b6d4b]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider opacity-60 mb-1">{contactConfig.emailLabel}</span>
                    <a href={`mailto:${contactConfig.email}`} className="font-light hover:text-[#8b6d4b] transition-colors">
                      {contactConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone size={20} strokeWidth={1.5} className="text-[#8b6d4b]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider opacity-60 mb-1">{contactConfig.phoneLabel}</span>
                    <a href={`tel:${contactConfig.phone}`} className="font-light hover:text-[#8b6d4b] transition-colors">
                      {contactConfig.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div
              className={`lg:w-1/2 max-w-md w-full transition-all duration-700 ${
                isContactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    placeholder={contactConfig.formFields.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/50 py-4 focus:outline-none focus:border-[#8b6d4b] transition-colors font-light text-lg"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    placeholder={contactConfig.formFields.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/50 py-4 focus:outline-none focus:border-[#8b6d4b] transition-colors font-light text-lg"
                  />
                </div>

                <div>
                  <textarea
                    placeholder={contactConfig.formFields.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/50 py-4 focus:outline-none focus:border-[#8b6d4b] transition-colors font-light text-lg resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-[#8b6d4b] text-white font-light tracking-widest text-sm btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">{contactConfig.submittingText}</span>
                  ) : isSubmitted ? (
                    <span>{contactConfig.submittedText}</span>
                  ) : (
                    <>
                      <span>{contactConfig.submitText}</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>

              {isSubmitted && (
                <p className="mt-6 text-green-400 text-center font-light">
                  {contactConfig.successMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeginJourney;
