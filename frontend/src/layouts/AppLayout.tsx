import { NavLink, Outlet } from "react-router-dom";
import {
  Bell,
  ChartNoAxesColumnIncreasing,
  CircleHelp,
  CirclePlus,
  ClipboardList,
  GraduationCap,
  Home,
  Settings,
  UsersRound,
} from "lucide-react";
import { useAuth } from "../features/auth/useAuth";
import { mockAssessments, mockTeacher } from "../features/mock/mockData";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/classes", label: "Classes", icon: UsersRound },
  { to: "/assessments", label: "Assessments", icon: ClipboardList, count: mockAssessments.length },
  { to: "/results", label: "Results", icon: ChartNoAxesColumnIncreasing },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function AppLayout() {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-sans text-[#0b1c30] antialiased selection:bg-[#e1e0ff] selection:text-[#07006c]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col justify-between border-r border-[#c7c4d7]/20 bg-[#1a1a27] p-4 text-white lg:flex">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-1 pt-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6063ee] text-white shadow-sm">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold leading-none tracking-tight text-white">Classy</span>
              <span className="mt-1 text-[11px] font-medium text-[#c7c5d5]">AI Exam Marking</span>
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors active:scale-[0.99] ${
                      isActive
                        ? "bg-[#4648d4] text-white shadow-sm"
                        : "text-[#c7c5d5] hover:bg-[#464553]/40 hover:text-white"
                    }`
                  }
                  end={item.to === "/"}
                  key={item.to}
                  to={item.to}
                >
                  <Icon className="mr-3 h-4 w-4" aria-hidden="true" />
                  <span>{item.label}</span>
                  {item.count ? (
                    <span className="ml-auto rounded bg-[#464553]/50 px-1.5 py-0.5 font-mono text-[10px] text-[#c7c5d5]">
                      {item.count}
                    </span>
                  ) : null}
                </NavLink>
              );
            })}
          </nav>

          <div className="px-1 pt-1">
            <NavLink
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#464553]/60 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-[#464553] active:scale-[0.98]"
              to="/assessments"
            >
              <CirclePlus className="h-4 w-4" aria-hidden="true" />
              <span>New Marking Batch</span>
            </NavLink>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#c7c4d7]/20 pt-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-[#464553]/30">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6063ee] text-sm font-semibold text-white">
              {mockTeacher.initials}
            </div>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-white">{mockTeacher.name}</span>
              <span className="truncate text-xs text-[#c7c5d5]">{mockTeacher.institution}</span>
            </div>
          </div>
          <button
            className="rounded-lg px-2 py-1.5 text-left text-xs font-medium text-[#c7c5d5] transition-colors hover:bg-[#464553]/30 hover:text-white"
            type="button"
            onClick={() => void signOut()}
          >
            Log out {user?.email ? `(${user.email})` : ""}
          </button>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-[#e5e7eb] bg-white px-4 py-3 lg:px-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 truncate text-[11px] font-medium text-[#464554]">
              <span className="hidden hover:text-[#0b1c30] sm:inline">{mockTeacher.institution}</span>
              <span className="hidden text-[#c7c4d7] sm:inline">/</span>
              <span className="truncate font-semibold text-[#0b1c30]">Teacher workspace</span>
            </div>
            <nav className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                      isActive ? "bg-[#4648d4] text-white" : "bg-[#eff4ff] text-[#464554]"
                    }`
                  }
                  end={item.to === "/"}
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative hidden h-9 w-9 items-center justify-center rounded-lg text-[#5e5d6b] transition-colors hover:bg-[#eff4ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4648d4]/30 sm:flex" type="button" aria-label="Notifications">
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#4648d4] ring-2 ring-white" />
            </button>
            <button className="hidden h-9 w-9 items-center justify-center rounded-lg text-[#5e5d6b] transition-colors hover:bg-[#eff4ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4648d4]/30 sm:flex" type="button" aria-label="Help and documentation">
              <CircleHelp className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="hidden h-5 w-px bg-[#c7c4d7]/40 sm:block" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e3e0f2] font-mono text-xs font-semibold text-[#464553]">
                {mockTeacher.initials}
              </div>
              <span className="hidden text-xs font-medium text-[#0b1c30] sm:inline-block">{mockTeacher.name}</span>
            </div>
          </div>
        </header>

        <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col gap-6 px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
