'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { BarChart2, UserPlus, Users, ClipboardList, LogOut, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/admin/dashboard', icon: <BarChart2 size={18} />, label: 'Dashboard' },
  { href: '/admin/create-student', icon: <UserPlus size={18} />, label: 'Create Student' },
  { href: '/admin/students', icon: <Users size={18} />, label: 'Students' },
  { href: '/admin/questions', icon: <ClipboardList size={18} />, label: 'Questions' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-xl flex items-center justify-center shrink-0">
            <BarChart2 size={16} className="text-white" />
          </div>
          <div>
            <p className="font-black text-sm text-white leading-tight">Admin Panel</p>
            <p className="text-slate-400 text-xs">Vanaja Coaching Classes</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navLinks.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setDrawerOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm ${pathname === l.href ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
            {l.icon} {l.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-all font-medium text-sm w-full">
          <LogOut size={18} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-60 bg-slate-800 border-r border-slate-700 flex-col z-20">
        <SidebarContent />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-slate-800 border-b border-slate-700 flex items-center px-4 z-20">
        <button onClick={() => setDrawerOpen(true)} className="p-2 text-slate-300 hover:text-white">
          <Menu size={22} />
        </button>
        <span className="ml-3 font-black text-white text-sm">Vanaja Admin</span>
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-30 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <div className="relative w-64 bg-slate-800 flex flex-col h-full shadow-2xl">
            <button onClick={() => setDrawerOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={20} />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:ml-60 pt-14 lg:pt-0 min-h-screen">
        {children}
      </div>
    </div>
  );
}
