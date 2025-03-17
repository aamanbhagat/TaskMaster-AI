import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { captureScreenshot } from '../utils/screenshot';

interface ScreenshotButtonProps {
  elementId: string;
  fileName: string;
  onCapture?: (blob: Blob) => void;
}

export const ScreenshotButton: React.FC<ScreenshotButtonProps> = ({
  elementId,
  fileName,
  onCapture
}) => {
  const handleCapture = async () => {
    const blob = await captureScreenshot(elementId, fileName);
    if (blob && onCapture) {
      onCapture(blob);
    }
  };

  return (
    <Button
      look="outline"
      icon={<Camera className="w-4 h-4" />}
      onClick={handleCapture}
      className="fixed bottom-4 right-4 z-50"
    >
      Capture Screenshot
    </Button>
  );
};