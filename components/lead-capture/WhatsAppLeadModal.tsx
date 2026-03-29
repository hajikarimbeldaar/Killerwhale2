'use client';

import React, { useState, useEffect } from 'react';
import { X, Tag, Calculator, Shield, ChevronDown, CheckCircle2, Check } from 'lucide-react';

interface WhatsAppLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  modelName: string;
  selectedVariantName: string;
  variants: any[];
  defaultCity: string;
}

type IntentType = 'Dealer' | 'EMI' | 'Insurance' | '';
type TimelineType = 'This week' | 'Within 1 month' | '1-3 months' | 'Just exploring' | '';

export default function WhatsAppLeadModal({
  isOpen,
  onClose,
  brandName,
  modelName,
  selectedVariantName,
  variants,
  defaultCity
}: WhatsAppLeadModalProps) {
  const [step, setStep] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [intent, setIntent] = useState<IntentType>('');
  
  const [variant, setVariant] = useState(selectedVariantName || '');
  const [city, setCity] = useState(defaultCity || '');
  const [timeline, setTimeline] = useState<TimelineType>('');
  
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIntent('');
      setVariant(selectedVariantName || (variants.length > 0 ? variants[0].name : ''));
      setCity(defaultCity || '');
      setTimeline('');
      setPhone('');
      setName('');
      setError('');
    }
  }, [isOpen, selectedVariantName, defaultCity, variants]);

  if (!isOpen) return null;

  const handleNext = () => {
    setError('');
    if (step === 1 && !intent) {
      setError('Please select how we can help you.');
      return;
    }
    if (step === 2 && (!variant || !city || !timeline)) {
      setError('Please fill all fields to continue.');
      return;
    }
    if (step === 3) {
      if (!phone || phone.length < 10) {
        setError('Please enter a valid 10-digit mobile number.');
        return;
      }
      submitLead();
      return;
    }
    setStep(step + 1);
  };

  const submitLead = () => {
    const defaultWhatsAppNumber = '917349466942'; 
    
    let intentRequirement = '';
    let customMessageEnd = '';
    
    if (intent === 'Dealer') {
      intentRequirement = 'Best Price';
      customMessageEnd = 'Please share best deal and available offers.';
    } else if (intent === 'EMI') {
      intentRequirement = 'EMI Options';
      customMessageEnd = 'Please share loan options / EMI breakdown.';
    } else if (intent === 'Insurance') {
      intentRequirement = 'Insurance Quote';
      customMessageEnd = 'Please share insurance cost and best plans.';
    }
    
    const message = `Hi, I'm interested in ${brandName} ${modelName}.

Model: ${brandName} ${modelName}
Variant: ${variant}
City: ${city}
Buying Timeline: ${timeline}
Requirement: ${intentRequirement}
Name: ${name || 'Not provided'}
Phone: ${phone}

${customMessageEnd}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${defaultWhatsAppNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm sm:items-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100 flex justify-between items-center relative">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {step === 1 && 'How can we help?'}
              {step === 2 && 'Car Details'}
              {step === 3 && 'Get Details on WhatsApp'}
            </h3>
            {step === 1 && <p className="text-sm text-gray-500 mt-1">Get the best deal on {brandName} {modelName}</p>}
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-orange-500 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {/* STEP 1: Intent Selection */}
          {step === 1 && (
            <div className="space-y-3">
              <button
                onClick={() => setIntent('Dealer')}
                className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${intent === 'Dealer' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-200 hover:bg-gray-50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${intent === 'Dealer' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  <Tag className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-gray-900">Best Price / Dealer Offer</div>
                  <div className="text-xs text-gray-500 mt-0.5">Maximum discounts in {city}</div>
                </div>
                {intent === 'Dealer' && <CheckCircle2 className="w-5 h-5 text-red-600" />}
              </button>

              <button
                onClick={() => setIntent('EMI')}
                className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${intent === 'EMI' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-200 hover:bg-gray-50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${intent === 'EMI' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  <Calculator className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-gray-900">EMI / Loan Options</div>
                  <div className="text-xs text-gray-500 mt-0.5">Lowest interest rates</div>
                </div>
                {intent === 'EMI' && <CheckCircle2 className="w-5 h-5 text-red-600" />}
              </button>

              <button
                onClick={() => setIntent('Insurance')}
                className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${intent === 'Insurance' ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-red-200 hover:bg-gray-50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${intent === 'Insurance' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-bold text-gray-900">Insurance Quote</div>
                  <div className="text-xs text-gray-500 mt-0.5">Save up to 30% on premium</div>
                </div>
                {intent === 'Insurance' && <CheckCircle2 className="w-5 h-5 text-red-600" />}
              </button>
            </div>
          )}

          {/* STEP 2: Pre-Capture */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Model</label>
                <input 
                  type="text" 
                  value={`${brandName} ${modelName}`}
                  disabled
                  className="w-full bg-gray-100 border border-gray-200 text-gray-600 rounded-lg px-4 py-3 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Variant</label>
                <div className="relative">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 text-sm font-medium flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:border-gray-400 transition-colors"
                  >
                    <span className="truncate">{variant || selectedVariantName}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto w-full py-1">
                      {variants && variants.length > 0 ? (
                        variants.map((v: any, i: number) => (
                          <div 
                            key={i} 
                            onClick={() => {
                              setVariant(v.name);
                              setIsDropdownOpen(false);
                            }}
                            className={`flex items-center px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-gray-50 ${variant === v.name ? 'bg-red-50 font-semibold text-red-700' : 'text-gray-700'}`}
                          >
                            <span className="w-5 flex-shrink-0 mr-2">
                              {variant === v.name && <Check className="w-4 h-4 text-red-600" />}
                            </span>
                            <span className="truncate">{v.name}</span>
                          </div>
                        ))
                      ) : (
                        <div 
                          onClick={() => {
                            setVariant(selectedVariantName);
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-red-50 bg-red-50 font-semibold text-red-700"
                        >
                          <span className="w-5 flex-shrink-0 mr-2">
                            <Check className="w-4 h-4 text-red-600" />
                          </span>
                          <span className="truncate">{selectedVariantName}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Your City</label>
                <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 mt-2">When are you planning to buy?</label>
                <div className="grid grid-cols-2 gap-2">
                  {['This week', 'Within 1 month', '1-3 months', 'Just exploring'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setTimeline(opt as TimelineType)}
                      className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-colors ${timeline === opt ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Contact Capture */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4">
                <p className="text-sm font-medium text-red-800 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Almost done! Enter details to get quotes on WhatsApp.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Mobile Number *</label>
                <div className="flex">
                  <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg px-4 py-3 text-gray-600 font-medium text-sm flex items-center">
                    +91
                  </div>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').substring(0, 10))}
                    placeholder="Enter 10 digit number"
                    className="w-full bg-white border border-gray-300 text-gray-900 rounded-r-lg px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Your Name (Optional)</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">We will securely send details to your WhatsApp.</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          {step > 1 && (
            <button 
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-xl font-semibold text-gray-600 bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
          )}
          <button 
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center transition-all text-[15px] shadow-sm shadow-red-500/20"
          >
            {step === 3 ? 'Get Details on WhatsApp' : 'Continue'} 
            {step < 3 && <span className="ml-2">→</span>}
          </button>
        </div>

      </div>
    </div>
  );
}
