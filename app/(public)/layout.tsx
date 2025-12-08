// app/layout.tsx (Example structure)

import '@/app/globals.css'; // Your global styles
import NavBar from '@/components/NavBar'; // Import the new component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* The NavBar is placed here so it wraps all children */}
        <NavBar /> 
        
        {children}
        
      </body>
    </html>
  );
}