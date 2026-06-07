import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;