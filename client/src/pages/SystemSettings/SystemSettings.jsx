import { useState } from "react"
import Card from "../../components/ui/Card"
import { Settings, Wifi, Shield, Bell, Monitor, Smartphone, Laptop, ChevronDown, ChevronUp, Plus, Trash2, Check, X } from "lucide-react"

function Toggle({ checked, onChange }) {
  return (
    <button role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 focus:outline-none ${checked ? "bg-blue-600" : "bg-light-border dark:bg-dark-border"}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 mt-px ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  )
}

function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-light-border dark:border-dark-border last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-light-primary dark:text-dark-primary leading-tight">{label}</p>
        {desc && <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5 leading-tight">{desc}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function Section({ title, icon: Icon, badge, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Card title={title} icon={Icon}>
      <div>
        <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-2 -mt-1 group" aria-expanded={open}>
          <div className="flex items-center gap-2">
            {badge && <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">{badge}</span>}
          </div>
          <span className="text-light-muted dark:text-dark-muted group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </span>
        </button>
        {open && <div>{children}</div>}
      </div>
    </Card>
  )
}

function DeviceIcon({ type }) {
  const cls = "text-light-muted dark:text-dark-muted"
  if (type === "mobile") return <Smartphone size={15} className={cls} />
  if (type === "laptop") return <Laptop size={15} className={cls} />
  return <Monitor size={15} className={cls} />
}

function AddDeviceModal({ onAdd, onClose }) {
  const [name, setName] = useState("")
  const [type, setType] = useState("desktop")
  const handleAdd = () => {
    if (!name.trim()) return
    onAdd({ name: name.trim(), type })
    onClose()
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.45)" }} onClick={onClose}>
      <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-5 w-72 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-light-primary dark:text-dark-primary">Add new device</p>
          <button onClick={onClose} className="text-light-muted dark:text-dark-muted hover:text-light-primary transition-colors"><X size={15} /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-light-muted dark:text-dark-muted mb-1 block">Device name</label>
            <input autoFocus type="text" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAdd()} placeholder="e.g. MacBook Pro" className="w-full text-sm border border-light-border dark:border-dark-border rounded-lg px-3 py-2 bg-light-base dark:bg-dark-base text-light-primary dark:text-dark-primary focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-xs text-light-muted dark:text-dark-muted mb-1 block">Device type</label>
            <select value={type} onChange={e => setType(e.target.value)} className="w-full text-sm border border-light-border dark:border-dark-border rounded-lg px-3 py-2 bg-light-base dark:bg-dark-base text-light-primary dark:text-dark-primary focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="desktop">Desktop</option>
              <option value="laptop">Laptop</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 text-sm py-2 rounded-lg border border-light-border dark:border-dark-border text-light-secondary dark:text-dark-secondary hover:bg-light-hover transition-colors">Cancel</button>
          <button onClick={handleAdd} disabled={!name.trim()} className="flex-1 text-sm py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-medium transition-colors">Add device</button>
        </div>
      </div>
    </div>
  )
}

function useToast() {
  const [msg, setMsg] = useState(null)
  const show = (text) => { setMsg(text); setTimeout(() => setMsg(null), 2500) }
  return { msg, show }
}

export default function SystemSettings() {
  const toast = useToast()
  const [autoSave, setAutoSave] = useState(false)
  const [language, setLanguage] = useState("English (US)")
  const [timezone, setTimezone] = useState("IST (UTC+5:30)")
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(true)
  const [quietHours, setQuietHours] = useState(false)
  const [frequency, setFrequency] = useState("Instantly")
  const [devices, setDevices] = useState([
    { id: 1, name: "Windows PC - Chrome", type: "desktop", location: "Delhi, IN", lastActive: "just now", online: true },
    { id: 2, name: "Android Phone", type: "mobile", location: "Delhi, IN", lastActive: "2 hrs ago", online: false },
  ])
  const [showAddDevice, setShowAddDevice] = useState(false)
  const addDevice = ({ name, type }) => { setDevices(prev => [...prev, { id: Date.now(), name, type, location: "Delhi, IN", lastActive: "just now", online: true }]); toast.show("Device added") }
  const removeDevice = (id) => { setDevices(prev => prev.filter(d => d.id !== id)); toast.show("Device removed") }
  const [twoFA, setTwoFA] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState("1 hour")
  const activeNotifCount = [emailAlerts, pushNotifs, quietHours].filter(Boolean).length
  const securityScore = twoFA ? 90 : 65
  const selectClass = "text-xs border border-light-border dark:border-dark-border rounded-md px-2 py-1 bg-light-surface dark:bg-dark-surface text-light-primary dark:text-dark-primary focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[130px]"

  return (
    <div className="flex flex-col gap-6 pb-8">

      <h1 className="text-2xl font-semibold text-light-primary dark:text-dark-primary mb-6">
        System Settings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ gridAutoRows: "1fr" }}>

        <Section title="General" icon={Settings}>
          <SettingRow label="Auto-save" desc="Save changes automatically">
            <Toggle checked={autoSave} onChange={setAutoSave} />
          </SettingRow>
          <SettingRow label="Language">
            <select className={selectClass} value={language} onChange={e => setLanguage(e.target.value)}>
              <option>English (US)</option><option>Hindi</option>
            </select>
          </SettingRow>
          <SettingRow label="Timezone">
            <select className={selectClass} value={timezone} onChange={e => setTimezone(e.target.value)}>
              <option>IST (UTC+5:30)</option><option>UTC</option>
            </select>
          </SettingRow>
        </Section>

        <Section title="Connectivity" icon={Wifi} badge={`${devices.length} device${devices.length !== 1 ? "s" : ""}`}>
          <div className="space-y-2 mb-3">
            {devices.length === 0 && <p className="text-xs text-light-muted dark:text-dark-muted py-2 text-center">No devices connected.</p>}
            {devices.map(device => (
              <div key={device.id} className="flex items-center gap-2 p-2 rounded-lg bg-light-hover dark:bg-dark-hover">
                <div className="shrink-0 w-7 h-7 rounded-md bg-light-surface dark:bg-dark-surface flex items-center justify-center">
                  <DeviceIcon type={device.type} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-light-primary dark:text-dark-primary truncate">{device.name}</p>
                  <p className="text-[10px] text-light-muted dark:text-dark-muted truncate">{device.lastActive} · {device.location}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${device.online ? "bg-green-500" : "bg-light-muted dark:bg-dark-muted"}`} />
                  <button onClick={() => removeDevice(device.id)} className="text-light-muted dark:text-dark-muted hover:text-red-500 transition-colors p-0.5"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setShowAddDevice(true)} className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium transition-colors">
            <Plus size={13} /> Add device
          </button>
        </Section>

        <Section title="Security" icon={Shield}>
          <div className="mb-3">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-light-muted dark:text-dark-muted">Security score</span>
              <span className={`text-xs font-medium ${securityScore >= 80 ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"}`}>{securityScore}/100</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-light-border dark:bg-dark-border overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-500 ${securityScore >= 80 ? "bg-green-500" : "bg-amber-500"}`} style={{ width: `${securityScore}%` }} />
            </div>
          </div>
          <SettingRow label="Two-factor auth" desc="Secure your login"><Toggle checked={twoFA} onChange={setTwoFA} /></SettingRow>
          <SettingRow label="Login alerts" desc="Notify on new sign-ins"><Toggle checked={loginAlerts} onChange={setLoginAlerts} /></SettingRow>
          <SettingRow label="Session timeout">
            <select className={selectClass} value={sessionTimeout} onChange={e => setSessionTimeout(e.target.value)}>
              <option>30 min</option><option>1 hour</option><option>4 hours</option><option>Never</option>
            </select>
          </SettingRow>
        </Section>

        <Section title="Notifications" icon={Bell} badge={`${activeNotifCount} active`}>
          <SettingRow label="Email alerts" desc="Updates via email"><Toggle checked={emailAlerts} onChange={setEmailAlerts} /></SettingRow>
          <SettingRow label="Push notifications" desc="Browser or mobile"><Toggle checked={pushNotifs} onChange={setPushNotifs} /></SettingRow>
          <SettingRow label="Quiet hours" desc="Mute at night"><Toggle checked={quietHours} onChange={setQuietHours} /></SettingRow>
          <SettingRow label="Frequency">
            <select className={selectClass} value={frequency} onChange={e => setFrequency(e.target.value)}>
              <option>Instantly</option><option>Hourly</option><option>Daily</option>
            </select>
          </SettingRow>
        </Section>

      </div>

      <div className="flex justify-end">
        <button onClick={() => toast.show("All settings saved")} className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-medium transition-all shadow-lg shadow-blue-500/20">
          <Check size={15} /> Save changes
        </button>
      </div>

      {showAddDevice && <AddDeviceModal onAdd={addDevice} onClose={() => setShowAddDevice(false)} />}

      {toast.msg && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm px-4 py-2.5 rounded-lg shadow-lg pointer-events-none">
          <Check size={14} />{toast.msg}
        </div>
      )}

    </div>
  )
}