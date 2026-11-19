import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Download, RefreshCw, Search, Trash2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { tr } from '../data/translations';

interface Registration {
  id: number;
  name: string;
  age: string;
  mobile: string;
  whatsapp: string;
  email: string;
  district: string;
  course: string;
  format: string;
  preferredDate: string;
  notes: string | null;
  createdAt: string;
}

interface EventRsvp {
  id: number;
  eventId: string;
  eventTitle: string;
  name: string;
  mobile: string;
  email: string;
  attendees: number;
  notes: string;
  createdAt: string;
}

interface DonationPledge {
  id: number;
  fundId: string;
  fundTitle: string;
  amount: number;
  frequency: string;
  name: string;
  mobile: string;
  email: string;
  pan: string;
  createdAt: string;
}

interface StoreOrder {
  id: number;
  name: string;
  mobile: string;
  email: string;
  address: string;
  items: Array<{ id: string; name: string; price: number; qty: number }>;
  total: number;
  createdAt: string;
}

interface Volunteer {
  id: number;
  name: string;
  age: string;
  mobile: string;
  email: string;
  district: string;
  wing: string;
  availability: string;
  notes: string;
  createdAt: string;
}

interface Enquiry {
  id: number;
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface OverviewPayload {
  registrations: Registration[];
  eventRsvps: EventRsvp[];
  donations: DonationPledge[];
  orders: StoreOrder[];
  volunteers: Volunteer[];
  enquiries: Enquiry[];
}

type AdminTab = keyof OverviewPayload;

function downloadCsv(filename: string, headers: string[], rows: Array<Array<string | number | null | undefined>>) {
  const escape = (v: string | number | null | undefined) => {
    const s = String(v ?? '');
    return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [headers.join(','), ...rows.map((r) => r.map(escape).join(','))];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminRegistrationsPage() {
  const { lang } = useSite();
  const [tab, setTab] = useState<AdminTab>('registrations');
  const [data, setData] = useState<OverviewPayload>({
    registrations: [],
    eventRsvps: [],
    donations: [],
    orders: [],
    volunteers: [],
    enquiries: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterFormat, setFilterFormat] = useState('');

  async function loadOverview() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/overview');
      if (!res.ok) throw new Error('Failed to load records');
      const json = (await res.json()) as OverviewPayload;
      setData(json);
    } catch {
      setError(tr(lang, 'Failed to load portal data.', 'நிர்வாகத் தரவுகளைப் பெற முடியவில்லை.'));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadOverview();
  }, []);

  async function handleDelete(collection: AdminTab, id: number) {
    try {
      const res = await fetch(`/api/admin/${collection}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setData((prev) => ({
          ...prev,
          [collection]: prev[collection].filter((item) => item.id !== id),
        }));
      }
    } catch {
      // ignore error
    }
  }

  const q = search.trim().toLowerCase();

  const filteredRegistrations = data.registrations.filter((r) => {
    const matchSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.mobile.includes(q) ||
      r.district.toLowerCase().includes(q) ||
      r.course.toLowerCase().includes(q);
    const matchCourse = !filterCourse || r.course === filterCourse;
    const matchFormat = !filterFormat || r.format === filterFormat;
    return matchSearch && matchCourse && matchFormat;
  });

  const filteredRsvps = data.eventRsvps.filter(
    (r) =>
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.eventTitle.toLowerCase().includes(q) ||
      r.mobile.includes(q) ||
      r.email.toLowerCase().includes(q)
  );

  const filteredDonations = data.donations.filter(
    (d) =>
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.fundTitle.toLowerCase().includes(q) ||
      d.email.toLowerCase().includes(q) ||
      d.mobile.includes(q)
  );

  const filteredOrders = data.orders.filter(
    (o) =>
      !q ||
      o.name.toLowerCase().includes(q) ||
      o.address.toLowerCase().includes(q) ||
      o.mobile.includes(q) ||
      o.email.toLowerCase().includes(q)
  );

  const filteredVolunteers = data.volunteers.filter(
    (v) =>
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.wing.toLowerCase().includes(q) ||
      v.district.toLowerCase().includes(q) ||
      v.mobile.includes(q)
  );

  const filteredEnquiries = data.enquiries.filter(
    (e) =>
      !q ||
      e.name.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      e.message.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q)
  );

  const courses = Array.from(new Set(data.registrations.map((r) => r.course))).sort();
  const totalDonationsAmount = data.donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalOrdersAmount = data.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalEventAttendees = data.eventRsvps.reduce((sum, r) => sum + (Number(r.attendees) || 1), 0);

  function handleExportActiveCsv() {
    if (tab === 'registrations') {
      downloadCsv(
        'class-registrations',
        ['ID', 'Name', 'Age', 'Mobile', 'WhatsApp', 'Email', 'District', 'Course', 'Format', 'Preferred Date', 'Notes', 'Created At'],
        filteredRegistrations.map((r) => [r.id, r.name, r.age, r.mobile, r.whatsapp, r.email, r.district, r.course, r.format, r.preferredDate, r.notes, r.createdAt])
      );
    } else if (tab === 'eventRsvps') {
      downloadCsv(
        'event-rsvps',
        ['ID', 'Event', 'Name', 'Mobile', 'Email', 'Attendees', 'Notes', 'Created At'],
        filteredRsvps.map((r) => [r.id, r.eventTitle, r.name, r.mobile, r.email, r.attendees, r.notes, r.createdAt])
      );
    } else if (tab === 'donations') {
      downloadCsv(
        'donations',
        ['ID', 'Fund', 'Amount', 'Frequency', 'Donor Name', 'Mobile', 'Email', 'PAN', 'Created At'],
        filteredDonations.map((d) => [d.id, d.fundTitle, d.amount, d.frequency, d.name, d.mobile, d.email, d.pan, d.createdAt])
      );
    } else if (tab === 'orders') {
      downloadCsv(
        'store-orders',
        ['ID', 'Customer', 'Mobile', 'Email', 'Address', 'Items', 'Total', 'Created At'],
        filteredOrders.map((o) => [
          o.id,
          o.name,
          o.mobile,
          o.email,
          o.address,
          o.items.map((i) => `${i.name} x${i.qty}`).join('; '),
          o.total,
          o.createdAt,
        ])
      );
    } else if (tab === 'volunteers') {
      downloadCsv(
        'volunteers',
        ['ID', 'Name', 'Age', 'Mobile', 'Email', 'District', 'Seva Wing', 'Availability', 'Notes', 'Created At'],
        filteredVolunteers.map((v) => [v.id, v.name, v.age, v.mobile, v.email, v.district, v.wing, v.availability, v.notes, v.createdAt])
      );
    } else {
      downloadCsv(
        'enquiries',
        ['ID', 'Name', 'Mobile', 'Email', 'Topic', 'Message', 'Created At'],
        filteredEnquiries.map((e) => [e.id, e.name, e.mobile, e.email, e.subject, e.message, e.createdAt])
      );
    }
  }

  const activeCount = {
    registrations: filteredRegistrations.length,
    eventRsvps: filteredRsvps.length,
    donations: filteredDonations.length,
    orders: filteredOrders.length,
    volunteers: filteredVolunteers.length,
    enquiries: filteredEnquiries.length,
  }[tab];

  const tabs: Array<{ id: AdminTab; label: string; count: number }> = [
    { id: 'registrations', label: tr(lang, 'Class Registrations', 'வகுப்புப் பதிவுகள்'), count: data.registrations.length },
    { id: 'eventRsvps', label: tr(lang, 'Event RSVPs', 'நிகழ்வுப் பதிவுகள்'), count: data.eventRsvps.length },
    { id: 'donations', label: tr(lang, 'Donations', 'நன்கொடைகள்'), count: data.donations.length },
    { id: 'orders', label: tr(lang, 'Store Orders', 'அங்காடி ஆர்டர்கள்'), count: data.orders.length },
    { id: 'volunteers', label: tr(lang, 'Volunteers', 'தன்னார்வலர்கள்'), count: data.volunteers.length },
    { id: 'enquiries', label: tr(lang, 'Enquiries', 'விசாரணைகள்'), count: data.enquiries.length },
  ];

  return (
    <main className="min-h-[80vh] bg-white dark:bg-[#070D19] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-base font-medium text-amber-700 dark:text-amber-300">
              {tr(lang, 'சேவை & நிர்வாகப் பலகை', 'Seva & Operations Portal')}
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
              {tr(lang, 'Aadheenam Records & Seva Operations', 'ஆதீனப் பதிவுகள் & சேவை செயல்பாடுகள்')}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void loadOverview()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>{tr(lang, 'Refresh', 'புதுப்பி')}</span>
            </button>
            <Link
              to="/classes#register"
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              {tr(lang, 'Add Registration', 'புதிய பதிவு')}
            </Link>
            <button
              type="button"
              onClick={handleExportActiveCsv}
              disabled={activeCount === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-sm font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>{tr(lang, 'Export CSV', 'CSV பதிவிறக்கம்')}</span>
            </button>
          </div>
        </div>

        {/* Summary KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: tr(lang, 'Class Students', 'வகுப்பு மாணவர்கள்'),
              value: data.registrations.length.toLocaleString('en-IN'),
            },
            {
              label: tr(lang, 'Event Attendees', 'நிகழ்வுப் பங்கேற்பாளர்கள்'),
              value: totalEventAttendees.toLocaleString('en-IN'),
            },
            {
              label: tr(lang, 'Donations Pledged', 'உறுதிப்படுத்தப்பட்ட நன்கொடை'),
              value: `₹${totalDonationsAmount.toLocaleString('en-IN')}`,
            },
            {
              label: tr(lang, 'Store Orders & Seva', 'அங்காடி ஆர்டர்கள் & சேவை'),
              value: `₹${totalOrdersAmount.toLocaleString('en-IN')} · ${data.volunteers.length + data.enquiries.length}`,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-5 bg-slate-50 dark:bg-[#10192D] border border-slate-200 dark:border-white/10"
            >
              <p className="text-xs text-slate-500 dark:text-slate-300">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Operations Tab Bar */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-slate-100 dark:bg-[#10192D] border border-slate-200 dark:border-white/10 mb-6">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTab(item.id);
                setSearch('');
              }}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap tabular-nums ${
                tab === item.id
                  ? 'bg-white dark:bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label} ({item.count})
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              placeholder={tr(lang, 'Search records by name, contact, fund, topic...', 'பெயர், தொடர்பு, நிதி அல்லது தலைப்பு மூலம் தேடுங்கள்...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#10192D] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          {tab === 'registrations' && (
            <>
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                aria-label="Filter by course"
                className="px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#10192D] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">{tr(lang, 'All Courses', 'அனைத்து வகுப்புகள்')}</option>
                {courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                value={filterFormat}
                onChange={(e) => setFilterFormat(e.target.value)}
                aria-label="Filter by format"
                className="px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-[#10192D] border border-slate-300 dark:border-white/15 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="">{tr(lang, 'All Formats', 'அனைத்து முறைகள்')}</option>
                <option value="Online">{tr(lang, 'Online', 'ஆன்லைன்')}</option>
                <option value="Offline">{tr(lang, 'Offline', 'நேரில்')}</option>
              </select>
            </>
          )}
        </div>

        {/* Data Tables */}
        {loading ? (
          <div className="text-center py-16 text-sm text-slate-500 dark:text-slate-300">
            {tr(lang, 'Loading portal records...', 'தரவுகள் ஏற்றப்படுகின்றன...')}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-sm text-rose-600 dark:text-rose-400">{error}</div>
        ) : activeCount === 0 ? (
          <div className="text-center py-16 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#10192D] space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-200">
              {tr(lang, 'No records found for this view yet.', 'இந்தப் பிரிவில் இன்னும் பதிவுகள் இல்லை.')}
            </p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-white/10">
            <div className="overflow-x-auto">
              {tab === 'registrations' && (
                <table className="w-full text-left border-collapse min-w-[920px]">
                  <thead className="bg-[#0B1324] text-white text-xs">
                    <tr>
                      <th className="py-3 px-4 font-semibold">ID</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Name', 'பெயர்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Age', 'வயது')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Mobile', 'மொபைல்')}</th>
                      <th className="py-3 px-4 font-semibold">WhatsApp</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Email', 'மின்னஞ்சல்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'District', 'மாவட்டம்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Course', 'வகுப்பு')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Format', 'முறை')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Date', 'தேதி')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Action', 'செயல்')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {filteredRegistrations.map((r) => (
                      <tr key={r.id} className="bg-white dark:bg-[#10192D] hover:bg-slate-50 dark:hover:bg-[#152038]">
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300">{r.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{r.name}</td>
                        <td className="py-3 px-4 tabular-nums">{r.age}</td>
                        <td className="py-3 px-4 tabular-nums">{r.mobile}</td>
                        <td className="py-3 px-4 tabular-nums">
                          <a
                            href={`https://wa.me/${r.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-700 dark:text-emerald-400 underline"
                          >
                            {r.whatsapp}
                          </a>
                        </td>
                        <td className="py-3 px-4">{r.email}</td>
                        <td className="py-3 px-4">{r.district}</td>
                        <td className="py-3 px-4 max-w-[180px]">{r.course}</td>
                        <td className="py-3 px-4 font-medium text-amber-700 dark:text-amber-300">{r.format}</td>
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300 whitespace-nowrap">
                          {formatDate(r.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => void handleDelete('registrations', r.id)}
                            aria-label={`Delete registration for ${r.name}`}
                            className="p-1.5 rounded text-slate-500 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === 'eventRsvps' && (
                <table className="w-full text-left border-collapse min-w-[780px]">
                  <thead className="bg-[#0B1324] text-white text-xs">
                    <tr>
                      <th className="py-3 px-4 font-semibold">ID</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Event', 'நிகழ்வு')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Participant', 'பங்கேற்பாளர்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Mobile', 'மொபைல்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Email', 'மின்னஞ்சல்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Attendees', 'எண்ணிக்கை')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Notes', 'குறிப்புகள்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Date', 'தேதி')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Action', 'செயல்')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {filteredRsvps.map((r) => (
                      <tr key={r.id} className="bg-white dark:bg-[#10192D] hover:bg-slate-50 dark:hover:bg-[#152038]">
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300">{r.id}</td>
                        <td className="py-3 px-4 font-medium text-amber-700 dark:text-amber-300">{r.eventTitle}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{r.name}</td>
                        <td className="py-3 px-4 tabular-nums">{r.mobile}</td>
                        <td className="py-3 px-4">{r.email}</td>
                        <td className="py-3 px-4 tabular-nums font-semibold">{r.attendees}</td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-200 max-w-[200px]">{r.notes || '—'}</td>
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300 whitespace-nowrap">{formatDate(r.createdAt)}</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => void handleDelete('eventRsvps', r.id)}
                            aria-label={`Delete RSVP for ${r.name}`}
                            className="p-1.5 rounded text-slate-500 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === 'donations' && (
                <table className="w-full text-left border-collapse min-w-[780px]">
                  <thead className="bg-[#0B1324] text-white text-xs">
                    <tr>
                      <th className="py-3 px-4 font-semibold">ID</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Fund', 'நிதி')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Amount', 'தொகை')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Frequency', 'முறை')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Donor', 'நன்கொடையாளர்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Mobile', 'மொபைல்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Email', 'மின்னஞ்சல்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Date', 'தேதி')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Action', 'செயல்')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {filteredDonations.map((d) => (
                      <tr key={d.id} className="bg-white dark:bg-[#10192D] hover:bg-slate-50 dark:hover:bg-[#152038]">
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300">{d.id}</td>
                        <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{d.fundTitle}</td>
                        <td className="py-3 px-4 tabular-nums font-bold text-amber-700 dark:text-amber-300">
                          ₹{d.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4">{d.frequency}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{d.name}</td>
                        <td className="py-3 px-4 tabular-nums">{d.mobile}</td>
                        <td className="py-3 px-4">{d.email}</td>
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300 whitespace-nowrap">{formatDate(d.createdAt)}</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => void handleDelete('donations', d.id)}
                            aria-label={`Delete donation ${d.id}`}
                            className="p-1.5 rounded text-slate-500 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === 'orders' && (
                <table className="w-full text-left border-collapse min-w-[820px]">
                  <thead className="bg-[#0B1324] text-white text-xs">
                    <tr>
                      <th className="py-3 px-4 font-semibold">ID</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Customer', 'வாடிக்கையாளர்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Mobile', 'மொபைல்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Items', 'பொருட்கள்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Total', 'மொத்தம்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Address', 'முகவரி')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Date', 'தேதி')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Action', 'செயல்')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="bg-white dark:bg-[#10192D] hover:bg-slate-50 dark:hover:bg-[#152038]">
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300">{o.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{o.name}</td>
                        <td className="py-3 px-4 tabular-nums">{o.mobile}</td>
                        <td className="py-3 px-4 max-w-[240px]">
                          {o.items.map((item) => `${item.name} ×${item.qty}`).join(', ')}
                        </td>
                        <td className="py-3 px-4 tabular-nums font-bold text-amber-700 dark:text-amber-300">
                          ₹{o.total.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4 max-w-[220px] text-slate-600 dark:text-slate-200">{o.address}</td>
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300 whitespace-nowrap">{formatDate(o.createdAt)}</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => void handleDelete('orders', o.id)}
                            aria-label={`Delete order ${o.id}`}
                            className="p-1.5 rounded text-slate-500 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === 'volunteers' && (
                <table className="w-full text-left border-collapse min-w-[780px]">
                  <thead className="bg-[#0B1324] text-white text-xs">
                    <tr>
                      <th className="py-3 px-4 font-semibold">ID</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Name', 'பெயர்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Mobile', 'மொபைல்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'District', 'மாவட்டம்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Seva Wing', 'சேவைப் பிரிவு')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Availability', 'நேரம்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Date', 'தேதி')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Action', 'செயல்')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {filteredVolunteers.map((v) => (
                      <tr key={v.id} className="bg-white dark:bg-[#10192D] hover:bg-slate-50 dark:hover:bg-[#152038]">
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300">{v.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{v.name}</td>
                        <td className="py-3 px-4 tabular-nums">{v.mobile}</td>
                        <td className="py-3 px-4">{v.district}</td>
                        <td className="py-3 px-4 font-medium text-amber-700 dark:text-amber-300">{v.wing}</td>
                        <td className="py-3 px-4">{v.availability}</td>
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300 whitespace-nowrap">{formatDate(v.createdAt)}</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => void handleDelete('volunteers', v.id)}
                            aria-label={`Delete volunteer ${v.name}`}
                            className="p-1.5 rounded text-slate-500 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {tab === 'enquiries' && (
                <table className="w-full text-left border-collapse min-w-[780px]">
                  <thead className="bg-[#0B1324] text-white text-xs">
                    <tr>
                      <th className="py-3 px-4 font-semibold">ID</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Name', 'பெயர்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Mobile', 'மொபைல்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Email', 'மின்னஞ்சல்')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Topic', 'தலைப்பு')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Message', 'செய்தி')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Date', 'தேதி')}</th>
                      <th className="py-3 px-4 font-semibold">{tr(lang, 'Action', 'செயல்')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {filteredEnquiries.map((e) => (
                      <tr key={e.id} className="bg-white dark:bg-[#10192D] hover:bg-slate-50 dark:hover:bg-[#152038]">
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300">{e.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{e.name}</td>
                        <td className="py-3 px-4 tabular-nums">{e.mobile}</td>
                        <td className="py-3 px-4">{e.email}</td>
                        <td className="py-3 px-4 font-medium text-amber-700 dark:text-amber-300">{e.subject}</td>
                        <td className="py-3 px-4 max-w-[260px] text-slate-600 dark:text-slate-200">{e.message}</td>
                        <td className="py-3 px-4 tabular-nums text-slate-500 dark:text-slate-300 whitespace-nowrap">{formatDate(e.createdAt)}</td>
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => void handleDelete('enquiries', e.id)}
                            aria-label={`Delete enquiry ${e.id}`}
                            className="p-1.5 rounded text-slate-500 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
