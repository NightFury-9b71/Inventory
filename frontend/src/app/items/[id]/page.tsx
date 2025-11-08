"use client";

import React from "react";
import { useItem } from "@/components/table";
import { useParams } from "next/navigation";
import { Item } from "@/types/item";
import { getItemById, deleteItem } from "@/services/item_service";
import HeaderActions from "./components/HeaderActions";
import ItemInfoCard from "./components/ItemInfoCard";
import ItemDetailsCard from "./components/ItemDetailsCard";
import ChildItemsCard from "./components/ChildItemsCard";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

export default function ItemDetailPage() {
  const params = useParams();
  const itemId = params.id as string;

  const {
    item,
    loading,
    error,
    deleting,
    handleBack,
    handleEdit,
    handleAddChild,
    handleNavigateToChild,
    deleteItem: handleDelete,
  } = useItem<Item>({
    id: itemId,
    crud: {
      basePath: '/items',
      getById: (id) => getItemById(Number(id)),
      delete: (id) => deleteItem(Number(id)),
    },
  });

  // Loading State
  if (loading) {
    return <LoadingState />;
  }

  // Error State
  if (error || !item || !item.id) {
    return <ErrorState message={error || undefined} onBack={handleBack} />;
  }

  const fullItem = item as Item;

  // Main Component Stack
  return (
    <div>
      <HeaderActions
        itemName={fullItem.name}
        handleBack={handleBack}
        handleEdit={handleEdit}
        handleAddChild={handleAddChild}
        handleDelete={handleDelete}
        deleting={deleting}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ItemInfoCard item={fullItem} />
        <ItemDetailsCard item={fullItem} />
      </div>

      <ChildItemsCard
        subItems={fullItem.subItems}
        onNavigateToChild={handleNavigateToChild}
      />
    </div>
  );
}
