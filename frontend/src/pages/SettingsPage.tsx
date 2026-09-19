import { useAuth } from "../features/auth/useAuth";
import { mockTeacher } from "../features/mock/mockData";

export function SettingsPage() {
  const { user, signOut } = useAuth();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#0b1c30]">Settings</h1>
        <p className="mt-1 text-sm text-[#464554]">Account, institution, and marking preferences.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0b1c30]">Account</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-[#f1f5f9] pb-3">
              <span className="text-[#464554]">Name</span>
              <span className="font-medium text-[#0b1c30]">{mockTeacher.name}</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-[#f1f5f9] pb-3">
              <span className="text-[#464554]">Email</span>
              <span className="font-medium text-[#0b1c30]">{user?.email}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#464554]">Institution</span>
              <span className="font-medium text-[#0b1c30]">{mockTeacher.institution}</span>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#0b1c30]">Marking preferences</h2>
          <div className="mt-4 space-y-3 text-sm text-[#464554]">
            <label className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fafc] p-3">
              <span>Require interpretation confirmation before marks</span>
              <input checked readOnly type="checkbox" />
            </label>
            <label className="flex items-center justify-between gap-4 rounded-xl bg-[#f8fafc] p-3">
              <span>Prioritise low-confidence answers</span>
              <input checked readOnly type="checkbox" />
            </label>
            <button className="mt-2 rounded-lg border border-[#e5e7eb] px-4 py-2 text-sm font-medium text-[#0b1c30] hover:bg-[#f8fafc]" type="button" onClick={() => void signOut()}>
              Log out
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
