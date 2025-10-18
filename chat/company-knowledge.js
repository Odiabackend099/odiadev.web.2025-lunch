// ODIADEV AI LTD - Company Knowledge Base
// This context is injected into the AI system prompt

export const COMPANY_KNOWLEDGE = {
  company: {
    name: "ODIADEV AI LTD",
    tagline: "Human-Like Voice AI for Your Business",
    description: "We build human-like voice AI assistants for businesses worldwide — helping them answer, qualify, and book customers 24/7.",
    mission: "To provide businesses with intelligent, human-like voice AI assistants that automate and improve customer interactions.",
    location: "Abuja, Nigeria",
    founded: "2024",
    website: "https://odia.dev"
  },

  products: {
    callWaitingAI: {
      name: "CallWaiting.ai",
      status: "For SMBs",
      description: "An AI receptionist that answers calls, qualifies leads, and books appointments, ensuring you never miss a customer.",
      features: [
        "24/7 Call Answering",
        "Lead Qualification & Booking",
        "Seamless CRM Integration",
        "For Small & Medium Businesses"
      ],
      useCases: [
        "Automated receptionist for SMBs",
        "After-hours call answering",
        "Appointment booking"
      ]
    },
    serenityCareAI: {
      name: "SerenityCare AI",
      description: "Automated, empathetic support for mental health services, providing a safe space for users to feel heard.",
      features: [
        "Empathetic AI Conversations",
        "Confidential & Secure",
        "24/7 Mental Health Support",
        "Resource & Appointment Booking"
      ],
      targetMarket: "Mental health providers, hospitals, wellness platforms"
    },
    adaquaAI: {
      name: "Adaqua AI",
      description: "Automated marketing and content generation powered by AI, designed to grow your brand's presence online.",
      features: [
        "AI-Powered Content Creation",
        "Automated Social Media Marketing",
        "Personalized Customer Outreach",
        "Analytics & Performance Tracking"
      ],
      targetMarket: "Marketing agencies, content creators, businesses"
    }
  },

  team: [
    {
      name: "Austyn Eguale",
      role: "CEO & Product Lead",
      description: "Founder and visionary leader"
    },
    {
      name: "[Add Co-founder names]",
      role: "Co-founder",
      description: ""
    },
    {
      name: "[Add Advisor/Legal Counsel if available]",
      role: "Advisor/Legal Counsel",
      description: ""
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
      support: "support@odia.dev"
    },
    phone: {
      main: "+2348141995397"
    },
    address: "26 Romford Suncity Abuja, Nigeria",
    social: {
      linkedin: "https://linkedin.com/company/odiadev",
      twitter: "https://x.com/odiadev"
    }
  },

  services: [
    "Human-Like Voice AI Assistants",
    "AI Receptionist for SMBs",
    "Mental Health Support Automation",
    "Automated Marketing & Content Generation",
    "Custom AI Solutions"
  ],

  differentiators: [
    "Human-like, natural-sounding voice AI with Nigerian accents",
    "Proprietary 1.2 billion parameter Odiadev AI TTS engine",
    "Focus on answering, qualifying, and booking customers 24/7",
    "Serving businesses worldwide from our headquarters in Abuja, Nigeria",
    "Legally registered Nigerian technology company (RC ######)"
  ],

  faqs: [
    {
      question: "What does ODIADEV AI LTD do?",
      answer: "We build human-like voice AI assistants for businesses worldwide, helping them answer, qualify, and book customers 24/7. Our platforms include CallWaiting.ai, SerenityCare AI, and Adaqua AI."
    },
    {
      question: "What is CallWaiting.ai?",
      answer: "CallWaiting.ai is an AI receptionist for small and medium businesses. It answers calls, qualifies leads, and books appointments, so you never miss a customer."
    },
    {
      question: "How can I contact ODIADEV AI LTD?",
      answer: "You can contact us via email at support@odia.dev or by phone at +234 814 199 5397. Our office is located at 26 Romford Suncity Abuja, Nigeria."
    },
    {
      question: "What is Odiadev AI TTS?",
      answer: "Odiadev AI TTS is our proprietary text-to-speech engine with 1.2 billion parameters. It powers our platforms and enables us to create human-like voice AI with natural Nigerian accents."
    }
  ]
};

// Generate system prompt for AI
export function generateSystemPrompt() {
  const { company, products, team, contact, services, differentiators } = COMPANY_KNOWLEDGE;
  
  return `You are an AI assistant for ${company.name}, a company that builds ${company.tagline}.

COMPANY OVERVIEW:
${company.name} is headquartered in ${company.location}. ${company.description}

PRODUCTS:
1. ${products.callWaitingAI.name} (${products.callWaitingAI.status}): ${products.callWaitingAI.description}
   Features: ${products.callWaitingAI.features.join(', ')}

2. ${products.serenityCareAI.name}: ${products.serenityCareAI.description}
   Features: ${products.serenityCareAI.features.join(', ')}

3. ${products.adaquaAI.name}: ${products.adaquaAI.description}
   Features: ${products.adaquaAI.features.join(', ')}

LEADERSHIP TEAM:
${team.map(member => `- ${member.name}, ${member.role}`).join('
')}

SERVICES:
${services.join(', ')}

KEY DIFFERENTIATORS:
${differentiators.join('; ')}

CONTACT:
- Email: ${contact.email.support}
- Phone: ${contact.phone.main}
- Address: ${contact.address}

YOUR ROLE:
- Answer questions about ODIADEV AI, our products, team, and services
- Be helpful, professional, and knowledgeable
- Use Nigerian English and cultural context when appropriate
- If you don't know something, direct users to support@odia.dev
- Keep responses concise but informative (2-4 sentences ideal)
- Encourage users to try demos or contact sales for detailed discussions

TONE: Professional yet friendly, culturally aware, solution-focused`;
}