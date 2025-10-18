// ODIADEV AI LTD - Company Knowledge Base
// This context is injected into the AI system prompt

export const COMPANY_KNOWLEDGE = {
  company: {
    name: "ODIADEV AI LTD",
    tagline: "The Pursuit of AI Excellence",
    description: "Nigeria's Voice-AI Infrastructure Platform",
    mission: "Transforming businesses with intelligent voice agents and cultural AI understanding",
    location: "Lagos, Nigeria",
    founded: "2024",
    website: "https://odia.dev"
  },

  products: {
    adaquaAI: {
      name: "Adaqua AI",
      status: "Flagship Product",
      description: "Production voice-AI platform with natural Nigerian accents. Integrates with WhatsApp, Telegram, and web chat widgets.",
      features: [
        "Nigerian English + local languages support",
        "Real-time speech & text processing",
        "Secure APIs, Supabase-friendly",
        "WhatsApp & Telegram integration",
        "Natural Nigerian accent synthesis"
      ],
      useCases: [
        "Customer service automation",
        "Voice-enabled chatbots",
        "Multilingual support systems"
      ]
    },
    crossAI: {
      name: "Cross AI",
      description: "Emergency response & dispatch assistant for states, hospitals, and campuses.",
      features: [
        "Voice intake & classification",
        "Intelligent incident triage",
        "Seamless handoff to responders",
        "NDPR-aligned logging"
      ],
      targetMarket: "Government agencies, hospitals, universities"
    },
    missLegalAI: {
      name: "MISS Legal AI",
      description: "Legal front-desk & case-status assistant for law firms. Intake, FAQs, reminders, and safe client updates.",
      features: [
        "WhatsApp + Web widget integration",
        "Secure client workflows",
        "Multi-language support",
        "Configurable prompts & guardrails"
      ],
      targetMarket: "Law firms, legal departments"
    }
  },

  team: [
    {
      name: "Austyn Eguale",
      role: "Chief Executive Officer (CEO)",
      description: "Founder and visionary leader"
    },
    {
      name: "Peter Ntaji",
      role: "Director, Government Partnerships",
      description: "Leading government and institutional partnerships"
    },
    {
      name: "Benjamin Nwoye",
      role: "Director, Commercial Strategy",
      description: "Driving commercial growth and strategy"
    }
  ],

  partnerships: [
    {
      name: "Mudiame International University",
      type: "Primary Academic Partner",
      description: "Research excellence, credibility, and access to innovation labs"
    },
    {
      name: "Cross AI International",
      type: "Global Standards Partner",
      description: "Cross-border collaboration to bring world-class AI to Nigeria"
    },
    {
      name: "Intech Wealth Advisory AI",
      type: "Financial AI Partner",
      description: "Financial AI partnership for advisory systems and fintech integrations"
    }
  ],

  contact: {
    email: {
      general: "contact@odia.dev",
      sales: "sales@odia.dev"
    },
    phone: {
      whatsapp: "+234 812 345 6789"
    },
    location: "Lagos, Nigeria",
    social: {
      linkedin: "https://linkedin.com/company/odiadev",
      twitter: "https://x.com/odiadev"
    }
  },

  services: [
    "Voice AI Agent Development",
    "Custom AI Solutions",
    "WhatsApp AI Integration",
    "Emergency Response Systems",
    "Legal AI Automation",
    "Multilingual Voice Processing",
    "Nigerian Accent Synthesis"
  ],

  differentiators: [
    "Natural Nigerian accents and local language support",
    "Built specifically for Nigerian market and infrastructure",
    "Deep understanding of cultural context",
    "Optimized for 2G/3G networks",
    "NDPR (Nigeria Data Protection Regulation) compliant",
    "Employee-owned and independent firm",
    "30+ years combined team experience"
  ],

  faqs: [
    {
      question: "What makes ODIADEV different from other AI companies?",
      answer: "We specialize in voice-AI infrastructure built specifically for Nigeria, with natural Nigerian accents, local language support, and optimization for Nigerian network conditions. We're employee-owned and independent, giving us flexibility to create tailored solutions."
    },
    {
      question: "Which languages do you support?",
      answer: "We support Nigerian English and are expanding to local languages including Yoruba, Igbo, and Hausa. Our Adaqua AI platform is designed for multilingual voice processing."
    },
    {
      question: "How can I integrate ODIADEV AI into my business?",
      answer: "We offer multiple integration options including WhatsApp, Telegram, web chat widgets, and secure APIs. Contact our sales team at sales@odia.dev to discuss your specific needs."
    },
    {
      question: "Is your platform NDPR compliant?",
      answer: "Yes, all our products including Cross AI and MISS Legal AI are built with NDPR (Nigeria Data Protection Regulation) compliance in mind, with secure logging and data handling."
    },
    {
      question: "What industries do you serve?",
      answer: "We serve multiple sectors including customer service, emergency response (government, hospitals, campuses), legal services, and any business needing voice-AI automation in Nigeria."
    }
  ]
};

// Generate system prompt for AI
export function generateSystemPrompt() {
  const { company, products, team, contact, services, differentiators } = COMPANY_KNOWLEDGE;
  
  return `You are an AI assistant for ${company.name}, ${company.description}.

COMPANY OVERVIEW:
${company.name} is ${company.description} based in ${company.location}. Our mission: ${company.mission}

PRODUCTS:
1. ${products.adaquaAI.name} (${products.adaquaAI.status}): ${products.adaquaAI.description}
   Features: ${products.adaquaAI.features.join(', ')}

2. ${products.crossAI.name}: ${products.crossAI.description}
   Features: ${products.crossAI.features.join(', ')}

3. ${products.missLegalAI.name}: ${products.missLegalAI.description}
   Features: ${products.missLegalAI.features.join(', ')}

LEADERSHIP TEAM:
${team.map(member => `- ${member.name}, ${member.role}`).join('\n')}

SERVICES:
${services.join(', ')}

KEY DIFFERENTIATORS:
${differentiators.join('; ')}

CONTACT:
- Email: ${contact.email.general} (general), ${contact.email.sales} (sales)
- WhatsApp: ${contact.phone.whatsapp}
- Location: ${contact.location}

YOUR ROLE:
- Answer questions about ODIADEV AI, our products, team, and services
- Be helpful, professional, and knowledgeable
- Use Nigerian English and cultural context when appropriate
- If you don't know something, direct users to contact@odia.dev
- Keep responses concise but informative (2-4 sentences ideal)
- Encourage users to try demos or contact sales for detailed discussions

TONE: Professional yet friendly, culturally aware, solution-focused`;
}
