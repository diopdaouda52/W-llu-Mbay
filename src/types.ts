export type Language = 'fr' | 'wo';

export interface Persona {
  id: string;
  name: string;
  title: string;
  wolofTitle: string;
  organization: string;
  region: string;
  filiere: string;
  quote: string;
  painPoints: string[];
  gains: string[];
  walluSolution: string[];
  metrics: {
    label: string;
    value: string;
    sub: string;
  }[];
}

export interface ValuePillar {
  id: string;
  title: string;
  wolofTitle: string;
  target: 'transformateur' | 'cooperative' | 'acheteur' | 'tous';
  baseline: string;
  withWallu: string;
  gainChiffre: string;
  summary: string;
  points: string[];
}

export interface FilierePreset {
  id: string;
  name: string;
  rawMaterial: string;
  finishedProduct: string;
  primaryYieldPercent: number; // e.g. 12% for dried mango, 45% for peanut oil
  byProducts: {
    name: string;
    wolofName: string;
    yieldPercent: number;
    targetBuyer: string;
    marketPricePerKg: number; // FCFA
    co2AvoidedFactor: number; // kg CO2e / kg diverted
  }[];
  defaultUnitCost: number; // FCFA/kg raw
  finishedProductPrice: number; // FCFA/kg finished
}

export interface LotEntrant {
  id: string;
  code: string;
  producteur: string;
  localite: string;
  produit: string;
  quantiteKg: number;
  prixAchatKg: number;
  tauxHumidite: number;
  brixOuCalibre: string;
  statut: 'conforme' | 'rejete' | 'en_quarantaine';
  dateReception: string;
  modePaiement: 'Wave' | 'Orange Money' | 'Virement BNDE' | 'Especes';
  statutPaiement: 'Payé' | 'En attente' | 'Acompte versé';
}

export interface MarketplaceOffer {
  id: string;
  titre: string;
  vendeur: string;
  localite: string;
  coproduit: string;
  quantiteDispoKg: number;
  prixUnitaireKg: number;
  filiereValorisation: 'Alimentation animale (Provende)' | 'Compost & Biofertilisant' | 'Biogaz & Énergie' | 'Biocharbon / Briquettes';
  co2EviteKg: number;
  badgeQualite: string;
  contact: string;
}

export interface OfflineAction {
  id: string;
  timestamp: number;
  actionType: 'CREATE_LOT' | 'START_OF' | 'RECORD_BYPRODUCT' | 'SETTLE_PAYMENT';
  payload: any;
  synced: boolean;
}
