
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert.jsx';

export default function SecurityWarning({ title, children }) {
  return (
    <Alert variant="destructive" className="mb-6">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-3"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
        <div>
          <AlertTitle>{title || "Security First!"}</AlertTitle>
          <AlertDescription>
            {children || "This is a simulated environment. Never use real private keys, seed phrases, or passwords here or on any untrusted site."}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
}
