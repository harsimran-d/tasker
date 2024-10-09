import DashboardNavBar from "@/ui/DashboardNavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardNavBar></DashboardNavBar>
      {children}
    </div>
  );
}
