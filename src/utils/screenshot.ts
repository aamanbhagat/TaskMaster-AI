import html2canvas from 'html2canvas';

export const captureScreenshot = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return null;

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      useCORS: true, // Enable cross-origin image loading
      logging: false,
      backgroundColor: null,
    });

    // Convert to blob
    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/png');
    });
  } catch (error) {
    console.error('Screenshot capture failed:', error);
    return null;
  }
};