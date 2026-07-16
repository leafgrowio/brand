import { SidebarItem } from "../../components/navigation/SidebarItem/SidebarItem.jsx";
import { Breadcrumbs } from "../../components/navigation/Breadcrumbs/Breadcrumbs.jsx";

const CSS = `
  .leaf-appshell {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 640px;
    border: 1px solid var(--leaf-border-light);
    border-radius: var(--leaf-radius-lg);
    overflow: hidden;
    box-shadow: var(--leaf-shadow-sm);
    background: var(--leaf-color-canvas);
    font-family: var(--leaf-font-sans);
  }
  .leaf-appshell__sidebar {
    width: 236px;
    flex-shrink: 0;
    background: var(--leaf-color-stone-faint);
    border-right: 1px solid var(--leaf-border-light);
    padding: 16px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow-y: auto;
  }
  .leaf-appshell__org {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--leaf-color-canvas);
    border: 1px solid rgba(23, 20, 18, 0.12);
    border-radius: 10px;
    padding: 9px 11px;
    margin-bottom: var(--leaf-space-3);
    cursor: pointer;
    width: 100%;
  }
  .leaf-appshell__org-tile {
    width: 24px;
    height: 24px;
    border-radius: 7px;
    background: var(--leaf-color-laurel);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font: 700 11px/1 var(--leaf-font-sans);
    color: var(--leaf-color-ink);
  }
  .leaf-appshell__org-name {
    flex: 1;
    text-align: left;
    font: 600 13.5px/1.1 var(--leaf-font-sans);
    color: var(--leaf-color-ink);
  }
  .leaf-appshell__org-chevron { color: var(--leaf-color-warm-grey); display: flex; flex-shrink: 0; }
  .leaf-appshell__group-label {
    font: 600 11px/1 var(--leaf-font-sans);
    letter-spacing: 0.07em;
    color: var(--leaf-text-muted);
    text-transform: uppercase;
    padding: 12px 12px 2px;
  }
  .leaf-appshell__group-label:first-of-type { padding-top: 4px; }

  .leaf-appshell__main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .leaf-appshell__topbar {
    height: 58px;
    flex-shrink: 0;
    padding: 0 18px;
    background: var(--leaf-color-canvas);
    border-bottom: 1px solid var(--leaf-border-light);
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .leaf-appshell__icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--leaf-radius-sm);
    background: none;
    border: none;
    color: var(--leaf-color-warm-grey);
    cursor: pointer;
  }
  .leaf-appshell__icon-btn:hover { background: rgba(23, 20, 18, 0.05); }
  .leaf-appshell__icon-btn:focus-visible { outline: 2px solid var(--leaf-focus-ring); outline-offset: 2px; }
  .leaf-appshell__divider { width: 1px; height: 22px; background: rgba(23, 20, 18, 0.12); flex-shrink: 0; }
  .leaf-appshell__spacer { flex: 1; }
  .leaf-appshell__search {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--leaf-color-stone-faint);
    border: 1px solid rgba(23, 20, 18, 0.12);
    border-radius: var(--leaf-radius-pill);
    padding: 7px 14px;
    color: var(--leaf-color-warm-grey);
    font: 500 13px/1 var(--leaf-font-sans);
    width: 220px;
  }
  .leaf-appshell__search span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .leaf-appshell__new-report {
    font: 600 13.5px/1 var(--leaf-font-sans);
    color: var(--leaf-color-canvas);
    background: var(--leaf-color-coral);
    border: none;
    padding: 9px 15px;
    border-radius: var(--leaf-radius-pill);
    cursor: pointer;
    white-space: nowrap;
    transition: background-color var(--leaf-motion-base) var(--leaf-ease);
  }
  .leaf-appshell__new-report:hover { background: var(--leaf-color-coral-hover); }
  .leaf-appshell__new-report:focus-visible { outline: 2px solid var(--leaf-focus-ring); outline-offset: 2px; }
  .leaf-appshell__avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--leaf-color-heather);
    color: var(--leaf-color-ink);
    font: 700 12.5px/1 var(--leaf-font-sans);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .leaf-appshell__content {
    flex: 1;
    padding: 24px 26px;
    background: var(--leaf-color-stone-light);
    overflow-y: auto;
  }
  @media (prefers-reduced-motion: reduce) {
    .leaf-appshell__new-report { transition: none; }
  }
`;

function ensureStyles() {
  if (typeof document === "undefined" || document.getElementById("leaf-css-appshell")) return;
  const s = document.createElement("style");
  s.id = "leaf-css-appshell";
  s.textContent = CSS;
  document.head.appendChild(s);
}

const NAV_ICONS = {
  overview: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </svg>
  ),
  reports: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3.5" y1="20.5" x2="20.5" y2="20.5" /><rect x="6" y="12" width="3.4" height="8.5" />
      <rect x="10.8" y="7" width="3.4" height="13.5" /><rect x="15.6" y="10" width="3.4" height="10.5" />
    </svg>
  ),
  campaigns: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="5.2" /><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  ),
  audiences: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="7" r="3.2" /><path d="M5.5 19.5c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6" /><path d="M3 19.5c0-2.6 1.3-4.6 3-5.6" />
    </svg>
  ),
  automations: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3 5 13.5h5.5L11 21l8-11h-5.5z" />
    </svg>
  ),
  settings: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="8" x2="20" y2="8" /><circle cx="14" cy="8" r="2.2" fill="currentColor" stroke="none" />
      <line x1="4" y1="16" x2="20" y2="16" /><circle cx="9" cy="16" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  ),
};

/**
 * AppShell — the persistent Answers frame: 236px sidebar (org switcher + primary
 * nav grouped MAIN / MANAGE) and a 58px top bar (hamburger, breadcrumbs, search,
 * "New report", avatar), wrapping a scrollable content slot.
 */
export function AppShell({ activeScreen = "overview", onNavigate, breadcrumbItems = [], children }) {
  ensureStyles();

  function go(screen) {
    if (onNavigate) onNavigate(screen);
  }

  return (
    <div className="leaf-appshell">
      <aside className="leaf-appshell__sidebar">
        <button className="leaf-appshell__org" type="button" aria-label="Switch organisation, current: Dash Water">
          <span className="leaf-appshell__org-tile">DW</span>
          <span className="leaf-appshell__org-name">Dash Water</span>
          <span className="leaf-appshell__org-chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>

        <nav aria-label="Primary">
          <div className="leaf-appshell__group-label">Main</div>
          <SidebarItem icon={NAV_ICONS.overview} label="Overview" active={activeScreen === "overview"} onClick={(e) => { e.preventDefault(); go("overview"); }} />
          <SidebarItem icon={NAV_ICONS.reports} label="Reports" active={activeScreen === "reports"} onClick={(e) => { e.preventDefault(); go("reports"); }} />
          <SidebarItem icon={NAV_ICONS.campaigns} label="Campaigns" count={3} onClick={(e) => e.preventDefault()} />
          <SidebarItem icon={NAV_ICONS.audiences} label="Audiences" onClick={(e) => e.preventDefault()} />

          <div className="leaf-appshell__group-label">Manage</div>
          <SidebarItem icon={NAV_ICONS.automations} label="Automations" onClick={(e) => e.preventDefault()} />
          <SidebarItem icon={NAV_ICONS.settings} label="Settings" active={activeScreen === "settings"} onClick={(e) => { e.preventDefault(); go("settings"); }} />
        </nav>
      </aside>

      <div className="leaf-appshell__main">
        <header className="leaf-appshell__topbar">
          <button className="leaf-appshell__icon-btn" type="button" aria-label="Toggle sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
          <span className="leaf-appshell__divider" aria-hidden="true" />
          <Breadcrumbs items={breadcrumbItems} />
          <span className="leaf-appshell__spacer" />
          <span className="leaf-appshell__search">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="10.5" cy="10.5" r="6.5" /><line x1="15.5" y1="15.5" x2="20.5" y2="20.5" />
            </svg>
            <span>Search reports, channels…</span>
          </span>
          <button className="leaf-appshell__new-report" type="button">New report</button>
          <span className="leaf-appshell__avatar" title="Sam Devlin">SD</span>
        </header>

        <main className="leaf-appshell__content">{children}</main>
      </div>
    </div>
  );
}
