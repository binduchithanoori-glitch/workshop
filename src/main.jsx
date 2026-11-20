import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const API_BASE = 'https://workshop-hinr.onrender.com';
const storedUserId = () => window.localStorage.getItem('campuspulse-user-id') || '';

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(body?.error || `Request failed (${response.status})`);
  return body;
}

function App() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [userId, setUserId] = useState(storedUserId);
  const [activeView, setActiveView] = useState('discover');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All events');
  const [loading, setLoading] = useState(true);
  const [busyEvent, setBusyEvent] = useState('');
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState('');

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const result = await api('/api/events');
      setEvents(Array.isArray(result) ? result : []);
    } catch (e) {
      setError(e.message || 'Could not load events.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadRegistrations = useCallback(async (id = userId) => {
    if (!id.trim()) {
      setRegistrations([]);
      return;
    }
    try {
      const result = await api(`/api/me/registrations?user_id=${encodeURIComponent(id.trim())}`);
      setRegistrations(Array.isArray(result) ? result : []);
    } catch (e) {
      setError(e.message || 'Could not load registrations.');
    }
  }, [userId]);

  useEffect(() => { loadEvents(); }, [loadEvents]);
  useEffect(() => {
    const timer = window.setTimeout(() => loadRegistrations(), 350);
    return () => window.clearTimeout(timer);
  }, [loadRegistrations]);

  const registeredIds = useMemo(() => new Set(registrations.map((r) => r.event_id)), [registrations]);
  const visibleEvents = useMemo(() => events.filter((event) => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || [event.title, event.status, event.organizer_id, event.description, event.venue]
      .some((value) => String(value || '').toLowerCase().includes(query));
    const status = String(event.status || '').toLowerCase();
    const matchesFilter = filter === 'All events'
      || (filter === 'Open' && !['full', 'closed', 'cancelled', 'sold out'].includes(status))
      || (filter === 'Full' && ['full', 'closed', 'sold out'].includes(status));
    return matchesSearch && matchesFilter;
  }), [events, filter, search]);

  function saveUserId(value) {
    const clean = value.trim();
    setUserId(clean);
    window.localStorage.setItem('campuspulse-user-id', clean);
    setError('');
  }

  async function openEvent(event) {
    setSelectedEvent(event);
    setAttendees([]);
    setError('');
    try {
      const result = await api(`/api/events/${encodeURIComponent(event.id)}`);
      setSelectedEvent(result);
    } catch (e) {
      setError(e.message || 'Could not load event details.');
    }
  }

  async function register(event) {
    if (!userId.trim()) {
      setNotice({ type: 'error', text: 'Enter your existing user UUID above to register.' });
      document.querySelector('#user-id')?.focus();
      return;
    }
    setBusyEvent(event.id);
    setNotice(null);
    try {
      await api('/api/registrations', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId.trim(), event_id: event.id }),
      });
      await loadRegistrations();
      setNotice({ type: 'success', text: `You’re registered for ${event.title || 'this event'}.` });
    } catch (e) {
      setNotice({ type: 'error', text: e.message || 'Registration failed.' });
    } finally {
      setBusyEvent('');
    }
  }

  async function viewAttendees(event) {
    setSelectedEvent(event);
    setAttendees([]);
    try {
      const result = await api(`/api/events/${encodeURIComponent(event.id)}/registrations`);
      setAttendees(Array.isArray(result) ? result : []);
    } catch (e) {
      setError(e.message || 'Could not load attendees.');
    }
  }

  const registeredEvents = registrations.map((registration) => ({
    ...registration,
    event: registration.events || events.find((item) => item.id === registration.event_id) || {},
  }));

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={() => setActiveView('discover')} aria-label="CampusPulse home">
          <span className="brand-mark">C<span>✦</span></span>
          <span>Campus<span className="brand-light">Pulse</span></span>
        </a>
        <div className="live-pill"><i /> CAMPUS EVENT HUB</div>
        <nav className="main-nav" aria-label="Main navigation">
          <button className={activeView === 'discover' ? 'nav-link active' : 'nav-link'} onClick={() => setActiveView('discover')}>Discover</button>
          <button className={activeView === 'registrations' ? 'nav-link active' : 'nav-link'} onClick={() => { setActiveView('registrations'); loadRegistrations(); }}>My registrations <span className="nav-count">{registrations.length}</span></button>
        </nav>
        <div className="identity"><span className="identity-dot" /><span>{userId ? 'ID saved in this browser' : 'Guest access'}</span></div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> YOUR CAMPUS, IN MOTION</div>
              <h1>Make room for<br /><span>what’s next.</span></h1>
              <p>Find the talks, ideas, and late-night projects bringing campus together. Your next good story starts here.</p>
              <div className="hero-actions"><button className="primary-button" onClick={() => { setActiveView('discover'); document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore events <span>↗</span></button><span className="hero-note"><b>{events.length}</b> events to explore</span></div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="art-card art-back"><span className="art-label">MAKE SOMETHING</span><div className="art-lines"><i /><i /><i /></div><span className="art-star">✳</span></div>
              <div className="art-card art-front"><span className="art-spark">✦</span><div className="art-circle"><span>LET’S</span><b>MEET<br />HERE</b></div><div className="art-footer"><span>IDEAS IN GOOD COMPANY</span><span>↗</span></div></div>
              <div className="art-tag">✦ &nbsp; YOUR PEOPLE ARE HERE</div>
            </div>
          </div>
          <div className="hero-bottom"><span>DISCOVER SOMETHING NEW</span><span className="scroll-line" /><span>SCROLL TO EXPLORE</span></div>
        </section>

        <section className="user-strip">
          <div className="user-strip-copy"><span className="user-icon">◎</span><div><b>Register without an account</b><small>Enter your existing user ID from the campus database.</small></div></div>
          <label className="id-field" htmlFor="user-id"><span>USER UUID</span><input id="user-id" value={userId} onChange={(e) => saveUserId(e.target.value)} placeholder="Paste your users.id UUID" autoComplete="off" /></label>
          <span className="privacy-note">Saved only in this browser</span>
        </section>

        {notice && <div className={`notice ${notice.type}`} role="status"><span>{notice.type === 'success' ? '✓' : '!'}</span>{notice.text}<button onClick={() => setNotice(null)} aria-label="Dismiss">×</button></div>}
        {error && <div className="notice error" role="alert"><span>!</span>{error}<button onClick={() => setError('')} aria-label="Dismiss">×</button></div>}

        <section className="content-section" id="events">
          <div className="section-heading">
            <div><div className="section-kicker">CAMPUS CALENDAR <span>✦</span></div><h2>{activeView === 'discover' ? 'Find your next thing.' : 'Your saved moments.'}</h2><p>{activeView === 'discover' ? 'Good ideas, new faces, and a reason to get out there.' : 'Events you’ve signed up for, all in one place.'}</p></div>
            <div className="section-total"><b>{activeView === 'discover' ? visibleEvents.length : registeredEvents.length}</b><span>{activeView === 'discover' ? 'EVENTS FOUND' : 'YOUR REGISTRATIONS'}</span></div>
          </div>

          {activeView === 'discover' ? <>
            <div className="toolbar">
              <label className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events, hosts, or places" /><kbd>⌘ K</kbd></label>
              <div className="filters">{['All events', 'Open', 'Full'].map((option) => <button key={option} className={filter === option ? 'filter-chip selected' : 'filter-chip'} onClick={() => setFilter(option)}>{option}</button>)}</div>
              <button className="refresh-button" onClick={loadEvents} title="Refresh events" aria-label="Refresh events">↻</button>
            </div>
            {loading ? <div className="empty-state"><div className="loader" /><b>Finding your campus events…</b><span>Connecting to the event calendar</span></div> : visibleEvents.length ? <div className="event-grid">
              {visibleEvents.map((event, index) => <EventCard key={event.id} event={event} index={index} registered={registeredIds.has(event.id)} busy={busyEvent === event.id} onRegister={register} onDetails={openEvent} onAttendees={viewAttendees} />)}
            </div> : <div className="empty-state"><div className="empty-icon">✳</div><b>{events.length ? 'No events match that search.' : 'The calendar is quiet for now.'}</b><span>{events.length ? 'Try another phrase or filter.' : 'Check back soon for something new.'}</span>{search && <button onClick={() => { setSearch(''); setFilter('All events'); }}>Clear filters</button>}</div>}
          </> : <>
            {registeredEvents.length ? <div className="registration-list">{registeredEvents.map((item, index) => <div className="registration-row" key={item.id || `${item.event_id}-${index}`}><div className={`pass-symbol pass-${index % 4}`}>✦</div><div className="pass-info"><span className="pass-label">CAMPUS PASS · {String(item.id || 'REGISTERED').slice(0, 8)}</span><h3>{item.event.title || 'Campus event'}</h3><p>{item.event.status || 'Registration confirmed'}{item.event.organizer_id ? ` · Host ${String(item.event.organizer_id).slice(0, 8)}` : ''}</p></div><span className="pass-status">✓ Registered</span><button className="row-action" onClick={() => openEvent(item.event.id ? item.event : { id: item.event_id, title: item.event.title })}>View pass <span>↗</span></button></div>)}</div> : <div className="empty-state"><div className="empty-icon">✳</div><b>{userId ? 'No registrations yet.' : 'Add your user UUID to see your registrations.'}</b><span>{userId ? 'When you find an event, save your spot and it will show up here.' : 'Your UUID is in the users table in your campus database.'}<br />Your ID stays in this browser.</span><button onClick={() => { setActiveView('discover'); document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore events <span>→</span></button></div>}
          </>}
        </section>

        <section className="closing-banner"><div className="banner-spark">✳</div><div><span>THE GOOD STUFF HAPPENS TOGETHER</span><h2>Show up curious.</h2></div><button onClick={() => { setActiveView('discover'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to the top <span>↑</span></button></section>
      </main>

      <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark">C<span>✦</span></span><span>Campus<span className="brand-light">Pulse</span></span></a><span>MADE FOR THE MOMENTS BETWEEN CLASSES.</span><span className="footer-status"><i /> EVENT API CONNECTED</span></footer>

      {selectedEvent && <div className="modal-backdrop" role="presentation" onClick={() => { setSelectedEvent(null); setAttendees([]); }}><section className="event-modal" role="dialog" aria-modal="true" aria-label="Event details" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => { setSelectedEvent(null); setAttendees([]); }} aria-label="Close">×</button><div className={`modal-art art-${Math.abs(String(selectedEvent.id || '').length) % 4}`}><span>✦ CAMPUS PULSE</span><b>{String(selectedEvent.title || 'EVENT DETAILS').slice(0, 1)}</b></div><div className="modal-body"><span className="section-kicker">EVENT DETAILS · {String(selectedEvent.status || 'CAMPUS').toUpperCase()}</span><h2>{selectedEvent.title || 'Campus event'}</h2><p>{selectedEvent.description || 'A campus gathering waiting to happen. Find your people, share an idea, and make it a day.'}</p><div className="detail-grid"><div><small>CAPACITY</small><b>{selectedEvent.capacity ?? 'Not limited'}</b></div><div><small>STATUS</small><b>{selectedEvent.status || 'Open'}</b></div><div><small>EVENT ID</small><b className="mono">{selectedEvent.id}</b></div></div>
          {attendees.length > 0 && <div className="attendees"><b>{attendees.length} registered attendee{attendees.length === 1 ? '' : 's'}</b>{attendees.map((attendee, i) => <div key={attendee.id || i}><span>{attendee.users?.email || attendee.user_id || 'Attendee'}</span><small>{String(attendee.id || '').slice(0, 8)}</small></div>)}</div>}
          <div className="modal-actions"><button className="primary-button" onClick={() => register(selectedEvent)} disabled={busyEvent === selectedEvent.id || registeredIds.has(selectedEvent.id)}>{registeredIds.has(selectedEvent.id) ? 'You’re registered ✓' : busyEvent === selectedEvent.id ? 'Saving your spot…' : 'Save my spot ↗'}</button><button className="secondary-button" onClick={() => viewAttendees(selectedEvent)}>See attendees</button></div></div></section></div>}
    </div>
  );
}

const eventThemes = ['theme-lilac', 'theme-orange', 'theme-green', 'theme-blue'];
function EventCard({ event, index, registered, busy, onRegister, onDetails, onAttendees }) {
  const capacity = Number(event.capacity);
  const status = String(event.status || 'OPEN').toUpperCase();
  const isFull = ['FULL', 'CLOSED', 'SOLD OUT', 'CANCELLED'].includes(status) || (Number.isFinite(capacity) && capacity <= 0);
  return <article className="event-card">
    <button className={`event-art ${eventThemes[index % eventThemes.length]}`} onClick={() => onDetails(event)} aria-label={`View ${event.title || 'event'} details`}><span className="art-index">EVENT Nº {String(index + 1).padStart(2, '0')}</span><span className="event-art-glyph">{['✳', '◈', '✦', '✷'][index % 4]}</span><span className="event-art-name">{(event.title || 'CAMPUS EVENT').split(' ').slice(0, 3).join(' ')}</span><span className="art-corner">↗</span></button>
    <div className="event-card-body"><div className="event-meta"><span className={isFull ? 'status-tag full' : 'status-tag'}><i />{status}</span><span className="event-capacity">{Number.isFinite(capacity) ? `Capacity ${capacity}` : 'Open invite'}</span></div><button className="event-title" onClick={() => onDetails(event)}>{event.title || 'Untitled campus event'}</button><p className="event-description">{event.description || (event.organizer_id ? `Hosted by ${String(event.organizer_id).slice(0, 8)}` : 'A gathering from your campus community.')}</p><div className="event-card-bottom"><button className="text-link" onClick={() => onAttendees(event)}>Who's going <span>↗</span></button><button className={registered ? 'register-button registered' : 'register-button'} onClick={() => onRegister(event)} disabled={registered || busy || isFull}>{registered ? 'On your list ✓' : isFull ? 'Full' : busy ? 'Joining…' : 'I’m interested ↗'}</button></div></div>
  </article>;
}

createRoot(document.getElementById('root')).render(<App />);
