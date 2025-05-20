import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FolderKanban, Calendar, BarChart, MessageSquare, ClipboardList, BookOpen, PenTool as Tool, KeyRound, Settings, LogOut, User, Bell, HelpCircle, FileBox, ScrollText, CheckSquare, Image, Scale } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, label, count, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        active ? 'bg-gray-100 text-red-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <span className="text-[20px]">{icon}</span>
      <span className="flex-grow">{label}</span>
      {count !== undefined && (
        <span className="flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-600 rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
};

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="w-64 h-screen sticky top-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center text-white font-bold">
              R
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Rosey Co</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        {isAdmin ? (
          <>
            <SidebarSection title="ESSENTIALS">
              <SidebarLink
                to="/admin/dashboard"
                icon={<LayoutDashboard size={18} />}
                label="Dashboard"
                active={location.pathname === '/admin/dashboard'}
              />
              <SidebarLink
                to="/admin/clients"
                icon={<Users size={18} />}
                label="My Clients"
                active={location.pathname === '/admin/clients'}
              />
              <SidebarLink
                to="/admin/projects"
                icon={<FolderKanban size={18} />}
                label="My Projects"
                active={location.pathname === '/admin/projects'}
              />
              <SidebarLink
                to="/admin/tasks"
                icon={<CheckSquare size={18} />}
                label="My Tasks"
                active={location.pathname === '/admin/tasks'}
              />
              <SidebarLink
                to="/admin/my-calendar"
                icon={<Calendar size={18} />}
                label="My Calendar"
                active={location.pathname === '/admin/my-calendar'}
              />
            </SidebarSection>

            <SidebarSection title="TEAM SPACE">
              <SidebarLink
                to="/admin/all-clients"
                icon={<Users size={18} />}
                label="All Clients"
                active={location.pathname === '/admin/all-clients'}
              />
              <SidebarLink
                to="/admin/all-projects"
                icon={<FolderKanban size={18} />}
                label="All Projects"
                active={location.pathname === '/admin/all-projects'}
              />
              <SidebarLink
                to="/admin/all-tasks"
                icon={<ClipboardList size={18} />}
                label="All Tasks"
                active={location.pathname === '/admin/all-tasks'}
              />
              <SidebarLink
                to="/admin/calendar"
                icon={<Calendar size={18} />}
                label="Team Calendar"
                active={location.pathname === '/admin/calendar'}
              />
              <SidebarLink
                to="/admin/reports"
                icon={<BarChart size={18} />}
                label="Reports"
                active={location.pathname === '/admin/reports'}
              />
              <SidebarLink
                to="/admin/chat"
                icon={<MessageSquare size={18} />}
                label="Team Chat"
                active={location.pathname === '/admin/chat'}
              />
              <SidebarLink
                to="/admin/shared-notes"
                icon={<ScrollText size={18} />}
                label="Shared Notes / Ideas"
                active={location.pathname === '/admin/shared-notes'}
              />
            </SidebarSection>

            <SidebarSection title="RESOURCES">
              <SidebarLink
                to="/admin/internal-docs"
                icon={<BookOpen size={18} />}
                label="Internal Docs"
                active={location.pathname === '/admin/internal-docs'}
              />
              <SidebarLink
                to="/admin/tools"
                icon={<Tool size={18} />}
                label="Tools & Links"
                active={location.pathname === '/admin/tools'}
              />
              <SidebarLink
                to="/admin/sops"
                icon={<FileBox size={18} />}
                label="SOPs / Training"
                active={location.pathname === '/admin/sops'}
              />
              <SidebarLink
                to="/admin/vault"
                icon={<KeyRound size={18} />}
                label="Password Vault"
                active={location.pathname === '/admin/vault'}
              />
              <SidebarLink
                to="/admin/brand-assets"
                icon={<Image size={18} />}
                label="Brand Assets"
                active={location.pathname === '/admin/brand-assets'}
              />
              <SidebarLink
                to="/admin/legal"
                icon={<Scale size={18} />}
                label="Legal / Contracts"
                active={location.pathname === '/admin/legal'}
              />
            </SidebarSection>

            <SidebarSection title="SETTINGS">
              <SidebarLink
                to="/admin/settings"
                icon={<Settings size={18} />}
                label="Settings"
                active={location.pathname === '/admin/settings'}
              />
            </SidebarSection>

            <SidebarSection title="PROFILE">
              <SidebarLink
                to="/admin/account"
                icon={<User size={18} />}
                label="My Account"
                active={location.pathname === '/admin/account'}
              />
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-gray-50"
              >
                <span className="text-[20px]"><LogOut size={18} /></span>
                <span className="flex-grow text-left">Logout</span>
              </button>
            </SidebarSection>
          </>
        ) : (
          <>
            <SidebarSection title="WORKSPACE">
              <SidebarLink
                to="/dashboard"
                icon={<LayoutDashboard size={18} />}
                label="Dashboard"
                active={location.pathname === '/dashboard'}
              />
              <SidebarLink
                to="/projects"
                icon={<FolderKanban size={18} />}
                label="My Projects"
                active={location.pathname === '/projects'}
              />
              <SidebarLink
                to="/tasks"
                icon={<ClipboardList size={18} />}
                label="Tasks"
                active={location.pathname === '/tasks'}
              />
              <SidebarLink
                to="/deliverables"
                icon={<FileBox size={18} />}
                label="Deliverables"
                active={location.pathname === '/deliverables'}
              />
              <SidebarLink
                to="/meetings"
                icon={<Calendar size={18} />}
                label="Meetings"
                active={location.pathname === '/meetings'}
              />
              <SidebarLink
                to="/messages"
                icon={<MessageSquare size={18} />}
                label="Messages"
                count={3}
                active={location.pathname === '/messages'}
              />
            </SidebarSection>

            <SidebarSection title="ACCOUNT">
              <SidebarLink
                to="/forms"
                icon={<ScrollText size={18} />}
                label="Forms & Requests"
                active={location.pathname === '/forms'}
              />
              <SidebarLink
                to="/account"
                icon={<User size={18} />}
                label="My Account"
                active={location.pathname === '/account'}
              />
              <SidebarLink
                to="/notifications"
                icon={<Bell size={18} />}
                label="Notifications"
                count={1}
                active={location.pathname === '/notifications'}
              />
              <SidebarLink
                to="/help"
                icon={<HelpCircle size={18} />}
                label="Help & Support"
                active={location.pathname === '/help'}
              />
            </SidebarSection>
          </>
        )}
      </div>

      <div className="mt-auto border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
            {user?.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{isAdmin ? 'Admin User' : 'Client'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;