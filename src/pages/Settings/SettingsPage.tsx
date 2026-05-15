import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Bell, Palette, Trash2, Sun, Moon, Save, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { updateProfile, changePassword, mapAuthUser, deleteAccount } from '../../services/api';

export default function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile'|'security'|'notifications'|'appearance'>('profile');
  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [location, setLocation] = useState(user?.location || '');
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Смена пароля
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdState, setPwdState] = useState<'idle'|'saving'|'ok'|'error'>('idle');
  const [pwdError, setPwdError] = useState('');

  // Удаление аккаунта
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const { t } = useTranslation();

  if (!user) return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-text-primary mb-4">{t('settings.login_required')}</h1>
      <Link to="/login" className="text-primary">{t('settings.login_btn')}</Link>
    </div>
  );

  const handleSave = async () => {
    setSaveError('');
    try {
      const updated = await updateProfile(user.id, { title, location });
      // Бэк хранит email/имя только в одном месте; локально обновляем визуальное name отдельно.
      updateUser({ ...mapAuthUser(updated), name });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err: any) {
      setSaveError(err?.message || 'Не удалось сохранить профиль');
    }
  };

  const handleChangePassword = async () => {
    setPwdError('');
    if (newPassword.length < 6) {
      setPwdError('Пароль должен содержать минимум 6 символов');
      setPwdState('error');
      return;
    }
    setPwdState('saving');
    try {
      await changePassword({ currentPassword, newPassword });
      setPwdState('ok');
      setCurrentPassword('');
      setNewPassword('');
      setTimeout(() => setPwdState('idle'), 2000);
    } catch (err: any) {
      setPwdError(err?.message || 'Не удалось сменить пароль');
      setPwdState('error');
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteError('');
    setDeleting(true);
    try {
      await deleteAccount();
      logout();
      navigate('/login', { replace: true });
    } catch (err: any) {
      setDeleteError(err?.message || 'Не удалось удалить аккаунт');
      setDeleting(false);
    }
  };

  const tabs = [
    { key: 'profile' as const, label: t('settings.tab_profile'), icon: User },
    { key: 'security' as const, label: t('settings.tab_security'), icon: Lock },
    { key: 'notifications' as const, label: t('settings.tab_notifications'), icon: Bell },
    { key: 'appearance' as const, label: t('settings.tab_appearance'), icon: Palette },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
      <Link to="/profile" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary mb-4"><ArrowLeft size={16}/> {t('settings.back')}</Link>
      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6">{t('settings.title')}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-56 shrink-0">
          <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.key ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'}`}>
                <tab.icon size={16}/> {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && (
            <div className="gradient-card rounded-xl p-5 sm:p-6 border border-border space-y-5">
              <h2 className="text-lg font-bold text-text-primary">{t('settings.profile_info')}</h2>
              {saveError && (
                <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm">{saveError}</div>
              )}
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('settings.name')}</label>
                  <input value={name} onChange={e=>setName(e.target.value)} className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none focus:border-primary/50"/></div>
                <div><label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('settings.email')}</label>
                  <input value={user.email} readOnly className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-muted outline-none cursor-not-allowed"/></div>
                <div><label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('settings.job_title')}</label>
                  <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none focus:border-primary/50"/></div>
                <div><label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('settings.location')}</label>
                  <input value={location} onChange={e=>setLocation(e.target.value)} className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none focus:border-primary/50"/></div>
              </div>
              <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-white font-bold text-sm"><Save size={16}/> {saved ? t('settings.saved') : t('settings.save')}</button>
            </div>
          )}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="gradient-card rounded-xl p-5 sm:p-6 border border-border space-y-4">
                <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><Lock size={18}/> {t('settings.change_password')}</h2>
                {pwdError && (
                  <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm">{pwdError}</div>
                )}
                {pwdState === 'ok' && (
                  <div className="bg-success/10 border border-success/30 rounded-lg p-3 text-success text-sm">{t('settings.saved')}</div>
                )}
                <div><label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('settings.current_password')}</label>
                  <input type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none focus:border-primary/50"/></div>
                <div><label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{t('settings.new_password')}</label>
                  <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} placeholder="••••••••" className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none focus:border-primary/50"/></div>
                <button onClick={handleChangePassword} disabled={pwdState === 'saving'} className="px-6 py-3 rounded-lg gradient-primary text-white font-bold text-sm disabled:opacity-60">{t('settings.update_password')}</button>
              </div>
              <div className="gradient-card rounded-xl p-5 sm:p-6 border border-error/20 space-y-3">
                <h2 className="text-lg font-bold text-error flex items-center gap-2"><Trash2 size={18}/> {t('settings.delete_account')}</h2>
                <p className="text-sm text-text-muted">{t('settings.delete_warning')}</p>
                {deleteError && (
                  <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm">{deleteError}</div>
                )}
                {!confirmDelete ? (
                  <button onClick={() => setConfirmDelete(true)} className="px-6 py-3 rounded-lg bg-error/10 text-error font-bold text-sm border border-error/20 hover:bg-error/20 transition-colors">{t('settings.delete_btn')}</button>
                ) : (
                  <div className="flex gap-3">
                    <button onClick={() => setConfirmDelete(false)} disabled={deleting} className="px-6 py-3 rounded-lg border border-border text-text-secondary font-bold text-sm hover:bg-surface-elevated transition-colors disabled:opacity-60">Отмена</button>
                    <button onClick={handleDeleteAccount} disabled={deleting} className="px-6 py-3 rounded-lg bg-error text-white font-bold text-sm hover:bg-error/80 transition-colors disabled:opacity-60">
                      {deleting ? 'Удаление...' : 'Подтвердить удаление'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === 'notifications' && (
            <div className="gradient-card rounded-xl p-5 sm:p-6 border border-border space-y-5">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><Bell size={18}/> {t('settings.notifications')}</h2>
              {[
                { key: 'notif_jobs', l: t('settings.notif_jobs'), d: t('settings.notif_jobs_desc'), defaultOn: true },
                { key: 'notif_status', l: t('settings.notif_status'), d: t('settings.notif_status_desc'), defaultOn: true },
                { key: 'notif_chat', l: t('settings.notif_chat'), d: t('settings.notif_chat_desc'), defaultOn: true },
                { key: 'notif_marketing', l: t('settings.notif_marketing'), d: t('settings.notif_marketing_desc'), defaultOn: false },
              ].map(i => {
                const storeKey = `techmoldova-${i.key}`;
                const stored = localStorage.getItem(storeKey);
                const checked = stored == null ? i.defaultOn : stored === '1';
                return (
                  <div key={i.key} className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
                    <div><p className="text-sm font-medium text-text-primary">{i.l}</p><p className="text-xs text-text-muted mt-0.5">{i.d}</p></div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={(e) => localStorage.setItem(storeKey, e.target.checked ? '1' : '0')}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-surface-overlay rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
          {activeTab === 'appearance' && (
            <div className="gradient-card rounded-xl p-5 sm:p-6 border border-border space-y-5">
              <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><Palette size={18}/> {t('settings.appearance')}</h2>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={()=>theme!=='dark'&&toggleTheme()} className={`p-4 rounded-xl border-2 transition-all ${theme==='dark'?'border-primary bg-primary/5':'border-border hover:border-primary/30'}`}>
                  <Moon size={24} className="mx-auto mb-2 text-text-primary"/><p className="text-sm font-bold text-text-primary">{t('settings.theme_dark')}</p></button>
                <button onClick={()=>theme!=='light'&&toggleTheme()} className={`p-4 rounded-xl border-2 transition-all ${theme==='light'?'border-primary bg-primary/5':'border-border hover:border-primary/30'}`}>
                  <Sun size={24} className="mx-auto mb-2 text-text-primary"/><p className="text-sm font-bold text-text-primary">{t('settings.theme_light')}</p></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
