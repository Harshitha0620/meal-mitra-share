
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initSampleData } from './lib/db'

// Initialize sample data
initSampleData();

createRoot(document.getElementById("root")!).render(<App />);
