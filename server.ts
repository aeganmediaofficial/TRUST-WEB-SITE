import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RegistrationRecord {
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

interface EventRsvpRecord {
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

interface DonationPledgeRecord {
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

interface VolunteerRecord {
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

interface EnquiryRecord {
  id: number;
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface OrderRecord {
  id: number;
  name: string;
  mobile: string;
  email: string;
  address: string;
  items: Array<{ id: string; name: string; price: number; qty: number }>;
  total: number;
  createdAt: string;
}

interface DbSchema {
  nextId: number;
  registrations: RegistrationRecord[];
  eventRsvps: EventRsvpRecord[];
  donations: DonationPledgeRecord[];
  volunteers: VolunteerRecord[];
  enquiries: EnquiryRecord[];
  orders: OrderRecord[];
}

const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'aadheenam-db.json');

function ensureDb(): DbSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initial: DbSchema = {
      nextId: 1,
      registrations: [],
      eventRsvps: [],
      donations: [],
      volunteers: [],
      enquiries: [],
      orders: [],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw) as Partial<DbSchema>;
    return {
      nextId: typeof parsed.nextId === 'number' ? parsed.nextId : 1,
      registrations: Array.isArray(parsed.registrations) ? parsed.registrations : [],
      eventRsvps: Array.isArray(parsed.eventRsvps) ? parsed.eventRsvps : [],
      donations: Array.isArray(parsed.donations) ? parsed.donations : [],
      volunteers: Array.isArray(parsed.volunteers) ? parsed.volunteers : [],
      enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : [],
      orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    };
  } catch {
    return {
      nextId: 1,
      registrations: [],
      eventRsvps: [],
      donations: [],
      volunteers: [],
      enquiries: [],
      orders: [],
    };
  }
}

function saveDb(db: DbSchema): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tmpFile = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(db, null, 2), 'utf8');
  fs.renameSync(tmpFile, DB_FILE);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'pulipani-siddhar-aadheenam' });
  });

  // ── Class Registrations ───────────────────────────────────────────────────
  app.get('/api/registrations', (_req, res) => {
    const db = ensureDb();
    const sorted = [...db.registrations].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.json(sorted);
  });

  app.post('/api/registrations', (req, res) => {
    const body = req.body ?? {};
    const name = String(body.name ?? '').trim();
    const age = String(body.age ?? '').trim();
    const mobile = String(body.mobile ?? '').trim();
    const whatsapp = String(body.whatsapp ?? '').trim();
    const email = String(body.email ?? '').trim();
    const district = String(body.district ?? '').trim();
    const course = String(body.course ?? '').trim();
    const format = String(body.format ?? '').trim();
    const preferredDate = String(body.preferredDate ?? '').trim();
    const notes = body.notes ? String(body.notes).trim() : null;

    if (!name || !age || !mobile || !whatsapp || !email || !district || !course || !format) {
      res.status(400).json({ error: 'Please fill in all required registration fields.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (!isValidPhone(mobile) || !isValidPhone(whatsapp)) {
      res.status(400).json({ error: 'Please enter valid 10-digit mobile and WhatsApp numbers.' });
      return;
    }

    const db = ensureDb();
    const record: RegistrationRecord = {
      id: db.nextId++,
      name,
      age,
      mobile,
      whatsapp,
      email,
      district,
      course,
      format,
      preferredDate: preferredDate || 'Next Available Batch',
      notes,
      createdAt: new Date().toISOString(),
    };
    db.registrations.push(record);
    saveDb(db);
    res.status(201).json({ ok: true, registration: record });
  });

  app.delete('/api/registrations/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      res.status(400).json({ error: 'Invalid registration ID.' });
      return;
    }
    const db = ensureDb();
    const before = db.registrations.length;
    db.registrations = db.registrations.filter((r) => r.id !== id);
    if (db.registrations.length === before) {
      res.status(404).json({ error: 'Registration not found.' });
      return;
    }
    saveDb(db);
    res.json({ ok: true });
  });

  // ── Events RSVP ───────────────────────────────────────────────────────────
  app.get('/api/events/rsvps', (_req, res) => {
    const db = ensureDb();
    res.json(db.eventRsvps);
  });

  app.post('/api/events/rsvps', (req, res) => {
    const body = req.body ?? {};
    const eventId = String(body.eventId ?? '').trim();
    const eventTitle = String(body.eventTitle ?? '').trim();
    const name = String(body.name ?? '').trim();
    const mobile = String(body.mobile ?? '').trim();
    const email = String(body.email ?? '').trim();
    const attendees = Math.max(1, Math.min(20, Number(body.attendees ?? 1) || 1));
    const notes = String(body.notes ?? '').trim();

    if (!eventId || !eventTitle || !name || !mobile || !email) {
      res.status(400).json({ error: 'Please fill in all required event registration fields.' });
      return;
    }
    if (!isValidEmail(email) || !isValidPhone(mobile)) {
      res.status(400).json({ error: 'Please provide a valid email address and phone number.' });
      return;
    }

    const db = ensureDb();
    const record: EventRsvpRecord = {
      id: db.nextId++,
      eventId,
      eventTitle,
      name,
      mobile,
      email,
      attendees,
      notes,
      createdAt: new Date().toISOString(),
    };
    db.eventRsvps.push(record);
    saveDb(db);
    res.status(201).json({ ok: true, rsvp: record });
  });

  // ── Donations / Mission Support ───────────────────────────────────────────
  app.get('/api/donations', (_req, res) => {
    const db = ensureDb();
    res.json({
      count: db.donations.length,
      totalPledged: db.donations.reduce((acc, d) => acc + d.amount, 0),
    });
  });

  app.post('/api/donations', (req, res) => {
    const body = req.body ?? {};
    const fundId = String(body.fundId ?? '').trim();
    const fundTitle = String(body.fundTitle ?? '').trim();
    const amount = Number(body.amount ?? 0);
    const frequency = String(body.frequency ?? 'One-Time').trim();
    const name = String(body.name ?? '').trim();
    const mobile = String(body.mobile ?? '').trim();
    const email = String(body.email ?? '').trim();
    const pan = String(body.pan ?? '').trim();

    if (!fundId || !fundTitle || !name || !mobile || !email || !Number.isFinite(amount) || amount < 100) {
      res.status(400).json({ error: 'Please enter a valid contribution amount (min ₹100) and contact details.' });
      return;
    }
    if (!isValidEmail(email) || !isValidPhone(mobile)) {
      res.status(400).json({ error: 'Please enter a valid email and 10-digit mobile number.' });
      return;
    }

    const db = ensureDb();
    const record: DonationPledgeRecord = {
      id: db.nextId++,
      fundId,
      fundTitle,
      amount,
      frequency,
      name,
      mobile,
      email,
      pan,
      createdAt: new Date().toISOString(),
    };
    db.donations.push(record);
    saveDb(db);
    res.status(201).json({ ok: true, donation: record });
  });

  // ── Volunteers ────────────────────────────────────────────────────────────
  app.post('/api/volunteers', (req, res) => {
    const body = req.body ?? {};
    const name = String(body.name ?? '').trim();
    const age = String(body.age ?? '').trim();
    const mobile = String(body.mobile ?? '').trim();
    const email = String(body.email ?? '').trim();
    const district = String(body.district ?? '').trim();
    const wing = String(body.wing ?? '').trim();
    const availability = String(body.availability ?? '').trim();
    const notes = String(body.notes ?? '').trim();

    if (!name || !age || !mobile || !email || !district || !wing) {
      res.status(400).json({ error: 'Please complete all required volunteer fields.' });
      return;
    }
    if (!isValidEmail(email) || !isValidPhone(mobile)) {
      res.status(400).json({ error: 'Please enter a valid email address and mobile number.' });
      return;
    }

    const db = ensureDb();
    const record: VolunteerRecord = {
      id: db.nextId++,
      name,
      age,
      mobile,
      email,
      district,
      wing,
      availability: availability || 'Weekends',
      notes,
      createdAt: new Date().toISOString(),
    };
    db.volunteers.push(record);
    saveDb(db);
    res.status(201).json({ ok: true, volunteer: record });
  });

  // ── Contact Enquiries ─────────────────────────────────────────────────────
  app.post('/api/contact', (req, res) => {
    const body = req.body ?? {};
    const name = String(body.name ?? '').trim();
    const mobile = String(body.mobile ?? '').trim();
    const email = String(body.email ?? '').trim();
    const subject = String(body.subject ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!name || !mobile || !email || !message) {
      res.status(400).json({ error: 'Please fill in your name, mobile, email, and message.' });
      return;
    }
    if (!isValidEmail(email) || !isValidPhone(mobile)) {
      res.status(400).json({ error: 'Please enter a valid email address and mobile number.' });
      return;
    }

    const db = ensureDb();
    const record: EnquiryRecord = {
      id: db.nextId++,
      name,
      mobile,
      email,
      subject: subject || 'General Enquiry',
      message,
      createdAt: new Date().toISOString(),
    };
    db.enquiries.push(record);
    saveDb(db);
    res.status(201).json({ ok: true, enquiry: record });
  });

  // ── Store Orders ──────────────────────────────────────────────────────────
  app.post('/api/orders', (req, res) => {
    const body = req.body ?? {};
    const name = String(body.name ?? '').trim();
    const mobile = String(body.mobile ?? '').trim();
    const email = String(body.email ?? '').trim();
    const address = String(body.address ?? '').trim();
    const items = Array.isArray(body.items) ? body.items : [];
    const total = Number(body.total ?? 0);

    if (!name || !mobile || !email || !address || items.length === 0) {
      res.status(400).json({ error: 'Please provide delivery details and at least one item.' });
      return;
    }
    if (!isValidEmail(email) || !isValidPhone(mobile)) {
      res.status(400).json({ error: 'Please provide a valid email address and mobile number.' });
      return;
    }

    const db = ensureDb();
    const record: OrderRecord = {
      id: db.nextId++,
      name,
      mobile,
      email,
      address,
      items,
      total,
      createdAt: new Date().toISOString(),
    };
    db.orders.push(record);
    saveDb(db);
    res.status(201).json({ ok: true, order: record });
  });

  // ── Admin Overview & Record Management ────────────────────────────────────
  app.get('/api/admin/overview', (_req, res) => {
    const db = ensureDb();
    const sortDesc = <T extends { createdAt: string }>(items: T[]) =>
      [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    res.json({
      registrations: sortDesc(db.registrations),
      eventRsvps: sortDesc(db.eventRsvps),
      donations: sortDesc(db.donations),
      orders: sortDesc(db.orders),
      volunteers: sortDesc(db.volunteers),
      enquiries: sortDesc(db.enquiries),
    });
  });

  app.delete('/api/admin/:collection/:id', (req, res) => {
    const collection = req.params.collection;
    const id = Number(req.params.id);
    const allowed = ['registrations', 'eventRsvps', 'donations', 'orders', 'volunteers', 'enquiries'] as const;
    type AllowedKey = (typeof allowed)[number];
    if (!allowed.includes(collection as AllowedKey) || !Number.isFinite(id)) {
      res.status(400).json({ error: 'Invalid collection or record ID.' });
      return;
    }
    const key = collection as AllowedKey;
    const db = ensureDb();
    const before = db[key].length;
    (db[key] as Array<{ id: number }>) = (db[key] as Array<{ id: number }>).filter((item) => item.id !== id);
    if (db[key].length === before) {
      res.status(404).json({ error: 'Record not found.' });
      return;
    }
    saveDb(db);
    res.json({ ok: true });
  });

  // ── Standalone HTML Export Route ───────────────────────────────────────────
  app.get('/pulipani-siddhar-aadheenam.html', (req, res) => {
    const standalonePath = path.resolve(__dirname, 'public', 'pulipani-siddhar-aadheenam.html');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    if (req.query.download === '1') {
      res.setHeader('Content-Disposition', 'attachment; filename="pulipani-siddhar-aadheenam.html"');
    }
    res.sendFile(standalonePath);
  });

  app.get('/download/pulipani-siddhar-aadheenam.html', (_req, res) => {
    const standalonePath = path.resolve(__dirname, 'public', 'pulipani-siddhar-aadheenam.html');
    res.download(standalonePath, 'pulipani-siddhar-aadheenam.html');
  });

  // ── Vite Middleware (Dev) or Static Assets (Prod) ─────────────────────────
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
        ws: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Pulipani Siddhar Aadheenam server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
