export default function NavBar({ active, onChange }) {
  const tabs = [
    { id: 'home', label: 'Vandaag', icon: '🏠' },
    { id: 'logbook', label: 'Logboek', icon: '📅' }
  ]

  return (
    <nav className="border-t border-line bg-paper/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
      <div className="flex max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors
              ${active === tab.id ? 'text-moss-dark' : 'text-ink/40'}`}
          >
            <span className="text-lg leading-none">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
