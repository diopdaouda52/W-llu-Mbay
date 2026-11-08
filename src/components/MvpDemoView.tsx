import React, { useState } from 'react';
import { Language, LotEntrant, MarketplaceOffer, OfflineAction } from '../types';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle2, 
  Plus, 
  QrCode, 
  Scale, 
  Layers, 
  Coins, 
  Building2, 
  Clock, 
  Share2, 
  ShoppingCart,
  Send,
  AlertTriangle,
  Leaf
} from 'lucide-react';

interface Props {
  language: Language;
}

const INITIAL_LOTS: LotEntrant[] = [
  {
    id: 'lot-01',
    code: 'LOT-MG-2026-042',
    producteur: 'Groupement Villageois de Djibélor',
    localite: 'Ziguinchor (Casamance)',
    produit: 'Mangue Kent Bio',
    quantiteKg: 4200,
    prixAchatKg: 240,
    tauxHumidite: 11.2,
    brixOuCalibre: '14° Brix (Excellent)',
    statut: 'conforme',
    dateReception: '08 Nov 2026, 09:15',
    modePaiement: 'Wave',
    statutPaiement: 'Payé',
  },
  {
    id: 'lot-02',
    code: 'LOT-AR-2026-118',
    producteur: 'El Hadj Babacar Ndao',
    localite: 'Nioro du Rip (Kaolack)',
    produit: 'Arachide 55-437 décortiquée',
    quantiteKg: 6800,
    prixAchatKg: 460,
    tauxHumidite: 8.4,
    brixOuCalibre: 'Calibre 1 (Export)',
    statut: 'conforme',
    dateReception: '08 Nov 2026, 11:30',
    modePaiement: 'Orange Money',
    statutPaiement: 'Payé',
  },
  {
    id: 'lot-03',
    code: 'LOT-RZ-2026-089',
    producteur: 'Coopérative Rizicole de Ndiaye',
    localite: 'Dagana (Saint-Louis)',
    produit: 'Paddy Sahel 108 brut',
    quantiteKg: 12500,
    prixAchatKg: 195,
    tauxHumidite: 13.8,
    brixOuCalibre: 'Pureté variétale 98%',
    statut: 'conforme',
    dateReception: '07 Nov 2026, 16:45',
    modePaiement: 'Wave',
    statutPaiement: 'Payé',
  },
];

const INITIAL_MARKETPLACE: MarketplaceOffer[] = [
  {
    id: 'mkt-01',
    titre: 'Tourteau d’Arachide de Première Pression (Riche en protéines 48%)',
    vendeur: 'Huilerie Artisanale du Baol SARL',
    localite: 'Kaolack (Zone Industrielle)',
    coproduit: 'Tourteau d’arachide',
    quantiteDispoKg: 8500,
    prixUnitaireKg: 310,
    filiereValorisation: 'Alimentation animale (Provende)',
    co2EviteKg: 15300,
    badgeQualite: 'Aflatoxines < 4 ppb (Certifié ITA)',
    contact: '+221 77 450 12 34',
  },
  {
    id: 'mkt-02',
    titre: 'Son de Riz Fin Stabilisé (Spécial Embouche Bovine & Ovine)',
    vendeur: 'Union Rizicole de Podor',
    localite: 'Podor (Vallée du Fleuve)',
    coproduit: 'Son de riz',
    quantiteDispoKg: 14000,
    prixUnitaireKg: 135,
    filiereValorisation: 'Alimentation animale (Provende)',
    co2EviteKg: 16800,
    badgeQualite: 'Humidité 9.1% · Zéro moisissure',
    contact: '+221 78 320 88 90',
  },
  {
    id: 'mkt-03',
    titre: 'Noyaux de Mangues Séchés pour Beurre & Savonnerie Artisanale',
    vendeur: 'GIE Bio Casamance Fruits',
    localite: 'Oussouye (Casamance)',
    coproduit: 'Noyaux de mangue',
    quantiteDispoKg: 3200,
    prixUnitaireKg: 190,
    filiereValorisation: 'Compost & Biofertilisant',
    co2EviteKg: 4480,
    badgeQualite: 'Séchage solaire hygiénique',
    contact: '+221 76 512 40 00',
  },
  {
    id: 'mkt-04',
    titre: 'Coques d’Arachide Broyées pour Briquettes de Biocharbon',
    vendeur: 'Décortiqueuse Ndiaye & Frères',
    localite: 'Fatick',
    coproduit: 'Coques d’arachide',
    quantiteDispoKg: 22000,
    prixUnitaireKg: 40,
    filiereValorisation: 'Biocharbon / Briquettes',
    co2EviteKg: 46200,
    badgeQualite: 'Pouvoir calorifique élevé (PCI > 4200 kcal)',
    contact: '+221 77 900 11 22',
  },
];

export const MvpDemoView: React.FC<Props> = ({ language }) => {
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'reception' | 'production' | 'marketplace' | 'traceabilite'>('reception');
  const [lots, setLots] = useState<LotEntrant[]>(INITIAL_LOTS);
  const [offlineQueue, setOfflineQueue] = useState<OfflineAction[]>([]);
  const [marketplaceOffers, setMarketplaceOffers] = useState<MarketplaceOffer[]>(INITIAL_MARKETPLACE);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<LotEntrant | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // New lot form state
  const [newProducer, setNewProducer] = useState('');
  const [newLocation, setNewLocation] = useState('Thiès');
  const [newProduct, setNewProduct] = useState('Mangue Kent Bio');
  const [newWeight, setNewWeight] = useState<number>(1500);
  const [newPriceKg, setNewPriceKg] = useState<number>(250);
  const [newMoisture, setNewMoisture] = useState<number>(10.5);
  const [newPaymentMode, setNewPaymentMode] = useState<'Wave' | 'Orange Money'>('Wave');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Toggle offline simulator
  const toggleOffline = () => {
    setIsOffline(!isOffline);
  };

  // Synchronize offline queue
  const handleSyncQueue = () => {
    if (offlineQueue.length === 0) return;
    setIsSyncing(true);
    setTimeout(() => {
      setOfflineQueue([]);
      setIsSyncing(false);
    }, 1500);
  };

  // Add new lot
  const handleAddLot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProducer.trim()) return;

    const newLotCode = `LOT-${newProduct.slice(0, 2).toUpperCase()}-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newLot: LotEntrant = {
      id: `lot-${Date.now()}`,
      code: newLotCode,
      producteur: newProducer,
      localite: newLocation,
      produit: newProduct,
      quantiteKg: Number(newWeight),
      prixAchatKg: Number(newPriceKg),
      tauxHumidite: Number(newMoisture),
      brixOuCalibre: '13.5° Brix (Conforme)',
      statut: 'conforme',
      dateReception: 'À l’instant (08 Nov 2026)',
      modePaiement: newPaymentMode,
      statutPaiement: 'Payé',
    };

    setLots([newLot, ...lots]);

    if (isOffline) {
      const action: OfflineAction = {
        id: `act-${Date.now()}`,
        timestamp: Date.now(),
        actionType: 'CREATE_LOT',
        payload: newLot,
        synced: false,
      };
      setOfflineQueue([...offlineQueue, action]);
    }

    setNewProducer('');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const handleBookOffer = (offer: MarketplaceOffer) => {
    setBookingSuccess(`Réservation confirmée pour ${offer.quantiteDispoKg.toLocaleString('fr-FR')} kg de ${offer.coproduit} ! Notification transmise à ${offer.vendeur}.`);
    setTimeout(() => setBookingSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Controls Top Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Coopérative Agro-Industrielle Saloum & Casamance</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                Tenant Actif
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              NINEA : 008941258 2A3 · Devise : Franc CFA (XOF)
            </p>
          </div>
        </div>

        {/* Offline Toggle & Sync Queue Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleOffline}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isOffline
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-emerald-600 text-white shadow-sm'
            }`}
          >
            {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            <span>
              {isOffline 
                ? (language === 'wo' ? 'Mode Brousse / Hors-ligne (Simulateur)' : 'Mode Hors-Ligne Actif (Brousse)') 
                : (language === 'wo' ? 'Am na Connexion (4G/Wi-Fi)' : 'En Ligne (Synchronisé)')}
            </span>
          </button>

          {offlineQueue.length > 0 && (
            <button
              onClick={handleSyncQueue}
              disabled={isOffline || isSyncing}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isOffline
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>
                {isSyncing 
                  ? 'Synchro...' 
                  : `${offlineQueue.length} ${language === 'wo' ? 'ci xaar' : 'en attente'}`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Offline banner notice */}
      {isOffline && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              <strong>Simulation mode déconnecté :</strong> Aucune connexion 4G requise. Les réceptions de pesée et ordres de fabrication s'enregistrent instantanément dans la base locale IndexedDB.
            </span>
          </div>
          <span className="font-mono font-bold text-xs">{offlineQueue.length} transactions locales</span>
        </div>
      )}

      {/* Booking confirmation notice */}
      {bookingSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{bookingSuccess}</span>
        </div>
      )}

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('reception')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'reception'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>{language === 'wo' ? 'Dencum Mbay (Pesée & Entrée)' : 'Module 1 : Réception & Pesée Quai'}</span>
        </button>

        <button
          onClick={() => setActiveTab('production')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'production'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{language === 'wo' ? 'Liggey bi (Ordre Fabrication)' : 'Module 2 : Production & Rendement'}</span>
        </button>

        <button
          onClick={() => setActiveTab('marketplace')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'marketplace'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{language === 'wo' ? 'Bourse Sous-produits (Séddalé)' : 'Module 4 : Bourse B2B Sous-produits'}</span>
        </button>

        <button
          onClick={() => setActiveTab('traceabilite')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'traceabilite'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>{language === 'wo' ? 'Yoonu Prodwi (Traçabilité QR)' : 'Module 3 : Traçabilité HACCP & QR'}</span>
        </button>
      </div>

      {/* TAB 1: Réception & Pesée Quai */}
      {activeTab === 'reception' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Saisie mobile quai */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-600" />
                <span>{language === 'wo' ? 'Bind pesée bu bees' : 'Enregistrer une Pesée de Lot'}</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">Pesée Offline</span>
            </div>

            <form onSubmit={handleAddLot} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {language === 'wo' ? 'Turu Mbaykat bi (Producteur)' : 'Producteur / Fournisseur'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: Mamadou Ba (GIE Casamance)"
                  value={newProducer}
                  onChange={(e) => setNewProducer(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    {language === 'wo' ? 'Prodwi bi' : 'Matière Première'}
                  </label>
                  <select
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Mangue Kent Bio">Mangue Kent Bio</option>
                    <option value="Arachide décortiquée">Arachide décortiquée</option>
                    <option value="Riz paddy brut">Riz paddy brut</option>
                    <option value="Noix de cajou RCN">Noix de cajou RCN</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Région / Localité
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    {language === 'wo' ? 'Kilo yi (Poids Net kg)' : 'Poids Réceptionné (kg)'}
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={25000}
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono-numbers font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Prix Achat (FCFA / kg)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={2000}
                    value={newPriceKg}
                    onChange={(e) => setNewPriceKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono-numbers font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Taux Humidité (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMoisture}
                    onChange={(e) => setNewMoisture(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono-numbers"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Paiement Immédiat
                  </label>
                  <select
                    value={newPaymentMode}
                    onChange={(e) => setNewPaymentMode(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Wave">Wave (Frais 1%)</option>
                    <option value="Orange Money">Orange Money</option>
                  </select>
                </div>
              </div>

              {/* Total Calculation card */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">Total à verser au producteur</span>
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono-numbers">
                    {(newWeight * newPriceKg).toLocaleString('fr-FR')} FCFA
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400">Réf. Wave automatique</span>
                  <div className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                    Déclenchement direct
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'wo' ? 'Valider ak fay ci Wave' : 'Valider la Pesée & Payer par Wave'}</span>
              </button>

              {formSubmitted && (
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 text-center text-xs font-semibold animate-pulse">
                  Lot enregistré avec succès dans la base locale !
                </div>
              )}
            </form>
          </div>

          {/* Registre des réceptions */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'wo' ? 'Lots yi ñu denc tay' : 'Registre des Lots Entrants Récents'}
              </h3>
              <span className="text-xs text-slate-500 font-mono-numbers">
                {lots.length} lots enregistrés
              </span>
            </div>

            <div className="space-y-3">
              {lots.map((lot) => (
                <div
                  key={lot.id}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white font-mono">
                        {lot.code}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        {lot.produit}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {lot.producteur} · {lot.localite}
                    </p>
                    <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                      <span>Humidité : {lot.tauxHumidite}%</span>
                      <span>·</span>
                      <span>{lot.brixOuCalibre}</span>
                      <span>·</span>
                      <span>{lot.dateReception}</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2">
                    <div className="text-right">
                      <div className="font-bold text-sm text-slate-900 dark:text-white font-mono-numbers">
                        {lot.quantiteKg.toLocaleString('fr-FR')} kg
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold font-mono-numbers">
                        {(lot.quantiteKg * lot.prixAchatKg).toLocaleString('fr-FR')} FCFA ({lot.modePaiement})
                      </div>
                    </div>

                    <button
                      onClick={() => setShowQrModal(lot)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>QR Code</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Production & Rendement */}
      {activeTab === 'production' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Ordre de Fabrication en Cours (OF-2026-089)
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Ligne de Séchage Mangue Kent Export (5 000 kg engagés)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                Étape : Four Séchage Solaire Actif
              </span>
            </div>
          </div>

          {/* Steps progress */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
              <span className="text-emerald-800 dark:text-emerald-300 font-bold block mb-1">1. Tri & Lavage</span>
              <p className="text-slate-600 dark:text-slate-300">5 000 kg reçus</p>
              <span className="text-[10px] text-emerald-600 font-semibold">100% terminé</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
              <span className="text-emerald-800 dark:text-emerald-300 font-bold block mb-1">2. Parage & Épluchage</span>
              <p className="text-slate-600 dark:text-slate-300">1 850 kg pulpe nette</p>
              <span className="text-[10px] text-amber-600 font-semibold">3 150 kg résidus extraits</span>
            </div>
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 animate-pulse">
              <span className="text-sky-800 dark:text-sky-300 font-bold block mb-1">3. Séchage (58°C)</span>
              <p className="text-slate-600 dark:text-slate-300">Cycle 18h en cours</p>
              <span className="text-[10px] text-sky-600 font-semibold">Humidité cible : 12%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 opacity-60">
              <span className="text-slate-600 dark:text-slate-400 font-bold block mb-1">4. Conditionnement</span>
              <p className="text-slate-500">Cartons export 5 kg</p>
              <span className="text-[10px] text-slate-400">En attente</span>
            </div>
          </div>

          {/* Mass balance comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Rendement Théorique vs Réel Constaté
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Rendement théorique recette :</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono-numbers">12.0% (600 kg)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Rendement réel estimé :</span>
                  <span className="font-bold text-emerald-600 font-mono-numbers">11.8% (590 kg)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Écart de rendement :</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono-numbers">-1.6% (Conforme tolérance)</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-amber-600" />
                  <span>Coproduits Générés Automatiquement par cet OF</span>
                </h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Noyaux riches en matière grasse :</span>
                  <span className="font-bold text-amber-900 dark:text-amber-300 font-mono-numbers">1 250 kg (Valeur: 225 000 FCFA)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">Pelures & pulpes pour méthanisation :</span>
                  <span className="font-bold text-amber-900 dark:text-amber-300 font-mono-numbers">1 900 kg (Valeur: 123 500 FCFA)</span>
                </div>
                <div className="pt-2 border-t border-amber-200 dark:border-amber-900 flex justify-between font-bold">
                  <span className="text-amber-900 dark:text-amber-200">Total valorisable sur la bourse :</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono-numbers">+348 500 FCFA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Bourse des Sous-Produits B2B */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 text-white">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                Place de Marché Circulaire Agro B2B · Sénégal & UEMOA
              </span>
              <h3 className="text-xl md:text-2xl font-bold">
                Bourse des Sous-Produits & Gisements Industriels
              </h3>
              <p className="text-xs text-amber-100">
                Achetez et vendez directement tourteaux, sons, coques et pulpes certifiés sans intermédiaires.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-amber-200 block">Taux de valorisation national</span>
              <div className="text-2xl font-extrabold font-mono-numbers">78.4%</div>
              <span className="text-[10px] text-amber-200">82 500 kg transigés ce mois</span>
            </div>
          </div>

          {/* Grid of Offers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketplaceOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-700 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                      {offer.filiereValorisation}
                    </span>
                    <span className="text-xs text-slate-400">{offer.localite}</span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {offer.titre}
                  </h4>

                  <p className="text-xs text-slate-500">
                    Vendeur vérifié : <span className="font-medium text-slate-700 dark:text-slate-300">{offer.vendeur}</span>
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span>Certification :</span>
                      <span className="font-semibold text-emerald-600">{offer.badgeQualite}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impact Climat :</span>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400 font-mono-numbers">
                        🌱 {offer.co2EviteKg.toLocaleString('fr-FR')} kg CO₂ évité
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Prix unitaire</span>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono-numbers">
                      {offer.prixUnitaireKg} FCFA <span className="text-xs font-normal text-slate-400">/ kg</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono-numbers">
                      Dispo : {offer.quantiteDispoKg.toLocaleString('fr-FR')} kg
                    </span>
                  </div>

                  <button
                    onClick={() => handleBookOffer(offer)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Réserver le lot</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Traçabilité HACCP & QR Code */}
      {activeTab === 'traceabilite' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              Généalogie de Lot & Conformité DPV / ISO 22000
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Passeport Numérique & Traçabilité Inviolable du Champ au Carton
            </h3>
            <p className="text-xs text-slate-500">
              Chaque produit fini génère un certificat numérique infalsifiable accessible par scan QR code pour les douanes, acheteurs export et inspecteurs phytosanitaires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 flex flex-col items-center text-center space-y-3">
              <div className="w-32 h-32 bg-white p-2 rounded-xl border border-slate-300 shadow-sm flex items-center justify-center">
                {/* Visual SVG QR Code representation */}
                <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="10" y="10" width="25" height="25" rx="3" />
                  <rect x="65" y="10" width="25" height="25" rx="3" />
                  <rect x="10" y="65" width="25" height="25" rx="3" />
                  <rect x="17" y="17" width="11" height="11" fill="white" />
                  <rect x="72" y="17" width="11" height="11" fill="white" />
                  <rect x="17" y="72" width="11" height="11" fill="white" />
                  <rect x="42" y="15" width="16" height="8" />
                  <rect x="45" y="30" width="10" height="15" />
                  <rect x="15" y="45" width="20" height="8" />
                  <rect x="65" y="45" width="15" height="15" />
                  <rect x="42" y="65" width="12" height="20" />
                  <rect x="60" y="75" width="25" height="10" />
                </svg>
              </div>
              <span className="font-mono text-xs font-bold text-purple-900 dark:text-purple-300">
                SN-HACCP-2026-MG-089
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Scan public DPV & Contrôle des Fraudes
              </p>
            </div>

            <div className="md:col-span-2 space-y-3 text-xs">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Données d’Audit Vérifiées par Horodatage
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Origine des Fruits :</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Djibélor, Casamance (Lot LOT-MG-042)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Producteurs identifiés :</span>
                  <span className="font-semibold text-slate-900 dark:text-white">12 petits producteurs membres du GIE</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Analyses Sanitaires :</span>
                  <span className="font-semibold text-emerald-600">Zéro résidu pesticide · Zéro salmonelle (ITA Dakar)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Paiement Agriculteur :</span>
                  <span className="font-semibold text-sky-600">Certifié Wave Business #WV-98214-SN</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sous-produits valorisés associés :</span>
                  <span className="font-semibold text-amber-600">1 250 kg noyaux vendus à Savonnerie Baol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800 text-center">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Ticket de Pesée Sécurisé
            </h3>
            <div className="w-40 h-40 mx-auto bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center">
              <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                <rect x="10" y="10" width="25" height="25" rx="3" />
                <rect x="65" y="10" width="25" height="25" rx="3" />
                <rect x="10" y="65" width="25" height="25" rx="3" />
                <rect x="17" y="17" width="11" height="11" fill="white" />
                <rect x="72" y="17" width="11" height="11" fill="white" />
                <rect x="17" y="72" width="11" height="11" fill="white" />
                <rect x="42" y="15" width="16" height="8" />
                <rect x="45" y="30" width="10" height="15" />
                <rect x="15" y="45" width="20" height="8" />
                <rect x="65" y="45" width="15" height="15" />
                <rect x="42" y="65" width="12" height="20" />
                <rect x="60" y="75" width="25" height="10" />
              </svg>
            </div>
            <div className="text-xs space-y-1 font-mono">
              <div className="font-bold text-slate-900 dark:text-white">{showQrModal.code}</div>
              <div className="text-slate-500">{showQrModal.producteur}</div>
              <div className="text-emerald-600 font-bold">
                {showQrModal.quantiteKg.toLocaleString('fr-FR')} kg · {(showQrModal.quantiteKg * showQrModal.prixAchatKg).toLocaleString('fr-FR')} FCFA
              </div>
            </div>
            <button
              onClick={() => setShowQrModal(null)}
              className="w-full py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
