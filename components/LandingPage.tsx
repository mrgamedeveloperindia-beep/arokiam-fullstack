'use client';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Load your HTML as string or fetch from public folder
    import('@/public/landing.html?raw').then(module => {
      setHtmlContent(module.default);
    });
  }, []);

  return (
    <div 
      className="min-h-screen"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
