import JSZip from 'jszip';
import { DOSSIER_DELIVERABLES } from '../data/dossierSections';

export async function generateAndDownloadProjectZip(onProgress?: (msg: string) => void) {
  if (onProgress) onProgress('Initialisation de l’archive ZIP...');
  const zip = new JSZip();

  // Root files
  zip.file('.env.example', `# GEMINI_API_KEY: Clé API optionnelle
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: URL de l'application
APP_URL="http://localhost:3000"
`);

  zip.file('.gitignore', `node_modules
dist
.env
*.log
`);

  zip.file('index.html', `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WalouMbay | AgroTech B2B & Économie Circulaire UEMOA</title>
    <meta name="description" content="SaaS B2B de pilotage de la transformation agro-alimentaire, traçabilité HACCP et valorisation des sous-produits pour le Sénégal et l'espace UEMOA." />
    <meta property="og:title" content="WalouMbay | AgroTech B2B & Économie Circulaire UEMOA" />
    <meta property="og:description" content="SaaS B2B de pilotage de la transformation agro-alimentaire, traçabilité HACCP et valorisation des sous-produits pour le Sénégal et l'espace UEMOA." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`);

  zip.file('package.json', JSON.stringify({
    name: "wallu-mbay",
    private: true,
    version: "1.0.0",
    description: "SaaS B2B de gestion agro-industrielle et valorisation des sous-produits au Sénégal / UEMOA",
    type: "module",
    scripts: {
      dev: "vite --port=3000 --host=0.0.0.0",
      build: "vite build",
      preview: "vite preview",
      lint: "tsc --noEmit"
    },
    dependencies: {
      "@tailwindcss/vite": "^4.3.3",
      "@vitejs/plugin-react": "^6.1.1",
      "jszip": "^3.10.1",
      "lucide-react": "^0.546.0",
      "motion": "^12.23.24",
      "react": "^19.0.1",
      "react-dom": "^19.0.1",
      "tailwindcss": "^4.3.3",
      "vite": "^8.3.0"
    },
    devDependencies: {
      "@types/jszip": "^3.4.1",
      "@types/node": "^22.14.0",
      "@types/react": "^19.3.0",
      "@types/react-dom": "^19.3.0",
      "typescript": "^7.0.2"
    }
  }, null, 2));

  zip.file('tsconfig.json', JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      experimentalDecorators: true,
      useDefineForClassFields: false,
      module: "ESNext",
      types: ["vite/client"],
      lib: ["ES2022", "DOM", "DOM.Iterable"],
      skipLibCheck: true,
      moduleResolution: "bundler",
      isolatedModules: true,
      moduleDetection: "force",
      allowJs: true,
      jsx: "react-jsx",
      paths: {
        "@/*": ["./*"]
      },
      noEmit: true
    },
    exclude: ["dist"]
  }, null, 2));

  zip.file('vite.config.ts', `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
`);

  zip.file('README.md', `# WalouMbay | AgroTech B2B & Économie Circulaire UEMOA

> « Denc sa mbay, wàllu sa liggey, doli sa xaalis » (Sécuriser la récolte, rentabiliser le travail, multiplier les gains)

Plateforme SaaS B2B de pilotage de la transformation agro-alimentaire, traçabilité HACCP et valorisation des sous-produits pour le Sénégal (Dakar, Thiès, Kaolack, Casamance, Saint-Louis) et l'espace UEMOA.

## 🚀 Fonctionnalités Clés
- **100% Offline-First (PWA) :** Enregistrement des pesées de quai sans connexion 3G/4G, synchronisation automatique en tâche de fond.
- **Bilingue Wolof & Français :** Interface accessible aux ouvriers peu lettrés avec guidage vocal et grandes icônes tactiles.
- **Bourse B2B de Sous-Produits :** Monétisation automatique des co-produits (tourteaux d'arachide, son de riz, coques de cajou, pulpe de mangue) pour provenderies et biofertilisants.
- **Traçabilité Inviolable :** Génération de QR Codes cryptographiques pour conformité DPV / HACCP / ISO 22000.
- **FinTech Mobile Money :** Rapprochement et paiements instantanés via API Wave et Orange Money.

## 📦 Installation & Démarrage Local

\`\`\`bash
# 1. Cloner ou dézipper le projet
cd waloumbay

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement Vite
npm run dev

# 4. Ouvrir l'application
# Rendez-vous sur http://localhost:3000
\`\`\`

## 📂 Structure du Projet
- \`src/components/ValuePropositionView.tsx\` : Proposition de valeur détaillée, 3 personas, simulateur d'économie circulaire & ROI.
- \`src/components/DossierView.tsx\` : Les 10 livrables stratégiques et techniques exhaustifs.
- \`src/components/MvpDemoView.tsx\` : Prototype opérationnel avec simulateur hors-ligne et modules métiers.
- \`src/data/dossierSections.ts\` : Contenu structuré des livrables et tableaux comparatifs.
- \`src/data/dossierContent.ts\` : Filières sénégalaises et données chiffrées de valorisation.
- \`src/types.ts\` : Interfaces TypeScript.
`);

  // Dossier complet markdown
  if (onProgress) onProgress('Compilation du dossier stratégique (10 livrables)...');
  const fullDossierMarkdown = DOSSIER_DELIVERABLES.map((d) => {
    let tableText = '';
    if (d.keyTables) {
      tableText = d.keyTables.map((t) => {
        const headerLine = `| ${t.headers.join(' | ')} |`;
        const sepLine = `| ${t.headers.map(() => '---').join(' | ')} |`;
        const rows = t.rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
        return `\n\n### ${t.caption}\n${headerLine}\n${sepLine}\n${rows}`;
      }).join('\n');
    }
    return `# LIVRABLE ${d.number} : ${d.title}\n\n**Synthèse :** ${d.summary}\n\n${d.content}${tableText}\n\n---\n`;
  }).join('\n');

  zip.file('DOSSIER_CONCEPTION_WALOUMBAY.md', fullDossierMarkdown);

  // Source files
  if (onProgress) onProgress('Ajout des composants TypeScript et CSS...');
  const srcFolder = zip.folder('src');
  if (srcFolder) {
    srcFolder.file('main.tsx', `import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
`);

    srcFolder.file('index.css', `@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  }
  
  .font-mono-numbers {
    font-family: 'JetBrains Mono', monospace;
    font-variant-numeric: tabular-nums;
  }
}
`);

    // Fetch or package component contents
    try {
      const respApp = await fetch('/src/App.tsx');
      if (respApp.ok) srcFolder.file('App.tsx', await respApp.text());
    } catch {}

    try {
      const respTypes = await fetch('/src/types.ts');
      if (respTypes.ok) srcFolder.file('types.ts', await respTypes.text());
    } catch {}

    const compFolder = srcFolder.folder('components');
    if (compFolder) {
      try {
        const respVal = await fetch('/src/components/ValuePropositionView.tsx');
        if (respVal.ok) compFolder.file('ValuePropositionView.tsx', await respVal.text());
      } catch {}
      try {
        const respDos = await fetch('/src/components/DossierView.tsx');
        if (respDos.ok) compFolder.file('DossierView.tsx', await respDos.text());
      } catch {}
      try {
        const respMvp = await fetch('/src/components/MvpDemoView.tsx');
        if (respMvp.ok) compFolder.file('MvpDemoView.tsx', await respMvp.text());
      } catch {}
    }

    const dataFolder = srcFolder.folder('data');
    if (dataFolder) {
      try {
        const respDc = await fetch('/src/data/dossierContent.ts');
        if (respDc.ok) dataFolder.file('dossierContent.ts', await respDc.text());
      } catch {}
      try {
        const respDs = await fetch('/src/data/dossierSections.ts');
        if (respDs.ok) dataFolder.file('dossierSections.ts', await respDs.text());
      } catch {}
    }
  }

  if (onProgress) onProgress('Compression du fichier ZIP...');
  const blob = await zip.generateAsync({ type: 'blob' });

  // Trigger download in browser
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = 'waloumbay-source-code.zip';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(downloadUrl);

  if (onProgress) onProgress('Téléchargement terminé !');
}
