import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/classes", label: "Classes" },
  { to: "/assessments", label: "Assessments" },
  { to: "/settings", label: "Settings" },
];

export function AppLayout() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-600">Classy</p>
          <h1 className="mt-2 text-xl font-semibold">Teacher workspace</h1>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <button
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              type="button"
              onClick={() => void signOut()}
            >
              Log out
            </button>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto md:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium ${
                    isActive ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="px-5 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
