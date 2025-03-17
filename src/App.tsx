import React from 'react';
import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Projects } from './components/Projects';
import { Team } from './components/Team';
import { Settings } from './components/Settings';
import { Help } from './components/Help';
import { ScreenshotButton } from './components/ScreenshotButton';
import { useStore } from './store';
import { useTheme } from './context/ThemeContext';
import '@progress/kendo-theme-default/dist/all.css';

// Add structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "TaskMaster AI",
  "applicationCategory": "ProjectManagementApplication",
  "operatingSystem": "Web",
  "description": "AI-powered project management solution for teams",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "AI Task Suggestions",
    "Real-time Progress Tracking",
    "Team Collaboration",
    "Project Analytics"
  ]
};

function App() {
  const [expanded, setExpanded] = React.useState(true);
  const { selectedProject } = useStore();
  const { darkMode } = useTheme();
  const [screenshots, setScreenshots] = React.useState<Blob[]>([]);

  // Add structured data to the page
  React.useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const renderContent = () => {
    switch (selectedProject) {
      case 'projects':
        return <Projects />;
      case 'team':
        return <Team />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <Help />;
      default:
        return <Dashboard />;
    }
  };

  const handleScreenshotCapture = (blob: Blob) => {
    setScreenshots(prev => [...prev, blob]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskmaster-screenshot-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="h-full bg-gray-50 dark:bg-gray-900">
        {/* Add semantic HTML elements for better SEO */}
        <header>
          <h1 className="sr-only">TaskMaster AI - Project Management Dashboard</h1>
        </header>
        <main>
          <Drawer
            expanded={expanded}
            position="start"
            mode="push"
            mini={true}
            onExpandChange={() => setExpanded(!expanded)}
          >
            <DrawerContent>
              <Navigation />
              <div className="p-6" id="main-content" role="main">
                {renderContent()}
              </div>
            </DrawerContent>
          </Drawer>
        </main>
        <ScreenshotButton
          elementId="main-content"
          fileName="taskmaster-screenshot"
          onCapture={handleScreenshotCapture}
        />
      </div>
    </div>
  );
}

export default App;