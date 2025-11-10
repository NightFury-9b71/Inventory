"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MovementFormData } from "@/types/movement";
import { createMovement } from "@/services/movement_service";
import { getItems } from "@/services/item_service";
import { getOffices } from "@/services/office_service";
import { getEmployees } from "@/services/employee_service";
import { useAuth } from "@/contexts/AuthContext";
import { Item } from "@/types/item";
import { Office } from "@/types/office";
import { Employee } from "@/services/employee_service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, AlertCircle, ArrowLeft } from "lucide-react";

export default function NewMovementPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [movement, setMovement] = useState<MovementFormData>({
    itemId: 0,
    fromOfficeId: 0,
    toOfficeId: 0,
    employeeId: 0,
    quantity: 1,
    dateMoved: new Date().toISOString().split('T')[0],
    remarks: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingOffices, setLoadingOffices] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedItems, fetchedOffices, fetchedEmployees] = await Promise.all([
          getItems(),
          getOffices(),
          getEmployees()
        ]);
        setItems(fetchedItems.filter(item => item.isActive));
        setOffices(fetchedOffices.filter(office => office.isActive));
        setEmployees(fetchedEmployees.filter(employee => employee.isActive));
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to load items, offices, and employees");
      } finally {
        setLoadingItems(false);
        setLoadingOffices(false);
        setLoadingEmployees(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setMovement(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (!user?.id) {
        throw new Error('User not authenticated. Please log in again.');
      }

      const movementData = {
        ...movement,
      };

      // Validation
      if (!movementData.itemId) {
        throw new Error('Please select an item.');
      }
      if (!movementData.fromOfficeId) {
        throw new Error('Please select a source office.');
      }
      if (!movementData.toOfficeId) {
        throw new Error('Please select a destination office.');
      }
      if (movementData.fromOfficeId === movementData.toOfficeId) {
        throw new Error('Source and destination offices cannot be the same.');
      }
      if (!movementData.employeeId) {
        throw new Error('Please select an employee.');
      }
      if (movementData.quantity <= 0) {
        throw new Error('Quantity must be greater than 0.');
      }
      if (!movementData.dateMoved) {
        throw new Error('Movement date is required.');
      }

      await createMovement(movementData);
      router.push('/movements');
    } catch (err: any) {
      console.log('Error creating movement:', err);
      const errorMessage = err.response?.data?.message 
        || err.response?.data 
        || err.message 
        || 'Failed to create movement.';
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    router.push('/movements');
  };

  const selectedItem = items.find(item => item.id === movement.itemId);
  const availableQuantity = selectedItem?.quantity || 0;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Movements
        </Button>
        <h1 className="text-2xl font-bold">New Movement</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Move Item Between Offices</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="itemId">
                Item <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={movement.itemId > 0 ? movement.itemId.toString() : ""} 
                onValueChange={(value) => handleInputChange("itemId", parseInt(value))} 
                disabled={loadingItems}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingItems ? "Loading items..." : "Select an item"} />
                </SelectTrigger>
                <SelectContent>
                  {items.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name} ({item.code}) - Available: {item.quantity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fromOfficeId">
                  From Office <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={movement.fromOfficeId > 0 ? movement.fromOfficeId.toString() : ""} 
                  onValueChange={(value) => handleInputChange("fromOfficeId", parseInt(value))} 
                  disabled={loadingOffices}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingOffices ? "Loading offices..." : "Select source office"} />
                  </SelectTrigger>
                  <SelectContent>
                    {offices.map((office) => (
                      <SelectItem key={office.id} value={office.id.toString()}>
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="toOfficeId">
                  To Office <span className="text-red-500">*</span>
                </Label>
                <Select 
                  value={movement.toOfficeId > 0 ? movement.toOfficeId.toString() : ""} 
                  onValueChange={(value) => handleInputChange("toOfficeId", parseInt(value))} 
                  disabled={loadingOffices}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingOffices ? "Loading offices..." : "Select destination office"} />
                  </SelectTrigger>
                  <SelectContent>
                    {offices.map((office) => (
                      <SelectItem key={office.id} value={office.id.toString()}>
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="employeeId">
                Employee <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={movement.employeeId > 0 ? movement.employeeId.toString() : ""} 
                onValueChange={(value) => handleInputChange("employeeId", parseInt(value))} 
                disabled={loadingEmployees}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingEmployees ? "Loading employees..." : "Select an employee"} />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.name} ({employee.designation})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">
                Quantity <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="quantity" 
                type="number" 
                min="1" 
                max={availableQuantity}
                value={movement.quantity || ""} 
                onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 0)} 
                placeholder="Enter quantity" 
                required 
              />
              {selectedItem && (
                <p className="text-sm text-gray-600 mt-1">
                  Available: {availableQuantity}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="dateMoved">
                Movement Date <span className="text-red-500">*</span>
              </Label>
              <Input 
                id="dateMoved" 
                type="date" 
                value={movement.dateMoved} 
                onChange={(e) => handleInputChange("dateMoved", e.target.value)} 
                required 
              />
            </div>

            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea 
                id="remarks" 
                value={movement.remarks || ""} 
                onChange={(e) => handleInputChange("remarks", e.target.value)} 
                placeholder="Enter any remarks (optional)" 
                rows={3} 
                className="resize-none" 
              />
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button type="submit" disabled={saving || loadingItems || loadingOffices || loadingEmployees}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Moving..." : "Move Item"}
              </Button>
              <Button type="button" variant="outline" onClick={handleBack}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}