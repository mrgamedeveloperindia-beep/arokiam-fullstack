'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/landing.html')
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        setContent(doc.body.innerHTML);
      });
  }, []);

  return (
    <div 
      className="min-h-screen"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
