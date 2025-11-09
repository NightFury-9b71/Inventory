'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { QrCode, Camera, Search, Package, MapPin, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getItemInstanceByBarcode } from '@/services/purchase_service';
import { ItemInstance } from '@/types/purchase';

export default function BarcodePage() {
  const [barcode, setBarcode] = useState('');
  const [itemInstance, setItemInstance] = useState<ItemInstance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!barcode.trim()) return;

    setLoading(true);
    setError('');
    setItemInstance(null);

    try {
      const result = await getItemInstanceByBarcode(barcode.trim());
      setItemInstance(result);
    } catch (_err) {
      setError('Item not found. Please check the barcode and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_STOCK': return 'bg-green-100 text-green-800';
      case 'DISTRIBUTED': return 'bg-blue-100 text-blue-800';
      case 'DAMAGED': return 'bg-red-100 text-red-800';
      case 'LOST': return 'bg-gray-100 text-gray-800';
      case 'RETIRED': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Barcode Scanner</h1>
        <p className="text-slate-600 mt-1">Scan or search items by barcode to track their current location and status</p>
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
          <Button className="w-full" disabled>
            <Camera className="h-4 w-4 mr-2" />
            Coming Soon
          </Button>
        </Card>

        <Card className="p-8">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2 text-center">
            Search by Code
          </h2>
          <p className="text-slate-600 mb-6 text-center">
            Enter barcode manually to search for items
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter barcode..."
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={loading}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Search Results */}
      {loading && (
        <Card className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Searching for item...</p>
        </Card>
      )}

      {error && (
        <Card className="p-8 text-center border-red-200">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-semibold">Item Not Found</p>
          <p className="text-slate-600 mt-2">{error}</p>
        </Card>
      )}

      {itemInstance && (
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Item Found</h3>
              <p className="text-slate-600">Barcode: {itemInstance.barcode}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Item Name</label>
                <p className="text-lg font-semibold">{itemInstance.itemName}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Unit Price</label>
                <p className="text-lg">${itemInstance.unitPrice.toFixed(2)}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Current Status</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(itemInstance.status)}>
                    {itemInstance.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {itemInstance.distributedToOfficeName && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Current Location
                  </label>
                  <p className="text-lg font-semibold">{itemInstance.distributedToOfficeName}</p>
                </div>
              )}

              {itemInstance.distributedAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Distributed Date
                  </label>
                  <p className="text-lg">{new Date(itemInstance.distributedAt).toLocaleDateString()}</p>
                </div>
              )}

              {itemInstance.createdAt && (
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Purchase Date
                  </label>
                  <p className="text-lg">{new Date(itemInstance.createdAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          {itemInstance.remarks && (
            <div className="mt-6 pt-6 border-t">
              <label className="text-sm font-medium text-gray-500">Remarks</label>
              <p className="text-slate-700 mt-1">{itemInstance.remarks}</p>
            </div>
          )}
        </Card>
      )}

      <Card className="p-12 text-center">
        <QrCode className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          How Barcode Tracking Works
        </h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Each item in the inventory has a unique barcode. Scan the barcode to instantly view item details,
          current location, stock levels, purchase history, and distribution records. Track items from
          purchase to distribution and beyond.
        </p>
      </Card>
    </div>
  );
}
