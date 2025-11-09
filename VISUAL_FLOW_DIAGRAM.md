# Barcode System - Visual Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js/React)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  NewPurchaseForm.tsx                                             │
│  ┌────────────────────────────────────────────────┐             │
│  │  Add Item 1: Laptop    Qty: 10   Price: $500  │             │
│  │  Add Item 2: Mouse     Qty: 5    Price: $25   │             │
│  │                                                 │             │
│  │  Vendor: ABC Supplies                          │             │
│  │  Date: 2024-11-09                              │             │
│  │                                                 │             │
│  │  Total: $5,125.00                              │             │
│  │                                                 │             │
│  │  [Add Purchase]  [Cancel]                      │             │
│  └────────────────────────────────────────────────┘             │
│                                                                   │
│  ↓ Submit                                                        │
│                                                                   │
│  purchase_service.ts → POST /api/purchases                      │
│                                                                   │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot/Java)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  PurchaseController.java                                         │
│    ↓                                                              │
│  PurchaseService.java                                            │
│    │                                                              │
│    ├──→ Create Purchase Record                                   │
│    │    - vendor_name: "ABC Supplies"                            │
│    │    - purchase_date: "2024-11-09"                            │
│    │    - total_price: $5,125.00                                 │
│    │                                                              │
│    ├──→ Create PurchaseItem #1                                   │
│    │    - item_id: 1 (Laptop)                                    │
│    │    - quantity: 10                                           │
│    │    - unit_price: $500                                       │
│    │    - total_price: $5,000                                    │
│    │                                                              │
│    │    ├──→ Generate 10 Barcodes:                               │
│    │    │    INV-LAP001-123-1699564829-A7B2                      │
│    │    │    INV-LAP001-123-1699564829-B3C9                      │
│    │    │    INV-LAP001-123-1699564830-D4E1                      │
│    │    │    ... (7 more)                                        │
│    │    │                                                         │
│    │    └──→ Create 10 ItemInstance records                      │
│    │         - barcode: unique for each                          │
│    │         - status: IN_STOCK                                  │
│    │                                                              │
│    ├──→ Create PurchaseItem #2                                   │
│    │    - item_id: 2 (Mouse)                                     │
│    │    - quantity: 5                                            │
│    │    - unit_price: $25                                        │
│    │    - total_price: $125                                      │
│    │                                                              │
│    │    ├──→ Generate 5 Barcodes:                                │
│    │    │    INV-MOU002-123-1699564831-F5G2                      │
│    │    │    INV-MOU002-123-1699564831-H6I3                      │
│    │    │    INV-MOU002-123-1699564832-J7K4                      │
│    │    │    INV-MOU002-123-1699564832-L8M5                      │
│    │    │    INV-MOU002-123-1699564833-N9O6                      │
│    │    │                                                         │
│    │    └──→ Create 5 ItemInstance records                       │
│    │         - barcode: unique for each                          │
│    │         - status: IN_STOCK                                  │
│    │                                                              │
│    └──→ Update Item Stock                                        │
│         - Laptop stock: +10                                      │
│         - Mouse stock: +5                                        │
│                                                                   │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASE (MySQL)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  purchases                                                       │
│  ┌────────────────────────────────────────────────┐             │
│  │ id: 123                                        │             │
│  │ vendor_name: "ABC Supplies"                    │             │
│  │ total_price: 5125.00                           │             │
│  │ purchase_date: 2024-11-09                      │             │
│  └────────────────────────────────────────────────┘             │
│                                                                   │
│  purchase_items                                                  │
│  ┌────────────────────────────────────────────────┐             │
│  │ id: 1, purchase_id: 123, item_id: 1           │             │
│  │ quantity: 10, unit_price: 500.00               │             │
│  ├────────────────────────────────────────────────┤             │
│  │ id: 2, purchase_id: 123, item_id: 2           │             │
│  │ quantity: 5, unit_price: 25.00                 │             │
│  └────────────────────────────────────────────────┘             │
│                                                                   │
│  item_instances (15 records total)                               │
│  ┌────────────────────────────────────────────────┐             │
│  │ id: 1, barcode: INV-LAP001-123-...-A7B2       │             │
│  │ item_id: 1, purchase_id: 123, status: IN_STOCK│             │
│  ├────────────────────────────────────────────────┤             │
│  │ id: 2, barcode: INV-LAP001-123-...-B3C9       │             │
│  │ ... (13 more records)                          │             │
│  └────────────────────────────────────────────────┘             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Barcode Viewing Flow

```
User → Purchase Details Page
  ↓
GET /api/purchases/123/barcodes
  ↓
PurchaseService.getItemInstancesByPurchase(123)
  ↓
Returns 15 ItemInstance records
  ↓
BarcodeDisplay.tsx renders:

┌────────────────────────────────────────────┐
│  Generated Barcodes    [Download] [Print] │
├────────────────────────────────────────────┤
│                                            │
│  Laptop (10 items)                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ ▯▯▯▯▯▯▯  │ │ ▯▯▯▯▯▯▯  │ │ ▯▯▯▯▯▯▯  │  │
│  │ INV-LAP  │ │ INV-LAP  │ │ INV-LAP  │  │
│  │ ...A7B2  │ │ ...B3C9  │ │ ...D4E1  │  │
│  │ $500.00  │ │ $500.00  │ │ $500.00  │  │
│  └──────────┘ └──────────┘ └──────────┘  │
│  ... (7 more)                              │
│                                            │
│  Mouse (5 items)                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│  │ ▯▯▯▯▯▯▯  │ │ ▯▯▯▯▯▯▯  │ │ ▯▯▯▯▯▯▯  │  │
│  │ INV-MOU  │ │ INV-MOU  │ │ INV-MOU  │  │
│  │ ...F5G2  │ │ ...H6I3  │ │ ...J7K4  │  │
│  │ $25.00   │ │ $25.00   │ │ $25.00   │  │
│  └──────────┘ └──────────┘ └──────────┘  │
│  ... (2 more)                              │
└────────────────────────────────────────────┘
```

## Data Relationships

```
                  ┌───────────┐
                  │ Purchase  │
                  │ (1 record)│
                  └─────┬─────┘
                        │
                        │ has many
                        ↓
              ┌─────────────────┐
              │  PurchaseItem   │
              │   (2 records)   │
              └────────┬────────┘
                       │
                       │ generates
                       ↓
              ┌─────────────────┐
              │  ItemInstance   │
              │  (15 records)   │
              │  Each with      │
              │  unique barcode │
              └─────────────────┘
```

## Barcode Format Breakdown

```
INV-LAP001-123-1699564829-A7B2
│   │      │   │          │
│   │      │   │          └─ Random (4 chars)
│   │      │   └──────────── Timestamp
│   │      └──────────────── Purchase ID
│   └─────────────────────── Item Code
└─────────────────────────── Prefix
```

## Status Lifecycle

```
ItemInstance Status Flow:

┌──────────┐
│ Purchase │ ──→ Creates ItemInstance
└──────────┘     with status: IN_STOCK
                        │
                        ↓
                 ┌─────────────┐
                 │  IN_STOCK   │ ← Initial state
                 └──────┬──────┘
                        │
            ┌───────────┼───────────┐
            ↓           ↓           ↓
      ┌──────────┐ ┌──────────┐ ┌────────┐
      │DISTRIBUTED│ │ DAMAGED  │ │  LOST  │
      └──────────┘ └──────────┘ └────────┘
            │
            ↓
       ┌─────────┐
       │ RETIRED │
       └─────────┘
```

## Key Benefits

✅ **Traceability**
- Every physical item has a unique identifier
- Track from purchase → distribution → retirement

✅ **Flexibility**
- Multiple items in one purchase transaction
- Different quantities and prices per item

✅ **Scalability**
- Supports thousands of items
- Efficient barcode generation
- Indexed database queries

✅ **Auditability**
- Complete purchase history
- Timestamp tracking
- Status changes logged

---

This visual guide provides a complete overview of how the barcode system works from user interaction to database storage.
