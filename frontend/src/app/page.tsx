import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart3,
  Package,
  QrCode,
  Shield,
  TrendingUp,
  Building2,
  Search,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header/Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="font-bold text-lg">JUST Inventory</h1>
              <p className="text-xs text-slate-600">Jashore University of Science & Technology</p>
            </div>
          </div>
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">
            Smart Inventory Management System
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Track, manage, and distribute university assets across faculties, departments, 
            and offices with barcode-powered precision
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-12 shadow-2xl">
            <div className="grid grid-cols-3 gap-6">
              <Card className="p-6 bg-white">
                <QrCode className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="font-semibold mb-2">Barcode Tracking</h3>
                <p className="text-sm text-slate-600">Every item has a unique barcode</p>
              </Card>
              <Card className="p-6 bg-white">
                <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
                <h3 className="font-semibold mb-2">Real-time Analytics</h3>
                <p className="text-sm text-slate-600">Monitor inventory in real-time</p>
              </Card>
              <Card className="p-6 bg-white">
                <Building2 className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="font-semibold mb-2">Multi-level Structure</h3>
                <p className="text-sm text-slate-600">Faculties, departments & offices</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Inventory Control
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage university assets efficiently and transparently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unique Barcode System</h3>
              <p className="text-slate-600">
                Every product receives a unique barcode for complete traceability 
                throughout its lifecycle - from purchase to distribution.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Purchase Tracking</h3>
              <p className="text-slate-600">
                Track all purchases with detailed information including vendor details, 
                dates, quantities, and costs for complete accountability.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Distribution Management</h3>
              <p className="text-slate-600">
                Monitor product distribution across faculties, departments, and offices 
                with real-time visibility and reporting.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Asset Traceability</h3>
              <p className="text-slate-600">
                Scan any barcode to instantly view complete history: purchase date, 
                current location, transfer history, and condition status.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hierarchical Structure</h3>
              <p className="text-slate-600">
                Organize inventory by university, faculties, departments, and individual 
                offices for precise allocation and tracking.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Role-based Access</h3>
              <p className="text-slate-600">
                Secure access control with different permission levels for administrators, 
                faculty heads, and department staff.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Simple, efficient, and transparent inventory management
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Purchase & Register</h3>
                <p className="text-slate-600 text-lg">
                  When new items are purchased, they are registered in the system with 
                  complete details including vendor information, specifications, and cost. 
                  Each item is assigned a unique barcode identifier.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Barcode Generation</h3>
                <p className="text-slate-600 text-lg">
                  The system automatically generates a unique barcode for each product. 
                  Print and attach these barcodes to the physical items for easy scanning 
                  and tracking throughout their lifecycle.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Distribute & Allocate</h3>
                <p className="text-slate-600 text-lg">
                  Allocate items to specific faculties, departments, or offices. Every 
                  distribution is recorded with recipient details, date, and purpose, 
                  creating a complete audit trail.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Track & Monitor</h3>
                <p className="text-slate-600 text-lg">
                  Scan any barcode to instantly view the item's current location, complete 
                  history, condition status, and utilization. Generate reports for 
                  accountability and planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose JUST Inventory System?
            </h2>
            <p className="text-xl text-blue-100">
              Built specifically for academic institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">100% Transparency</h3>
              <p className="text-blue-100">
                Complete visibility of all assets and their movements
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reduce Losses</h3>
              <p className="text-blue-100">
                Minimize asset loss through systematic tracking
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-blue-100">
                Quick barcode scanning replaces manual record-keeping
              </p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Better Planning</h3>
              <p className="text-blue-100">
                Data-driven insights for procurement and allocation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Ready to Transform Your Inventory Management?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Join JUST in modernizing asset tracking and distribution management
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="text-lg px-8">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Request Demo
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="font-bold">JUST Inventory</span>
              </div>
              <p className="text-slate-400 text-sm">
                Jashore University of Science & Technology
                Inventory Management System
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Jashore University</li>
                <li>Jashore, Bangladesh</li>
                <li>info@just.edu.bd</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 Jashore University of Science & Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
