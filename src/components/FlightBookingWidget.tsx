"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { AIRPORTS, type Airport } from "@/lib/airports";
import { COMPANY } from "@/lib/site-data";
import { ArrowLeftRight, Search, Users, Calendar as CalIcon } from "lucide-react";

type TripType = "oneway" | "roundtrip";

function AirportSelect({
  label,
  value,
  onChange,
  excludeCode,
  placeholder,
}: {
  label: string;
  value: Airport | null;
  onChange: (a: Airport) => void;
  excludeCode?: string;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = AIRPORTS.filter(a => a.code !== excludeCode);
    if (!term) return list.slice(0, 60);
    return list
      .filter(a =>
        a.code.toLowerCase().includes(term) ||
        a.city.toLowerCase().includes(term) ||
        a.name.toLowerCase().includes(term) ||
        a.country.toLowerCase().includes(term),
      )
      .slice(0, 80);
  }, [q, excludeCode]);

  return (
    <div className="relative" ref={ref}>
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="mt-1 w-full text-left rounded-lg border border-input bg-background px-3 py-2.5 hover:border-primary/40 transition"
      >
        {value ? (
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">{value.code}</span>
            <span className="text-sm text-muted-foreground truncate">{value.city}, {value.country}</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">{placeholder}</span>
        )}
      </button>
      {open && (
        <div className="absolute z-50 mt-2 w-full sm:w-[360px] rounded-xl border border-border bg-popover shadow-soft overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search city, airport or code…"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <ul className="max-h-72 overflow-y-auto">
            {results.length === 0 && (
              <li className="px-3 py-4 text-sm text-muted-foreground">No airports found</li>
            )}
            {results.map(a => (
              <li key={a.code}>
                <button
                  type="button"
                  onClick={() => { onChange(a); setOpen(false); setQ(""); }}
                  className="w-full text-left px-3 py-2 hover:bg-secondary flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold truncate">{a.city} <span className="text-muted-foreground font-normal">— {a.name}</span></div>
                    <div className="text-xs text-muted-foreground">{a.country}</div>
                  </div>
                  <span className="text-xs font-bold tracking-wider rounded bg-secondary px-2 py-1">{a.code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function FlightBookingWidget() {
  const [trip, setTrip] = useState<TripType>("roundtrip");
  const [from, setFrom] = useState<Airport | null>(AIRPORTS.find(a => a.code === "COK") ?? null);
  const [to, setTo] = useState<Airport | null>(AIRPORTS.find(a => a.code === "DXB") ?? null);
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [paxOpen, setPaxOpen] = useState(false);
  const paxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (paxRef.current && !paxRef.current.contains(e.target as Node)) setPaxOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const swap = () => { setFrom(to); setTo(from); };

  const totalPax = adults + children + infants;
  const paxLabel = `${totalPax} ${totalPax === 1 ? "Passenger" : "Passengers"}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !depart) return;
    const lines = [
      "Flight Booking Enquiry",
      `Trip: ${trip === "oneway" ? "One Way" : "Round Trip"}`,
      `From: ${from.city} (${from.code}) - ${from.name}`,
      `To: ${to.city} (${to.code}) - ${to.name}`,
      `Departure: ${depart}`,
      trip === "roundtrip" ? `Return: ${ret || "-"}` : null,
      `Passengers: ${adults} Adult${adults !== 1 ? "s" : ""}${children ? `, ${children} Child${children !== 1 ? "ren" : ""}` : ""}${infants ? `, ${infants} Infant${infants !== 1 ? "s" : ""}` : ""}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(lines)}`, "_blank");
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-card text-card-foreground p-4 sm:p-5 shadow-soft border border-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="inline-flex rounded-lg bg-secondary p-1">
          {(["roundtrip", "oneway"] as TripType[]).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTrip(t)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${trip === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {t === "roundtrip" ? "Round Trip" : "One Way"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        <div className="md:col-span-5 relative">
          <AirportSelect label="From" value={from} onChange={setFrom} excludeCode={to?.code} placeholder="Departure city" />
        </div>
        <div className="md:col-span-2 flex md:justify-center">
          <button type="button" onClick={swap} className="h-10 w-10 rounded-full border border-border bg-background hover:bg-secondary flex items-center justify-center" aria-label="Swap">
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>
        <div className="md:col-span-5">
          <AirportSelect label="To" value={to} onChange={setTo} excludeCode={from?.code} placeholder="Arrival city" />
        </div>

        <div className="md:col-span-4">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Departure</label>
          <div className="relative mt-1">
            <CalIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input type="date" required value={depart} onChange={e => setDepart(e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2.5 text-sm" />
          </div>
        </div>
        <div className="md:col-span-4">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Return</label>
          <div className="relative mt-1">
            <CalIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input type="date" disabled={trip === "oneway"} value={ret} onChange={e => setRet(e.target.value)} min={depart || new Date().toISOString().split("T")[0]} className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2.5 text-sm disabled:opacity-50" />
          </div>
        </div>
        <div className="md:col-span-4 relative" ref={paxRef}>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Passengers</label>
          <button type="button" onClick={() => setPaxOpen(o => !o)} className="mt-1 w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2.5 text-sm text-left relative">
            <Users className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            {paxLabel}
          </button>
          {paxOpen && (
            <div className="absolute right-0 z-50 mt-2 w-full sm:w-72 rounded-xl border border-border bg-popover p-3 shadow-soft space-y-3">
              {[
                { label: "Adults", sub: "12+ years", val: adults, set: setAdults, min: 1, max: 9 },
                { label: "Children", sub: "2 – 11 years", val: children, set: setChildren, min: 0, max: 8 },
                { label: "Infants", sub: "Under 2 years", val: infants, set: setInfants, min: 0, max: 4 },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium">{row.label}</div>
                    <div className="text-xs text-muted-foreground">{row.sub}</div>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <button type="button" onClick={() => row.set(Math.max(row.min, row.val - 1))} className="h-7 w-7 rounded-full border border-border hover:bg-secondary disabled:opacity-40" disabled={row.val <= row.min}>−</button>
                    <span className="w-5 text-center text-sm font-semibold">{row.val}</span>
                    <button type="button" onClick={() => row.set(Math.min(row.max, row.val + 1))} className="h-7 w-7 rounded-full border border-border hover:bg-secondary disabled:opacity-40" disabled={row.val >= row.max}>+</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setPaxOpen(false)} className="w-full rounded-lg bg-primary text-primary-foreground py-2 text-sm font-semibold">Done</button>
            </div>
          )}
        </div>
      </div>

      <button type="submit" className="mt-5 w-full rounded-xl bg-gradient-sunset text-accent-foreground py-3 font-semibold shadow-soft inline-flex items-center justify-center gap-2">
        <Search className="h-4 w-4" /> Search Flights
      </button>
    </form>
  );
}
