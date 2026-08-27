import Header from "../components/header";
import Sidenav from "../components/Sidenav";

function Dashboard() {
  return (
    <>
      <section className="flex min-h-screen">
        <Sidenav />
        <main className="w-[82%]">
          <Header />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          </div>
        </main>
      </section>
    </>
  );
}
export default Dashboard;
