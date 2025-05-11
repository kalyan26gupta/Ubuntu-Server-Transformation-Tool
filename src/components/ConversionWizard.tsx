import React, { useEffect, useState } from 'react';
import { StepIndicator } from './StepIndicator';
import { InfoPanel } from './InfoPanel';
import { ActionButton } from './ActionButton';
import { HardDriveIcon, DownloadIcon, GlobeIcon, SettingsIcon, CheckCircleIcon, ArrowRightIcon, ArrowLeftIcon, InfoIcon, LoaderIcon } from 'lucide-react';
const STEPS = ['System Check', 'Backup Data', 'Download Ubuntu', 'Installation', 'Configuration'];
export function ConversionWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const goToNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  return <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Convert Windows Laptop to Ubuntu Server
      </h2>
      <StepIndicator steps={STEPS} currentStep={currentStep} />
      <div className="min-h-[400px]">
        {currentStep === 0 && <SystemCheckStep />}
        {currentStep === 1 && <BackupDataStep />}
        {currentStep === 2 && <DownloadUbuntuStep />}
        {currentStep === 3 && <InstallationStep />}
        {currentStep === 4 && <ConfigurationStep />}
      </div>
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
        <ActionButton onClick={goToPreviousStep} variant="secondary" disabled={currentStep === 0} icon={<ArrowLeftIcon size={16} />}>
          Previous
        </ActionButton>
        <ActionButton onClick={goToNextStep} variant="primary" disabled={currentStep === STEPS.length - 1} icon={<ArrowRightIcon size={16} />}>
          {currentStep === STEPS.length - 2 ? 'Finish' : 'Next'}
        </ActionButton>
      </div>
    </div>;
}
function SystemCheckStep() {
  return <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <HardDriveIcon className="mr-2" size={24} />
        System Requirements Check
      </h3>
      <InfoPanel type="info" title="Minimum Requirements">
        <p>
          To convert your Windows laptop to an Ubuntu server, your system should
          meet these requirements:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>2 GHz dual-core processor or better</li>
          <li>4 GB RAM (8 GB recommended)</li>
          <li>25 GB available hard drive space</li>
          <li>Internet connection</li>
          <li>USB port (for installation media)</li>
        </ul>
      </InfoPanel>
      <InfoPanel type="warning" title="Important">
        <p>
          This process will erase all data on your Windows laptop. Make sure to
          back up all important files before proceeding.
        </p>
      </InfoPanel>
      <div className="bg-gray-50 p-4 rounded-lg mt-6">
        <h4 className="font-medium mb-2">Detected System:</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Processor:</div>
          <div className="font-medium">Intel Core i5-10210U</div>
          <div>Memory:</div>
          <div className="font-medium">8 GB RAM</div>
          <div>Storage:</div>
          <div className="font-medium">256 GB SSD (180 GB free)</div>
          <div>Status:</div>
          <div className="font-medium text-green-600 flex items-center">
            <CheckCircleIcon size={16} className="mr-1" /> Compatible
          </div>
        </div>
      </div>
    </div>;
}
function BackupDataStep() {
  return <div>
      <h3 className="text-xl font-semibold mb-4">Backup Your Data</h3>
      <InfoPanel type="warning" title="Data Loss Warning">
        <p>
          Converting your laptop to Ubuntu Server will erase all data on your
          hard drive. It's critical to back up all important files first.
        </p>
      </InfoPanel>
      <div className="space-y-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Recommended Backup Methods:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>External hard drive or SSD</li>
            <li>Cloud storage (OneDrive, Google Drive, Dropbox)</li>
            <li>Network attached storage (NAS)</li>
            <li>USB flash drives (for smaller files)</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Important Files to Back Up:</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>Documents, photos, videos, and music</li>
            <li>Browser bookmarks and passwords</li>
            <li>Email data and contacts</li>
            <li>Application settings and data</li>
            <li>Any project files or code repositories</li>
          </ul>
        </div>
      </div>
      <div className="mt-6 flex items-center p-3 bg-blue-50 text-blue-800 rounded-lg">
        <InfoIcon size={20} className="mr-2 flex-shrink-0" />
        <p className="text-sm">
          Consider creating a full system image backup if you might want to
          restore Windows in the future.
        </p>
      </div>
    </div>;
}
function DownloadUbuntuStep() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState('Initializing download...');
  const [usbProgress, setUsbProgress] = useState(0);
  const [usbStatus, setUsbStatus] = useState('');
  useEffect(() => {
    // Simulate ISO download
    const downloadInterval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(downloadInterval);
          setDownloadStatus('Download complete');
          // Start USB creation after download
          startUsbCreation();
          return 100;
        }
        return prev + 2;
      });
      if (downloadProgress < 30) {
        setDownloadStatus('Downloading Ubuntu Server 22.04 LTS ISO...');
      } else if (downloadProgress < 60) {
        setDownloadStatus('Verifying download integrity...');
      } else if (downloadProgress < 90) {
        setDownloadStatus('Finalizing download...');
      }
    }, 200);
    return () => clearInterval(downloadInterval);
  }, []);
  const startUsbCreation = () => {
    setUsbStatus('Initializing USB creation...');
    const usbInterval = setInterval(() => {
      setUsbProgress(prev => {
        if (prev >= 100) {
          clearInterval(usbInterval);
          setUsbStatus('USB creation complete');
          return 100;
        }
        return prev + 5;
      });
      if (usbProgress < 30) {
        setUsbStatus('Preparing USB drive...');
      } else if (usbProgress < 60) {
        setUsbStatus('Writing Ubuntu Server image...');
      } else if (usbProgress < 90) {
        setUsbStatus('Verifying USB drive integrity...');
      }
    }, 500);
  };
  return <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <DownloadIcon className="mr-2" size={24} />
        Automated Download and USB Creation
      </h3>
      <InfoPanel type="info" title="Automatic Process">
        <p>
          The system will automatically download Ubuntu Server and create a
          bootable USB drive.
        </p>
      </InfoPanel>
      <div className="space-y-6 mt-6">
        {/* ISO Download Progress */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200">
            <h4 className="font-medium">Ubuntu Server ISO Download</h4>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-4">
              {downloadProgress < 100 ? <LoaderIcon className="animate-spin mr-2" size={20} /> : <CheckCircleIcon className="text-green-600 mr-2" size={20} />}
              <h4 className="font-medium">{downloadStatus}</h4>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{
              width: `${downloadProgress}%`
            }} />
            </div>
            <p className="text-sm text-gray-600 text-center">
              {downloadProgress}% Complete
            </p>
          </div>
        </div>
        {/* USB Creation Progress - Only show after download is complete */}
        {downloadProgress === 100 && <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <h4 className="font-medium">Creating Bootable USB Drive</h4>
            </div>
            <div className="p-4">
              <div className="flex items-center mb-4">
                {usbProgress < 100 ? <LoaderIcon className="animate-spin mr-2" size={20} /> : <CheckCircleIcon className="text-green-600 mr-2" size={20} />}
                <h4 className="font-medium">{usbStatus}</h4>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{
              width: `${usbProgress}%`
            }} />
              </div>
              <p className="text-sm text-gray-600 text-center">
                {usbProgress}% Complete
              </p>
            </div>
          </div>}
        {/* Success Message - Show when both processes are complete */}
        {downloadProgress === 100 && usbProgress === 100 && <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
            <CheckCircleIcon className="text-green-600 mr-2" size={20} />
            <div>
              <p className="text-green-800 font-medium">
                Preparation Complete!
              </p>
              <p className="text-green-700 text-sm">
                Ubuntu Server has been downloaded and the bootable USB drive is
                ready for installation.
              </p>
            </div>
          </div>}
      </div>
    </div>;
}
function InstallationStep() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing installation process...');
  useEffect(() => {
    const steps = [{
      progress: 15,
      message: 'Preparing system for installation...'
    }, {
      progress: 30,
      message: 'Creating partitions...'
    }, {
      progress: 45,
      message: 'Installing base system...'
    }, {
      progress: 60,
      message: 'Configuring system settings...'
    }, {
      progress: 75,
      message: 'Installing essential packages...'
    }, {
      progress: 90,
      message: 'Finalizing installation...'
    }, {
      progress: 100,
      message: 'Installation complete!'
    }];
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setStatus(steps[currentStep].message);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <GlobeIcon className="mr-2" size={24} />
        Automated Installation
      </h3>
      <InfoPanel type="info" title="Automatic Installation Process">
        <p>
          The system will now automatically install Ubuntu Server. Please do not
          turn off your computer.
        </p>
      </InfoPanel>
      <div className="mt-8 space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <LoaderIcon className="animate-spin mr-2" size={20} />
            <h4 className="font-medium">{status}</h4>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{
            width: `${progress}%`
          }} />
          </div>
          <p className="text-sm text-gray-600 text-center">
            {progress}% Complete
          </p>
        </div>
        {progress === 100 && <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-center">
            <CheckCircleIcon className="text-green-600 mr-2" size={20} />
            <p className="text-green-800">
              Installation completed successfully! Proceeding to automatic
              configuration...
            </p>
          </div>}
      </div>
    </div>;
}
function ConfigurationStep() {
  const [configSteps, setConfigSteps] = useState([{
    id: 1,
    name: 'System Update',
    status: 'pending'
  }, {
    id: 2,
    name: 'Security Configuration',
    status: 'pending'
  }, {
    id: 3,
    name: 'Network Setup',
    status: 'pending'
  }, {
    id: 4,
    name: 'Service Configuration',
    status: 'pending'
  }, {
    id: 5,
    name: 'Performance Optimization',
    status: 'pending'
  }]);
  useEffect(() => {
    const automate = async () => {
      for (let i = 0; i < configSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setConfigSteps(prev => prev.map((step, index) => ({
          ...step,
          status: index === i ? 'processing' : step.status
        })));
        await new Promise(resolve => setTimeout(resolve, 2000));
        setConfigSteps(prev => prev.map((step, index) => ({
          ...step,
          status: index === i ? 'completed' : step.status
        })));
      }
    };
    automate();
  }, []);
  return <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <SettingsIcon className="mr-2" size={24} />
        Automatic Configuration
      </h3>
      <InfoPanel type="info" title="Automated Setup">
        <p>
          The system is being automatically configured with recommended security
          settings and essential services.
        </p>
      </InfoPanel>
      <div className="space-y-4 mt-6">
        {configSteps.map(step => <div key={step.id} className={`p-4 rounded-lg border flex items-center justify-between
              ${step.status === 'completed' ? 'bg-green-50 border-green-200' : step.status === 'processing' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center">
              {step.status === 'completed' ? <CheckCircleIcon className="text-green-600 mr-2" size={20} /> : step.status === 'processing' ? <LoaderIcon className="animate-spin text-blue-600 mr-2" size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2" />}
              <span className={`font-medium
                ${step.status === 'completed' ? 'text-green-800' : step.status === 'processing' ? 'text-blue-800' : 'text-gray-600'}`}>
                {step.name}
              </span>
            </div>
          </div>)}
      </div>
      {configSteps.every(step => step.status === 'completed') && <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <div className="flex items-center mb-2">
            <CheckCircleIcon size={24} className="mr-3" />
            <p className="font-medium">Setup Complete!</p>
          </div>
          <p className="text-sm ml-9">
            Your Windows laptop has been successfully converted to an Ubuntu
            server with automatic configuration. The system is now ready to use.
          </p>
        </div>}
    </div>;
}