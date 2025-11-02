"use client";

import React from "react";
import { Office } from "@/types/office";
import TableBodyContainer from "@/components/TableBodyContainer";
import TableRowItem from "@/components/TableRowItem";

interface TableBodyRowsProps {
  filteredOffices?: Office[];
  expandedOffices?: Set<number>;
  toggleExpand?: (officeId: number) => void;
}

export default function TableBodyRows({
  filteredOffices = [],
  expandedOffices = new Set(),
  toggleExpand = () => {},
}: TableBodyRowsProps) {
  const renderOfficeRow = (office: Office, level: number = 0): React.ReactNode => {
    const isExpanded = expandedOffices.has(office.id);
    const hasChildren = office.subOffices && office.subOffices.length > 0;

    return (
      <React.Fragment key={office.id}>
        {/* Individual office row with expand/collapse button */}
        <TableRowItem
          office={office}
          level={level}
          isExpanded={isExpanded}
          onToggleExpand={() => toggleExpand(office.id)}
        />
        
        {/* Recursively render child offices when expanded */}
        {isExpanded && hasChildren && (
          <>{office.subOffices!.map((sub) => renderOfficeRow(sub, level + 1))}</>
        )}
      </React.Fragment>
    );
  };

  return (
    <TableBodyContainer>
      {filteredOffices.map((office) => renderOfficeRow(office))}
    </TableBodyContainer>
  );
}
