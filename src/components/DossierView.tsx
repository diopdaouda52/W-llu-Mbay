import React, { useState } from 'react';
import { DOSSIER_DELIVERABLES, DeliverableSection } from '../data/dossierSections';
import { 
  FileText, 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  Download, 
  Layers, 
  ShieldAlert, 
  BarChart3, 
  Cpu, 
  Database, 
  ListTodo, 
  Layout, 
  DollarSign, 
  Compass 
} from 'lucide-react';

export const DossierView: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>('livrable-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedDeliverable = DOSSIER_DELIVERABLES.find((d) => d.id === selectedSectionId) || DOSSIER_DELIVERABLES[0];

  const filteredDeliverables = searchQuery.trim() === ''
    ? DOSSIER_DELIVERABLES
    : DOSSIER_DELIVERABLES.filter(
        (d) => 
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.content.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const getSectionIcon = (number: string) => {
    switch (number) {
      case '01': return <FileText className="w-4 h-4" />;
      case '02': return <BarChart3 className="w-4 h-4" />;
      case '03': return <Layers className="w-4 h-4" />;
      case '04': return <Cpu className="w-4 h-4" />;
      case '05': return <Database className="w-4 h-4" />;
      case '06': return <ListTodo className="w-4 h-4" />;
      case '07': return <Layout className="w-4 h-4" />;
      case '08': return <DollarSign className="w-4 h-4" />;
      case '09': return <Compass className="w-4 h-4" />;
      case '10': return <ShieldAlert className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleCopyFullDossier = () => {
    const fullText = DOSSIER_DELIVERABLES.map((d) => {
      let tableText = '';
      if (d.keyTables) {
        tableText = d.keyTables.map((t) => {
          const headerLine = `| ${t.headers.join(' | ')} |`;
          const sepLine = `| ${t.headers.map(() => '---').join(' | ')} |`;
          const rows = t.rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
          return `\n\n### ${t.caption}\n${headerLine}\n${sepLine}\n${rows}`;
        }).join('\n');
      }
      return `# LIVRABLE ${d.number} : ${d.title}\n\n${d.summary}\n\n${d.content}${tableText}\n\n---\n`;
    }).join('\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-8">
      {/* Dossier Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <span>Dossier de Conception & Stratégie Produit</span>
            <span aria-hidden="true">·</span>
            <span>MVP 4 Mois & Feuille de Route 18 Mois</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Les 10 Livrables Stratégiques & Techniques de Wàllu-Mbay
          </h2>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Documentation complète, chiffrée et opposable aux bailleurs (FONSIS, DER/FJ, BNDE, Banque Mondiale).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/wallu-mbay-source-code.zip"
            download="wallu-mbay-source-code.zip"
            className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger Code Source (ZIP)</span>
          </a>
          <button
            onClick={handleCopyFullDossier}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white flex items-center gap-2 transition-all shadow-sm"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Dossier copié !' : 'Copier Dossier (MD)'}</span>
          </button>
        </div>
      </div>

      {/* Main split: Sidebar with 10 deliverables + Active content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-4 space-y-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher dans les livrables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1.5">
            {filteredDeliverables.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedSectionId(item.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                  selectedSectionId === item.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  selectedSectionId === item.id
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {getSectionIcon(item.number)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span className={selectedSectionId === item.id ? 'text-emerald-400 font-bold' : 'text-slate-400 font-semibold'}>
                      Livrable {item.number}
                    </span>
                  </div>
                  <div className="font-semibold text-xs leading-snug truncate">
                    {item.title}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${selectedSectionId === item.id ? 'text-emerald-400' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>
        </aside>

        {/* Content Viewer */}
        <main className="lg:col-span-8 p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span>Livrable Stratégique n° {selectedDeliverable.number}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {selectedDeliverable.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2">
              {selectedDeliverable.summary}
            </p>
          </div>

          {/* Formatted Content */}
          <div className="prose dark:prose-invert max-w-none text-xs md:text-sm text-slate-700 dark:text-slate-300 space-y-4 whitespace-pre-line leading-relaxed">
            {selectedDeliverable.content}
          </div>

          {/* Formatted Tables if any */}
          {selectedDeliverable.keyTables && selectedDeliverable.keyTables.map((table, tIdx) => (
            <div key={tIdx} className="space-y-2 pt-4">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {table.caption}
              </h4>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      {table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-3.5 py-2.5 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    {table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className={`px-3.5 py-2.5 ${cIdx === 0 ? 'font-medium text-slate-900 dark:text-white' : ''}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};
