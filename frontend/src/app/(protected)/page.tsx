"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getOffices,
  getParentOffices,
  getFacultyOffices,
  getDepartmentOffices,
} from "@/lib/api";
import { Office } from "@/types/office";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/components/layout-context";
import { SidebarItems } from "@/types/constant";
import { useAuth } from "@/auth-context";
import axios from "axios";
import { ChevronDown, ChevronRight, Search, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OfficeTablePage() {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOffices, setExpandedOffices] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { selectedItem } = useLayout();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    switch (selectedItem) {
      case SidebarItems.ALL_OFFICES:
        loadData(getOffices);
        break;
      case SidebarItems.PARENT_OFFICES:
        loadData(getParentOffices);
        break;
      case SidebarItems.FACULTIES:
        loadData(getFacultyOffices);
        break;
      case SidebarItems.DEPARTMENTS:
        loadData(getDepartmentOffices);
        break;
      default:
        setOffices([]);
        break;
    }
  }, [selectedItem]);

  const loadData = async (fetchFn: () => Promise<Office[]>) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFn();
      setOffices(data);
    } catch (err: any) {
      console.error("Failed to fetch offices", err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("You are not authorized to view this content.");
        } else {
          setError("An error occurred while fetching data.");
        }
      } else {
        setError("Unexpected error occurred.");
      }
      setOffices([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (officeId: number) => {
    setExpandedOffices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(officeId)) {
        newSet.delete(officeId);
      } else {
        newSet.add(officeId);
      }
      return newSet;
    });
  };

  const uniqueTypes = Array.from(new Set(offices.map(office => office.type))).sort();

  const filteredOffices = offices.filter(office => {
    const matchesSearch = searchTerm === "" ||
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.nameBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || office.type === typeFilter;
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && office.isActive) ||
      (statusFilter === "inactive" && !office.isActive);

    return matchesSearch && matchesType && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  const renderOfficeRow = (office: Office, level: number = 0) => {
    const isExpanded = expandedOffices.has(office.id);
    const hasChildren = office.subOffices && office.subOffices.length > 0;
    const indentStyle = { paddingLeft: `${level * 20}px` };
    const isChild = level > 0;

    const handleRowClick = (e: React.MouseEvent) => {
      // Prevent navigation if clicking on the expand button
      if ((e.target as HTMLElement).closest('button')) {
        return;
      }
      router.push(`/offices/${office.id}`);
    };

    return (
      <React.Fragment key={office.id}>
        <TableRow
          className="cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={handleRowClick}
        >
          <TableCell style={indentStyle} className={isChild ? "text-gray-500" : ""}>
            <div className="flex items-center gap-2">
              {hasChildren ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(office.id);
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ) : (
                <div className="w-6" /> // Same width as button for consistent spacing
              )}
              <span className="font-medium">{office.name}</span>
            </div>
          </TableCell>
          <TableCell className={isChild ? "text-gray-500" : ""}>{office.nameBn}</TableCell>
          <TableCell className={isChild ? "text-gray-500" : ""}>{office.code}</TableCell>
          <TableCell className={isChild ? "text-gray-500" : ""}>{office.type}</TableCell>
          <TableCell className={isChild ? "text-gray-500" : ""}>{office.isActive ? "Active" : "Inactive"}</TableCell>
        </TableRow>
        {isExpanded && hasChildren && (
          <>
            {office.subOffices!.map((sub) => renderOfficeRow(sub, level + 1))}
          </>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          {error ? "Access Denied" : `Total ${filteredOffices.length} Entries${filteredOffices.length !== offices.length ? ` (filtered from ${offices.length})` : ''}`}
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search offices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Type: {typeFilter === "all" ? "All" : typeFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                All Types
              </DropdownMenuItem>
              {uniqueTypes.map(type => (
                <DropdownMenuItem key={type} onClick={() => setTypeFilter(type)}>
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Status: {statusFilter === "all" ? "All" : statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={clearFilters}
            variant="outline"
            className="flex items-center gap-2"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Name_Bn</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{filteredOffices.map((office) => renderOfficeRow(office))}</TableBody>
        </Table>
      )}
    </div>
  );
}
