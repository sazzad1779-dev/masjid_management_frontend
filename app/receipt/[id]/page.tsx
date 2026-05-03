export default function ReceiptPage({ params }: { params: { id: string } }) {
  const receiptData = {
    receiptNo: `MMS-2024-${params.id.padStart(4, '0')}`,
    date: "May 03, 2024",
    donorName: "Abdullah Ali",
    amount: "$500.00",
    category: "General Masjid Maintenance",
    paymentMethod: "Bank Transfer",
    masjidName: "Al-Noor Islamic Center",
    masjidAddress: "123 Faith Street, Springfield",
    masjidTaxId: "TX-998877665",
  };

  return (
    <div className="min-h-screen bg-zinc-100 py-12 px-4 flex justify-center font-sans">
      <div className="bg-white w-full max-w-2xl p-12 shadow-2xl rounded-sm border-t-8 border-emerald-600 relative overflow-hidden print:shadow-none print:p-0 print:border-t-0">
        {/* Watermark/Decor */}
        <div className="absolute -right-16 -top-16 h-64 w-64 bg-emerald-50 rounded-full opacity-50" />
        
        {/* Header */}
        <div className="relative z-10 flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">{receiptData.masjidName}</h1>
            <p className="text-zinc-500 font-medium mt-1">{receiptData.masjidAddress}</p>
            <p className="text-zinc-400 text-sm">Tax ID: {receiptData.masjidTaxId}</p>
          </div>
          <div className="text-right">
            <div className="bg-zinc-900 text-white px-4 py-2 rounded font-bold text-sm uppercase tracking-widest mb-2">Receipt</div>
            <p className="text-zinc-500 text-sm font-bold">No: {receiptData.receiptNo}</p>
            <p className="text-zinc-500 text-sm">Date: {receiptData.date}</p>
          </div>
        </div>

        <hr className="border-zinc-100 mb-12" />

        {/* Content */}
        <div className="space-y-8 mb-16">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Donor Name</p>
              <p className="text-lg font-bold text-zinc-900">{receiptData.donorName}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Amount Paid</p>
              <p className="text-3xl font-black text-emerald-600 tracking-tighter">{receiptData.amount}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Category / Purpose</p>
              <p className="text-base font-bold text-zinc-700">{receiptData.category}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Payment Method</p>
              <p className="text-base font-bold text-zinc-700">{receiptData.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end">
          <div className="flex-1 border-t border-zinc-200 pt-8 mr-12">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">Authorized Signature</p>
            <div className="h-12 flex items-center">
              <span className="font-serif italic text-2xl text-zinc-300">Administrative Seal</span>
            </div>
          </div>
          <div className="flex-1 text-right">
            <p className="text-zinc-400 text-xs italic leading-relaxed">
              May Allah (SWT) reward you abundantly for your generous contribution. 
              This is a computer-generated receipt and does not require a physical signature.
            </p>
          </div>
        </div>

        {/* Print Button - Hidden on Print */}
        <div className="mt-12 flex justify-center print:hidden">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-8 py-3 bg-zinc-900 text-white rounded-full font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20 active:scale-95"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
