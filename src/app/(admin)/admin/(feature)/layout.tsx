import AdminNavBar from "@/components/admin/admin-navbar";
import { Fragment } from "react";

export default function AdminFeatureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <AdminNavBar />
      {children}
    </Fragment>
  );
}
