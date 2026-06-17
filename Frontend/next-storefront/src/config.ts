// ─── Site ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Kashmir Rugs | Handcrafted Persian & Oriental Carpets",
  description: "Discover our curated collection of authentic hand-knotted Persian and Oriental rugs. Each piece is a masterpiece of craftsmanship, woven with tradition and artistry spanning over 2,500 years.",
  language: "en",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  cartEmptyText: string;
  cartCheckoutText: string;
  continueShoppingText: string;
  menuBackgroundImage: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "Kashmir Rugs",
  menuLinks: [
    { label: "Home", href: "#" },
    { label: "Collection", href: "#products" },
    { label: "Our Story", href: "#about" },
    { label: "Journal", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
  searchPlaceholder: "Search rugs by style, origin...",
  cartEmptyText: "Your cart is empty",
  cartCheckoutText: "Proceed to Checkout",
  continueShoppingText: "Continue Shopping",
  menuBackgroundImage: "/images/menu-bg.jpg",
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  tagline: "Handcrafted Since 1985",
  title: "Woven with History,\nCrafted for Eternity",
  ctaPrimaryText: "Explore Collection",
  ctaPrimaryTarget: "#products",
  ctaSecondaryText: "Our Story",
  ctaSecondaryTarget: "#about",
  backgroundImage: "/images/hero-bg.jpg",
};

// ─── SubHero ─────────────────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const subHeroConfig: SubHeroConfig = {
  tag: "Our Philosophy",
  heading: "Where Art Meets Tradition",
  bodyParagraphs: [
    "For over four decades, Kashmir Rugs has been dedicated to preserving the ancient art of Persian carpet weaving. Each rug in our collection tells a story of heritage, craftsmanship, and uncompromising quality.",
    "We work directly with master weavers across Iran, from the historic workshops of Isfahan to the tribal looms of Qashqai. Our commitment to authenticity ensures every piece is hand-knotted using time-honored techniques passed down through generations.",
  ],
  linkText: "Discover Our Heritage",
  linkTarget: "#about",
  image1: "/images/subhero-1.jpg",
  image2: "/images/subhero-2.jpg",
  stats: [
    { value: 2500, suffix: "+", label: "Years of Tradition" },
    { value: 40, suffix: "+", label: "Years in Business" },
    { value: 5000, suffix: "+", label: "Rugs Curated" },
    { value: 100, suffix: "%", label: "Hand-Knotted" },
  ],
};

// ─── Video Section ───────────────────────────────────────────────────────────

export interface VideoSectionConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const videoSectionConfig: VideoSectionConfig = {
  tag: "The Craft",
  heading: "Every Knot Tells a Story",
  bodyParagraphs: [
    "The art of Persian rug weaving is a labor of love that can take months or even years to complete. Master weavers tie each knot by hand, creating intricate patterns that have remained unchanged for millennia.",
    "From selecting the finest wool and silk to dyeing with natural pigments derived from roots, flowers, and insects, every step honors traditions established during the Safavid Golden Age. The result is not merely a carpet, but a timeless work of art.",
  ],
  ctaText: "Meet Our Artisans",
  ctaTarget: "#about",
  backgroundImage: "/images/video-section-bg.jpg",
};

// ─── Products ────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface ProductsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  products: Product[];
}

export const productsConfig: ProductsConfig = {
  tag: "Our Collection",
  heading: "Masterpieces for Your Home",
  description: "Explore our curated selection of authentic Persian and Oriental rugs. From the geometric boldness of Heriz to the floral elegance of Kashan, each piece represents the pinnacle of weaving artistry.",
  viewAllText: "View All Rugs",
  addToCartText: "Add to Cart",
  addedToCartText: "Added to Cart",
  categories: ["All", "Classic", "Tribal", "Silk", "Vintage"],
  products: [
    { id: 1, name: "Kashan Royal Medallion", price: 8500, category: "Classic", image: "/images/rug-kashan.jpg" },
    { id: 2, name: "Tabriz Garden of Paradise", price: 12000, category: "Silk", image: "/images/rug-tabriz.jpg" },
    { id: 3, name: "Heriz Imperial Medallion", price: 6800, category: "Tribal", image: "/images/rug-heriz.jpg" },
    { id: 4, name: "Nain Celestial Blue", price: 15000, category: "Silk", image: "/images/rug-nain.jpg" },
    { id: 5, name: "Gabbeh Earth Tales", price: 4200, category: "Tribal", image: "/images/rug-gabbeh.jpg" },
    { id: 6, name: "Isfahan Shah Abbas", price: 22000, category: "Classic", image: "/images/rug-isfahan.jpg" },
    { id: 7, name: "Kerman Rose Garden", price: 7800, category: "Classic", image: "/images/rug-kerman.jpg" },
    { id: 8, name: "Qum Silk Prayer", price: 18500, category: "Silk", image: "/images/rug-qum.jpg" },
    { id: 9, name: "Mashad Grand Medallion", price: 9500, category: "Vintage", image: "/images/rug-mashad.jpg" },
  ],
};

// ─── Features ────────────────────────────────────────────────────────────────

export interface Feature {
  icon: "Truck" | "ShieldCheck" | "Leaf" | "Heart";
  title: string;
  description: string;
}

export interface FeaturesConfig {
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  features: [
    {
      icon: "Truck",
      title: "Worldwide Delivery",
      description: "Complimentary insured shipping to over 100 countries. Each rug is carefully packaged and delivered to your doorstep.",
    },
    {
      icon: "ShieldCheck",
      title: "Lifetime Authenticity",
      description: "Every rug comes with a certificate of authenticity and a lifetime guarantee of genuine hand-knotted craftsmanship.",
    },
    {
      icon: "Leaf",
      title: "Natural Materials",
      description: "We use only the finest natural wool, silk, and organic dyes. No synthetic materials or chemical processes.",
    },
    {
      icon: "Heart",
      title: "Fair Trade Promise",
      description: "We work directly with weaving communities, ensuring fair wages and preserving traditional livelihoods.",
    },
  ],
};

// ─── Blog ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface BlogConfig {
  tag: string;
  heading: string;
  viewAllText: string;
  readMoreText: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  tag: "Journal",
  heading: "Stories from the Loom",
  viewAllText: "View All Articles",
  readMoreText: "Read More",
  posts: [
    {
      id: 1,
      title: "How to Style Persian Rugs in Modern Interiors",
      date: "March 28, 2026",
      image: "/images/blog-interior.jpg",
      excerpt: "Discover expert tips on integrating timeless Persian carpets into contemporary spaces, from minimalist lofts to eclectic homes.",
    },
    {
      id: 2,
      title: "The Ancient Art of Natural Dyes",
      date: "March 15, 2026",
      image: "/images/blog-dyes.jpg",
      excerpt: "Journey into the world of traditional rug dyes, from madder root reds to indigo blues, and learn why natural colors age beautifully.",
    },
    {
      id: 3,
      title: "Caring for Your Investment: A Complete Guide",
      date: "February 28, 2026",
      image: "/images/blog-care.jpg",
      excerpt: "Learn the essential techniques for maintaining your Persian rug's beauty and value for generations to come.",
    },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const faqConfig: FaqConfig = {
  tag: "Support",
  heading: "Frequently Asked Questions",
  ctaText: "Still have questions? Contact us",
  ctaTarget: "#contact",
  faqs: [
    {
      id: 1,
      question: "How do I know if a rug is genuinely hand-knotted?",
      answer: "Authentic hand-knotted rugs have visible individual knots on the back, mirroring the front pattern. The fringe is an extension of the warp threads, not sewn on. Each rug also comes with our certificate of authenticity and detailed provenance documentation.",
    },
    {
      id: 2,
      question: "What is knot density and why does it matter?",
      answer: "Knot density, measured in KPSI (knots per square inch), indicates the fineness and detail of a rug. Higher density (200+ KPSI) allows for more intricate designs and typically indicates superior quality. Our collection ranges from 100 to 1000+ KPSI.",
    },
    {
      id: 3,
      question: "How long does it take to weave a Persian rug?",
      answer: "Depending on size and complexity, a hand-knotted Persian rug can take anywhere from 3 months to 3 years to complete. A master weaver ties approximately 10,000 knots per day. Our larger museum-quality pieces represent thousands of hours of dedicated craftsmanship.",
    },
    {
      id: 4,
      question: "Do you offer a satisfaction guarantee?",
      answer: "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you may return the rug in its original condition for a full refund or exchange. We also provide a lifetime authenticity guarantee.",
    },
    {
      id: 5,
      question: "How should I care for my Persian rug?",
      answer: "Vacuum regularly without the beater bar, rotate every 6 months for even wear, and avoid direct sunlight. Professional cleaning is recommended every 3-5 years. We provide a complete care guide with every purchase.",
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export const aboutConfig: AboutConfig = {
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

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
}

export const contactConfig: ContactConfig = {
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

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "Kashmir Rugs",
  brandDescription: "Curators of the world's finest hand-knotted Persian and Oriental rugs since 1985. Each piece a timeless work of art.",
  newsletterHeading: "Join Our Circle",
  newsletterDescription: "Receive exclusive access to new acquisitions, stories from the loom, and invitations to private viewings.",
  newsletterPlaceholder: "Enter your email",
  newsletterButtonText: "Subscribe",
  newsletterSuccessText: "Welcome to the Kashmir Rugs family.",
  linkGroups: [
    {
      title: "Collection",
      links: [
        { label: "Classic Rugs", href: "#products" },
        { label: "Tribal Rugs", href: "#products" },
        { label: "Silk Collection", href: "#products" },
        { label: "Vintage Pieces", href: "#products" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Our Story", href: "#about" },
        { label: "Artisans", href: "#about" },
        { label: "Journal", href: "#blog" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "#contact" },
        { label: "Rug Care Guide", href: "#" },
        { label: "Shipping & Returns", href: "#" },
        { label: "FAQs", href: "#faq" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
  copyrightText: "© 2026 Kashmir Rugs. All rights reserved.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
};
