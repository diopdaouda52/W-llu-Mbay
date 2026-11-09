import React, { useState } from 'react';
import { 
  PERSONAS_DATA, 
  VALUE_PROPOSITION_CORE, 
  FILIERES_DATA 
} from '../data/dossierContent';
import { Language, FilierePreset } from '../types';
import { 
  TrendingUp, 
  ShieldCheck, 
  RefreshCw, 
  Coins, 
  CheckCircle2, 
  ArrowRight, 
  Volume2, 
  Building2, 
  MapPin, 
  Scale, 
  Leaf, 
  Sparkles,
  Smartphone
} from 'lucide-react';

interface Props {
  language: Language;
}

export const ValuePropositionView: React.FC<Props> = ({ language }) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('fatou');
  const [selectedFiliereId, setSelectedFiliereId] = useState<string>('mangue');
  const [rawVolumeKg, setRawVolumeKg] = useState<number>(5000);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [activeTargetTab, setActiveTargetTab] = useState<'all' | 'transformateur' | 'cooperative' | 'acheteur'>('all');

  const selectedPersona = PERSONAS_DATA.find((p) => p.id === selectedPersonaId) || PERSONAS_DATA[0];
  const selectedFiliere: FilierePreset = FILIERES_DATA.find((f) => f.id === selectedFiliereId) || FILIERES_DATA[0];

  // Circular calculations
  const finishedVolume = Math.round(rawVolumeKg * (selectedFiliere.primaryYieldPercent / 100));
  const finishedRevenue = finishedVolume * selectedFiliere.finishedProductPrice;
  const rawCost = rawVolumeKg * selectedFiliere.defaultUnitCost;
  
  const byProductsCalculated = selectedFiliere.byProducts.map((bp) => {
    const volume = Math.round(rawVolumeKg * (bp.yieldPercent / 100));
    const revenue = volume * bp.marketPricePerKg;
    const co2Avoided = Math.round(volume * bp.co2AvoidedFactor);
    return { ...bp, volume, revenue, co2Avoided };
  });

  const totalByProductsRevenue = byProductsCalculated.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalCo2Avoided = byProductsCalculated.reduce((acc, curr) => acc + curr.co2Avoided, 0);
  const traditionalNet = finishedRevenue - rawCost;
  const circularNet = traditionalNet + totalByProductsRevenue;
  const marginBoostPercent = traditionalNet > 0 ? Math.round((totalByProductsRevenue / traditionalNet) * 100) : 0;

  const filteredPillars = activeTargetTab === 'all' 
    ? VALUE_PROPOSITION_CORE.pillars 
    : VALUE_PROPOSITION_CORE.pillars.filter((p) => p.target === activeTargetTab || p.target === 'tous');

  const handleSimulateVoice = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 4500);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 text-white">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-luminosity">
          <img 
            src="/src/assets/images/wallu_hero_processing_1794177916316.jpg" 
            alt="Atelier agroalimentaire au Sénégal" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 p-6 md:p-12 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-950/60 border border-amber-500/30 rounded-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Architecture AgroTech & Économie Circulaire UEMOA</span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {language === 'wo' 
              ? 'WalouMbay: Denc sa mbay, wàllu sa liggey, doli sa xaalis'
              : VALUE_PROPOSITION_CORE.heroTitle}
          </h1>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {language === 'wo'
              ? 'Platform bu njëkk ci UEMOA bu lay dimbali nga xam sa rendement ci biir usine, jëfandikoo sous-produit yi te jaay leen ci bourse B2B, te am ay bind yu wóor ngir am lebu banque ak Wave.'
              : VALUE_PROPOSITION_CORE.heroSubtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs md:text-sm text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> 100% Offline-First (Sans Internet)
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Bourse B2B Sous-produits
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-sky-400 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Wave / Orange Money direct
            </span>
          </div>

          {/* Audio voice preview bar */}
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                <Volume2 className="w-4 h-4" />
                <span>{language === 'wo' ? 'Déglul ci Wolof (Vocal pour opérateurs de terrain)' : 'Synthèse vocale Wolof intégrée (Accessibilité ouvriers non lettrés)'}</span>
              </div>
              <p className="text-xs text-slate-400 italic">
                « As-salaamu alaykum. WalouMbay jël na 5 000 kilo mangoor. Xooch yi ak doolli yi am nañu 380 000 FCFA ci jëndkat yi. »
              </p>
            </div>
            <button
              onClick={handleSimulateVoice}
              disabled={isPlayingAudio}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isPlayingAudio 
                  ? 'bg-amber-500 text-slate-950 animate-pulse' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? 'Lecture en Wolof...' : 'Écouter le pitch Wolof'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Target Segments Filter & 4 Pillars */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {language === 'wo' ? 'Li mu lay jariñ' : 'Les 4 Piliers Fondamentaux'}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {language === 'wo' ? 'Bénéfices bu baax ci transformateur yi ak coopératives' : 'Pourquoi WalouMbay transforme l’Agribusiness ouest-africain'}
            </h2>
          </div>

          {/* Interactive filter buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTargetTab('all')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTargetTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setActiveTargetTab('transformateur')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTargetTab === 'transformateur'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Transformateurs & Usines
            </button>
            <button
              onClick={() => setActiveTargetTab('cooperative')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTargetTab === 'cooperative'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Coopératives & GIE
            </button>
            <button
              onClick={() => setActiveTargetTab('acheteur')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTargetTab === 'acheteur'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Acheteurs Sous-produits
            </button>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPillars.map((pillar) => (
            <div 
              key={pillar.id}
              className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                    {pillar.id === 'p1' && <Scale className="w-5 h-5" />}
                    {pillar.id === 'p2' && <RefreshCw className="w-5 h-5" />}
                    {pillar.id === 'p3' && <ShieldCheck className="w-5 h-5" />}
                    {pillar.id === 'p4' && <Coins className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-mono-numbers">
                    {pillar.gainChiffre}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {language === 'wo' ? pillar.wolofTitle : pillar.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {pillar.summary}
                </p>

                {/* Contrast Before vs With Walou */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-red-50/60 dark:bg-red-950/30 border border-red-200/60 dark:border-red-900/40">
                    <span className="font-semibold text-red-800 dark:text-red-400 block mb-1">
                      Sans WalouMbay (Actuel)
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">{pillar.baseline}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
                    <span className="font-semibold text-emerald-800 dark:text-emerald-400 block mb-1">
                      Avec WalouMbay
                    </span>
                    <p className="text-slate-700 dark:text-slate-300">{pillar.withWallu}</p>
                  </div>
                </div>

                {/* Operational key points */}
                <ul className="space-y-1.5 pt-2">
                  {pillar.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Circular Economy & ROI Simulator */}
      <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-50/60 via-white to-emerald-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-amber-200/80 dark:border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Leaf className="w-4 h-4" />
              <span>Simulateur d'Économie Circulaire & Revenu Additionnel</span>
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Calculez la valeur cachée de vos sous-produits au Sénégal
            </h3>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
              Sélectionnez une filière et un tonnage de matière première entrante pour constater le gain de trésorerie net généré par WalouMbay.
            </p>
          </div>

          {/* Filière Selector */}
          <div className="flex flex-wrap gap-2">
            {FILIERES_DATA.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFiliereId(f.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedFiliereId === f.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {f.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Volume Slider */}
        <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <label className="font-semibold text-slate-800 dark:text-slate-200">
              Volume de matière brute traitée par campagne :
            </label>
            <span className="text-base font-bold text-amber-700 dark:text-amber-400 font-mono-numbers">
              {rawVolumeKg.toLocaleString('fr-FR')} kg ({ (rawVolumeKg / 1000).toFixed(1) } tonnes)
            </span>
          </div>
          <input
            type="range"
            min={1000}
            max={50000}
            step={1000}
            value={rawVolumeKg}
            onChange={(e) => setRawVolumeKg(Number(e.target.value))}
            className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>1 Tonne (Petit GIE)</span>
            <span>10 Tonnes (PME Moyenne)</span>
            <span>50 Tonnes (Usine Industrielle)</span>
          </div>
        </div>

        {/* Simulation Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Produit Fini Principal</span>
            <div className="text-lg font-bold text-slate-900 dark:text-white font-mono-numbers">
              {finishedVolume.toLocaleString('fr-FR')} kg
            </div>
            <p className="text-xs text-slate-500 mt-1 truncate">{selectedFiliere.finishedProduct}</p>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-2 font-mono-numbers">
              CA : {finishedRevenue.toLocaleString('fr-FR')} FCFA
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
            <span className="text-xs text-amber-800 dark:text-amber-300 block mb-1">Revenu Sous-Produits Walou</span>
            <div className="text-xl font-extrabold text-amber-700 dark:text-amber-400 font-mono-numbers">
              +{totalByProductsRevenue.toLocaleString('fr-FR')} FCFA
            </div>
            <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-1">
              {byProductsCalculated.reduce((acc, c) => acc + c.volume, 0).toLocaleString('fr-FR')} kg valorisés
            </p>
            <div className="text-xs font-semibold text-amber-900 dark:text-amber-200 mt-2 font-mono-numbers">
              Marge nette : +{marginBoostPercent}% de profit
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
            <span className="text-xs text-emerald-800 dark:text-emerald-300 block mb-1">Impact Climat & Déchets</span>
            <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono-numbers">
              {totalCo2Avoided.toLocaleString('fr-FR')} kg CO₂e
            </div>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-1">
              Émissions évitées (décharges)
            </p>
            <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 mt-2">
              Dossier ESG éligible bailleurs
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Gain Global Usine</span>
            <div className="text-xl font-extrabold text-white font-mono-numbers">
              {circularNet.toLocaleString('fr-FR')} FCFA
            </div>
            <p className="text-xs text-slate-400 mt-1">
              vs {traditionalNet.toLocaleString('fr-FR')} FCFA sans WalouMbay
            </p>
            <div className="text-xs text-emerald-400 mt-2 font-semibold">
              Rembourse le SaaS en 12 jours
            </div>
          </div>
        </div>

        {/* Byproducts breakdown table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Sous-Produit Généré</th>
                <th className="px-4 py-3 font-semibold">Nom en Wolof</th>
                <th className="px-4 py-3 font-semibold text-right">Volume</th>
                <th className="px-4 py-3 font-semibold text-right">Prix Bourse</th>
                <th className="px-4 py-3 font-semibold text-right">Valeur Marchande</th>
                <th className="px-4 py-3 font-semibold">Débouché / Acheteur Partenaire</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              {byProductsCalculated.map((bp, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{bp.name}</td>
                  <td className="px-4 py-3 italic text-amber-700 dark:text-amber-400">{bp.wolofName}</td>
                  <td className="px-4 py-3 text-right font-mono-numbers font-medium">{bp.volume.toLocaleString('fr-FR')} kg</td>
                  <td className="px-4 py-3 text-right font-mono-numbers">{bp.marketPricePerKg} FCFA/kg</td>
                  <td className="px-4 py-3 text-right font-mono-numbers font-bold text-emerald-600 dark:text-emerald-400">
                    {bp.revenue.toLocaleString('fr-FR')} FCFA
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{bp.targetBuyer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3 Personas Détaillés Section */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
            {language === 'wo' ? 'Nit ñi nga xamne dañuy jëfandikoo WalouMbay' : 'Analyse Approfondie des Cibles'}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {language === 'wo' ? '3 Personas yu gën a am solo' : '3 Personas Clés au Sénégal & Trajectoires de Valeur'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Découvrez comment WalouMbay résout les blocages réels de terrain pour une transformatrice, un président de coopérative et un acheteur industriel de sous-produits.
          </p>
        </div>

        {/* Persona Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PERSONAS_DATA.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setSelectedPersonaId(persona.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                selectedPersonaId === persona.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-medium mb-1">
                <span className={selectedPersonaId === persona.id ? 'text-amber-400' : 'text-slate-500'}>
                  {persona.region}
                </span>
                <span className="text-xs font-mono-numbers">Persona {persona.id === 'fatou' ? '1' : persona.id === 'moussa' ? '2' : '3'}</span>
              </div>
              <div className="font-bold text-base">{persona.name}</div>
              <div className={`text-xs mt-1 truncate ${selectedPersonaId === persona.id ? 'text-slate-300' : 'text-slate-500'}`}>
                {persona.title}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Persona Deep Dive Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedPersona.name}</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {selectedPersona.wolofTitle}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                {selectedPersona.organization}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {selectedPersona.region} · Filières : {selectedPersona.filiere}
              </p>
            </div>

            {/* Persona KPI Strip */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3">
              {selectedPersona.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 text-center min-w-[120px]">
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono-numbers">{m.value}</div>
                  <div className="text-[11px] font-medium text-slate-800 dark:text-slate-200 mt-0.5">{m.label}</div>
                  <div className="text-[10px] text-slate-400">{m.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Verbatim Quote */}
          <blockquote className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border-l-4 border-amber-500 text-slate-800 dark:text-slate-200 text-sm md:text-base italic leading-relaxed">
            {selectedPersona.quote}
          </blockquote>

          {/* Pain Points vs Gains vs Wàllu Solution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pain Points */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <span>✕ Frustrations & Douleurs Actuelles</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {selectedPersona.painPoints.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-red-50/40 dark:bg-red-950/20">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Gains */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span>✓ Gains Recherchés (Job-To-Be-Done)</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {selectedPersona.gains.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/20">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WalouMbay Solution */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                <span>★ La Réponse WalouMbay</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {selectedPersona.walluSolution.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-sky-50/40 dark:bg-sky-950/20">
                    <span className="text-sky-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Access to Finance Section */}
      <section className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              Facilitation du Financement Bancaire & Bailleurs
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Comment WalouMbay rend les PME et Coopératives « Bankables »
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs md:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              1. Stocks Gagés & Warrantage Numérique
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Génération automatique d’attestations d’inventaire infalsifiables horodatées. La BNDE ou La Banque Agricole (LBA) peut auditer à distance le volume exact de paddy ou de mangues en chambre froide avant de débloquer le prêt.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              2. Flux de Trésorerie Vérifiés (Mobile Money)
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Rapprochement automatisé des réceptions de matière première avec les paiements réels Wave et Orange Money. Fini les bilans déclaratifs rejetés par la DER/FJ : les transactions sont traçables et bancarisées.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="font-bold text-slate-900 dark:text-white text-sm">
              3. Ratios ESG & Économie Circulaire
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Indicateurs précis de déchets détournés et de CO₂ évité répondant aux critères d'impact des bailleurs internationaux (FONSIS, Banque Mondiale, Enabel, AFD, USAID) pour accéder aux subventions vertes à taux zéro.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
