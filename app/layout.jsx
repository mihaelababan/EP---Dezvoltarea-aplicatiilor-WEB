import CssBaseline from '@mui/material/CssBaseline';
import './globals.css';

export const metadata = {
  title: 'To Do App'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>
  
            <CssBaseline />
            
            <main>
              {children}
            </main>
      </body>
    </html>
  );
}