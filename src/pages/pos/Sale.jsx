import { useMemo, useState } from "react";
import { posCatalog, formatIDR } from "../../data/mockData.js";

export default function Sale() {
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [verifyItem, setVerifyItem] = useState(null); // Rx item awaiting pharmacist PIN
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [paymentDone, setPaymentDone] = useState(null); // "cash" | "card" | null

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posCatalog;
    return posCatalog.filter(
      (item) => item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q)
    );
  }, [query]);

  function addToCart(item) {
    if (item.rx && !cart.some((c) => c.sku === item.sku && c.verified)) {
      setVerifyItem(item);
      return;
    }
    doAdd(item, true);
  }

  function doAdd(item, verified) {
    setCart((prev) => {
      const existing = prev.find((c) => c.sku === item.sku);
      if (existing) {
        return prev.map((c) => (c.sku === item.sku ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { ...item, qty: 1, verified }];
    });
  }

  function confirmPin() {
    if (pin.length < 4) {
      setPinError(true);
      return;
    }
    doAdd(verifyItem, true);
    setVerifyItem(null);
    setPin("");
    setPinError(false);
  }

  function changeQty(sku, delta) {
    setCart((prev) =>
      prev
        .map((c) => (c.sku === sku ? { ...c, qty: Math.max(0, c.qty + delta) } : c))
        .filter((c) => c.qty > 0)
    );
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  function completeSale(method) {
    setPaymentDone(method);
  }

  function newSale() {
    setCart([]);
    setPaymentDone(null);
  }

  if (paymentDone) {
    return (
      <div className="flex h-full items-center justify-center bg-ink">
        <div className="w-full max-w-md border border-white/10 bg-pine-dark px-8 py-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pine-light/20 text-2xl">
            ✓
          </div>
          <h2 className="text-xl font-semibold text-white">Pembayaran selesai</h2>
          <p className="mt-1 text-sm text-white/60">
            {formatIDR(total)} dibayar dengan {paymentDone === "cash" ? "tunai" : "kartu"}
          </p>
          <p className="mt-4 text-xs text-white/40">Struk sedang dicetak ke printer kasir&hellip;</p>
          <button
            onClick={newSale}
            className="mt-6 w-full bg-white py-3 text-base font-semibold text-ink hover:bg-white/90"
          >
            Mulai penjualan berikutnya
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Catalog */}
      <div className="flex w-2/3 flex-col border-r border-white/10">
        <div className="border-b border-white/10 p-4">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pindai barcode atau cari nama barang / SKU"
            className="w-full rounded bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 focus-visible:outline-white"
          />
        </div>
        <div className="grid flex-1 auto-rows-min grid-cols-3 gap-3 overflow-y-auto p-4">
          {filtered.map((item) => (
            <button
              key={item.sku}
              onClick={() => addToCart(item)}
              disabled={item.stock === 0}
              className="flex flex-col items-start gap-1 border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 disabled:opacity-30"
            >
              <div className="mb-1 flex h-16 w-full items-center justify-center overflow-hidden rounded bg-white/10">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain" loading="lazy" />
                ) : (
                  <span className="text-2xl" aria-hidden="true">💊</span>
                )}
              </div>
              <div className="flex w-full items-start justify-between gap-2">
                <span className="text-sm font-medium leading-tight text-white">{item.name}</span>
                {item.rx && (
                  <span className="shrink-0 rounded bg-brick px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    Rx
                  </span>
                )}
              </div>
              <span className="text-xs text-white/50">{item.form}</span>
              <span className="mt-1 font-mono text-sm tabular text-white/90">{formatIDR(item.price)}</span>
              <span className="font-mono text-[11px] tabular text-white/30">{item.stock} stok tersedia</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="flex w-1/3 flex-col bg-ink">
        <div className="border-b border-white/10 px-5 py-4">
          <h2 className="text-sm font-medium text-white/70">Penjualan saat ini</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-3">
          {cart.length === 0 && (
            <p className="mt-8 text-center text-sm text-white/30">Keranjang kosong. Ketuk barang untuk menambahkannya.</p>
          )}
          <ul className="space-y-3">
            {cart.map((c) => (
              <li key={c.sku} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm text-white">{c.name}</div>
                  <div className="font-mono text-xs text-white/40">{formatIDR(c.price)} / item</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => changeQty(c.sku, -1)}
                    className="h-7 w-7 border border-white/20 text-white/70 hover:bg-white/10"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-mono tabular text-white">{c.qty}</span>
                  <button
                    onClick={() => changeQty(c.sku, 1)}
                    className="h-7 w-7 border border-white/20 text-white/70 hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-white/10 px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-white/60">Total belanja</span>
            <span className="font-mono text-xl tabular text-white">{formatIDR(total)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              disabled={cart.length === 0}
              onClick={() => completeSale("cash")}
              className="bg-white py-3 text-sm font-semibold text-ink hover:bg-white/90 disabled:opacity-30"
            >
              Bayar tunai
            </button>
            <button
              disabled={cart.length === 0}
              onClick={() => completeSale("card")}
              className="bg-pine-light py-3 text-sm font-semibold text-white hover:bg-pine disabled:opacity-30"
            >
              Bayar kartu
            </button>
          </div>
        </div>
      </div>

      {/* Prescription verification modal */}
      {verifyItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm border border-white/10 bg-pine-dark px-6 py-6">
            <div className="mb-1 inline-flex items-center gap-1.5 rounded bg-brick px-2 py-0.5 text-xs font-semibold text-white">
              Perlu resep
            </div>
            <h3 className="mt-2 text-lg font-semibold text-white">Verifikasi apoteker</h3>
            <p className="mt-1 text-sm text-white/60">
              {verifyItem.name} memerlukan persetujuan resep sebelum dapat ditambahkan ke penjualan.
            </p>

            {(verifyItem.genericName || verifyItem.description || verifyItem.dosageInstructions || verifyItem.sideEffects) && (
              <div className="mt-4 flex gap-3 border border-white/10 bg-white/5 p-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-white/10 text-xl">
                  {verifyItem.imageUrl ? (
                    <img src={verifyItem.imageUrl} alt={verifyItem.name} className="h-full w-full rounded object-cover" />
                  ) : (
                    <span aria-hidden="true">💊</span>
                  )}
                </div>
                <div className="min-w-0 space-y-1.5 text-xs text-white/70">
                  {verifyItem.genericName && (
                    <p>
                      <span className="text-white/40">Nama generik: </span>
                      {verifyItem.genericName}
                    </p>
                  )}
                  {verifyItem.description && <p>{verifyItem.description}</p>}
                  {verifyItem.dosageInstructions && (
                    <p>
                      <span className="text-white/40">Dosis: </span>
                      {verifyItem.dosageInstructions}
                    </p>
                  )}
                  {verifyItem.sideEffects && (
                    <p>
                      <span className="text-white/40">Efek samping: </span>
                      {verifyItem.sideEffects}
                    </p>
                  )}
                </div>
              </div>
            )}

            <label className="mt-4 block text-xs text-white/50" htmlFor="pin">
              PIN apoteker
            </label>
            <input
              id="pin"
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ""));
                setPinError(false);
              }}
              className="mt-1 w-full rounded bg-white/10 px-4 py-3 text-lg tracking-[0.3em] text-white placeholder:tracking-normal placeholder:text-white/30 focus-visible:outline-white"
              placeholder="••••"
              autoFocus
            />
            {pinError && <p className="mt-1.5 text-xs text-brick">Masukkan PIN apoteker untuk melanjutkan.</p>}
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  setVerifyItem(null);
                  setPin("");
                  setPinError(false);
                }}
                className="flex-1 border border-white/20 py-2.5 text-sm text-white/70 hover:bg-white/5"
              >
                Batal
              </button>
              <button
                onClick={confirmPin}
                className="flex-1 bg-white py-2.5 text-sm font-semibold text-ink hover:bg-white/90"
              >
                Verifikasi & tambahkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
