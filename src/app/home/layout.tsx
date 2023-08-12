import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-black px-10">
      <Navbar />
      <div className="w-[50vw] border-r border-gray-800">{children}</div>
      <RightSidebar />
    </main>
  );
}
