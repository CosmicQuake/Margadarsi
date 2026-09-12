import React, { useState } from 'react';
import {
  Store,
  QrCode,
  CheckCircle2,
  PackageCheck,
  Camera,
  MapPin,
  Clock,
  Search,
  FileCheck,
  ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VendorView: React.FC = () => {
  const { vouchers, redeemVoucherAction } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [proofPhotoUrl, setProofPhotoUrl] = useState('');
  const [geoLoc, setGeoLoc] = useState('16.2440 N, 80.6402 E (Tenali Ward #14)');

  const handleRedeemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    const success = redeemVoucherAction(inputCode.trim(), proofPhotoUrl, geoLoc);
    if (success) {
      setInputCode('');
    }
  };

  const handleQuickFill = (code: string) => {
    setInputCode(code);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Vendor Header */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-amber-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400/60 flex items-center justify-center text-amber-400">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-500/30 text-amber-300 text-xs font-bold px-3 py-0.5 rounded-full border border-amber-500/40">
                P4 Empanelled Livelihood Equipment Vendor
              </span>
              <span className="text-xs text-slate-400 font-mono">Vendor ID: VND-GNT-01</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              Sri Balaji Livelihood Machinery & Tools
            </h2>
            <p className="text-xs text-amber-200 mt-0.5">
              Certified Supplier of Industrial Sewing Machines, Pushcarts & Handloom Jacquards
            </p>
          </div>
        </div>

        {/* Vendor Stats */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">
              Redeemed Assets
            </span>
            <span className="text-xl font-black text-emerald-400">
              {vouchers.filter((v) => v.status === 'Redeemed').length}
            </span>
          </div>
          <div className="bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">
              Settlements (₹)
            </span>
            <span className="text-xl font-black text-amber-400">
              ₹47.5k
            </span>
          </div>
        </div>
      </div>

      {/* QR Voucher Scanner / Redemption Desk */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <QrCode className="w-6 h-6 text-amber-600" />
            Digital Beneficiary Voucher Redemption Simulator
          </h3>
          <p className="text-xs text-slate-500">
            Scan beneficiary's P4 smart voucher or enter the alphanumeric token to verify asset handover
          </p>
        </div>

        <form onSubmit={handleRedeemSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Enter Voucher Code (or click demo vouchers below) *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="e.g. P4-VZG-KIT-4410"
                className="flex-1 p-3 rounded-xl border border-slate-300 text-sm font-mono font-bold uppercase focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black shadow transition flex items-center gap-2"
              >
                <PackageCheck className="w-4 h-4" />
                Redeem & Handover
              </button>
            </div>
          </div>

          {/* Quick Demo Fill Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">Test Demo Vouchers:</span>
            {vouchers.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => handleQuickFill(v.voucherCode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition ${
                  v.status === 'Issued'
                    ? 'bg-amber-50 border-amber-400 text-amber-900 hover:bg-amber-100'
                    : 'bg-slate-100 border-slate-200 text-slate-500 line-through'
                }`}
              >
                {v.voucherCode} ({v.status})
              </button>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Geo-Tag Delivery Verification:
            </div>
            <p className="font-mono text-[11px]">{geoLoc}</p>
          </div>
        </form>
      </div>

      {/* Verified Deliveries Ledger */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          Fulfilled Asset Orders & Payout Claims
        </h3>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3.5">Voucher Code</th>
                <th className="p-3.5">Beneficiary</th>
                <th className="p-3.5">Asset Supplied</th>
                <th className="p-3.5">Sanction Value</th>
                <th className="p-3.5">Redeemed Date</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vouchers.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80">
                  <td className="p-3.5 font-mono font-bold text-amber-700">{v.voucherCode}</td>
                  <td className="p-3.5 font-bold text-slate-900">
                    {v.beneficiaryName}
                    <span className="block text-[10px] text-slate-400 font-normal font-mono">{v.householdId}</span>
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">{v.assetType}</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700">₹{v.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3.5 text-slate-500 font-mono">{v.redeemedDate || 'Pending Handover'}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        v.status === 'Redeemed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
