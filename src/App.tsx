/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  MapPin, 
  Mail, 
  MessageSquare, 
  ArrowUp, 
  Menu, 
  X,
  Trophy,
  Award,
  Users,
  Briefcase
} from 'lucide-react';

// --- Components ---

const SectionHeading = ({ children, centered = false }: { children: React.ReactNode, centered?: boolean }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={`text-3xl md:text-4xl font-serif text-charcoal mb-12 ${centered ? 'text-center' : ''}`}
  >
    {children}
  </motion.h2>
);

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'outline', 
  className?: string,
  onClick?: () => void 
}) => {
  const baseStyles = "px-8 py-3 text-sm tracking-widest uppercase transition-all duration-300 relative overflow-hidden group border-4 border-transparent active:scale-95";
  const variants = {
    primary: "bg-terracotta text-white hover:bg-white hover:text-terracotta hover:border-terracotta",
    outline: "border-terracotta text-terracotta hover:bg-terracotta hover:text-white"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// --- App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<{ url: string, caption: string } | null>(null);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [galleryFilter, setGalleryFilter] = useState('All');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Governance', href: '#governance' },
    { name: 'Sports', href: '#sports' },
    { name: 'Legacy', href: '#legacy' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const timelineEvents = [
    { 
      year: '1980s–1990s', 
      title: 'Early Career', 
      desc: 'Civil service entry, rising through Katsina State administrative ranks.' 
    },
    { 
      year: '2012', 
      title: 'Commissioner for Youth and Sports', 
      desc: "Appointed by Governor Ibrahim Shema. Oversaw Katsina Stadium development and the Shema Cup tournament." 
    },
    { 
      year: '2013', 
      title: 'Commissioner for Health', 
      desc: "Re-deployed to lead the State Ministry of Health during Governor Shema's cabinet reshuffle, focusing on healthcare delivery and infrastructure." 
    },
    { 
      year: '~2020', 
      title: 'Political Transition', 
      desc: 'Demonstrated political adaptability and continued relevance in the evolving landscape of Katsina State.' 
    },
    { 
      year: 'July 2023', 
      title: 'Re-appointed Permanent Secretary', 
      desc: 'Among the select group of 36 permanent secretaries appointed by Governor Dikko Radda.' 
    },
    { 
      year: '2024–Present', 
      title: 'Governance & Institution Building', 
      desc: 'Leading initiatives to strengthen Katsina State government institutions and official state events.' 
    },
  ];

  const sportsAchievements = [
    {
      title: "Katsina Emir's Cup",
      subtitle: "Official Announcement",
      description: "Leading the Katsina State Fives Association in organizing the prestigious Emir's Cup, a key tournament for traditional sports in Northern Nigeria.",
      link: "https://www.facebook.com/reel/2351250355361629/",
      isVideo: true
    },
    {
      title: "National Unity Cup Champions",
      subtitle: "First edition, Sokoto 2025",
      description: "Led Katsina State to victory in the inaugural tournament, cementing the state's dominance in traditional fives.",
      isVideo: false
    },
    {
      title: "Youth Development",
      subtitle: "Shema Cup Legacy",
      description: "Pioneered transformative youth sports tournaments as Commissioner, creating pathways for local athletes.",
      isVideo: false
    }
  ];

  const galleryImages = [
    { url: 'https://lh3.googleusercontent.com/d/1P4-bcewXbvBe6iQo9cIIFxFBP5iivmVs', caption: 'Portrait of Talent and Dedication', category: 'Events' },
    { url: 'https://lh3.googleusercontent.com/d/16P2gUYwV2Nx-VRTVSzpYLvjsVFmFYnyb', caption: 'Presenting the National Unity Cup, Sokoto 2025', category: 'Events' },
    { url: 'https://lh3.googleusercontent.com/d/1pCmefoCbTPM8Ki_Ni77IGGXjEMl4zSx7', caption: 'Strategic Governance Meeting', category: 'Governance' },
    { url: 'https://lh3.googleusercontent.com/d/1tiJKvAyLfKhSDnEm2tu9wMP2hYC9_94B', caption: 'Official Delegation and State Affairs', category: 'Governance' },
    { url: 'https://lh3.googleusercontent.com/d/1oARLFsoDQcij5RsQE9Glrp1ZjSdnpWGP', caption: 'Youth and Sports Development Dialogue', category: 'Events' },
    { url: 'https://lh3.googleusercontent.com/d/1qz-4xd-Od9j8x8_G0IhmBupwj-K4r-30', caption: 'Traditional Heritage Celebration', category: 'Events' },
    { url: 'https://lh3.googleusercontent.com/d/1lM4_vo8nAmQHgOz6O_A1o3cZ_V8ESExE', caption: 'Official Administrative Portfolio', category: 'Governance' },
    { url: 'https://lh3.googleusercontent.com/d/1G2xuOtYeX8KjiTXZVAugCjurRN0VDcZn', caption: 'Leadership and Community Engagement', category: 'Events' },
  ];

  const filteredImages = galleryFilter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === galleryFilter);

  const galleryCategories = ['All', 'Events', 'Speeches', 'Governance', 'Publications'];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen relative islamic-watermark selection:bg-terracotta selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-parchment/80 backdrop-blur-sm border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="font-serif text-xl tracking-tight text-charcoal">
            TALBA<span className="text-terracotta">.</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-xs uppercase tracking-widest text-stone-text hover:text-terracotta transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-charcoal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-parchment pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-serif text-charcoal text-center"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="w-16 h-[2px] bg-gold-accent mx-auto mb-8" />
          <h1 className="text-4xl md:text-6xl font-serif text-charcoal mb-6 uppercase tracking-tight">
            HON. MANNIR IBRAHIM TALBA, <span className="text-terracotta">mni</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-text mb-8 max-w-2xl mx-auto font-medium">
            Permanent Secretary | Former Commissioner | Sports Administrator
          </p>
          <p className="text-stone-text mb-12 italic">
            "Dedicated to public service, youth development, and the preservation of Northern Nigerian heritage."
          </p>
          <Button variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore My Journey
          </Button>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
          <ChevronDown className="text-terracotta w-8 h-8" />
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="section-padding bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading>A Life of Service</SectionHeading>
              <div className="space-y-6 text-stone-text leading-relaxed">
                <p>
                  Alhaji Mannir Ibrahim Talba is a seasoned public servant from Mashi Local Government, Katsina State, with decades of experience in governance and administration. A former Commissioner for Youth and Sports, and later Commissioner for Health under Governor Ibrahim Shema, he was re-appointed as Permanent Secretary by Governor Dikko Radda in 2023 — a testament to his enduring competence and adaptability across political eras.
                </p>
                <p>
                  A proud half-brother of the late Ambassador Zakari Y. Ibrahim, Talban Katsina (1944–2024), Mannir carries forward a family legacy of distinguished public service. He holds the prestigious <span className="text-terracotta font-semibold">mni</span> (Member of the National Institute) designation from the National Institute for Policy and Strategic Studies, Kuru.
                </p>
                <p>
                  Beyond the corridors of power, he serves as Chairman of the Katsina State Fives Association, championing traditional sport and youth development across Northern Nigeria.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 border-t border-charcoal/5">
                {[
                  { value: '30+', label: 'Years of Service' },
                  { value: 'mni', label: 'Awardee' },
                  { value: 'Fives', label: 'Association Chair' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center md:text-left">
                    <p className="text-2xl font-serif text-terracotta">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-stone-text">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 border border-terracotta/20 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
              <img 
                src="https://lh3.googleusercontent.com/d/1XZOw-1eD_PIqtHG7XWZtVVv-wFhRN_MX" 
                alt="Hon. Mannir Ibrahim Talba"
                className="relative w-full aspect-[3/4] object-cover shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Governance Timeline */}
      <section id="governance" className="section-padding bg-parchment/30">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading centered>Journey in Governance</SectionHeading>
          
          <div className="relative mt-20">
            {/* Timeline Line */}
            <div className="absolute left-[50%] -translate-x-[50%] h-full w-[1px] bg-terracotta/20 hidden md:block" />
            <div className="absolute left-6 h-full w-[1px] bg-terracotta/20 md:hidden" />

            <div className="space-y-24">
              {timelineEvents.map((event, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center group`}
                >
                  {/* Circle Marker */}
                  <div className="absolute md:left-[50%] md:-translate-x-[50%] left-6 -translate-x-[50%] w-3 h-3 rounded-full bg-parchment border border-terracotta/40 z-10 transition-colors duration-500 group-hover:border-terracotta group-hover:bg-terracotta/10" />

                  <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} pt-2 md:pt-0 pl-12 md:pl-0 rounded-sm transition-colors duration-700 group-hover:bg-charcoal/[0.015]`}>
                    <p className="text-terracotta font-bold mb-2 transition-opacity duration-300 group-hover:opacity-100 opacity-80">{event.year}</p>
                    <h3 className="text-xl font-serif text-charcoal mb-3">{event.title}</h3>
                    <p className="text-stone-text text-sm leading-relaxed transition-colors duration-300 group-hover:text-charcoal/80">{event.desc}</p>
                  </div>
                  <div className="hidden md:block w-[10%]" />
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sports Leadership */}
      <section id="sports" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 items-end mb-16">
            <div className="md:col-span-2">
              <SectionHeading>Championing Fives & Youth</SectionHeading>
              <p className="text-stone-text leading-relaxed max-w-2xl">
                As Chairman of the Katsina State Fives Association, Alhaji Talba has transformed the state's approach to traditional sports. Under his leadership, Katsina has dominated national interstate championships and claimed victory at the inaugural Fives Open National Unity Cup in Sokoto, January 2025.
              </p>
            </div>
            <div className="flex justify-end">
              <Trophy className="text-terracotta/10 w-32 h-32" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sportsAchievements.map((item, idx) => (
              <motion.div 
                key={idx}
                className="bg-white border-l-4 border-terracotta p-8 shadow-md transition-colors duration-300 hover:bg-parchment/30"
              >
                <div className="mb-6 flex justify-between items-start">
                  {idx === 0 ? <Award className="text-terracotta" /> : idx === 1 ? <Users className="text-terracotta" /> : <Briefcase className="text-terracotta" />}
                  {item.isVideo && (
                    <span className="text-[9px] bg-terracotta text-white px-2 py-1 rounded-full uppercase tracking-tighter">Video</span>
                  )}
                </div>
                <h3 className="text-xl font-serif text-charcoal mb-2">{item.title}</h3>
                <p className="text-[10px] uppercase tracking-widest text-stone-text mb-4 font-semibold">{item.subtitle}</p>
                <p className="text-stone-text text-sm leading-relaxed mb-6">{item.description}</p>
                
                {item.isVideo && item.link && (
                  <button 
                    onClick={() => setActiveVideo(item.link || null)}
                    className="inline-flex items-center text-[11px] uppercase tracking-widest text-terracotta font-bold hover:underline cursor-pointer"
                  >
                    Watch Announcement
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section id="legacy" className="section-padding bg-forest text-parchment relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none islamic-watermark grayscale invert" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <SectionHeading centered><span className="text-parchment">Continuing a Legacy</span></SectionHeading>
          <div className="space-y-8 text-parchment/80 leading-loose">
            <p className="text-lg italic font-serif">
              "Mannir Ibrahim Talba is the half-brother of the late Ambassador Zakari Y. Ibrahim, who held the revered traditional title of Talban Katsina until his passing in 2024 at the age of 81."
            </p>
            <p>
              Ambassador Zakari served Nigeria with distinction as Ambassador to Namibia and left an indelible mark on Katsina's political and cultural landscape. This legacy of service — from diplomacy to traditional leadership to grassroots administration — continues to inspire Mannir's commitment to Katsina State and Nigeria.
            </p>
          </div>
          
          <div className="mt-16 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-terracotta p-1 scale-110 mb-8">
              <img 
                src="https://lh3.googleusercontent.com/d/1Wga6iwvSTP-aPpzSk1COYm8UTP-uBq4S" 
                alt="Ambassador Zakari Y. Ibrahim"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="text-xs uppercase tracking-widest opacity-60">Ambassador Zakari Y. Ibrahim (1944–2024)</p>
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      <section id="gallery" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading centered>Media Gallery</SectionHeading>
          
          {/* Gallery Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-6 py-2 text-[10px] uppercase tracking-widest border transition-all duration-300 ${
                  galleryFilter === cat 
                    ? 'bg-terracotta text-white border-terracotta' 
                    : 'text-stone-text border-charcoal/10 hover:border-terracotta/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, idx) => (
                <motion.div 
                  key={img.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="cursor-pointer group"
                  onClick={() => setActiveImage(img as any)}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-parchment mb-4 shadow-sm relative">
                    <img 
                      src={img.url} 
                      alt={img.caption}
                      className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-[1.05]"
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] bg-white/90 text-charcoal px-2 py-1 uppercase tracking-tighter">
                        {img.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-text uppercase tracking-wider">{img.caption}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-parchment/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionHeading centered>Get In Touch</SectionHeading>
          <p className="text-stone-text mb-12">
            For official inquiries, speaking engagements, and matters of public service.
          </p>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-text font-bold">Full Name</label>
              <input 
                type="text" 
                className="w-full bg-white border border-charcoal/15 px-4 py-3 rounded-sm focus:outline-none focus:border-terracotta transition-colors"
                placeholder="Ex. Aminu Bello"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-text font-bold">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-white border border-charcoal/15 px-4 py-3 rounded-sm focus:outline-none focus:border-terracotta transition-colors"
                placeholder="Ex. aminu@example.com"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-text font-bold">Subject</label>
              <select className="w-full bg-white border border-charcoal/15 px-4 py-3 rounded-sm focus:outline-none focus:border-terracotta transition-colors appearance-none">
                <option>Official Inquiry</option>
                <option>Speaking Request</option>
                <option>Sports Matter</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-stone-text font-bold">Your Message</label>
              <textarea 
                rows={5}
                className="w-full bg-white border border-charcoal/15 px-4 py-3 rounded-sm focus:outline-none focus:border-terracotta transition-colors resize-none"
                placeholder="How can we assist you?"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <Button variant="primary" className="w-full">Send Message</Button>
            </div>
          </form>

          <div className="mt-20 grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <MapPin className="text-terracotta mb-4" />
              <p className="text-[11px] uppercase tracking-widest text-stone-text font-bold mb-2">Location</p>
              <p className="text-sm text-charcoal">Katsina State Secretariat, Katsina</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="text-terracotta mb-4" />
              <p className="text-[11px] uppercase tracking-widest text-stone-text font-bold mb-2">Email</p>
              <p className="text-sm text-charcoal">contact@mannirtalba.com</p>
            </div>
            <div className="flex flex-col items-center">
              <MessageSquare className="text-terracotta mb-4" />
              <p className="text-[11px] uppercase tracking-widest text-stone-text font-bold mb-2">Government</p>
              <p className="text-sm text-charcoal">katsinastate.gov.ng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-charcoal text-parchment/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="w-12 h-[1px] bg-terracotta mb-8" />
          <p className="text-xs uppercase tracking-[0.2em] mb-4">
            © 2026 Hon. Mannir Ibrahim Talba, mni. All rights reserved.
          </p>
          <p className="text-[10px] italic max-w-xl">
             Inna lillahi wa inna ilayhi raji'un — In loving memory of Ambassador Zakari Y. Ibrahim, Talban Katsina (1944–2024)
          </p>
          
          <button 
            onClick={scrollToTop}
            className="mt-12 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-terracotta hover:border-terracotta transition-all text-white"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-6"
            onClick={() => setActiveImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={activeImage.url} className="w-full h-auto shadow-2xl border border-white/10" alt="Full size" />
              <div className="mt-6 text-center">
                <p className="text-parchment text-lg font-serif">{activeImage.caption}</p>
                <p className="text-parchment/40 text-[10px] uppercase tracking-widest mt-2">Hon. Mannir Ibrahim Talba, mni — In Service</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-charcoal/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-[450px] aspect-[9/16] bg-black shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-parchment hover:text-terracotta transition-colors"
              >
                <X size={32} />
              </button>
              <iframe 
                src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(activeVideo)}&show_text=0&t=0`} 
                className="w-full h-full"
                style={{ border: 'none', overflow: 'hidden' }} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
