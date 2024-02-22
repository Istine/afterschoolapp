// /components/NextBreadcrumb.tsx
"use client";

import React, { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type TBreadCrumbProps = {
  homeElement: ReactNode;
  separator: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

const NextBreadcrumb = ({
  homeElement,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div className="w-auto">
      <ul className={containerClasses}>
        <li className={listClasses}>
          <Link href={"/admin/account"}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && <ChevronRight />}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
          return (
            <React.Fragment key={index}>
              {itemLink !== "Admin" ? (
                <li className={itemClasses}>
                  <Link href={href}>{itemLink}</Link>
                </li>
              ) : (
                ""
              )}
              {pathNames.length !== index + 1 && itemLink !== "Admin" && (
                <ChevronRight />
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default NextBreadcrumb;
