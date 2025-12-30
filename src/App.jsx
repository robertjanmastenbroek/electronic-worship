import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Calendar, ArrowRight, Menu, X, Instagram, Youtube, Music, MessageCircle, ExternalLink, ChevronRight, Share2, Disc, ArrowLeft } from 'lucide-react';

/**
 * ELECTRONIC WORSHIP - WORLD CLASS LABEL SITE
 * * Design Philosophy: "Ancient Truth. Future Sound."
 */

// --- CONTENT CONFIGURATION (EDIT THIS SECTION) ---

const IMAGES = {
  // TODO: Drag your photo into the 'public' folder in VS Code.
  // Then change this line to match the filename (e.g. "/my-photo.jpg")
  founder: "Robert_Jan_Mastenbroek.png" 
};

// INSTRUCTIONS: 
// 1. Open your YouTube video in a browser.
// 2. Copy the text at the end of the URL after 'v=' (e.g. https://youtube.com/watch?v=dQw4w9WgXcQ -> copy "dQw4w9WgXcQ")
// 3. Paste it into the 'videoId' fields below.

const RELEASES = [
  {
    id: 6,
    // TODO: Paste your latest YouTube Video ID here
    videoId: "aacWPlNpuzY", 
    title: "He Is The Light",
    artist: "Electronic Worship",
    genre: "Melodic Techno",
  },
  {
    id: 5,
    // TODO: Paste your second Video ID here
    videoId: "kIByxJqbdVk", 
    title: "Not By Might",
    artist: "Electronic Worship",
    genre: "Psytrance",
  },
  {
    id: 4,
    // TODO: Paste your third Video ID here
    videoId: "e-VsRrTIJzQ", 
    title: "Rise Up, My Love",
    artist: "Electronic Worship",
    genre: "Melodic Techno",
  },
  {
    id: 3,
    // TODO: Paste your third Video ID here
    videoId: "wJ9WJqx3cl0", 
    title: "Strong Tower",
    artist: "Electronic Worship",
    genre: "Psytrance",
  },
  {
    id: 2,
    // TODO: Paste your third Video ID here
    videoId: "A5EO8TSXbNM", 
    title: "Better Is One Day",
    artist: "Electronic Worship",
    genre: "Melodic Techno",
  },
  {
    id: 1,
    // TODO: Paste your third Video ID here
    videoId: "6q7VZWXqur4", 
    title: "Good To Me",
    artist: "Electronic Worship",
    genre: "Melodic Techno",
  }
];

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', icon: Icon, href, ...props }) => {
  // FIXED: Removed 'text-white' from baseStyle to allow variants to control text color
  const baseStyle = "relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold tracking-widest transition-all duration-300 rounded-full group cursor-pointer";
  
  const variants = {
    // Added text-white specifically here
    primary: "text-white bg-transparent border border-white/20 hover:border-cyan-400/50 hover:bg-white/5 hover:scale-105",
    // Ensure text is black for the solid white button
    solid: "bg-white text-black hover:bg-cyan-50 hover:scale-105 border border-transparent",
    // Added text-white here
    glow: "text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(124,58,237,0.7)]"
  };

  const content = (
    <>
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
      <span className="relative flex items-center gap-2">
        {Icon && <Icon size={18} />}
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyle} ${variants[variant]} ${className}`} {...props} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-12 md:mb-20 text-center">
    <h3 className="text-cyan-400 text-sm font-bold tracking-[0.3em] uppercase mb-3 animate-pulse">
      {subtitle}
    </h3>
    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
      {title}
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-6 rounded-full" />
  </div>
);

const ReleaseCard = ({ title, artist, genre, videoId }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="group relative w-full aspect-square bg-neutral-900 rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500">
      {/* YouTube Thumbnail */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
        style={{ backgroundImage: `url(${thumbnailUrl})` }}
      >
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Play Icon Center (Appears on Hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
           <Play fill="white" className="ml-1" />
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase mb-2">{genre}</span>
        <h3 className="text-2xl font-bold text-white leading-tight mb-1 drop-shadow-lg">{title}</h3>
        <p className="text-white/80 text-sm font-medium mb-6 drop-shadow-md">{artist}</p>
        
        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <a href={videoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors text-sm font-bold tracking-wider">
             WATCH ON YOUTUBE
          </a>
        </div>
      </div>
    </div>
  );
};

const EventRow = ({ date, title, location, type, directionsHref }) => (
  <div className="group flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 py-8 px-4 hover:bg-white/5 transition-colors duration-300">
    <div className="flex items-start gap-6 md:gap-12 mb-4 md:mb-0">
      <div className="flex flex-col text-center min-w-[60px]">
        <span className="text-sm font-bold text-white/50 uppercase tracking-widest">{date.month}</span>
        <span className="text-3xl font-black text-white">{date.day}</span>
      </div>
      <div>
        <h4 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{title}</h4>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <span className="flex items-center gap-1"><Calendar size={14} /> {date.time}</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>{location}</span>
        </div>
      </div>
    </div>
    <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 pl-[84px] md:pl-0">
      <span className="hidden md:inline-block text-xs font-bold border border-white/20 px-3 py-1 rounded-full text-white/80 uppercase tracking-wider">
        {type}
      </span>
      <Button variant="primary" className="!px-6 !py-2 !text-xs" href={directionsHref}>Directions</Button>
    </div>
  </div>
);

// --- Pages Components ---

const LegalPage = ({ title, lastUpdated, children, onBack }) => (
  <div className="pt-32 pb-24 px-6 min-h-screen relative z-10">
    <div className="container mx-auto max-w-4xl">
      <button 
        onClick={onBack} 
        className="group flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-12 uppercase tracking-widest text-xs font-bold"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </button>

      <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">{title}</h1>
      <p className="text-white/40 mb-12 text-sm">Last Updated: {lastUpdated}</p>
      
      <div className="prose prose-invert prose-lg max-w-none text-white/70">
        {children}
      </div>
    </div>
  </div>
);

const PrivacyPolicyContent = () => (
  <div className="space-y-8">
    <section>
      <h3 className="text-2xl font-bold text-white mb-4">1. Introduction</h3>
      <p>Welcome to Electronic Worship. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
    </section>
    <section>
      <h3 className="text-2xl font-bold text-white mb-4">2. The Data We Collect</h3>
      <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
        <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
      </ul>
    </section>
    <section>
      <h3 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h3>
      <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
      <ul className="list-disc pl-5 mt-2 space-y-2">
        <li>To register you as a new subscriber or member of our community.</li>
        <li>To manage our relationship with you including notifying you about changes to our terms or privacy policy.</li>
        <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
      </ul>
    </section>
    <section>
      <h3 className="text-2xl font-bold text-white mb-4">4. Contact Details</h3>
      <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
      <p className="mt-2 text-cyan-400">mastenbroekrobertjan@gmail.com</p>
    </section>
  </div>
);

const TermsContent = () => (
  <div className="space-y-8">
    <section>
      <h3 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h3>
      <p>By accessing our website at electronicworship.music, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
    </section>
    <section>
      <h3 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h3>
      <p>The materials on Electronic Worship's website are provided on an 'as is' basis. All music, artwork, logos, and content displayed on this site are the intellectual property of Electronic Worship or its respective artists and are protected by applicable copyright and trademark law.</p>
    </section>
    <section>
      <h3 className="text-2xl font-bold text-white mb-4">3. Use License</h3>
      <p>Permission is granted to temporarily download one copy of the materials (information or software) on Electronic Worship's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
    </section>
    <section>
      <h3 className="text-2xl font-bold text-white mb-4">4. Limitations</h3>
      <p>In no event shall Electronic Worship or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Electronic Worship's website.</p>
    </section>
    <section>
      <h3 className="text-2xl font-bold text-white mb-4">5. Governing Law</h3>
      <p>These terms and conditions are governed by and construed in accordance with the laws of Spain and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
    </section>
  </div>
);

// --- Background Animation (Starfield/Sanctuary Particles) ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.5;
        this.life = Math.random() * 100;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        if (this.life < 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(150, 200, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 70; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw a very subtle gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(5, 5, 10, 0.2)');
      gradient.addColorStop(1, 'rgba(20, 10, 30, 0.4)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none" />;
};

// --- Main App Component ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState('home'); // 'home' | 'privacy' | 'terms'

  // Get the latest release (first item in array)
  const latestRelease = RELEASES[0];
  const latestReleaseImage = `https://img.youtube.com/vi/${latestRelease.videoId}/maxresdefault.jpg`;
  const latestReleaseLink = `https://www.youtube.com/watch?v=${latestRelease.videoId}`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll when changing pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const navLinks = [
    { name: 'Releases', href: '#music' },
    { name: 'Events', href: '#events' },
    { name: 'Mission', href: '#about' },
    { name: 'Community', href: '#connect' },
  ];

  const socialLinks = {
    spotify: "https://open.spotify.com/artist/2ATGX55P7Zon2GxkbEJGC5",
    youtube: "https://www.youtube.com/@electronic.worship?sub_confirmation=1",
    whatsapp: "https://whatsapp.com/channel/0029VbCDZFVHbFVAaOMBln38",
    instagram: "https://instagram.com/electronic.worship",
    tiktok: "https://tiktok.com/@electronic.worship",
    website: "https://electronicworship.music"
  };

  const handleNavClick = (href) => {
    setActivePage('home');
    setIsMenuOpen(false);
    // If we are already home, we might need to wait a tick for the sections to exist before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Events: compute next 4 Thursdays and Google Maps URL for the location
  const eventsLocation = "Tenerife Family Church, Tenerife";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventsLocation)}`;

  const getNextThursdays = (count = 4) => {
    const res = [];
    const today = new Date();
    const THURSDAY = 4; // JS: 0=Sun,4=Thu
    const delta = (THURSDAY - today.getDay() + 7) % 7; // 0 means today is Thursday
    const first = new Date(today);
    first.setDate(today.getDate() + delta);

    for (let i = 0; i < count; i++) {
      const d = new Date(first);
      d.setDate(first.getDate() + i * 7);
      res.push(d);
    }

    return res;
  };

  const eventDates = getNextThursdays(4);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden">
      <ParticleBackground />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => setActivePage('home')} className="relative z-50 flex flex-col leading-none group text-left">
            <span className="text-xl font-black tracking-tighter text-white uppercase group-hover:text-cyan-400 transition-colors">Electronic</span>
            <span className="text-xl font-black tracking-widest text-white/50 uppercase group-hover:text-white transition-colors">Worship</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.href)} 
                className="text-sm font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Button variant="primary" className="!px-6 !py-2 !text-xs" icon={Music} href={socialLinks.spotify}>
              Listen
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden relative z-50 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.href)} 
              className="text-3xl font-black uppercase tracking-tight hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="flex gap-6 mt-8">
             <a href={socialLinks.instagram} className="p-3 bg-white/10 rounded-full hover:bg-white/20"><Instagram /></a>
             <a href={socialLinks.youtube} className="p-3 bg-white/10 rounded-full hover:bg-white/20"><Youtube /></a>
             <a href={socialLinks.whatsapp} className="p-3 bg-white/10 rounded-full hover:bg-white/20"><MessageCircle /></a>
          </div>
        </div>
      </nav>

      {/* Main Content Switcher */}
      {activePage === 'home' ? (
        <>
          {/* Hero Section */}
          <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Decorative Gradients */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse delay-1000" />

            {/* Dynamic Background Image from Latest Release (Very subtle) */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl scale-110"
              style={{ backgroundImage: `url(${latestReleaseImage})` }}
            />

            <div className="container mx-auto px-6 relative z-10 text-center">
              
              {/* Dynamic Featured Release Badge */}
              <a href={latestReleaseLink} target="_blank" rel="noreferrer" className="inline-block mb-8 group cursor-pointer">
                <div className="flex items-center gap-4 p-2 pr-6 border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
                   <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                      <img src={latestReleaseImage} alt="Featured" className="w-full h-full object-cover" />
                   </div>
                   <div className="text-left">
                      <span className="block text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-400">New Release</span>
                      <span className="block text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">{latestRelease.title}</span>
                   </div>
                   <div className="ml-2 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Play size={12} fill="currentColor" />
                   </div>
                </div>
              </a>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-none mb-8">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">Ancient Truth.</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/30">Future Sound.</span>
              </h1>
              
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 mb-12 font-light leading-relaxed">
                Reclaiming the electronic soundscape for the Kingdom. From melodic techno to celestial trance—vibes for the spirit, rooted in Scripture.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <Button variant="glow" icon={Youtube} href={socialLinks.youtube}>
                  Join The Movement
                </Button>
                <Button variant="primary" icon={Disc} href={socialLinks.spotify}>
                  Full Discography
                </Button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
              <span className="text-[10px] uppercase tracking-widest">Scroll</span>
              <ArrowRight className="rotate-90" size={16} />
            </div>
          </header>

          {/* Latest Releases */}
          <section id="music" className="py-24 relative bg-black/40 backdrop-blur-sm">
            <div className="container mx-auto px-6">
              <SectionHeader title="The Sound" subtitle="Latest Drops" />
              
              {/* Dynamic Grid from RELEASES constant */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {RELEASES.map((release) => (
                  <ReleaseCard 
                    key={release.id}
                    title={release.title} 
                    artist={release.artist} 
                    genre={release.genre} 
                    videoId={release.videoId}
                  />
                ))}
              </div>

              <div className="mt-16 text-center">
                {/* The white button is now readable (Black text on White bg) */}
                <Button variant="solid" icon={Music} href={socialLinks.spotify}>
                  Stream Full Discography
                </Button>
              </div>
            </div>
          </section>

              {/* Events Section */}
          <section id="events" className="py-24 relative border-t border-white/5">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                <div>
                  <h3 className="text-cyan-400 text-sm font-bold tracking-[0.3em] uppercase mb-3">Gatherings</h3>
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                    Thursday<br />Night Sanctuary
                  </h2>
                </div>
                <p className="max-w-md text-white/60 text-sm leading-relaxed text-right md:text-left">
                  Join us every Thursday for an immersive night of electronic worship. High-energy praise meets deep, contemplative intercession.
                </p>
              </div>

              <div className="w-full">
                {eventDates.map((d) => (
                  <EventRow
                    key={d.toISOString()}
                    date={{ month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(), day: String(d.getDate()), time: '18:00' }}
                    title="Thursday Techno Temple"
                    location="Tenerife Family Church, Tenerife"
                    type="Worship Night"
                    directionsHref={mapsUrl}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* About / Founder */}
          <section id="about" className="py-24 relative bg-gradient-to-b from-transparent to-neutral-900/50">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                <div className="relative h-[600px] rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                   {/* Use the constant here */}
                   <img src={IMAGES.founder} alt="DJ Performing" className="w-full h-full object-cover" />
                   <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                      <p className="font-bold text-white text-lg">Robert-Jan Mastenbroek</p>
                      <p className="text-cyan-400 text-sm uppercase tracking-widest">Founder & Artist</p>
                   </div>
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                  Curating Vibes<br />For The Spirit
                </h2>
                <div className="space-y-6 text-lg text-white/70 font-light">
                  <p>
                    We are a global label dedicated to the intersection of electronic music and Biblical truth.
                  </p>
                  <p>
                    From the driving basslines of Melodic Techno to the ethereal textures of Organic Downtempo, we believe that sound is a carrier of presence. We combine high-energy production with the depth of the Sanctuary.
                  </p>
                  <p className="text-white font-medium border-l-2 border-cyan-500 pl-6 italic">
                    "To reclaim the electronic soundscape for the Kingdom. Uncompromised quality. Deeply rooted in Truth."
                  </p>
                  <div className="pt-8">
                    <Button variant="primary" href="https://robertjanmastenbroek.com">
                      Meet The Founder
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Connect / Newsletter CTA */}
          <section id="connect" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-blue-900/40 opacity-30" />
            <div className="container mx-auto px-6 relative z-10 text-center">
              <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
                Join The Tribe
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">
                Stay updated on new releases, secret event locations, and behind-the-scenes content.
                The future of worship is happening now.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="group flex items-center justify-between w-full md:w-80 bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366] hover:text-black text-[#25D366] p-6 rounded-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <MessageCircle size={24} />
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">Join Channel</p>
                      <p className="text-lg font-bold">WhatsApp</p>
                    </div>
                  </div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>

                <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className="group flex items-center justify-between w-full md:w-80 bg-[#FF0000]/10 border border-[#FF0000]/20 hover:bg-[#FF0000] hover:text-white text-[#FF0000] p-6 rounded-xl transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <Youtube size={24} />
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-80">Subscribe</p>
                      <p className="text-lg font-bold">YouTube</p>
                    </div>
                  </div>
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>
          </section>
        </>
      ) : activePage === 'privacy' ? (
        <LegalPage title="Privacy Policy" lastUpdated="December 2025" onBack={() => setActivePage('home')}>
          <PrivacyPolicyContent />
        </LegalPage>
      ) : (
        <LegalPage title="Terms of Service" lastUpdated="December 2025" onBack={() => setActivePage('home')}>
          <TermsContent />
        </LegalPage>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <button onClick={() => setActivePage('home')} className="inline-block mb-6 text-left">
                <span className="text-2xl font-black tracking-tighter text-white uppercase">Electronic</span>
                <span className="text-2xl font-black tracking-widest text-white/50 uppercase ml-2">Worship</span>
              </button>
              <p className="text-white/50 max-w-sm mb-8">
                Ancient Truth. Future Sound.
                <br />
                Reclaiming the frequency for the Kingdom.
              </p>
              <div className="flex gap-4">
                <a href={socialLinks.instagram} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                  <Instagram size={18} />
                </a>
                <a href={socialLinks.tiktok} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                  <span className="font-bold text-xs">Tk</span>
                </a>
                <a href={socialLinks.youtube} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                  <Youtube size={18} />
                </a>
                <a href={socialLinks.spotify} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                  <Music size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Explore</h4>
              <ul className="space-y-4 text-white/60">
                <li><button onClick={() => handleNavClick('#music')} className="hover:text-cyan-400 transition-colors">Discography</button></li>
                <li><button onClick={() => handleNavClick('#events')} className="hover:text-cyan-400 transition-colors">Events</button></li>
                <li><button onClick={() => handleNavClick('#about')} className="hover:text-cyan-400 transition-colors">Mission</button></li>
                <li><a href="https://robertjanmastenbroek.com" className="hover:text-cyan-400 transition-colors">Founder</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Contact</h4>
              <ul className="space-y-4 text-white/60">
                <li>
                  <a href="mailto:mastenbroekrobertjan@gmail.com?subject=Management%20Inquiry" className="hover:text-cyan-400 transition-colors">
                    Management
                  </a>
                </li>
                <li>
                  <a href="mailto:mastenbroekrobertjan@gmail.com?subject=Demo%20Submission%20-%20[Artist%20Name]" className="hover:text-cyan-400 transition-colors">
                    Demo Drop
                  </a>
                </li>
                <li>
                  <a href="mailto:mastenbroekrobertjan@gmail.com?subject=Booking%20Request%20-%20Electronic%20Worship" className="hover:text-cyan-400 transition-colors">
                    Booking
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 uppercase tracking-widest">
            <p>&copy; 2025 Electronic Worship. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <button onClick={() => setActivePage('privacy')} className="hover:text-white transition-colors">Privacy</button>
              <button onClick={() => setActivePage('terms')} className="hover:text-white transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}