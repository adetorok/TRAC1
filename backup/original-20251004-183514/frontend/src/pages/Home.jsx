import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import RoleSelectionModal from '../components/RoleSelectionModal';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('sponsor');
  const [successEmail, setSuccessEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const beforeData = {
    labels: ['Unqualified Leads', 'Contacted but Lost', 'Enrolled'],
    datasets: [{
      label: 'Lead Outcomes',
      data: [85, 13, 2],
      backgroundColor: ['#fecaca', '#fca5a5', '#dc2626'],
      borderColor: '#f8fafc',
      borderWidth: 4,
    }]
  };

  const afterData = {
    labels: ['Unqualified Leads', 'Contacted but Lost', 'Enrolled'],
    datasets: [{
      label: 'Lead Outcomes',
      data: [30, 20, 50],
      backgroundColor: ['#a7f3d0', '#6ee7b7', '#10b981'],
      borderColor: '#f8fafc',
      borderWidth: 4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  };


  const handleFormSuccess = (email) => {
    setSuccessEmail(email);
    setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission delay
    setTimeout(() => {
      const formData = new FormData(e.target);
      const email = formData.get('email');
      setSuccessEmail(email);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleRequestProposalClick = (e) => {
    e.preventDefault();
    setShowRoleModal(true);
  };

  const handleRoleSelect = (role) => {
    setFormType(role);
    setShowForm(true);
    setSuccessEmail('');
    // Scroll to the form section
    setTimeout(() => {
      const contactElement = document.getElementById('contact-form-section');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle scroll to contact section when URL hash is #contact
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        const contactElement = document.getElementById('contact-form-section');
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="text-slate-800">
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        onRoleSelect={handleRoleSelect}
      />
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-[#0B1220] to-[#10224E] py-20 sm:py-24 lg:py-32 overflow-hidden">
        {/* Logo in top right */}
        <div className="absolute top-6 right-6 z-20">
          <img 
            src="/TRUST/trust-logo-new.png" 
            alt="TRUST Logo" 
            className="h-20 w-24 object-contain opacity-90"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Main content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#E8EEFC] leading-tight mb-6">
                Recruit Qualified Subjects—Fast & Predictable
              </h1>
              <div className="space-y-4 text-lg text-[#A4B0CC]">
                <div className="flex items-start space-x-3">
                  <span className="text-[#56F0C8] text-xl mt-1">•</span>
                  <p>TRUST builds a steady pipeline of pre-qualified subjects so your study meets enrollment targets.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#56F0C8] text-xl mt-1">•</span>
                  <p>Our method blends targeted community outreach with nurse-led pre-screening to cut screen-fail rates and keep coordinators focused on visits.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#56F0C8] text-xl mt-1">•</span>
                  <p>IRB-ready bilingual materials included.</p>
                </div>
              </div>
            </div>
            
            {/* Right side - Badges */}
            <div className="flex flex-col space-y-4">
              <span className="bg-[#56F0C8] text-[#0B1220] px-6 py-3 rounded-full text-sm font-semibold text-center">
                Enrollment-focused
              </span>
              <span className="bg-[#16B1F0] text-white px-6 py-3 rounded-full text-sm font-semibold text-center">
                Nurse-led pre-screen
              </span>
              <span className="bg-[#10224E] text-[#E8EEFC] px-6 py-3 rounded-full text-sm font-semibold text-center">
                Community Outreach Recruitment
              </span>
              <span className="bg-[#56F0C8] text-[#0B1220] px-6 py-3 rounded-full text-sm font-semibold text-center">
                IRB/ICH-GCP aligned
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRequestProposalClick}
              className="bg-[#16B1F0] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#10224E] transition-colors shadow-lg text-lg text-center"
            >
              Request Proposal
            </button>
          </div>
        </div>
        {/* Background elements for visual interest */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-64 h-64 bg-[#56F0C8] rounded-full -top-20 -left-20 opacity-10"></div>
          <div className="absolute w-96 h-96 bg-[#16B1F0] rounded-full -bottom-40 -right-40 opacity-10"></div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="what-we-do" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              TRUST recruits qualified subjects so sites and sponsors hit enrollment targets—fast and predictably.
            </h2>
            <p className="text-xl text-[#10224E] font-semibold">
              We combine community outreach and nurse-led pre-screening to reduce screen fails and coordinator burden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            <div className="p-6 bg-gradient-to-br from-[#10224E] to-[#0B1220] rounded-xl shadow-md text-white">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-[#E8EEFC] mb-2">Enrollment First</h3>
              <p className="text-[#A4B0CC]">
                Our north star is meeting your enrollment plan—not just generating clicks or inquiries.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#10224E] to-[#0B1220] rounded-xl shadow-md text-white">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-[#E8EEFC] mb-2">Quality Over Volume</h3>
              <p className="text-[#A4B0CC]">
                Nurse-led pre-screening delivers eligible, engaged referrals to your site.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#10224E] to-[#0B1220] rounded-xl shadow-md text-white">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-[#E8EEFC] mb-2">Predictable Pipeline</h3>
              <p className="text-[#A4B0CC]">
                Weekly outputs, transparent reporting, and fast iteration for steady accrual.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#10224E] to-[#0B1220] rounded-xl shadow-md text-white">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-[#E8EEFC] mb-2">Coordinator Relief</h3>
              <p className="text-[#A4B0CC]">
                We handle outreach and pre-screen so your team can run visits.
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-[#10224E] to-[#0B1220] rounded-xl shadow-md text-white">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-[#E8EEFC] mb-2">Compliant by Design</h3>
              <p className="text-[#A4B0CC]">
                IRB-ready EN/ES materials and HIPAA-aware operations—without slowing recruitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section id="why-it-works" className="py-16 sm:py-20 bg-[#A4B0CC]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mb-4">
              Why It Works
            </h2>
            <p className="text-xl text-[#10224E]">
              The difference between online-only and TRUST approach
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="p-6 bg-white rounded-xl shadow-md border border-red-200">
                <h3 className="text-2xl font-bold text-red-700 mb-3">Online-only approach:</h3>
                <p className="text-slate-700 text-lg">
                  Low-intent clicks → no-shows → high screen-fail
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md border border-teal-200">
                <h3 className="text-2xl font-bold text-teal-700 mb-3">TRUST approach:</h3>
                <p className="text-slate-700 text-lg mb-4">
                  In-person community outreach finds motivated candidates; nurse pre-screen filters for eligibility; sites receive ready-to-schedule referrals.
                </p>
                <p className="text-slate-700 font-semibold">
                  Result: faster FPI and steadier accrual.
                </p>
              </div>
            </div>
            <div className="relative h-80 w-full">
              <img
                src="/TRUST/why-trust-works.png"
                alt="Collaborative group discussion showing community engagement and trust"
                className="rounded-xl shadow-lg object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent rounded-xl flex items-end p-6">
                <p className="text-white text-xl font-semibold">
                  Community collaboration drives enrollment success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mb-4">
              Our Services
            </h2>
            <p className="text-xl text-[#10224E]">
              Comprehensive recruitment solutions for qualified, compliant enrollment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Marketing & Materials */}
            <div className="bg-gradient-to-br from-[#56F0C8]/10 to-[#16B1F0]/10 p-8 rounded-2xl shadow-lg border border-[#56F0C8]/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#16B1F0] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📢</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0B1220]">IRB-Ready Bilingual Materials</h3>
              </div>
              <p className="text-[#10224E] mb-6 text-lg">
                Compliant, study-specific materials designed for qualified participant engagement and predictable enrollment.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Bilingual promotional materials
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  IRB-approved flyers & brochures
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Study-specific folders & handouts
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Compliant recruitment materials
                </li>
              </ul>
            </div>

            {/* Digital Presence */}
            <div className="bg-gradient-to-br from-[#56F0C8]/10 to-[#16B1F0]/10 p-8 rounded-2xl shadow-lg border border-[#56F0C8]/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#16B1F0] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🌐</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0B1220]">Digital Presence</h3>
              </div>
              <p className="text-[#10224E] mb-6 text-lg">
                Compliant digital platforms designed for qualified participant capture and predictable enrollment tracking.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  IRB-compliant landing pages
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Qualified participant forms
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Pre-screening tracking systems
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Mobile-optimized compliance
                </li>
              </ul>
            </div>

            {/* Community Outreach */}
            <div className="bg-gradient-to-br from-[#56F0C8]/10 to-[#16B1F0]/10 p-8 rounded-2xl shadow-lg border border-[#56F0C8]/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#16B1F0] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0B1220]">Bilingual Community Outreach</h3>
              </div>
              <p className="text-[#10224E] mb-6 text-lg">
                Targeted community engagement with qualified participant identification and compliant outreach processes.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  High-traffic location visits
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Major landmark engagement
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Community event participation
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Direct qualified participant engagement
                </li>
              </ul>
            </div>

            {/* Clinical Support */}
            <div className="bg-gradient-to-br from-[#56F0C8]/10 to-[#16B1F0]/10 p-8 rounded-2xl shadow-lg border border-[#56F0C8]/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#16B1F0] rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-xl">🩺</span>
                </div>
                <h3 className="text-2xl font-bold text-[#0B1220]">Nurse-Led Clinical Support</h3>
              </div>
              <p className="text-[#10224E] mb-6 text-lg">
                Licensed nurse pre-screening and dedicated project management to ensure qualified enrollment and predictable timelines.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Licensed nurse pre-screening
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Qualified subject verification
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Dedicated project manager
                </li>
                <li className="flex items-center text-[#10224E]">
                  <svg className="w-5 h-5 text-[#16B1F0] mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Predictable timeline monitoring
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-[#0B1220] mb-4">
              Ready to accelerate your study enrollment?
            </h3>
            <p className="text-lg text-[#10224E] mb-8">
              Let's discuss how our comprehensive services can meet your specific study requirements.
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleRequestProposalClick}
                className="bg-[#16B1F0] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#10224E] transition-colors shadow-lg text-lg text-center"
              >
                Request Proposal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results Section */}
      <section id="proven-results" className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              Proven Results
            </h2>
            <p className="text-xl text-slate-600">
              See the difference our approach makes in patient recruitment outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Before TRACS</h3>
              <div className="h-64 flex items-center justify-center">
                <Doughnut data={beforeData} options={chartOptions} />
              </div>
              <p className="text-slate-600 text-center mt-4">
                Traditional recruitment methods yield low enrollment rates
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">With TRACS</h3>
              <div className="h-64 flex items-center justify-center">
                <Doughnut data={afterData} options={chartOptions} />
              </div>
              <p className="text-slate-600 text-center mt-4">
                Our approach delivers 3x higher enrollment rates
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">3x</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Higher Enrollment</div>
              <div className="text-slate-600">Compared to traditional methods</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">50%</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Fewer Screen Failures</div>
              <div className="text-slate-600">Thanks to nurse pre-screening</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Project Management</div>
              <div className="text-slate-600">Dedicated support throughout</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form-section" className="py-16 sm:py-20 bg-[#A4B0CC]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1220] mb-4">
              Ready to Accelerate Your Recruitment?
            </h2>
            <p className="text-xl text-[#10224E]">
              Get a personalized proposal tailored to your specific needs and challenges.
            </p>
          </div>

          {!showForm ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#0B1220] mb-4">
                Ready to Accelerate Your Recruitment?
              </h3>
              <p className="text-lg text-[#10224E] mb-8">
                Get a personalized proposal tailored to your specific needs and challenges.
              </p>
              <button
                onClick={handleRequestProposalClick}
                className="bg-[#16B1F0] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#10224E] transition-colors shadow-lg text-lg"
              >
                Request Your Proposal
              </button>
            </div>
          ) : successEmail ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700 text-lg mb-4">
                Your proposal request has been successfully submitted.
              </p>
              <p className="text-green-600 text-base">
                A team member will get back to you shortly at <strong>{successEmail}</strong> with your personalized proposal.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Request Your Proposal
                </h3>
                <p className="text-slate-600">
                  Tell us about your organization and we'll create a customized proposal
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Company Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Your company name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="organizationType" className="block text-sm font-medium text-slate-700 mb-2">
                    Organization Type
                  </label>
                  <select
                    id="organizationType"
                    name="organizationType"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  >
                    <option value="">Select your organization type...</option>
                    <option value="sponsor">Pharmaceutical Company</option>
                    <option value="cro">Contract Research Organization (CRO)</option>
                    <option value="biotech">Biotech Firm</option>
                    <option value="device">Medical Device Manufacturer</option>
                    <option value="hospital">Hospital / Medical Center</option>
                    <option value="research-center">Research Center</option>
                    <option value="physician-practice">Physician Practice</option>
                    <option value="site-management">Site Management Organization</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="studyDetails" className="block text-sm font-medium text-slate-700 mb-2">
                    Study Details (Optional)
                  </label>
                  <textarea
                    id="studyDetails"
                    name="studyDetails"
                    rows="4"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Tell us about your study, timeline, or specific requirements..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full font-bold py-4 rounded-lg transition-colors text-lg ${
                    isSubmitting 
                      ? 'bg-[#A4B0CC] text-[#10224E] cursor-not-allowed' 
                      : 'bg-[#16B1F0] text-white hover:bg-[#10224E]'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Request My Proposal'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
