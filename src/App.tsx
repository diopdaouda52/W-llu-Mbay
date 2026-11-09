import React, { useState } from 'react';
import { ValuePropositionView } from './components/ValuePropositionView';
import { DossierView } from './components/DossierView';
import { MvpDemoView } from './components/MvpDemoView';
import { Language } from './types';
import { 
  Sparkles, 
  FileText, 
  Terminal, 
  Globe2, 
  Moon, 
  Sun, 
  Layers, 
  ExternalLink,
  Download,
  FolderArchive,
  CheckCircle2
} from 'lucide-react';
import { generateAndDownloadProjectZip } from './utils/sourceZip';

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<'proposition' | 'dossier' | 'mvp'>('proposition');
  const [language, setLanguage] = useState<Language>('fr');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);

  const handleDownloadZip = async () => {
    try {
      setDownloadProgress('Téléchargement en cours...');
      // Try direct link first
      const link = document.createElement('a');
      link.href = '/waloumbay-source-code.zip';
      link.download = 'waloumbay-source-code.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadProgress('Archive ZIP téléchargée !');
      setTimeout(() => setDownloadProgress(null), 4000);
    } catch {
      // Fallback to JSZip builder
      await generateAndDownloadProjectZip((msg) => setDownloadProgress(msg));
      setTimeout(() => setDownloadProgress(null), 4000);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors`}>
      {/* 
        TOP BAR CONTRACT:
        Zone 1: Single text wordmark
        Zone 2: 4-5 single-line clean nav links
        Zone 3: 1 primary CTA
      */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
            WalouMbay
          </span>
          <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
            B2B
          </span>
        </div>

        {/* Zone 2: Single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => setActiveMainTab('proposition')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeMainTab === 'proposition' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''
            }`}
          >
            {language === 'wo' ? 'Proposition de Valeur' : 'Proposition de Valeur'}
          </button>
          <button 
            onClick={() => setActiveMainTab('dossier')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeMainTab === 'dossier' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''
            }`}
          >
            {language === 'wo' ? '10 Livrables' : '10 Livrables Stratégiques'}
          </button>
          <button 
            onClick={() => setActiveMainTab('mvp')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeMainTab === 'mvp' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''
            }`}
          >
            {language === 'wo' ? 'Démo MVP' : 'Prototype MVP Interactif'}
          </button>
          <a 
            href="#impact" 
            onClick={() => setActiveMainTab('proposition')}
            className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {language === 'wo' ? 'Impact Sénégal' : 'Impact Circulaire UEMOA'}
          </a>
        </nav>

        {/* Zone 3: 1 Primary CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadZip}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-xl transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadProgress || 'Télécharger ZIP (3 MB)'}</span>
          </button>
        </div>
      </header>

      {/* Download Alert Notice Bar if active */}
      {downloadProgress && (
        <div className="bg-emerald-600 text-white text-xs px-6 py-2 flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            {downloadProgress}
          </span>
          <span className="font-mono text-[11px]">waloumbay-source-code.zip</span>
        </div>
      )}

      {/* Workspace Secondary Utility Bar (Segmented Switcher, Language & Theme) */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Segmented Mode Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveMainTab('proposition')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeMainTab === 'proposition'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Proposition de Valeur</span>
          </button>

          <button
            onClick={() => setActiveMainTab('dossier')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeMainTab === 'dossier'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-500" />
            <span>Dossier 10 Livrables</span>
          </button>

          <button
            onClick={() => setActiveMainTab('mvp')}
            className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeMainTab === 'mvp'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-sky-500" />
            <span>Simulateur MVP Terrain</span>
          </button>
        </div>

        {/* Language & Theme Controls */}
        <div className="flex items-center gap-3">
          {/* Language toggle Français / Wolof */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                language === 'fr'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              FR (Français)
            </button>
            <button
              onClick={() => setLanguage('wo')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                language === 'wo'
                  ? 'bg-white dark:bg-slate-700 text-amber-700 dark:text-amber-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              WO (Wolof)
            </button>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Changer de thème"
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeMainTab === 'proposition' && (
          <ValuePropositionView language={language} />
        )}

        {activeMainTab === 'dossier' && (
          <DossierView />
        )}

        {activeMainTab === 'mvp' && (
          <MvpDemoView language={language} />
        )}
      </main>

      {/* Quiet, Anti-Slop Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">WalouMbay</span>
            <span aria-hidden="true">·</span>
            <span>AgroTech B2B & Économie Circulaire au Sénégal (Dakar, Thiès, Kaolack, Casamance, Saint-Louis)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Conformité Loi 2008-12 (CDP Sénégal)</span>
            <span aria-hidden="true">·</span>
            <span>Intégrations Wave & Orange Money</span>
            <span aria-hidden="true">·</span>
            <span>Devise : FCFA (XOF)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
