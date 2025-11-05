"use client";

import React, { FC, ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

interface TitleProps {
  title: string;
  totalCount?: number;
  countLabel?: string;
}


interface SubtitleProps {
  subtitle?: string;
  description?: string;
}


export const PageTitle: FC<TitleProps> = ({ title, totalCount, countLabel = "Items" }) => {
  return (
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      {totalCount !== undefined && (
        <span className="px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full">
          {totalCount} {countLabel}
        </span>
      )}
    </div>
  );
};

export const PageSubtitle: FC<SubtitleProps> = ({ subtitle, description }) => {
  if (!subtitle && !description) return null;
  return (
    <>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
    </>
  );
};

export const PageToolbar: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex gap-2">{children}</div>;
};

// export default function PageHeader({
//   children
// }: HeaderProps) {
//   return (
//     <div className="flex justify-between items-start mb-4">
//       <div>
//         <PageTitle title={title} totalCount={totalCount} countLabel={countLabel} />
//         <PageSubtitle subtitle={subtitle} description={description} />
//       </div>
//       <PageToolbar toolbar={toolbar} />
//     </div>
//   );
// }

export default function PageHeader({
  children
}: HeaderProps) {
  const titleChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === PageTitle);
  const subtitleChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === PageSubtitle);
  const toolbarChild = React.Children.toArray(children).find(child => React.isValidElement(child) && child.type === PageToolbar);

  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        {titleChild}
        {subtitleChild}
      </div>
      {toolbarChild}
    </div>
  );
}
