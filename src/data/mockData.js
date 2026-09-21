import vitaminCImage from "../assets/medicines/vitamin-c-1000mg.jpg";

export const branches = [
  { id: "MAIN", name: "Gudang Utama", city: "Denpasar (Pusat)" },
  { id: "BR-01", name: "Cabang Sanur", city: "Sanur" },
  { id: "BR-02", name: "Cabang Ubud", city: "Ubud" },
  { id: "BR-03", name: "Cabang Kuta", city: "Kuta" },
  { id: "BR-04", name: "Cabang Renon", city: "Renon" },
];

// Branch-SKU stock snapshot, keyed by branch id. Each branch carries its own
// on-hand quantities, min/max thresholds and status so switching the branch
// selector shows a genuinely different picture instead of the same table.
export const stockByBranch = {
  "BR-01": [
    {
      sku: "PCM-500-10",
      name: "Paracetamol 500mg",
      form: "Tablet, strip isi 10",
      onHand: 42,
      inTransit: 0,
      min: 80,
      max: 300,
      batch: "PCM24-118",
      expiry: "2027-03-01",
      status: "below-min",
    },
    {
      sku: "AMX-500-CAP",
      name: "Amoxicillin 500mg",
      form: "Kapsul, strip isi 10",
      onHand: 96,
      inTransit: 60,
      min: 100,
      max: 250,
      batch: "AMX24-076",
      expiry: "2026-11-12",
      status: "below-min",
      rx: true,
    },
    {
      sku: "ORS-SACH",
      name: "Oral Rehydration Salt",
      form: "Sachet",
      onHand: 210,
      inTransit: 0,
      min: 100,
      max: 400,
      batch: "ORS23-054",
      expiry: "2027-06-20",
      status: "ok",
    },
    {
      sku: "CTZ-10-TAB",
      name: "Cetirizine 10mg",
      form: "Tablet, strip isi 10",
      onHand: 18,
      inTransit: 40,
      min: 60,
      max: 200,
      batch: "CTZ24-041",
      expiry: "2026-10-02",
      status: "critical",
    },
    {
      sku: "AMOXCLAV-625",
      name: "Amoxicillin-Clavulanate 625mg",
      form: "Tablet, strip isi 6",
      onHand: 30,
      inTransit: 0,
      min: 40,
      max: 150,
      batch: "AMC24-009",
      expiry: "2026-10-18",
      status: "near-expiry",
      rx: true,
    },
    {
      sku: "IBU-400-TAB",
      name: "Ibuprofen 400mg",
      form: "Tablet, strip isi 10",
      onHand: 140,
      inTransit: 0,
      min: 80,
      max: 300,
      batch: "IBU24-133",
      expiry: "2027-08-09",
      status: "ok",
    },
    {
      sku: "SALB-INH",
      name: "Salbutamol Inhaler 100mcg",
      form: "Inhaler, 200 dosis",
      onHand: 9,
      inTransit: 20,
      min: 15,
      max: 50,
      batch: "SLB24-021",
      expiry: "2026-12-30",
      status: "critical",
      rx: true,
    },
  ],
  "BR-02": [
    {
      sku: "PCM-500-10",
      name: "Paracetamol 500mg",
      form: "Tablet, strip isi 10",
      onHand: 150,
      inTransit: 0,
      min: 80,
      max: 300,
      batch: "PCM24-118",
      expiry: "2027-03-01",
      status: "ok",
    },
    {
      sku: "AMX-500-CAP",
      name: "Amoxicillin 500mg",
      form: "Kapsul, strip isi 10",
      onHand: 120,
      inTransit: 0,
      min: 100,
      max: 250,
      batch: "AMX24-076",
      expiry: "2026-11-12",
      status: "ok",
      rx: true,
    },
    {
      sku: "ORS-SACH",
      name: "Oral Rehydration Salt",
      form: "Sachet",
      onHand: 70,
      inTransit: 0,
      min: 100,
      max: 400,
      batch: "ORS23-054",
      expiry: "2027-06-20",
      status: "below-min",
    },
    {
      sku: "CTZ-10-TAB",
      name: "Cetirizine 10mg",
      form: "Tablet, strip isi 10",
      onHand: 130,
      inTransit: 0,
      min: 60,
      max: 200,
      batch: "CTZ24-041",
      expiry: "2026-10-02",
      status: "ok",
    },
    {
      sku: "AMOXCLAV-625",
      name: "Amoxicillin-Clavulanate 625mg",
      form: "Tablet, strip isi 6",
      onHand: 45,
      inTransit: 0,
      min: 40,
      max: 150,
      batch: "AMC24-009",
      expiry: "2026-10-18",
      status: "near-expiry",
      rx: true,
    },
    {
      sku: "IBU-400-TAB",
      name: "Ibuprofen 400mg",
      form: "Tablet, strip isi 10",
      onHand: 110,
      inTransit: 0,
      min: 80,
      max: 300,
      batch: "IBU24-133",
      expiry: "2027-08-09",
      status: "ok",
    },
    {
      sku: "SALB-INH",
      name: "Salbutamol Inhaler 100mcg",
      form: "Inhaler, 200 dosis",
      onHand: 22,
      inTransit: 0,
      min: 15,
      max: 50,
      batch: "SLB24-021",
      expiry: "2026-12-30",
      status: "ok",
      rx: true,
    },
  ],
  "BR-03": [
    {
      sku: "PCM-500-10",
      name: "Paracetamol 500mg",
      form: "Tablet, strip isi 10",
      onHand: 55,
      inTransit: 410,
      min: 90,
      max: 320,
      batch: "PCM24-118",
      expiry: "2027-03-01",
      status: "below-min",
    },
    {
      sku: "AMX-500-CAP",
      name: "Amoxicillin 500mg",
      form: "Kapsul, strip isi 10",
      onHand: 140,
      inTransit: 0,
      min: 100,
      max: 250,
      batch: "AMX24-076",
      expiry: "2026-11-12",
      status: "ok",
      rx: true,
    },
    {
      sku: "ORS-SACH",
      name: "Oral Rehydration Salt",
      form: "Sachet",
      onHand: 180,
      inTransit: 0,
      min: 100,
      max: 400,
      batch: "ORS23-054",
      expiry: "2027-06-20",
      status: "ok",
    },
    {
      sku: "CTZ-10-TAB",
      name: "Cetirizine 10mg",
      form: "Tablet, strip isi 10",
      onHand: 75,
      inTransit: 0,
      min: 60,
      max: 200,
      batch: "CTZ24-041",
      expiry: "2026-10-02",
      status: "ok",
    },
    {
      sku: "AMOXCLAV-625",
      name: "Amoxicillin-Clavulanate 625mg",
      form: "Tablet, strip isi 6",
      onHand: 20,
      inTransit: 0,
      min: 40,
      max: 150,
      batch: "AMC24-009",
      expiry: "2026-10-18",
      status: "critical",
      rx: true,
    },
    {
      sku: "IBU-400-TAB",
      name: "Ibuprofen 400mg",
      form: "Tablet, strip isi 10",
      onHand: 200,
      inTransit: 0,
      min: 80,
      max: 300,
      batch: "IBU24-133",
      expiry: "2027-08-09",
      status: "ok",
    },
    {
      sku: "SALB-INH",
      name: "Salbutamol Inhaler 100mcg",
      form: "Inhaler, 200 dosis",
      onHand: 30,
      inTransit: 0,
      min: 15,
      max: 50,
      batch: "SLB24-021",
      expiry: "2026-12-30",
      status: "ok",
      rx: true,
    },
  ],
  "BR-04": [
    {
      sku: "PCM-500-10",
      name: "Paracetamol 500mg",
      form: "Tablet, strip isi 10",
      onHand: 210,
      inTransit: 0,
      min: 80,
      max: 300,
      batch: "PCM24-118",
      expiry: "2027-03-01",
      status: "ok",
    },
    {
      sku: "AMX-500-CAP",
      name: "Amoxicillin 500mg",
      form: "Kapsul, strip isi 10",
      onHand: 70,
      inTransit: 180,
      min: 100,
      max: 250,
      batch: "AMX24-076",
      expiry: "2026-11-12",
      status: "below-min",
      rx: true,
    },
    {
      sku: "ORS-SACH",
      name: "Oral Rehydration Salt",
      form: "Sachet",
      onHand: 300,
      inTransit: 0,
      min: 100,
      max: 400,
      batch: "ORS23-054",
      expiry: "2027-06-20",
      status: "ok",
    },
    {
      sku: "CTZ-10-TAB",
      name: "Cetirizine 10mg",
      form: "Tablet, strip isi 10",
      onHand: 90,
      inTransit: 0,
      min: 60,
      max: 200,
      batch: "CTZ24-041",
      expiry: "2026-10-02",
      status: "ok",
    },
    {
      sku: "AMOXCLAV-625",
      name: "Amoxicillin-Clavulanate 625mg",
      form: "Tablet, strip isi 6",
      onHand: 55,
      inTransit: 0,
      min: 40,
      max: 150,
      batch: "AMC24-009",
      expiry: "2026-10-18",
      status: "near-expiry",
      rx: true,
    },
    {
      sku: "IBU-400-TAB",
      name: "Ibuprofen 400mg",
      form: "Tablet, strip isi 10",
      onHand: 260,
      inTransit: 0,
      min: 80,
      max: 300,
      batch: "IBU24-133",
      expiry: "2027-08-09",
      status: "ok",
    },
    {
      sku: "SALB-INH",
      name: "Salbutamol Inhaler 100mcg",
      form: "Inhaler, 200 dosis",
      onHand: 12,
      inTransit: 0,
      min: 15,
      max: 50,
      batch: "SLB24-021",
      expiry: "2026-12-30",
      status: "critical",
      rx: true,
    },
  ],
  MAIN: [
    {
      sku: "PCM-500-10",
      name: "Paracetamol 500mg",
      form: "Tablet, strip isi 10",
      onHand: 1200,
      inTransit: 0,
      min: 500,
      max: 3000,
      batch: "PCM24-118",
      expiry: "2027-03-01",
      status: "ok",
    },
    {
      sku: "AMX-500-CAP",
      name: "Amoxicillin 500mg",
      form: "Kapsul, strip isi 10",
      onHand: 850,
      inTransit: 0,
      min: 400,
      max: 2000,
      batch: "AMX24-076",
      expiry: "2026-11-12",
      status: "ok",
      rx: true,
    },
    {
      sku: "ORS-SACH",
      name: "Oral Rehydration Salt",
      form: "Sachet",
      onHand: 2100,
      inTransit: 0,
      min: 800,
      max: 4000,
      batch: "ORS23-054",
      expiry: "2027-06-20",
      status: "ok",
    },
    {
      sku: "CTZ-10-TAB",
      name: "Cetirizine 10mg",
      form: "Tablet, strip isi 10",
      onHand: 300,
      inTransit: 0,
      min: 400,
      max: 1500,
      batch: "CTZ24-041",
      expiry: "2026-10-02",
      status: "below-min",
    },
    {
      sku: "AMOXCLAV-625",
      name: "Amoxicillin-Clavulanate 625mg",
      form: "Tablet, strip isi 6",
      onHand: 180,
      inTransit: 0,
      min: 200,
      max: 800,
      batch: "AMC24-009",
      expiry: "2026-10-18",
      status: "near-expiry",
      rx: true,
    },
    {
      sku: "IBU-400-TAB",
      name: "Ibuprofen 400mg",
      form: "Tablet, strip isi 10",
      onHand: 1500,
      inTransit: 0,
      min: 600,
      max: 3000,
      batch: "IBU24-133",
      expiry: "2027-08-09",
      status: "ok",
    },
    {
      sku: "SALB-INH",
      name: "Salbutamol Inhaler 100mcg",
      form: "Inhaler, 200 dosis",
      onHand: 95,
      inTransit: 0,
      min: 100,
      max: 400,
      batch: "SLB24-021",
      expiry: "2026-12-30",
      status: "below-min",
      rx: true,
    },
  ],
};

export function getStockForBranch(branchId) {
  return stockByBranch[branchId] || [];
}

export const transfers = [
  {
    id: "TRF-2091",
    from: "MAIN",
    to: "BR-01",
    items: 3,
    units: 260,
    status: "in-transit",
    requested: "2026-09-16",
    eta: "2026-09-20",
  },
  {
    id: "TRF-2090",
    from: "MAIN",
    to: "BR-03",
    items: 5,
    units: 410,
    status: "dispatched",
    requested: "2026-09-15",
    eta: "2026-09-19",
  },
  {
    id: "TRF-2088",
    from: "MAIN",
    to: "BR-02",
    items: 2,
    units: 120,
    status: "delivered",
    requested: "2026-09-12",
    eta: "2026-09-16",
    variance: 0,
  },
  {
    id: "TRF-2085",
    from: "MAIN",
    to: "BR-04",
    items: 4,
    units: 300,
    status: "delivered",
    requested: "2026-09-10",
    eta: "2026-09-14",
    variance: -6,
  },
  {
    id: "TRF-2093",
    from: "MAIN",
    to: "BR-01",
    items: 1,
    units: 40,
    status: "pending-approval",
    requested: "2026-09-18",
    eta: "\u2014",
  },
];

// MAIN is the source warehouse for every transfer, so selecting it should
// surface the full movement log; any other branch only sees transfers
// touching that branch (incoming from MAIN, or outgoing back to MAIN).
export function getTransfersForBranch(branchId) {
  if (branchId === "MAIN") return transfers;
  return transfers.filter((t) => t.to === branchId || t.from === branchId);
}

export const replenishmentQueue = [
  {
    id: "RPL-4410",
    branch: "BR-01",
    sku: "CTZ-10-TAB",
    name: "Cetirizine 10mg",
    onHand: 18,
    min: 60,
    max: 200,
    suggestedQty: 182,
    reason: "Di bawah minimum",
    flag: "critical",
  },
  {
    id: "RPL-4411",
    branch: "BR-01",
    sku: "SALB-INH",
    name: "Salbutamol Inhaler 100mcg",
    onHand: 9,
    min: 15,
    max: 50,
    suggestedQty: 41,
    reason: "Di bawah minimum + ditandai cepat bergerak",
    flag: "critical",
    fastMoving: true,
  },
  {
    id: "RPL-4412",
    branch: "BR-03",
    sku: "PCM-500-10",
    name: "Paracetamol 500mg",
    onHand: 55,
    min: 90,
    max: 320,
    suggestedQty: 265,
    reason: "Di bawah minimum + ditandai cepat bergerak",
    flag: "warning",
    fastMoving: true,
  },
  {
    id: "RPL-4413",
    branch: "BR-04",
    sku: "AMX-500-CAP",
    name: "Amoxicillin 500mg",
    onHand: 70,
    min: 100,
    max: 250,
    suggestedQty: 180,
    reason: "Di bawah minimum",
    flag: "warning",
  },
];

// MAIN oversees replenishment across every branch, so it sees the full
// queue; a branch only sees suggestions raised for itself.
export function getReplenishmentForBranch(branchId) {
  if (branchId === "MAIN") return replenishmentQueue;
  return replenishmentQueue.filter((r) => r.branch === branchId);
}

export const forecastAtRisk = [
  {
    sku: "CTZ-10-TAB",
    name: "Cetirizine 10mg",
    branch: "BR-01",
    velocity7d: 14.2,
    velocity28dAvg: 6.1,
    change: "+133%",
    note: "Lonjakan sejak 14 Sep \u2014 di atas 2\u03c3 dari rata-rata bergerak",
  },
  {
    sku: "SALB-INH",
    name: "Salbutamol Inhaler 100mcg",
    branch: "BR-01",
    velocity7d: 3.4,
    velocity28dAvg: 1.5,
    change: "+127%",
    note: "Kenaikan berkelanjutan selama 9 hari",
  },
  {
    sku: "PCM-500-10",
    name: "Paracetamol 500mg",
    branch: "BR-03",
    velocity7d: 48.0,
    velocity28dAvg: 24.5,
    change: "+96%",
    note: "Lonjakan sejak 15 Sep \u2014 di atas 2\u03c3 dari rata-rata bergerak",
  },
  {
    sku: "ORS-SACH",
    name: "Oral Rehydration Salt",
    branch: "BR-02",
    velocity7d: 30.1,
    velocity28dAvg: 17.8,
    change: "+69%",
    note: "Tren naik, masih dalam kisaran musiman normal",
  },
];

// MAIN monitors demand signals across every branch; a branch only sees its
// own fast-moving / at-risk SKUs.
export function getForecastForBranch(branchId) {
  if (branchId === "MAIN") return forecastAtRisk;
  return forecastAtRisk.filter((f) => f.branch === branchId);
}

// POS catalog for the sale screen.
// genericName/description/dosageInstructions/sideEffects/imageUrl are optional
// clinical-reference fields (Medicine/Item master, see Requirements.md) shown
// on the POS grid thumbnail and the Rx-verification screen — not required to
// dispense, just a visual-ID and quick-reference/counseling aid.
// imageUrl values are public-domain/CC-licensed stock photos from Wikimedia
// Commons (generic pill/packet photos, not the actual branded product) —
// placeholders until real product photography is captured. The Vitamin C
// entry is a local crop (src/assets/medicines) of a Commons photo that also
// included peppers in-frame, cropped down to just the tablets.
export const posCatalog = [
  {
    sku: "PCM-500-10",
    name: "Paracetamol 500mg",
    form: "Strip isi 10",
    price: 8500,
    rx: false,
    batch: "PCM24-118",
    stock: 42,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Paracetamol_acetaminophen_500_mg_pills.jpg",
  },
  {
    sku: "AMX-500-CAP",
    name: "Amoxicillin 500mg",
    form: "Strip isi 10",
    price: 22000,
    rx: true,
    batch: "AMX24-076",
    stock: 96,
    genericName: "Amoxicillin",
    description: "Antibiotik golongan penisilin untuk infeksi bakteri saluran napas, THT, dan saluran kemih.",
    dosageInstructions: "Dewasa: 1 kapsul (500mg) tiap 8 jam, dihabiskan sesuai durasi resep meski gejala membaik.",
    sideEffects: "Mual, diare, ruam kulit. Hentikan dan cari bantuan medis jika muncul reaksi alergi (bengkak, sesak napas).",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Amoxicillin_500mg_capsules_on_a_plate_%28Sandoz%29.jpg",
  },
  {
    sku: "ORS-SACH",
    name: "Oral Rehydration Salt",
    form: "Sachet",
    price: 3000,
    rx: false,
    batch: "ORS23-054",
    stock: 210,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Oral_rehydration_salts_%28ORS%29_-_Packet.jpg",
  },
  {
    sku: "CTZ-10-TAB",
    name: "Cetirizine 10mg",
    form: "Strip isi 10",
    price: 12500,
    rx: false,
    batch: "CTZ24-041",
    stock: 18,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Cetirizine10.JPG",
  },
  {
    sku: "AMOXCLAV-625",
    name: "Amoxicillin-Clavulanate 625mg",
    form: "Strip isi 6",
    price: 45000,
    rx: true,
    batch: "AMC24-009",
    stock: 30,
    genericName: "Amoxicillin + Asam Klavulanat",
    description: "Antibiotik spektrum luas untuk infeksi bakteri yang resisten terhadap amoxicillin tunggal.",
    dosageInstructions: "Dewasa: 1 tablet (625mg) tiap 12 jam, diminum bersama makanan untuk mengurangi gangguan lambung.",
    sideEffects: "Diare, mual, gangguan pencernaan. Risiko lebih tinggi pada gangguan fungsi hati — tanyakan riwayat pasien.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Generic_amoxicillin-clavulanic_acid_tablets_with_875mg_amoxicillin.jpg",
  },
  {
    sku: "IBU-400-TAB",
    name: "Ibuprofen 400mg",
    form: "Strip isi 10",
    price: 9500,
    rx: false,
    batch: "IBU24-133",
    stock: 140,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/200mg_ibuprofen_tablets.jpg",
  },
  {
    sku: "SALB-INH",
    name: "Salbutamol Inhaler 100mcg",
    form: "Inhaler",
    price: 68000,
    rx: true,
    batch: "SLB24-021",
    stock: 9,
    genericName: "Salbutamol (Albuterol)",
    description: "Bronkodilator kerja cepat untuk meredakan sesak napas pada asma dan PPOK.",
    dosageInstructions: "1-2 semprotan saat gejala muncul, maks. 8 semprotan/hari. Kocok inhaler sebelum digunakan.",
    sideEffects: "Jantung berdebar, tremor tangan, sakit kepala ringan — umumnya sementara.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Albuterol_Inhaler.JPG",
  },
  {
    sku: "VITC-1000",
    name: "Vitamin C 1000mg",
    form: "Strip isi 10",
    price: 15000,
    rx: false,
    batch: "VTC24-090",
    stock: 88,
    imageUrl: vitaminCImage,
  },
];

export const shiftSummary = {
  cashier: "Kadek W.",
  branch: "Cabang Sanur",
  opened: "2026-09-19 08:00",
  closing: "2026-09-19 16:00",
  transactions: 63,
  cashSales: 1845000,
  cardSales: 2960000,
  refunds: 42000,
  expectedCashDrawer: 2345000,
  countedCashDrawer: 2338000,
};

export function formatIDR(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

// --- Accounting / Finance module -------------------------------------------
//
// Costing method: weighted-average cost per branch-SKU, not FEFO-actual-batch
// cost. The same SKU is routinely received at different purchase prices over
// time, so every branch-SKU carries one blended cost that's recalculated on
// each receipt: newAvg = (oldQty*oldAvg + recvQty*recvCost) / (oldQty+recvQty).
// Physical stock still rotates FEFO for expiry purposes — averaging only
// changes how COGS is valued, not which batch gets picked at the counter.
export const costReceipts = {
  "PCM-500-10": [
    { batch: "PCM24-091", qty: 4000, unitCost: 4200, date: "2026-06-02" },
    { batch: "PCM24-118", qty: 6000, unitCost: 4550, date: "2026-08-14" },
  ],
  "AMX-500-CAP": [
    { batch: "AMX24-050", qty: 1500, unitCost: 11800, date: "2026-05-20" },
    { batch: "AMX24-076", qty: 2000, unitCost: 12600, date: "2026-08-30" },
  ],
  "ORS-SACH": [{ batch: "ORS23-054", qty: 3000, unitCost: 1450, date: "2026-04-10" }],
  "CTZ-10-TAB": [
    { batch: "CTZ24-020", qty: 1000, unitCost: 6100, date: "2026-05-05" },
    { batch: "CTZ24-041", qty: 1200, unitCost: 6450, date: "2026-08-01" },
  ],
  "AMOXCLAV-625": [
    { batch: "AMC23-070", qty: 400, unitCost: 24800, date: "2026-03-15" },
    { batch: "AMC24-009", qty: 500, unitCost: 26200, date: "2026-08-20" },
  ],
  "IBU-400-TAB": [
    { batch: "IBU24-090", qty: 2500, unitCost: 5100, date: "2026-05-18" },
    { batch: "IBU24-133", qty: 3000, unitCost: 5350, date: "2026-08-25" },
  ],
  "SALB-INH": [{ batch: "SLB24-021", qty: 300, unitCost: 32000, date: "2026-07-01" }],
};

export function getAverageCost(sku) {
  const receipts = costReceipts[sku] || [];
  const totalQty = receipts.reduce((sum, r) => sum + r.qty, 0);
  const totalCost = receipts.reduce((sum, r) => sum + r.qty * r.unitCost, 0);
  return totalQty ? totalCost / totalQty : 0;
}

export function getInventoryValuation(branchId) {
  return getStockForBranch(branchId).map((row) => {
    const avgCost = getAverageCost(row.sku);
    return { ...row, avgCost, value: Math.round(avgCost * row.onHand), receipts: costReceipts[row.sku] || [] };
  });
}

export const plByBranch = {
  "BR-01": { revenue: 128500000, cogs: 79800000, opex: 18200000, cashSales: 51200000, cardSales: 77300000 },
  "BR-02": { revenue: 96200000, cogs: 60100000, opex: 15400000, cashSales: 40500000, cardSales: 55700000 },
  "BR-03": { revenue: 142700000, cogs: 88300000, opex: 19600000, cashSales: 58900000, cardSales: 83800000 },
  "BR-04": { revenue: 84300000, cogs: 52900000, opex: 13100000, cashSales: 33700000, cardSales: 50600000 },
};

// MAIN represents the consolidated (single legal entity) view across branches.
export function getPL(branchId) {
  if (branchId !== "MAIN") return plByBranch[branchId];
  return Object.values(plByBranch).reduce(
    (acc, b) => ({
      revenue: acc.revenue + b.revenue,
      cogs: acc.cogs + b.cogs,
      opex: acc.opex + b.opex,
      cashSales: acc.cashSales + b.cashSales,
      cardSales: acc.cardSales + b.cardSales,
    }),
    { revenue: 0, cogs: 0, opex: 0, cashSales: 0, cardSales: 0 }
  );
}

export const payables = [
  {
    id: "INV-3301",
    supplier: "PT Kimia Farma Trading",
    invoiceNo: "KFT/2026/0917",
    amount: 42500000,
    terms: "Net 30",
    dueDate: "2026-10-05",
    status: "outstanding",
  },
  {
    id: "INV-3298",
    supplier: "PT Enseval Putera Megatrading",
    invoiceNo: "EPM/2026/0902",
    amount: 28750000,
    terms: "Net 45",
    dueDate: "2026-10-14",
    status: "outstanding",
  },
  {
    id: "INV-3290",
    supplier: "PT Anugrah Pharmindo Lestari",
    invoiceNo: "APL/2026/0888",
    amount: 15200000,
    terms: "Net 30",
    dueDate: "2026-09-18",
    status: "overdue",
  },
  {
    id: "INV-3275",
    supplier: "PT Kimia Farma Trading",
    invoiceNo: "KFT/2026/0850",
    amount: 33900000,
    terms: "Net 30",
    dueDate: "2026-09-10",
    status: "paid",
  },
];

export const writeOffs = [
  {
    id: "WO-2041",
    branch: "BR-01",
    sku: "AMOXCLAV-625",
    name: "Amoxicillin-Clavulanate 625mg",
    qty: 12,
    reason: "Kedaluwarsa",
    date: "2026-09-15",
    approvedBy: "I Made Ardika",
  },
  {
    id: "WO-2039",
    branch: "BR-03",
    sku: "SALB-INH",
    name: "Salbutamol Inhaler 100mcg",
    qty: 3,
    reason: "Rusak saat penyimpanan",
    date: "2026-09-11",
    approvedBy: "Ni Luh Sari",
  },
  {
    id: "WO-2035",
    branch: "BR-02",
    sku: "CTZ-10-TAB",
    name: "Cetirizine 10mg",
    qty: 25,
    reason: "Kedaluwarsa",
    date: "2026-09-04",
    approvedBy: "I Made Ardika",
  },
].map((w) => ({ ...w, costImpact: Math.round(w.qty * getAverageCost(w.sku)) }));

// MAIN sees every branch's write-offs; a branch only sees its own.
export function getWriteOffsForBranch(branchId) {
  if (branchId === "MAIN") return writeOffs;
  return writeOffs.filter((w) => w.branch === branchId);
}

// MAIN oversees payables company-wide; branches don't hold their own AP.
export function getPayablesForBranch(branchId) {
  return branchId === "MAIN" ? payables : [];
}

export function getPayableById(id) {
  return payables.find((p) => p.id === id) || null;
}

// --- Goods receiving (Gudang Utama) -----------------------------------------
//
// Receiving happens only at the main warehouse — branches get stock via
// inter-branch transfer (see `transfers` above), never directly from a
// supplier. Each goods-receipt note (GRN) is recorded against a supplier PO
// and captures batch no., expiry date, and cost price per line; a PO can be
// received across multiple shipments, so each line tracks qty received
// against qty ordered and the header status rolls up from the lines. A fully
// received GRN typically has a matching supplier invoice in Finance ->
// Utang pemasok (see `payables`), linked here via invoiceRef.
export const goodsReceipts = [
  {
    id: "GRN-5518",
    poNumber: "PO-2026-0917",
    supplier: "PT Kimia Farma Trading",
    orderedDate: "2026-09-10",
    receivedDate: "2026-09-17",
    status: "received",
    invoiceRef: "INV-3301",
    items: [
      {
        sku: "PCM-500-10",
        name: "Paracetamol 500mg",
        batch: "PCM24-118",
        expiry: "2027-03-01",
        unitCost: 4550,
        qtyOrdered: 6000,
        qtyReceived: 6000,
      },
      {
        sku: "IBU-400-TAB",
        name: "Ibuprofen 400mg",
        batch: "IBU24-133",
        expiry: "2027-08-09",
        unitCost: 5350,
        qtyOrdered: 3000,
        qtyReceived: 3000,
      },
    ],
  },
  {
    id: "GRN-5521",
    poNumber: "PO-2026-0902",
    supplier: "PT Enseval Putera Megatrading",
    orderedDate: "2026-08-28",
    receivedDate: "2026-09-02",
    status: "received",
    invoiceRef: "INV-3298",
    items: [
      {
        sku: "AMX-500-CAP",
        name: "Amoxicillin 500mg",
        batch: "AMX24-076",
        expiry: "2026-11-12",
        unitCost: 12600,
        qtyOrdered: 2000,
        qtyReceived: 2000,
      },
    ],
  },
  {
    id: "GRN-5529",
    poNumber: "PO-2026-0919",
    supplier: "PT Anugrah Pharmindo Lestari",
    orderedDate: "2026-09-15",
    receivedDate: "2026-09-19",
    status: "partial",
    invoiceRef: null,
    items: [
      {
        sku: "CTZ-10-TAB",
        name: "Cetirizine 10mg",
        batch: "CTZ24-055",
        expiry: "2027-02-10",
        unitCost: 6600,
        qtyOrdered: 1500,
        qtyReceived: 900,
      },
      {
        sku: "AMOXCLAV-625",
        name: "Amoxicillin-Clavulanate 625mg",
        batch: "AMC24-015",
        expiry: "2027-01-20",
        unitCost: 26800,
        qtyOrdered: 600,
        qtyReceived: 300,
      },
    ],
  },
  {
    id: "GRN-5533",
    poNumber: "PO-2026-0920",
    supplier: "PT Kimia Farma Trading",
    orderedDate: "2026-09-18",
    receivedDate: null,
    status: "pending",
    invoiceRef: null,
    items: [
      {
        sku: "SALB-INH",
        name: "Salbutamol Inhaler 100mcg",
        batch: "SLB24-030",
        expiry: "2027-04-15",
        unitCost: 33500,
        qtyOrdered: 400,
        qtyReceived: 0,
      },
      {
        sku: "ORS-SACH",
        name: "Oral Rehydration Salt",
        batch: "ORS24-011",
        expiry: "2027-09-01",
        unitCost: 1500,
        qtyOrdered: 3000,
        qtyReceived: 0,
      },
    ],
  },
];

// MAIN is the only branch that receives from suppliers; other branches get
// stock via inter-branch transfer, so they have no GRNs of their own.
export function getReceiptsForBranch(branchId) {
  return branchId === "MAIN" ? goodsReceipts : [];
}

export function getGoodsReceiptByInvoice(invoiceId) {
  return goodsReceipts.find((r) => r.invoiceRef === invoiceId) || null;
}

// --- Stock movement log (stock detail page) --------------------------------
//
// There's no persisted transaction ledger in this mock app, so the event log
// on the stock detail page is generated deterministically from a seed derived
// from branch+SKU: same branch/SKU always reproduces the same history, but it
// varies across branches and items instead of repeating one canned list.
// Events are walked backward from "today" and the running balance is derived
// from the branch's current on-hand qty, so the newest row always reconciles
// with what Dashboard shows.
export const movementTypes = [
  { value: "receipt", label: "Penerimaan", sign: 1 },
  { value: "sale", label: "Penjualan", sign: -1 },
  { value: "transfer-in", label: "Transfer masuk", sign: 1 },
  { value: "transfer-out", label: "Transfer keluar", sign: -1 },
  { value: "adjustment", label: "Penyesuaian", sign: 0 },
  { value: "write-off", label: "Write-off", sign: -1 },
];

function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function next() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(hash) || 1;
}

const MOVEMENT_LOG_ANCHOR = "2026-09-19";

export function getStockMovements(sku, branchId) {
  const stock = getStockForBranch(branchId).find((s) => s.sku === sku);
  if (!stock) return [];

  const rand = seededRandom(hashString(`${branchId}-${sku}`));
  const receipts = costReceipts[sku] || [];
  const eventCount = 12 + Math.floor(rand() * 8);
  const events = [];
  let balance = stock.onHand;
  let daysAgo = Math.floor(rand() * 2);

  for (let i = 0; i < eventCount; i++) {
    const date = new Date(MOVEMENT_LOG_ANCHOR);
    date.setDate(date.getDate() - daysAgo);

    const r = rand();
    let type, qty, reference, note;
    if (r < 0.45) {
      type = "sale";
      qty = -(1 + Math.floor(rand() * 8));
      reference = `POS-${1000 + Math.floor(rand() * 9000)}`;
      note = "Penjualan counter";
    } else if (r < 0.65) {
      type = "receipt";
      qty = 20 + Math.floor(rand() * 80);
      reference = receipts.length ? receipts[Math.floor(rand() * receipts.length)].batch : "-";
      note = "Penerimaan dari pemasok";
    } else if (r < 0.8) {
      type = branchId === "MAIN" ? "transfer-out" : "transfer-in";
      qty = type === "transfer-out" ? -(10 + Math.floor(rand() * 40)) : 10 + Math.floor(rand() * 40);
      reference = `TRF-${2000 + Math.floor(rand() * 200)}`;
      note = type === "transfer-out" ? "Dikirim ke cabang" : "Diterima dari Gudang Utama";
    } else if (r < 0.92) {
      type = "adjustment";
      qty = Math.floor(rand() * 11) - 5;
      if (qty === 0) qty = 1;
      reference = "-";
      note = qty > 0 ? "Penyesuaian stok opname (lebih)" : "Penyesuaian stok opname (kurang)";
    } else {
      type = "write-off";
      qty = -(1 + Math.floor(rand() * 6));
      reference = `WO-${2000 + Math.floor(rand() * 100)}`;
      note = rand() < 0.5 ? "Kedaluwarsa" : "Rusak saat penyimpanan";
    }

    events.push({
      id: `${sku}-${branchId}-${i}`,
      date: date.toISOString().slice(0, 10),
      type,
      qty,
      balanceAfter: balance,
      reference,
      note,
    });

    balance -= qty;
    daysAgo += 1 + Math.floor(rand() * 3);
  }

  return events.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

// Splits a branch-SKU's on-hand quantity into its physical lots for FEFO
// detail. The stock snapshot only tracks the current front-of-line batch, so
// when there's an older cost-receipt lot behind it we deterministically carve
// off a smaller, sooner-to-expire remainder from it. Quantities always sum
// back to stock.onHand.
export function getStockBatches(sku, branchId) {
  const stock = getStockForBranch(branchId).find((s) => s.sku === sku);
  if (!stock) return [];

  const receipts = costReceipts[sku] || [];
  if (receipts.length < 2 || stock.onHand < 5) {
    return [
      {
        batch: stock.batch,
        expiry: stock.expiry,
        receivedAt: receipts.length ? receipts[receipts.length - 1].date : null,
        qty: stock.onHand,
      },
    ];
  }

  const rand = seededRandom(hashString(`batches-${branchId}-${sku}`));
  const older = receipts[receipts.length - 2];
  const newer = receipts[receipts.length - 1];

  const olderShare = 0.12 + rand() * 0.18;
  const olderQty = Math.max(1, Math.min(Math.round(stock.onHand * olderShare), stock.onHand - 1));
  const newerQty = stock.onHand - olderQty;

  const olderExpiry = new Date(stock.expiry);
  olderExpiry.setMonth(olderExpiry.getMonth() - (4 + Math.floor(rand() * 4)));

  return [
    { batch: older.batch, expiry: olderExpiry.toISOString().slice(0, 10), receivedAt: older.date, qty: olderQty },
    { batch: newer.batch, expiry: stock.expiry, receivedAt: newer.date, qty: newerQty },
  ].sort((a, b) => (a.expiry < b.expiry ? -1 : a.expiry > b.expiry ? 1 : 0));
}
