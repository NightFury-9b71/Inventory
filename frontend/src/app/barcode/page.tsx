'use client';

import { Card } from '@/components/ui/card';
import { QrCode, Camera, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BarcodePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Barcode Scanner</h1>
        <p className="text-slate-600 mt-1">Scan or search items by barcode</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-8 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Scan Barcode
          </h2>
          <p className="text-slate-600 mb-6">
            Use your device camera to scan item barcodes
          </p>
          <Button className="w-full">
            <Camera className="h-4 w-4 mr-2" />
            Start Scanning
          </Button>
        </Card>

        <Card className="p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Search by Code
          </h2>
          <p className="text-slate-600 mb-6">
            Enter barcode manually to search for items
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter barcode..."
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <Button>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-12 text-center">
        <QrCode className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          How Barcode Tracking Works
        </h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Each item in the inventory has a unique barcode. Scan the barcode to instantly view item details, 
          current location, stock levels, purchase history, and distribution records.
        </p>
      </Card>
    </div>
  );
}
