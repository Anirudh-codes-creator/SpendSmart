import React, { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowDownLeft, ArrowLeftRight, ArrowUpRight, BadgeIndianRupee, BarChart3, Check,
  ChevronRight, CircleHelp, CreditCard, Download, Eye, EyeOff, House, LayoutDashboard,
  LogOut, Plus, Search, Settings, ShieldCheck, Sparkles, Target, Trash2, TrendingUp,
  Wallet, X,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from './services/api.js';

const money = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);
const pageTitles = { dashboard: 'Overview', transactions: 'Transactions', budgets: 'Budgets', analytics: 'Insights', goals: 'Savings goals', settings: 'Settings' };

function Brand({ light = false }) {
  return <Link className={`brand ${light ? 'brand-light' : ''}`} to="/"><span className="brand-mark"><Wallet size={19} strokeWidth={2.4} /></span><span>spendsmart<span className="brand-period">.</span></span></Link>;
}

function MoneyArtwork({ compact = false }) {
  return <div className={`money-art ${compact ? 'money-art-compact' : ''}`} aria-hidden="true">
    <div className="art-glow" />
    <div className="art-spark art-spark-one"><Sparkles size={19} /></div>
    <div className="art-spark art-spark-two"><Sparkles size={14} /></div>
    <div className="art-card art-card-back"><span /><span /><span /></div>
    <div className="art-card art-card-front">
      <div className="art-card-top"><span className="art-chip" /><span className="art-card-dots">••••</span></div>
      <span className="art-card-label">YOUR BALANCE</span><strong>₹ 48,250</strong>
      <div className="art-card-foot"><i /><i /><i /></div>
    </div>
    <div className="art-coin coin-one">₹</div><div className="art-coin coin-two">₹</div>
    <div className="art-mini-chart"><span /><span /><span /><span /><span /><span /><span /></div>
    <div className="art-note"><span><ArrowUpRight size={16} /></span><div><small>Monthly growth</small><b>+12.8%</b></div></div>
    <svg className="art-orbit" viewBox="0 0 500 420" fill="none"><path d="M57 317C83 138 262 47 431 94" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 8"/><circle cx="431" cy="94" r="5" fill="currentColor"/><circle cx="57" cy="317" r="4" fill="currentColor"/></svg>
  </div>;
}

function Landing() {
  return <main className="landing-page">
    <header className="landing-nav"><Brand /><nav><Link to="/login">Log in</Link><Link className="button button-dark button-small" to="/register">Create free account <ArrowUpRight size={15} /></Link></nav></header>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow"><Sparkles size={14} /> A calmer way to manage money</span>
        <h1>Your money,<br />with a little more <em>magic.</em></h1>
        <p>Know where it goes. Make room for what matters. Your whole money picture, all in one happy place.</p>
        <div className="hero-actions"><Link className="button button-dark" to="/register">Start for free <ArrowUpRight size={17} /></Link><Link className="hero-login" to="/login">I already have an account <ChevronRight size={16} /></Link></div>
        <div className="hero-proof"><div className="proof-avatars"><span>A</span><span>M</span><span>R</span></div><span>Small steps add up to big things.</span><span className="proof-stars">★★★★★</span></div>
      </div>
      <MoneyArtwork />
      <div className="hero-sticker sticker-peach"><span>✦</span> Your goals<br />are in reach</div>
    </section>
    <section className="feature-strip"><div><span className="feature-icon lilac"><LayoutDashboard size={19} /></span><b>See the full picture</b><small>Income, spending, and savings at a glance.</small></div><div><span className="feature-icon mint"><Target size={19} /></span><b>Make goals feel doable</b><small>Track the little wins along the way.</small></div><div><span className="feature-icon peach"><ShieldCheck size={19} /></span><b>Your money stays yours</b><small>Private account, personal insights.</small></div></section>
    <footer className="landing-footer"><Brand /><span>Make every rupee feel a little more intentional.</span><span>© SpendSmart</span></footer>
  </main>;
}

function Auth({ register, auth }) {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  async function submit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    try { await auth(`/auth/${register ? 'register' : 'login'}`, form); nav('/dashboard'); }
    catch (e) { setError(e.message || 'Something went wrong. Please try again.'); }
    finally { setBusy(false); }
  }
  return <main className="auth-page">
    <Link to="/" className="auth-back"><span>←</span> Back to home</Link>
    <div className="auth-layout">
      <section className="auth-art-panel"><div className="auth-art-copy"><Brand light /><span className="eyebrow eyebrow-light"><Sparkles size={14} /> Your next chapter starts here</span><h2>Little money<br />habits. <em>Big-life</em><br />energy.</h2><p>A clear view of today makes it easier to plan for tomorrow.</p></div><MoneyArtwork compact /><div className="auth-art-bottom"><span className="auth-check"><Check size={14} /></span> A fresh start, one smart choice at a time.</div></section>
      <section className="auth-form-side"><form className="auth-form" onSubmit={submit}>
        <div className="mobile-brand"><Brand /></div>
        <span className="form-kicker">{register ? 'LET’S GET STARTED' : 'NICE TO SEE YOU AGAIN'}</span>
        <h1>{register ? 'Create your account' : 'Welcome back'}</h1>
        <p className="form-intro">{register ? 'Your money dashboard is just a minute away.' : 'Pick up right where you left off.'}</p>
        {register && <label>Your name<div className="input-wrap"><span className="input-emoji">✳</span><input autoComplete="name" required placeholder="What should we call you?" value={form.name} onChange={update('name')} /></div></label>}
        <label>Email address<div className="input-wrap"><span className="input-emoji">@</span><input type="email" autoComplete="email" required placeholder="you@example.com" value={form.email} onChange={update('email')} /></div></label>
        <label>Password<div className="input-wrap"><span className="input-emoji">✳</span><input type={showPassword ? 'text' : 'password'} autoComplete={register ? 'new-password' : 'current-password'} minLength={register ? 8 : undefined} required placeholder={register ? 'At least 8 characters' : 'Enter your password'} value={form.password} onChange={update('password')} /><button className="password-toggle" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
        {error && <div className="form-error" role="alert">{error}</div>}
        <button className="button button-dark auth-submit" disabled={busy}>{busy ? 'Please wait…' : register ? 'Create my account' : 'Log in'} <ArrowUpRight size={17} /></button>
        <p className="auth-switch">{register ? 'Already have an account?' : 'New to SpendSmart?'} <Link to={register ? '/login' : '/register'}>{register ? 'Log in' : 'Create an account'}</Link></p>
        <div className="auth-safe"><ShieldCheck size={16} /> Your financial details are private and protected.</div>
      </form></section>
    </div>
  </main>;
}

const navItems = [
  ['dashboard', 'Overview', LayoutDashboard], ['transactions', 'Transactions', ArrowLeftRight],
  ['budgets', 'Budgets', Wallet], ['analytics', 'Insights', BarChart3], ['goals', 'Savings goals', Target], ['settings', 'Settings', Settings],
];

function Shell({ children, user, logout }) {
  const location = useLocation();
  const title = pageTitles[location.pathname.slice(1)] || 'Overview';
  return <div className="app-shell"><aside className="sidebar"><Brand /><div className="side-label">YOUR MONEY</div><nav className="side-nav">{navItems.map(([path, label, Icon]) => <NavLink key={path} to={`/${path}`} className={({ isActive }) => `side-link ${isActive ? 'selected' : ''}`}><Icon size={18} strokeWidth={1.9} /><span>{label}</span>{path === 'dashboard' && <i className="nav-dot" />}</NavLink>)}</nav><div className="sidebar-tip"><span className="tip-spark"><Sparkles size={15} /></span><b>A little progress<br />is still progress.</b><small>Keep showing up for your goals.</small></div><div className="side-profile"><div className="profile-avatar">{user?.name?.[0]?.toUpperCase() || 'S'}</div><div className="profile-details"><b>{user?.name || 'Your account'}</b><small>Personal account</small></div><button className="icon-button logout-button" title="Sign out" onClick={logout}><LogOut size={17} /></button></div></aside>
    <main className="app-main"><header className="topbar"><div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><b>{title}</b></div><div className="topbar-right"><span className="today-pill"><span /> All caught up</span><div className="top-avatar">{user?.name?.[0]?.toUpperCase() || 'S'}</div></div></header><section className="page-content">{children}</section></main>
  </div>;
}

function StatCard({ label, value, icon: Icon, tone, caption, trend }) {
  return <article className={`stat-card stat-${tone}`}><div className="stat-card-top"><span>{label}</span><span className="stat-icon"><Icon size={18} /></span></div><strong>{money(value)}</strong><div className="stat-caption">{trend && <span className="trend-tag"><TrendingUp size={13} />{trend}</span>}{caption}</div></article>;
}

function EmptyState({ icon: Icon = Sparkles, title, text }) {
  return <div className="empty-state"><div className="empty-illustration"><span /><span /><span /><Icon size={28} /></div><h3>{title}</h3><p>{text}</p></div>;
}

function Screen({ page, token }) {
  const [items, setItems] = useState([]); const [summary, setSummary] = useState({}); const [monthly, setMonthly] = useState([]);
  const [modal, setModal] = useState(false); const [error, setError] = useState(''); const [search, setSearch] = useState('');
  const [form, setForm] = useState({ type: 'expense', category: 'Food', date: new Date().toISOString().slice(0, 10) });
  const path = ['transactions', 'budgets', 'goals'].includes(page) ? page : null;
  async function load() {
    try { setError(''); if (path) setItems(await api(`/${path}`, { token })); if (page === 'dashboard' || page === 'analytics') { const [s, m] = await Promise.all([api('/analytics/summary', { token }), api('/analytics/monthly', { token })]); setSummary(s); setMonthly(m); } }
    catch (e) { setError(e.message || 'We could not load this page.'); }
  }
  useEffect(() => { load(); }, [page]);
  async function save(event) { event.preventDefault(); setError(''); try { await api(`/${path}`, { token, method: 'POST', body: form }); setModal(false); setForm({ type: 'expense', category: 'Food', date: new Date().toISOString().slice(0, 10) }); load(); } catch (e) { setError(e.message || 'Unable to save this item.'); } }
  async function remove(id) { if (window.confirm('Delete this item?')) { try { await api(`/${path}/${id}`, { token, method: 'DELETE' }); load(); } catch (e) { setError(e.message); } } }
  const filtered = items.filter((item) => `${item.title || ''} ${item.category || ''} ${item.type || ''}`.toLowerCase().includes(search.toLowerCase()));
  const heading = pageTitles[page];
  const addLabel = page === 'transactions' ? 'transaction' : page === 'budgets' ? 'budget' : 'goal';
  const chartData = monthly.map((item) => ({ month: new Date(2000, (item._id.month || 1) - 1).toLocaleString('en-IN', { month: 'short' }), income: item._id.type === 'income' ? item.total : 0, expense: item._id.type === 'expense' ? item.total : 0 }));
  return <>
    <div className="page-heading"><div><span className="page-overline">YOUR FINANCIAL SNAPSHOT</span><h1>{heading}<span className="heading-spark">✳</span></h1><p>{page === 'dashboard' ? 'Here’s how things are looking today.' : `A clear view of your ${heading.toLowerCase()}, all in one place.`}</p></div>{['transactions', 'budgets', 'goals'].includes(page) && <button className="button button-dark" onClick={() => setModal(true)}><Plus size={17} /> Add {addLabel}</button>}</div>
    {error && <div className="page-error" role="alert"><CircleHelp size={17} />{error}<button onClick={load}>Try again</button></div>}
    {page === 'dashboard' && <>
      <div className="welcome-banner"><div className="welcome-copy"><span className="welcome-tag"><Sparkles size={13} /> YOUR MONEY, IN BLOOM</span><h2>Small steps make<br />a <em>beautiful</em> difference.</h2><p>Every mindful choice is moving you forward.</p><Link to="/transactions">Explore your activity <ArrowUpRight size={15} /></Link></div><div className="welcome-doodle" aria-hidden="true"><div className="doodle-sun">✳</div><div className="doodle-plant plant-a"><i /><i /><i /><b /></div><div className="doodle-plant plant-b"><i /><i /><b /></div><div className="doodle-pot" /></div></div>
      <div className="stats-grid"><StatCard label="Total balance" value={summary.balance} icon={Wallet} tone="lavender" caption="Across your account" /><StatCard label="Income" value={summary.income} icon={ArrowDownLeft} tone="mint" caption="Money coming in" trend="On track" /><StatCard label="Expenses" value={summary.expenses} icon={ArrowUpRight} tone="peach" caption="Money going out" /><StatCard label="Savings goals" value={summary.savings} icon={Target} tone="blue" caption="Building for later" /></div>
      <div className="dashboard-grid"><article className="content-card chart-card"><div className="card-heading"><div><span className="card-kicker">YOUR CASH FLOW</span><h2>Income & spending</h2></div><span className="chart-legend"><i className="legend-income" />Income <i className="legend-expense" />Expenses</span></div>{chartData.length ? <ResponsiveContainer width="100%" height={245}><BarChart data={chartData} barGap={5}><CartesianGrid stroke="#eef0f5" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9295a6', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: '#9295a6', fontSize: 11 }} tickFormatter={(v) => `₹${v / 1000}k`} /><Tooltip formatter={(value) => money(value)} contentStyle={{ borderRadius: 12, border: '1px solid #eeeef3', boxShadow: '0 8px 24px #20204415' }} /><Bar dataKey="income" fill="#7b68d8" radius={[6, 6, 0, 0]} /><Bar dataKey="expense" fill="#ffad8f" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer> : <EmptyState icon={BarChart3} title="Your story starts here" text="Add your first transaction and your cash flow will appear." />}</article>
        <article className="content-card quick-card"><div className="card-heading"><div><span className="card-kicker">QUICK ACTIONS</span><h2>What’s on your mind?</h2></div></div><Link to="/transactions" className="quick-action"><span className="quick-icon quick-lilac"><ArrowLeftRight size={18} /></span><span><b>Track a transaction</b><small>Keep your spending in view</small></span><ChevronRight size={17} /></Link><Link to="/budgets" className="quick-action"><span className="quick-icon quick-mint"><Wallet size={18} /></span><span><b>Set a budget</b><small>Give your money a plan</small></span><ChevronRight size={17} /></Link><Link to="/goals" className="quick-action"><span className="quick-icon quick-peach"><Target size={18} /></span><span><b>Start a savings goal</b><small>Make future you proud</small></span><ChevronRight size={17} /></Link><div className="quick-quote"><span>“</span><p>It’s not about having more. It’s about making more of what you have.</p></div></article></div>
    </>}
    {['transactions', 'budgets', 'goals'].includes(page) && <article className="content-card list-card"><div className="list-toolbar"><div><span className="card-kicker">YOUR {heading.toUpperCase()}</span><h2>{items.length} {items.length === 1 ? 'item' : 'items'}</h2></div><div className="search-box"><Search size={16} /><input aria-label={`Search ${heading}`} placeholder="Search your list" value={search} onChange={(e) => setSearch(e.target.value)} /></div>{page === 'transactions' && <button className="button button-light" onClick={() => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['Title,Amount,Type,Category\n' + items.map((t) => [t.title, t.amount, t.type, t.category].join(',')).join('\n')], { type: 'text/csv' })); a.download = 'transactions.csv'; a.click(); URL.revokeObjectURL(a.href); }}><Download size={16} /> Export</button>}</div>
      {filtered.length ? <div className="item-list">{filtered.map((item) => <div className="item-row" key={item._id}><div className={`item-icon item-${page}`}><ItemIcon page={page} type={item.type} /></div><div className="item-main"><b>{item.title || item.category}</b><small>{item.category || (page === 'budgets' ? 'Monthly budget' : 'Savings goal')} {item.date && `· ${new Date(item.date).toLocaleDateString()}`}</small></div><div className="item-value"><b>{money(item.amount || item.monthlyLimit || item.currentAmount)}</b><small>{item.type || (page === 'budgets' ? `of ${money(item.monthlyLimit)}` : item.targetAmount ? `of ${money(item.targetAmount)} goal` : '')}</small></div>{page === 'goals' && <progress className="goal-progress" value={item.currentAmount} max={item.targetAmount} />}{page === 'goals' && <span className="goal-percent">{item.targetAmount ? Math.min(100, Math.round(item.currentAmount / item.targetAmount * 100)) : 0}%</span>}<button className="icon-button delete-button" aria-label="Delete" onClick={() => remove(item._id)}><Trash2 size={17} /></button></div>)}</div> : <EmptyState icon={page === 'goals' ? Target : page === 'budgets' ? Wallet : CreditCard} title={search ? 'Nothing found just yet' : `Your ${heading.toLowerCase()} are waiting`} text={search ? 'Try another search.' : `Add your first ${addLabel} to start building a clearer money picture.`} />}</article>}
    {page === 'analytics' && <div className="analytics-grid"><article className="content-card"><span className="card-kicker">A QUICK READ</span><h2>Your money pulse</h2><div className="pulse-number">{summary.income ? Math.round(((summary.income - summary.expenses) / summary.income) * 100) : 0}<small>%</small></div><p>of your income is left after expenses. Keep giving your goals a little love.</p><div className="pulse-bar"><i style={{ width: `${summary.income ? Math.min(100, Math.max(0, ((summary.income - summary.expenses) / summary.income) * 100)) : 0}%` }} /></div></article><article className="content-card"><span className="card-kicker">THE BIG PICTURE</span><h2>Money in & out</h2><div className="analytics-line"><span className="quick-icon quick-mint"><ArrowDownLeft size={18} /></span><span>Income</span><b>{money(summary.income)}</b></div><div className="analytics-line"><span className="quick-icon quick-peach"><ArrowUpRight size={18} /></span><span>Expenses</span><b>{money(summary.expenses)}</b></div><div className="analytics-line"><span className="quick-icon quick-lilac"><Target size={18} /></span><span>Saved so far</span><b>{money(summary.savings)}</b></div></article><article className="content-card analytics-chart"><span className="card-kicker">MONTH BY MONTH</span><h2>Your rhythm</h2>{chartData.length ? <ResponsiveContainer width="100%" height={250}><BarChart data={chartData} barGap={5}><CartesianGrid stroke="#eef0f5" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} /><Tooltip formatter={(v) => money(v)} /><Bar dataKey="income" fill="#7b68d8" radius={[6, 6, 0, 0]} /><Bar dataKey="expense" fill="#ffad8f" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer> : <EmptyState icon={BarChart3} title="Your rhythm will show here" text="Add a transaction to begin." />}</article></div>}
    {page === 'settings' && <article className="content-card settings-card"><span className="card-kicker">YOUR PROFILE</span><h2>Account details</h2><div className="settings-user"><div className="profile-avatar profile-avatar-large">{JSON.parse(localStorage.getItem('user') || '{}').name?.[0]?.toUpperCase() || 'S'}</div><div><b>{JSON.parse(localStorage.getItem('user') || '{}').name || 'SpendSmart member'}</b><small>{JSON.parse(localStorage.getItem('user') || '{}').email}</small></div></div><div className="settings-note"><ShieldCheck size={19} /><div><b>Your account, your space</b><small>Your financial information is private to your account.</small></div></div></article>}
    {modal && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setModal(false); }}><form className="modal-card" onSubmit={save}><div className="modal-heading"><div><span className="card-kicker">MAKE IT COUNT</span><h2>Add a {addLabel}</h2></div><button className="icon-button" type="button" aria-label="Close" onClick={() => setModal(false)}><X size={20} /></button></div>
      {page === 'transactions' ? <><label>What was it for?<input required placeholder="e.g. Weekly groceries" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><div className="form-two"><label>Amount<input type="number" min="0.01" step="0.01" required placeholder="0.00" value={form.amount || ''} onChange={(e) => setForm({ ...form, amount: +e.target.value })} /></label><label>Type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="expense">Expense</option><option value="income">Income</option></select></label></div><label>Category<input placeholder="Food" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label><label>Date<input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label></> : page === 'budgets' ? <><label>Category<input required placeholder="e.g. Eating out" value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label><label>Monthly limit<input type="number" min="0.01" required placeholder="0.00" value={form.monthlyLimit || ''} onChange={(e) => setForm({ ...form, monthlyLimit: +e.target.value })} /></label></> : <><label>What are you saving for?<input required placeholder="e.g. A weekend getaway" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label><div className="form-two"><label>Target amount<input type="number" min="0.01" required placeholder="0.00" value={form.targetAmount || ''} onChange={(e) => setForm({ ...form, targetAmount: +e.target.value })} /></label><label>Saved so far<input type="number" min="0" placeholder="0.00" value={form.currentAmount || ''} onChange={(e) => setForm({ ...form, currentAmount: +e.target.value })} /></label></div><label>Target date<input type="date" value={form.deadline || ''} onChange={(e) => setForm({ ...form, deadline: e.target.value })} /></label></>}
      {error && <div className="form-error" role="alert">{error}</div>}<button className="button button-dark modal-submit"><Plus size={17} /> Save {addLabel}</button></form></div>}
  </>;
}

function ItemIcon({ page, type }) {
  if (page === 'transactions') return type === 'income' ? <ArrowDownLeft size={19} /> : <ArrowUpRight size={19} />;
  if (page === 'budgets') return <Wallet size={19} />;
  return <Target size={19} />;
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  async function auth(path, body) { const data = await api(path, { method: 'POST', body }); setToken(data.token); setUser(data.user); localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); }
  function logout() { localStorage.removeItem('token'); localStorage.removeItem('user'); setToken(null); setUser(null); }
  return <Routes><Route path="/" element={token ? <Navigate to="/dashboard" /> : <Landing />} /><Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Auth register={false} auth={auth} />} /><Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Auth register auth={auth} />} />{Object.keys(pageTitles).map((page) => <Route key={page} path={`/${page}`} element={token ? <Shell user={user} logout={logout}><Screen page={page} token={token} /></Shell> : <Navigate to="/login" />} />)}<Route path="*" element={<Navigate to="/" />} /></Routes>;
}
