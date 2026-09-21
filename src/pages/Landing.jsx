import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <div className="font-mono text-xs tracking-tight text-muted">Farmasi &middot; purwarupa</div>
          <h1 className="mt-1 text-2xl font-semibold text-ink">Sistem operasional apotek</h1>
          <p className="mt-2 text-sm text-muted">
            Dua aplikasi terpisah, satu backend bersama. Pilih tampilan untuk pratinjau.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/backoffice"
            className="group border border-line bg-panel px-6 py-8 text-left transition-colors hover:border-pine"
          >
            <div className="text-xs text-muted">Aplikasi web</div>
            <div className="mt-1 text-lg font-semibold text-ink group-hover:text-pine">Back Office</div>
            <p className="mt-2 text-sm text-muted">
              Ringkasan stok, transfer antar-cabang, persetujuan pengisian ulang, peramalan produk cepat bergerak.
            </p>
          </Link>

          <Link
            to="/pos"
            className="group border border-line bg-ink px-6 py-8 text-left transition-colors hover:border-pine-light"
          >
            <div className="text-xs text-white/40">PWA &middot; tablet kasir</div>
            <div className="mt-1 text-lg font-semibold text-white group-hover:text-pine-light">POS</div>
            <p className="mt-2 text-sm text-white/60">
              Penjualan, verifikasi resep, pembayaran tunai/kartu, tutup shift.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
