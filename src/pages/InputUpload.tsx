import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  MessageSquare, 
  Table, 
  Activity, 
  Upload, 
  ArrowLeft,
  CheckCircle,
  FileUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface UploadedFile {
  id: string;
  name: string;
  type: 'logbook' | 'whatsapp' | 'spreadsheet' | 'iot';
  size: string;
  status: 'uploaded' | 'processing' | 'completed';
}

const fileTypes = [
  {
    id: 'logbook',
    title: 'Logbook',
    description: 'PDF format maintenance logs',
    icon: FileText,
    accept: '.pdf',
    color: 'text-railway-blue',
    bgColor: 'bg-railway-blue/10'
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Messages',
    description: 'Text files or exported chats',
    icon: MessageSquare,
    accept: '.txt,.json',
    color: 'text-signal-green',
    bgColor: 'bg-signal-green/10'
  },
  {
    id: 'spreadsheet',
    title: 'Spreadsheet Data',
    description: 'Excel or CSV files',
    icon: Table,
    accept: '.xlsx,.xls,.csv',
    color: 'text-signal-orange',
    bgColor: 'bg-signal-orange/10'
  },
  {
    id: 'iot',
    title: 'IoT Sensor Data',
    description: 'Sensor readings and telemetry',
    icon: Activity,
    accept: '.json,.xml,.csv',
    color: 'text-signal-amber',
    bgColor: 'bg-signal-amber/10'
  }
];

export default function InputUpload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const handleFileUpload = (type: string, file: File) => {
    const newFile: UploadedFile = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      type: type as any,
      size: (file.size / 1024).toFixed(1) + ' KB',
      status: 'uploaded'
    };

    setUploadedFiles(prev => [...prev, newFile]);
    toast({
      title: t('fileUploaded'),
      description: `${file.name} ${t('uploadedSuccessfully')}`,
    });
  };

  const handleSendInput = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: t('noFilesSelected'),
        description: t('pleaseUploadFiles'),
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    
    // Simulate processing
    for (let i = 0; i < uploadedFiles.length; i++) {
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(file => 
          prev.indexOf(file) === i ? { ...file, status: 'processing' } : file
        ));
      }, i * 500);
      
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(file => 
          prev.indexOf(file) === i ? { ...file, status: 'completed' } : file
        ));
      }, (i + 1) * 1000);
    }

    setTimeout(() => {
      setProcessing(false);
      setReportGenerated(true);
      
      // Generate sample report data
      const sampleReport = {
        title: "Railway Operations Daily Report",
        generatedAt: new Date().toLocaleString(),
        processedFiles: uploadedFiles.length,
        summary: {
          maintenanceAlerts: 12,
          urgentActions: 3,
          fleetHealthScore: "89%",
          optimizations: 24
        },
        sections: [
          {
            title: "Maintenance Logs Analysis",
            items: [
              "Train TR-4521: Brake system inspection due",
              "Train TR-3892: Engine oil change completed", 
              "Train TR-5671: Air conditioning repair scheduled"
            ]
          },
          {
            title: "Communication Records",
            items: [
              "WhatsApp alerts processed: 15 messages",
              "Maintenance team coordination: 8 updates",
              "Operations briefing: 3 priority items"
            ]
          },
          {
            title: "Operational Metrics",
            items: [
              "Fleet availability: 82% (147/180 trains)",
              "On-time performance: 94.2%",
              "Average delay: 2.3 minutes"
            ]
          },
          {
            title: "IoT Sensor Analytics", 
            items: [
              "Temperature anomalies detected: 2 instances",
              "Vibration patterns within normal range",
              "Energy consumption optimization: 12% improvement"
            ]
          }
        ]
      };
      
      setReportData(sampleReport);
      
      toast({
        title: t('processingComplete'),
        description: t('consolidatedPdfGenerated'),
      });
    }, uploadedFiles.length * 1000 + 1000);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const downloadReport = () => {
    if (!reportData) return;
    
    // Create a comprehensive text report
    const reportContent = `
${reportData.title}
Generated: ${reportData.generatedAt}
===============================================

EXECUTIVE SUMMARY
- Files Processed: ${reportData.processedFiles}
- Maintenance Alerts: ${reportData.summary.maintenanceAlerts}
- Urgent Actions Required: ${reportData.summary.urgentActions}
- Fleet Health Score: ${reportData.summary.fleetHealthScore}
- Optimization Suggestions: ${reportData.summary.optimizations}

===============================================

${reportData.sections.map((section: any) => `
${section.title.toUpperCase()}
${'-'.repeat(section.title.length)}
${section.items.map((item: string) => `• ${item}`).join('\n')}
`).join('\n')}

===============================================
Report generated by Railway Operations Management System
© 2024 Railway Operations Department
    `.trim();

    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Railway_Operations_Report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Report Downloaded",
      description: "Ultimate day report has been saved to your downloads",
    });
  };

  const resetForm = () => {
    setUploadedFiles([]);
    setProcessing(false);
    setReportGenerated(false);
    setReportData(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToDashboard')}
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('inputUpload')}</h1>
          <p className="text-muted-foreground">{t('uploadDataForProcessing')}</p>
        </div>
      </div>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fileTypes.map((type) => (
          <Card key={type.id} className="shadow-railway-md hover:shadow-railway-lg transition-smooth">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${type.bgColor}`}>
                  <type.icon className={`h-5 w-5 ${type.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">{t(type.title.toLowerCase())}</CardTitle>
                  <CardDescription>{t(type.description)}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor={`file-${type.id}`} className="text-sm font-medium">
                  {t('selectFile')}
                </Label>
                <Input
                  id={`file-${type.id}`}
                  type="file"
                  accept={type.accept}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(type.id, file);
                      e.target.value = '';
                    }
                  }}
                  className="cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card className="shadow-railway-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileUp className="h-5 w-5" />
              {t('uploadedFiles')}
            </CardTitle>
            <CardDescription>
              {uploadedFiles.length} {t('filesReady')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file) => {
                const fileType = fileTypes.find(ft => ft.id === file.type);
                return (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-3">
                      {fileType && <fileType.icon className={`h-4 w-4 ${fileType.color}`} />}
                      <div>
                        <p className="font-medium text-sm">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'completed' && (
                        <CheckCircle className="h-4 w-4 text-signal-green" />
                      )}
                      {file.status === 'processing' && (
                        <div className="h-4 w-4 border-2 border-railway-blue border-t-transparent rounded-full animate-spin" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        disabled={processing}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Send Input Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleSendInput}
          disabled={processing || uploadedFiles.length === 0}
          className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-3 text-lg"
        >
          {processing ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {t('processing')}...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {t('sendInput')}
            </div>
          )}
        </Button>
      </div>

      {/* Processing Preview */}
      {processing && (
        <Card className="shadow-railway-md">
          <CardHeader>
            <CardTitle>{t('generatingOutput')}</CardTitle>
            <CardDescription>
              {t('consolidatingData')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-subtle p-4 rounded-md">
                <h4 className="font-semibold mb-2">{t('sampleOutput')}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {t('consolidatedReport')} - Railway_Operations_Report_2024.txt
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">{t('processedSections')}:</span>
                    <ul className="mt-1 space-y-1 text-muted-foreground">
                      <li>• {t('maintenanceLogs')}</li>
                      <li>• {t('communicationRecords')}</li>
                      <li>• {t('operationalData')}</li>
                      <li>• {t('sensorAnalytics')}</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium">{t('insights')}:</span>
                    <ul className="mt-1 space-y-1 text-muted-foreground">
                      <li>• 12 {t('maintenanceAlertsIdentified')}</li>
                      <li>• 3 {t('urgentActionsRequired')}</li>
                      <li>• 89% {t('fleetHealthScore')}</li>
                      <li>• 24 {t('optimizationSuggestions')}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Report Display */}
      {reportGenerated && reportData && (
        <Card className="shadow-railway-lg border-signal-green/20">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <CheckCircle className="h-6 w-6" />
                  Ultimate Day Report Generated
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Comprehensive analysis of all uploaded data
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={downloadReport}
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="secondary" 
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  Start New Analysis
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Executive Summary */}
              <div className="lg:col-span-1">
                <h3 className="font-semibold text-lg mb-4 text-foreground">Executive Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-signal-green/10 rounded-md">
                    <span className="text-sm font-medium">Files Processed</span>
                    <span className="font-bold text-signal-green">{reportData.processedFiles}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-signal-amber/10 rounded-md">
                    <span className="text-sm font-medium">Maintenance Alerts</span>
                    <span className="font-bold text-signal-amber">{reportData.summary.maintenanceAlerts}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-signal-orange/10 rounded-md">
                    <span className="text-sm font-medium">Urgent Actions</span>
                    <span className="font-bold text-signal-orange">{reportData.summary.urgentActions}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-railway-blue/10 rounded-md">
                    <span className="text-sm font-medium">Fleet Health</span>
                    <span className="font-bold text-railway-blue">{reportData.summary.fleetHealthScore}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Sections */}
              <div className="lg:col-span-2">
                <h3 className="font-semibold text-lg mb-4 text-foreground">Detailed Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reportData.sections.map((section: any, index: number) => (
                    <div key={index} className="bg-muted/30 p-4 rounded-md">
                      <h4 className="font-semibold mb-3 text-foreground">{section.title}</h4>
                      <ul className="space-y-2">
                        {section.items.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-signal-green mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Report Metadata */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Generated: {reportData.generatedAt}</span>
                <span>Railway Operations Management System © 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}