export const translations = {
  en: {
    common: {
      welcome: "Welcome",
      login: "Login",
      logout: "Logout",
      settings: "Settings",
    },
    home: {
      title: "Discover government schemes for you...",
      subtitle: "The government is not your salvation. The government is not your road to prosperity. Hard work, education will take you far beyond what any government program can ever promise",
      recentSchemes: "Recent Schemes",
      getIntoPolicy: "Get Into Policy Now",
    },
    schemes: {
      addNew: "Add New Scheme",
      enterLink: "Enter scheme link",
      adding: "Adding...",
      add: "Add",
      viewDetails: "View Details",
    }
  },
  ta: {
    common: {
      welcome: "வரவேற்பு",
      login: "உள்நுழைய",
      logout: "வெளியேறு",
      settings: "அமைப்புகள்",
    },
    home: {
      title: "உங்களுக்கான அரசு திட்டங்களைக் கண்டறியுங்கள்...",
      subtitle: "அரசாங்கம் உங்கள் மீட்பு அல்ல. அரசாங்கம் உங்கள் செழிப்புக்கான பாதை அல்ல. கடின உழைப்பு, கல்வி எந்த அரசாங்க திட்டத்தையும் விட உங்களை வெகு தொலைவிற்கு அழைத்துச் செல்லும்",
      recentSchemes: "சமீபத்திய திட்டங்கள்",
      getIntoPolicy: "கொள்கையில் இணையுங்கள்",
    },
    schemes: {
      addNew: "புதிய திட்டத்தைச் சேர்க்கவும்",
      enterLink: "திட்ட இணைப்பை உள்ளிடவும்",
      adding: "சேர்க்கிறது...",
      add: "சேர்",
      viewDetails: "விவரங்களைக் காண",
    }
  }
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en

// Helper function to get translations
export function getTranslations(language: Language) {
  return translations[language]
} 