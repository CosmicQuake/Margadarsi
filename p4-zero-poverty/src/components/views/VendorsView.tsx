import React, { useState } from 'react';
import {
  Store,
  QrCode,
  Upload,
  CheckCircle2,
  Clock,
  Coins,
  Camera,
  MapPin,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VendorsView: React.FC = () => {
  const { vouchers, t, showToast, playAudioChime } = useApp();
  const [voucherList, setVoucherList] = useState(vouchers);
  const [redeemInput, setRedeemInput] = useState('');

  const handleRedeemVoucher = (code: string) => {
    playAudioChime('click');
    setVoucherList((prev) =>
      prev.map((v) => {
        if (v.voucherCode === code || v.id === code) {
          return {
            ...v,
            status: 'Redeemed' as const,
            redeemedDate: new Date().toISOString().slice(0, 10),
            geoTag: '16.2415°N, 80.6482°E (Verified Homestead)',
          };
        }
        return v;
      })
    );
    setRedeemInput('');
    playAudioChime('success');
    showToast({
      type: 'success',
      title: 'Voucher Redeemed & Asset Dispatched',
      message: `Productive asset order confirmed for beneficiary. Settlement claim queued.`,
    });
  };

  const handleUploadProof = (voucherCode: string) => {
    playAudioChime('click');
    showToast({
      type: 'success',
      title: 'Geotagged Delivery Proof Uploaded',
      message: `Proof photo for ${voucherCode} submitted for Computer Vision verification.`,
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-800">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">{t('nav.vendors')}</h1>
              <p className="text-xs text-slate-500">
                Direct-to-Vendor Livelihood Asset Fulfillment Desk • Zero Cash Handouts
              </p>
            </div>
          </div>
        </div>

        {/* Voucher Redemption Form */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Enter Voucher Code (e.g. VOUCHER-01)"
            value={redeemInput}
            onChange={(e) => setRedeemInput(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none w-full md:w-64"
          />
          <button
            onClick={() => handleRedeemVoucher(redeemInput || 'VOUCH-01')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow flex-shrink-0"
          >
            Redeem Voucher
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {voucherList.map((voucher) => (
          <div
            key={voucher.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {voucher.voucherCode}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 mt-1">{voucher.assetType}</h3>
                  <p className="text-[11px] text-slate-500">Beneficiary: {voucher.beneficiaryName}</p>
                </div>

                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    voucher.status === 'Paid' || voucher.status === 'Settlement Claimed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : voucher.status === 'Redeemed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {voucher.status}
                </span>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-2xl space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Supplier:</span>
                  <span className="font-bold text-slate-800">{voucher.vendorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Asset Amount:</span>
                  <span className="font-black text-emerald-700">₹{voucher.amount.toLocaleString()}</span>
                </div>
                {voucher.geoTag && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Delivery Geotag:</span>
                    <span className="font-mono text-slate-700 text-[10px]">{voucher.geoTag}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Vendor Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              {voucher.status === 'Issued' ? (
                <button
                  onClick={() => handleRedeemVoucher(voucher.voucherCode)}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Scan & Redeem</span>
                </button>
              ) : (
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Delivered & Verified
                </span>
              )}

              <button
                onClick={() => handleUploadProof(voucher.voucherCode)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                title="Upload Photo Delivery Proof"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
