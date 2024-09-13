import Header from "../components/header";
import SideBar from "../components/side-bar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen bg-slate-50">
      {/* <SideBar /> */}

      <div className="flex flex-col w-full">
        <Header />

        {children}
      </div>
    </section>
  );
}
