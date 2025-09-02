import React, { createContext, useContext, useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
];

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    dataPrediction: 'Data Prediction',
    mlAnalysis: 'ML Analysis',
    simulation: 'Simulation',
    trainAudit: 'Train Audit',
    inputUpload: 'Input Upload',
    mainNavigation: 'Main Navigation',
    dataModules: 'Data Modules',
    
    // Data modules
    fitnessCertificates: 'Fitness Certificates',
    jobCardStatus: 'Job-Card Status', 
    brandingPriorities: 'Branding Priorities',
    mileageBalancing: 'Mileage Balancing',
    cleaningDetailing: 'Cleaning & Detailing',
    stablingGeometry: 'Stabling Geometry',
    
    // Dashboard
    dashboardOverview: 'Dashboard Overview',
    railwayOperationsManagement: 'Railway operations management at a glance',
    trainsReady: 'Trains Ready',
    maintenanceAlerts: 'Maintenance Alerts',
    adDeadlines: 'Ad Deadlines',
    systemHealth: 'System Health',
    quickActions: 'Quick Actions',
    todaysPriorities: "Today's Priorities",
    systemStatus: 'System Status',
    
    // Input Upload
    uploadDataForProcessing: 'Upload and process operational data',
    backToDashboard: 'Back to Dashboard',
    logbook: 'Logbook',
    whatsapp: 'WhatsApp Messages',
    spreadsheet: 'Spreadsheet Data',
    iot: 'IoT Sensor Data',
    selectFile: 'Select File',
    uploadedFiles: 'Uploaded Files',
    filesReady: 'files ready for processing',
    fileUploaded: 'File Uploaded',
    uploadedSuccessfully: 'uploaded successfully',
    noFilesSelected: 'No Files Selected',
    pleaseUploadFiles: 'Please upload at least one file to proceed',
    processingComplete: 'Processing Complete',
    consolidatedPdfGenerated: 'Consolidated PDF report has been generated',
    processing: 'Processing',
    sendInput: 'Send Input',
    generatingOutput: 'Generating Consolidated Report',
    consolidatingData: 'Consolidating all uploaded data into a single report',
    sampleOutput: 'Sample Output Preview',
    consolidatedReport: 'Consolidated Operations Report',
    processedSections: 'Processed Sections',
    maintenanceLogs: 'Maintenance Logs',
    communicationRecords: 'Communication Records',
    operationalData: 'Operational Data',
    sensorAnalytics: 'Sensor Analytics',
    insights: 'Key Insights',
    maintenanceAlertsIdentified: 'maintenance alerts identified',
    urgentActionsRequired: 'urgent actions required',
    fleetHealthScore: 'fleet health score',
    optimizationSuggestions: 'optimization suggestions',
    
    // Common
    welcome: 'Welcome',
    logout: 'Logout',
    active: 'Active',
    thisWeek: 'This Week',
    uptime: 'Uptime'
  },
  
  ml: {
    // Malayalam translations
    dashboard: 'ഡാഷ്‌ബോർഡ്',
    dataPrediction: 'ഡാറ്റ പ്രവചനം',
    mlAnalysis: 'ML വിശകലനം',
    simulation: 'സിമുലേഷൻ',
    trainAudit: 'ട്രെയിൻ ഓഡിറ്റ്',
    inputUpload: 'ഇൻപുട്ട് അപ്‌ലോഡ്',
    
    dashboardOverview: 'ഡാഷ്‌ബോർഡ് അവലോകനം',
    railwayOperationsManagement: 'റെയിൽവേ പ്രവർത്തന മാനേജ്‌മെന്റ് ഒറ്റനോട്ടത്തിൽ',
    trainsReady: 'ട്രെയിനുകൾ തയ്യാർ',
    maintenanceAlerts: 'മെയിന്റനൻസ് അലർട്ടുകൾ',
    adDeadlines: 'പരസ്യ ഡെഡ്‌ലൈനുകൾ',
    systemHealth: 'സിസ്റ്റം ആരോഗ്യം',
    quickActions: 'പെട്ടെന്നുള്ള പ്രവർത്തനങ്ങൾ',
    
    uploadDataForProcessing: 'പ്രവർത്തന ഡാറ്റ അപ്‌ലോഡ് ചെയ്‌ത് പ്രോസസ് ചെയ്യുക',
    backToDashboard: 'ഡാഷ്‌ബോർഡിലേക്ക് മടങ്ങുക',
    logbook: 'ലോഗ്ബുക്ക്',
    whatsapp: 'വാട്സ്ആപ്പ് സന്ദേശങ്ങൾ',
    spreadsheet: 'സ്‌പ്രെഡ്‌ഷീറ്റ് ഡാറ്റ',
    iot: 'IoT സെൻസർ ഡാറ്റ',
    
    welcome: 'സ്വാഗതം',
    logout: 'ലോഗൗട്ട്'
  },
  
  hi: {
    // Hindi translations
    dashboard: 'डैशबोर्ड',
    dataPrediction: 'डेटा पूर्वानुमान',
    mlAnalysis: 'ML विश्लेषण',
    simulation: 'सिमुलेशन',
    trainAudit: 'ट्रेन ऑडिट',
    inputUpload: 'इनपुट अपलोड',
    
    dashboardOverview: 'डैशबोर्ड अवलोकन',
    railwayOperationsManagement: 'रेलवे संचालन प्रबंधन एक नज़र में',
    trainsReady: 'ट्रेनें तैयार',
    maintenanceAlerts: 'रखरखाव अलर्ट',
    adDeadlines: 'विज्ञापन समय सीमा',
    systemHealth: 'सिस्टम स्वास्थ्य',
    quickActions: 'त्वरित कार्य',
    
    uploadDataForProcessing: 'परिचालन डेटा अपलोड और प्रोसेस करें',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    logbook: 'लॉगबुक',
    whatsapp: 'व्हाट्सएप संदेश',
    spreadsheet: 'स्प्रेडशीट डेटा',
    iot: 'IoT सेंसर डेटा',
    
    welcome: 'स्वागत',
    logout: 'लॉगआउट'
  },
  
  ta: {
    // Tamil translations
    dashboard: 'டாஷ்போர்டு',
    dataPrediction: 'தரவு முன்கணிப்பு',
    mlAnalysis: 'ML பகுப்பாய்வு',
    simulation: 'உருவகப்படுத்துதல்',
    trainAudit: 'ரயில் தணிக்கை',
    inputUpload: 'உள்ளீடு பதிவேற்றம்',
    
    dashboardOverview: 'டாஷ்போர்டு மேலோட்டம்',
    railwayOperationsManagement: 'ரயில்வே செயல்பாடுகள் நிர்வாகம் ஒரு பார்வையில்',
    trainsReady: 'ரயில்கள் தயார்',
    maintenanceAlerts: 'பராமரிப்பு எச்சரிக்கைகள்',
    adDeadlines: 'விளம்பர காலக்கெடு',
    systemHealth: 'கணினி ஆரோக்கியம்',
    quickActions: 'விரைவான செயல்கள்',
    
    uploadDataForProcessing: 'செயல்பாட்டு தரவை பதிவேற்றி செயலாக்குக',
    backToDashboard: 'டாஷ்போர்டுக்கு திரும்பு',
    logbook: 'பதிவு புத்தகம்',
    whatsapp: 'வாட்ஸ்ஆப் செய்திகள்',
    spreadsheet: 'விரிதாள் தரவு',
    iot: 'IoT சென்சார் தரவு',
    
    welcome: 'வரவேற்கிறோம்',
    logout: 'வெளியேறு'
  }
};

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
  languages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem('railway-language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('railway-language', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
      languages
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}