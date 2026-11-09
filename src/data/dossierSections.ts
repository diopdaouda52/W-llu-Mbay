export interface DeliverableSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  content: string; // rich markdown-like or formatted text
  keyTables?: {
    caption: string;
    headers: string[];
    rows: (string | number)[][];
  }[];
}

export const DOSSIER_DELIVERABLES: DeliverableSection[] = [
  {
    id: 'livrable-1',
    number: '01',
    title: 'Synthèse du Concept, Proposition de Valeur & Personas',
    summary: 'Positionnement stratégique, proposition de valeur multilatérale et modélisation de 3 personas représentatifs du tissu agro-industriel sénégalais et ouest-africain.',
    content: `### 1.1 Énoncé Fondateur du Produit
**WalouMbay** (qui signifie en Wolof *"Sauver, Rentabiliser et Protéger l'Agriculture"*) est un SaaS B2B industriel et circulaire conçu pour combler le fossé technologique des unités de transformation agroalimentaire et coopératives d'Afrique de l'Ouest (Sénégal en tête, puis zone UEMOA : Mali, Côte d'Ivoire, Burkina Faso, Bénin, Togo, Niger, Guinée-Bissau).

### 1.2 La Proposition de Valeur Centrale
> **« Pour les PME agro-industrielles, coopératives et GIE d'Afrique de l'Ouest confrontés aux pertes post-récolte massives et au manque de traçabilité, WalouMbay est la première solution de pilotage industriel Offline-First qui monétise automatiquement les sous-produits sur une bourse B2B, garantit la conformité HACCP/export et génère les données certifiées nécessaires pour débloquer les financements bancaires. »**

### 1.3 Proposition Déclinée par Segment de Marché
1. **Pour les Unités de Transformation Industrielles & Semi-Industrielles (PME/ETI) :**
   - *Problème :* Marges grignotées par des rendements réels inconnus, coûts de gestion des déchets organiques, audits qualité laborieux.
   - *Promesse :* Réduction immédiate des pertes matière (-22%), gains additionnels de +15% à +35% de marge via la vente des coproduits, et dossier d'audit HACCP/ISO 22000 en 1 clic.
2. **Pour les Coopératives, GIE et Organisations Paysannes :**
   - *Problème :* Analphabétisme partiel, coupures réseau permanentes en brousse, fraudes et lenteurs lors des pesées.
   - *Promesse :* Application mobile tactile bilingue Wolof/Français, guidage vocal, mode 100% hors-ligne et paiements producteurs automatisés via Wave / Orange Money dès la pesée.
3. **Pour les Acheteurs & Valorisateurs de Sous-Produits (Provenderies, Éleveurs, Énergie) :**
   - *Problème :* Approvisionnement aléatoire, dépendance à des courtiers véreux, qualité et humidité variables.
   - *Promesse :* Visibilité prévisionnelle sur les flux de coproduits (tourteau, son, coques, pulpes), prix transparents, certificats d'analyses liés au lot d'origine et contrats d'enlèvement garantis.

### 1.4 Parcours Utilisateurs Clés (BPMN Synthétique)
- **Parcours 1 : Réception & Paiement Producteur (Quai Usine / Point de Collecte)**
  *Opérateur quai* pèse le camion/charrette (offline) -> Réfractomètre & humidimètre connectés ou saisis -> *WalouMbay* calcule le poids net réfractionné -> Génération du ticket de pesée avec QR Code -> Ordre de virement Mobile Money automatique (Wave/OM) -> Synchro cloud dès détection de réseau.
- **Parcours 2 : Lancement d'Ordre de Fabrication (OF) & Économie Circulaire**
  *Responsable production* sélectionne la recette (ex: 5 tonnes mangues Kent) -> *WalouMbay* alloue les lots entrants et génère 2 flux simultanés : Flux A (Produit fini : 600 kg mangues séchées) et Flux B (Coproduits : 1 100 kg noyaux + 1 750 kg pulpes résiduelles) -> Inscription automatique des coproduits sur la bourse B2B locale -> Matching avec acheteur de savonnerie ou provenderie.
- **Parcours 3 : Audit de Traçabilité & Exportation**
  *Inspecteur DPV (Direction de la Protection des Végétaux)* ou acheteur export scanne le QR code du carton fini -> Affichage instantané : parcelle source, date récolte, intrants utilisés, température de séchage, résultat d'analyses aflatoxines/pesticides.`,
  },
  {
    id: 'livrable-2',
    number: '02',
    title: 'Analyse de Marché, Concurrence & Facteurs Clés de Succès',
    summary: 'Taille du marché adressable au Sénégal et UEMOA, cartographie concurrentielle (ERP traditionnels vs logiciels locaux) et stratégie de différenciation radicale.',
    content: `### 2.1 Contexte & Données Chiffrées du Marché
- **Pertes post-récolte en Afrique de l'Ouest :** Entre 35% et 50% sur les filières horticoles (mangue, tomate, oignon) et 20% à 30% sur les céréales et légumineuses (arachide, riz, maïs). Représente plus de **250 milliards FCFA (~380M€)** de pertes annuelles rien qu'au Sénégal.
- **Sous-produits gaspillés :** Des centaines de milliers de tonnes de tourteau d'arachide, son de riz, coques d'anacarde et drêches sont sous-valorisées, alors que le Sénégal importe chaque année plus de 80 milliards FCFA d'intrants pour l'alimentation animale et le bétail.
- **Tissu industriel cible :**
  - **Sénégal :** ~850 PME/unités formelles agroalimentaires, 3 200 coopératives/GIE actives, 120 provenderies et unités d'engrais.
  - **Zone UEMOA (8 pays) :** Marché adressable initial de ~14 000 unités de transformation d'ici 3 ans.

### 2.2 Matrice Concurrentielle Analytique
WalouMbay se positionne à l'intersection unique entre **l'ERP agro-industriel de terrain**, **l'économie circulaire B2B** et la **fintech mobile money**.`,
    keyTables: [
      {
        caption: 'Tableau comparatif des solutions disponibles sur le marché',
        headers: ['Critères d’Évaluation', 'ERP Traditionnels (SAP, Odoo, Sage)', 'Solutions AgriTech Locales (Tolbi, Jokalante)', 'WalouMbay (Notre Positionnement)'],
        rows: [
          ['Connectivité & Déploiement', 'Cloud lourd dépendant du Web 4G/Fibre', 'SMS / USSD légers mais limités', 'Offline-First complet (IndexedDB + PWA)'],
          ['Gestion des sous-produits', 'Comptabilisés comme simple rebut / déchet', 'Absente (focus champ/météo)', 'Catalogue automatique + Bourse B2B intégrée'],
          ['Accessibilité linguistique', '100% Français technique ou Anglais', 'Wolof partiel', 'Interface Wolof/Français native + Voix'],
          ['Paiements intégrés', 'Virements bancaires Swift / SEPA lents', 'Non intégrés', 'Wave, Orange Money, Free Money, BNDE'],
          ['Traçabilité HACCP & Norme ISN', 'Complexe, paramétrage coûteux (>10M FCFA)', 'Traçabilité parcelle uniquement', 'Généalogie de lot complète du champ au carton'],
          ['Modèle de tarification', 'Licences prohibitives (>5M FCFA/an)', 'Subventionné / Bailleurs', 'SaaS mensuel adapté PME (35 000 à 180 000 FCFA)'],
        ],
      },
    ],
  },
  {
    id: 'livrable-3',
    number: '03',
    title: 'Périmètre Produit (MVP vs V2 vs V3) & Matrice MoSCoW',
    summary: 'Découpage du plan de développement : MVP en 4 mois pour validation terrain, V2 à 10 mois (Marketplace avancée & IoT), V3 à 18 mois (IA prédictive & Crédits Carbone).',
    content: `### 3.1 Philosophie du Découpage Produit
Pour garantir une mise sur le marché en 4 mois, le MVP se concentre exclusivement sur les **trois douleurs critiques** qui justifient un paiement immédiat : la pesée/réception sans erreur, le calcul du rendement réel par OF, et la traçabilité de lot avec QR code, complétés par le catalogue de sous-produits.`,
    keyTables: [
      {
        caption: 'Priorisation fonctionnelle MoSCoW (MVP 4 mois)',
        headers: ['Priorité MoSCoW', 'Fonctionnalités Clés MVP (M0 à M4)', 'Bénéfice Opérationnel'],
        rows: [
          ['Must Have (Obligatoire)', 'Réception des lots entrants & calcul poids net / humidité', 'Zéro perte documentaire au quai'],
          ['Must Have (Obligatoire)', 'Moteur Offline-First avec synchro locale et résolution conflits', 'Fonctionnement garanti en zone rurale blanche'],
          ['Must Have (Obligatoire)', 'Ordres de fabrication (OF) avec recettes fixes et rendements', 'Fin de l’illusion de rentabilité'],
          ['Must Have (Obligatoire)', 'Génération automatique de lots de sous-produits par OF', 'Visibilité immédiate des volumes à vendre'],
          ['Must Have (Obligatoire)', 'Génération de QR Code de traçabilité HACCP / lot fini', 'Conformité contrôles DPV et acheteurs export'],
          ['Must Have (Obligatoire)', 'Interface bilingue Français / Wolof avec gros boutons tactiles', 'Adoption par ouvriers peu lettrés'],
          ['Must Have (Obligatoire)', 'Paiement direct Wave / Orange Money des réceptions de lots', 'Sécurisation des transactions de quai'],
          ['Should Have (Important)', 'Place de marché B2B des sous-produits (annonces simples)', 'Mise en relation directe usines / provenderies'],
          ['Should Have (Important)', 'Alertes de seuil de stock (matières premières & emballages)', 'Éviter les ruptures de cartons en pleine saison'],
          ['Should Have (Important)', 'Export de rapports financiers et d’activité pour la BNDE / DER', 'Faciliter les demandes de crédit de campagne'],
          ['Could Have (Optionnel)', 'Synthèse vocale Wolof pour lecture des pesées et montants', 'Confort d’usage pour opérateurs non scolarisés'],
          ['Won’t Have (Reporté V2/V3)', 'Capteurs IoT pesée Bluetooth automatique / thermométrie', 'Planifié en V2 (mois 8-10)'],
          ['Won’t Have (Reporté V2/V3)', 'Contrats intelligents sur blockchain & certification carbone', 'Planifié en V3 (mois 14-18)'],
        ],
      },
    ],
  },
  {
    id: 'livrable-4',
    number: '04',
    title: 'Architecture Fonctionnelle & Technique Recommandée',
    summary: 'Stack technique robuste, stratégie Offline-First résiliente, protocole de synchronisation bidirectionnelle et intégrations API Mobile Money et cloud souverain.',
    content: `### 4.1 Choix de la Stack Technologique
- **Frontend Client (Mobile & Tablette de terrain) :**
  - **Framework :** React 19 / TypeScript avec Vite, configuré en Progressive Web App (PWA) installable sur Android 8+ (appareils d'entrée de gamme type Transsion Tecno/Infinix ou Samsung A04).
  - **Base de Données Locale :** IndexedDB encapsulé via RxDB ou WatermelonDB, garantissant des temps de réponse <50ms hors-ligne.
  - **Styles :** Tailwind CSS v4 optimisé pour écrans tactiles 360-430px jusqu'aux écrans de supervision 1440px.
- **Backend & API :**
  - **API Gateway :** Node.js / NestJS ou Fastify pour sa légèreté et son traitement asynchrone ultra-rapide.
  - **Base de Données Centrale :** PostgreSQL avec extensions JSONB et TimescaleDB pour l'historisation des lots industriels. Multi-tenant natif via Row-Level Security (RLS) par \`tenant_id\`.
  - **Moteur de Synchronisation :** Architecture Event-Sourced basée sur les CRDTs (Conflict-free Replicated Data Types) avec politique Last-Write-Wins (LWW) horodatée et journal d'audit des conflits.
- **Hébergement & Souveraineté :**
  - Cluster conteneurisé Docker / Kubernetes hébergé sur des datacenters régionaux certifiés Tier III (ex: Datacenter National du Sénégal à Diamniadio / Orange Business / AWS Afrique du Sud).
  - Conformité stricte avec la **Loi sénégalaise n° 2008-12** relative à la protection des données à caractère personnel (déclaration CDP Sénégal).

### 4.2 Stratégie Offline-First & Gestion des Conflits
1. **Mode Déconnecté Local :** Toute action (création de lot, pesée, validation d'étape de production) écrit immédiatement dans la base locale IndexedDB avec un statut \`sync_status = "PENDING"\` et génère un UUID v4 unique.
2. **File d'Attente de Synchronisation (Sync Queue) :** Un Service Worker écoute les événements réseau (\`navigator.onLine\`, \`BackgroundSync API\`). Dès qu'un paquet 3G/4G passe, la file d'attente pousse les deltas vers l'endpoint \`/api/v1/sync/push\`.
3. **Résolution des Conflits :**
   - *Données additives (Lots, Pesées, Tickets) :* Aucune collision possible (IDs décentralisés).
   - *Données de stocks :* Calcul différentiel par mouvements de stocks (\`stock_movement_ledger\`) plutôt que mise à jour directe d'une valeur absolue.
   - *En cas de litige :* Le rôle 'Superviseur Usine' reçoit une notification de réconciliation manuelle sur son tableau de bord.

### 4.3 Intégrations FinTech & Mobile Money
- **Wave Business API :** Déclenchement de paiements marchands instantanés vers les numéros des producteurs avec frais réduits à 1%, webhook de confirmation asynchrone.
- **Orange Money Webpay / B2W (Bank to Wallet) :** API Orange Developer Sénégal pour les coopérateurs ruraux non équipés de Wave.`,
  },
  {
    id: 'livrable-5',
    number: '05',
    title: 'Modèle de Données Conceptuel & Relationnel (MCD / MLD)',
    summary: 'Schéma de données exhaustif articulé autour des 14 entités pivots indispensables à la traçabilité agro-industrielle et à l’économie circulaire.',
    content: `### 5.1 Entités Maîtresses du Schéma Relationnel
Le modèle est conçu pour garantir l'inviolabilité de la chaîne généalogique : **Fournisseur -> Lot Entrant -> Ordre de Fabrication -> Lots Finis & Coproduits -> Expédition Client**.

1. \`tenants\` (Entreprises, Coopératives, GIE - ID, nom, NINEA, région, devise=XOF)
2. \`users\` (Opérateur, Chef d'usine, Contrôleur qualité, Comptable, Acheteur sous-produits)
3. \`suppliers\` (Producteurs, groupements villageois, coordonnées GPS, n° Wave/OM)
4. \`raw_lots\` (Lots matières premières : date, poids brut, tare, humidité, brix, prix unitaire, statut contrôle)
5. \`recipes\` (Nomenclatures industrielles : ratio rendement théorique, coproduits associés)
6. \`production_orders\` (OF : date début, date fin, quantité engagée, énergie consommée, opérateur)
7. \`production_steps\` (Étapes : tri/parage, lavage, séchage, cuisson, pressage, pasteurisation)
8. \`finished_lots\` (Produits finis : code lot unique, DLUO, QR Code cryptographique, volume)
9. \`byproduct_lots\` (Coproduits : type, volume estimé/réel, teneur humidité, valorisation recommandée)
10. \`marketplace_offers\` (Offres bourse B2B : prix/kg, quantité disponible, localisation gisement)
11. \`marketplace_orders\` (Commandes B2B : acheteur, conditions d'enlèvement, statut paiement séquestre)
12. \`stock_ledger\` (Journal universel des mouvements d'entrepôt : entrées, sorties, rebuts)
13. \`quality_inspections\` (Points HACCP, analyses microbiologiques, tests aflatoxines)
14. \`financial_transactions\` (Paiements Wave/OM/Banque, réconciliation, TVA, écriture OHADA)`,
  },
  {
    id: 'livrable-6',
    number: '06',
    title: 'User Stories MVP avec Critères d’Acceptation Gherkin',
    summary: 'Spécifications détaillées des 10 user stories les plus critiques pour le MVP de 4 mois, rédigées selon le standard BDD (Given / When / Then).',
    content: `### 6.1 Sélection des 10 User Stories Majeures

**US-01 : Réception et pesée de lot entrant en mode déconnecté**
- *En tant que :* Opérateur de quai à l'usine de Kaolack.
- *Je veux :* Enregistrer la pesée d'un chargement d'arachides d'un producteur sans connexion internet.
- *Afin de :* Ne pas bloquer la file d'attente des charrettes et formaliser le poids net contractuel.
\`\`\`gherkin
Scénario: Enregistrement réussi d'une pesée sans réseau
  Étant donné que la tablette de l'opérateur est hors-ligne (mode avion)
  Quand l'opérateur saisit le producteur "Abdoulaye Diallo", le poids brut "1 250 kg", la tare "50 kg" et l'humidité "9.5%"
  Alors le système calcule le poids net "1 200 kg" et le montant "540 000 FCFA"
  Et sauvegarde le lot localement avec le statut "En attente de synchronisation"
  Et imprime ou affiche un ticket de pesée avec identifiant local unique.
\`\`\`

**US-02 : Synchronisation automatique et réconciliation de données**
- *En tant que :* Système WalouMbay.
- *Je veux :* Détecter le retour du réseau Wi-Fi ou 3G/4G et expédier la file d'attente vers le cloud.
- *Afin de :* Mettre à jour l'inventaire central de l'usine sans écraser d'autres modifications simultanées.

**US-03 : Déclenchement d'un Ordre de Fabrication avec calcul automatique des rendements**
- *En tant que :* Responsable de production agro-industrielle.
- *Je veux :* Lancer un OF de séchage de mangues à partir de 3 lots entrants spécifiques.
- *Afin de :* Connaître instantanément le rendement théorique (12%) et le volume prévisionnel de coproduits (noyaux et peaux).

**US-04 : Génération automatique et mise en vente des coproduits industriels**
- *En tant que :* Gestionnaire d'usine d'huile d'arachide.
- *Je veux :* Que chaque tonne pressée génère automatiquement 530 kg de tourteau sur le module Bourse.
- *Afin de :* Trouver preneur auprès des provenderies locales avant que les sacs n'encombrent le hangar.

**US-05 : Génération d'étiquettes QR Code de traçabilité HACCP**
- *En tant que :* Contrôleur qualité.
- *Je veux :* Imprimer une étiquette QR Code pour chaque palette de mangues séchées destinées à l'export.
- *Afin que :* L'acheteur ou l'inspecteur phytosanitaire puisse remonter aux parcelles d'origine et aux étapes de séchage.

**US-06 : Paiement instantané du producteur via Wave / Orange Money**
- *En tant que :* Comptable de coopérative.
- *Je veux :* Valider le paiement d'un lot réceptionné d'un seul clic par API Wave.
- *Afin d' :* Éviter de manipuler des liasses de billets en zone rurale et supprimer les erreurs de caisse.

**US-07 : Réservation et achat de sous-produits par un industriel tiers**
- *En tant que :* Fabricant d'aliment de bétail à Pout.
- *Je veux :* Parcourir les gisements de son de riz disponibles dans un rayon de 50 km et réserver 10 tonnes.
- *Afin de :* Sécuriser l'approvisionnement de mon usine d'embouche sans rupture.

**US-08 : Bascule linguistique dynamique Français ⇄ Wolof**
- *En tant qu' :* Ouvrier saisonnier parlant wolof.
- *Je veux :* Utiliser l'application avec des termes clairs (*Denc, Mbay, Liggey, Xaalis*) et de grandes icônes.
- *Afin de :* Travailler de manière autonome sans faire d'erreurs de saisie.

**US-09 : Alertes de dérive de rendement et de pertes anormales**
- *En tant que :* Directeur général de coopérative.
- *Je veux :* Recevoir une alerte quand le taux de perte au parage dépasse 35%.
- *Afin d' :* Identifier immédiatement un problème de calibrage, de maturité ou de vol.

**US-10 : Génération du dossier financier pour crédit de campagne agricole**
- *En tant que :* Présidente de GIE.
- *Je veux :* Exporter un état certifié des stocks et des flux de vente des 6 derniers mois.
- *Afin de :* Déposer ma demande de crédit de 15 millions FCFA auprès de la BNDE ou de la DER/FJ.`,
  },
  {
    id: 'livrable-7',
    number: '07',
    title: 'Wireframes Textuels des 5 Écrans Clés',
    summary: 'Spécifications ergonomiques, zones fonctionnelles et arborescence tactile des 5 écrans pivots de l’application.',
    content: `### Écran 1 : Tableau de Bord Mobile Quai & Production (Home)
- **Top Bar :** Logo WalouMbay | Sélecteur Langue [FR/WO] | Badge Réseau [🟢 En ligne / 🟠 Hors-ligne (3 en attente)] | Profil Usine.
- **Bandeau KPI Supérieur :**
  - Kilos réceptionnés aujourd'hui (ex: 14 250 kg)
  - Rendement moyen atelier (ex: 84.2%)
  - Sous-produits générés à valoriser (ex: 4 800 kg)
  - Trésorerie décaissée Wave (ex: 3 850 000 FCFA)
- **Grandes Tuiles Tactiles Métiers :**
  - [📦 NOUVELLE PESÉE / ENTRÉE LOT] (Bouton géant émeraude avec micro)
  - [⚙️ LANCER UN ORDRE DE FABRICATION] (Bouton bleu industriel)
  - [♻️ BOURSE DES SOUS-PRODUITS] (Bouton ambre circulaire)
  - [🔍 SCANNER QR TRAÇABILITÉ] (Bouton violet contrôle)

### Écran 2 : Pesée & Réception de Lot (Formulaire Rapide de Terrain)
- **Zone 1 :** Choix Producteur (Recherche rapide par nom, village ou scan de carte QR du membre).
- **Zone 2 :** Données de Pesée (Poids Brut en gros caractères, Tare caisses, Humidité %, Degré Brix).
- **Zone 3 :** Calcul Automatique (Poids Net retenu x Prix au kg = Montant Net en FCFA).
- **Zone 4 :** Action (Bouton [VALIDER ET PAYER PAR WAVE] ou [ENREGISTRER EN CAISSE OFFLINE]).

### Écran 3 : Fiche Ordre de Fabrication & Nomenclatures
- **Entête :** OF-2026-089 | Filière : Mangue séchée bio | Lot MP source : LOT-MG-042.
- **Barre d'avancement :** [Tri/Lavage] -> [Parage] -> [Four Séchage] -> [Conditionnement].
- **Double Bilan Matière :**
  - *Flux Principal :* 5 000 kg mangues fraîches -> 580 kg mangues séchées export (Rendement : 11.6% vs 12% théorique).
  - *Flux Circulaire :* 1 650 kg noyaux (beurre) + 2 100 kg pulpes résiduelles (biogaz).
- **Bouton d'action :** [PUBLIER LES 3 750 KG SUR LA BOURSE B2B].

### Écran 4 : Bourse B2B & Valorisation des Sous-Produits
- **Filtres :** Provenderie avicole / Bovins / Compost / Bioénergie / Cosmétique.
- **Cartes Offres :**
  - Titre : *Tourteau d'arachide de presse artisanale (48% protéines)*
  - Usine : *Huilerie du Baol (Kaolack) · Dispo : 12.5 Tonnes*
  - Prix : *310 FCFA / kg · Humidité certifiée : 8.2%*
  - Impact : *🌱 22.5 Tonnes CO2 évitées · 100% valorisé*
  - CTA : [RÉSERVER LE LOT] / [CONTACTER DIRECTEMENT WHATSAPP].

### Écran 5 : Fiche Publique de Traçabilité (Scan QR Code Consommateur & DPV)
- **En-tête officiel :** Certificat de Traçabilité WalouMbay #SN-2026-HACCP-9812.
- **Généalogie du Produit :**
  - Date de conditionnement & DLUO.
  - Coopérative d'origine & Région de récolte (carte géo Sénégal).
  - Températures d'usinage et analyses microbiologiques (zéro salmonelle / aflatoxine).
  - Empreinte circulaire : *« Ce sachet a contribué à valoriser 2.4 kg de coproduits locaux »*.`,
  },
  {
    id: 'livrable-8',
    number: '08',
    title: 'Modèle Économique, Tarification & Seuil de Rentabilité',
    summary: 'Hybridation SaaS B2B + Commission sur la marketplace circulaire, projection financière à 3 ans et calcul du point mort (break-even).',
    content: `### 8.1 Les Deux Moteurs de Monétisation
1. **Abonnement SaaS B2B Récurrent (MRR) :** Facturé aux unités de transformation et coopératives pour l'accès aux modules ERP, traçabilité, offline et gestion de stocks.
2. **Commission sur les Transactions de Sous-Produits (Take Rate) :** 3% à 4.5% prélevés sur les volumes de coproduits vendus via la place de marché WalouMbay, payés par l'acheteur industriel.`,
    keyTables: [
      {
        caption: 'Grille tarifaire des abonnements WalouMbay (en FCFA et EUR)',
        headers: ['Formule', 'Cible Principale', 'Prix Mensuel (FCFA)', 'Équivalent EUR', 'Périmètre Inclus'],
        rows: [
          ['Formule « GIE / Koor-gi »', 'Petits GIE de femmes & coopératives villageoises (<50 tonnes/an)', '25 000 FCFA / mois', '~38 € / mois', '1 site, 3 utilisateurs, mode offline, pesée & Wave, traçabilité QR simple'],
          ['Formule « PME Agro / Usine »', 'Unités de transformation moyennes (50 à 500 tonnes/an)', '75 000 FCFA / mois', '~114 € / mois', '3 sites, utilisateurs illimités, ordres de fabrication, bourse sous-produits, rapports banques'],
          ['Formule « Agro-Industriel UEMOA »', 'Grandes huileries, rizeries industrielles, exportateurs (>500 t/an)', '190 000 FCFA / mois', '~290 € / mois', 'Multi-sociétés, intégration ERP/comptable, API dédiée, support 24/7, audit HACCP avancé'],
        ],
      },
      {
        caption: 'Compte d’exploitation prévisionnel synthétique (Années 1 à 3)',
        headers: ['Indicateur Financier (en Millions FCFA)', 'Année 1 (Lancement)', 'Année 2 (Croissance)', 'Année 3 (Expansion UEMOA)'],
        rows: [
          ['Nombre de clients abonnés (fin d’année)', '45 clients', '180 clients', '520 clients'],
          ['Volume sous-produits transigés (tonnes)', '1 200 tonnes', '8 500 tonnes', '32 000 tonnes'],
          ['Revenus SaaS Récurrents (MRR annuel)', '28.5 M FCFA', '124.0 M FCFA', '398.0 M FCFA'],
          ['Revenus Commission Marketplace (3.5%)', '8.4 M FCFA', '59.5 M FCFA', '246.4 M FCFA'],
          ['Chiffre d’Affaires Total', '36.9 M FCFA (~56 k€)', '183.5 M FCFA (~280 k€)', '644.4 M FCFA (~982 k€)'],
          ['Charges Opérationnelles (OPEX + R&D)', '48.0 M FCFA', '112.0 M FCFA', '295.0 M FCFA'],
          ['Résultat d’Exploitation (EBITDA)', '-11.1 M FCFA', '+71.5 M FCFA', '+349.4 M FCFA'],
        ],
      },
    ],
  },
  {
    id: 'livrable-9',
    number: '09',
    title: 'Plan de Mise sur le Marché (GTM) & Partenariats Stratégiques',
    summary: 'Stratégie de déploiement terrain sur 3 pôles géographiques (Casamance, Thiès/Niayes, Fleuve), alliances institutionnelles et KPIs de traction.',
    content: `### 9.1 Déploiement Pilote en 3 Pôles Écologiques
1. **Pôle Casamance (Ziguinchor, Sédhiou) :** Filières Mangue et Noix d'anacarde. Partenariat avec les coopératives de séchage de fruits et les unités artisanales d'amandes de cajou.
2. **Pôle Thiès / Bassin Arachidier (Thiès, Kaolack, Fatick) :** Filières Arachide et Maraîchage. Partenariat avec les presses artisanales d'huile et les provenderies avicoles de Rufisque/Pout.
3. **Pôle Vallée du Fleuve Sénégal (Saint-Louis, Dagana, Podor) :** Filière Rizicole. Partenariat avec les groupements de producteurs de paddy et les meuniers.

### 9.2 Alliances Institutionnelles & Bailleurs
- **Institut de Technologie Alimentaire (ITA) de Dakar :** Validation scientifique des rendements de référence et calibrage des recettes de sous-produits.
- **Direction de la Protection des Végétaux (DPV) & Direction du Commerce Intérieur :** Homologation du module de traçabilité QR Code pour les contrôles réglementaires.
- **DER/FJ (Délégation Générale à l'Entreprenariat Rapide des Femmes et des Jeunes) & FONSIS :** Intégration de WalouMbay comme outil recommandé pour les PME bénéficiaires de prêts agricoles.
- **Banques Partenaires (BNDE, La Banque Agricole - LBA) :** Mise en place d'un connecteur d'audit pour le scoring de crédit de campagne.`,
  },
  {
    id: 'livrable-10',
    number: '10',
    title: 'Matrice des Risques Majeurs & Plan de Mitigation',
    summary: 'Identification des 6 risques critiques (technologiques, humains, commerciaux et légaux) et protocoles de contournement.',
    content: `### 10.1 Cartographie et Réponses Stratégiques`,
    keyTables: [
      {
        caption: 'Matrice d’Analyse des Risques et Stratégies de Résilience',
        headers: ['Nature du Risque', 'Niveau d’Impact', 'Probabilité', 'Mesures de Mitigation WalouMbay'],
        rows: [
          [
            'Réseau telecom instable / coupures prolongées',
            'Critique',
            'Très Élevée',
            'Architecture Offline-First native : aucune dépendance au réseau pour peser, produire et imprimer des tickets ; synchronisation en tâche de fond.',
          ],
          [
            'Résistance au changement & faible littératie numérique',
            'Élevé',
            'Moyenne',
            'UI ultra-simplifiée en Wolof, grosses icônes contextuelles, assistance vocale, formation de « relais digitaux » dans chaque coopérative.',
          ],
          [
            'Contournement de la place de marché des sous-produits (désintermédiation)',
            'Moyen',
            'Élevée',
            'La valeur ne réside pas seulement dans la mise en relation, mais dans la certification qualité (humidité, protéines), la facturation normalisée et la logistique garantie.',
          ],
          [
            'Fluctuation saisonnière des volumes (périodes creuses)',
            'Moyen',
            'Certaine',
            'Multi-filières complémentaires : quand la campagne mangue s’achève (août), la campagne arachide et riz prend le relais (octobre à mars).',
          ],
          [
            'Sécurité et conformité des données (Loi 2008-12)',
            'Élevé',
            'Faible',
            'Chiffrement de bout en bout AES-256, hébergement régional souverain, formalisation des déclarations auprès de la CDP Sénégal dès le M+2.',
          ],
        ],
      },
    ],
  },
];
