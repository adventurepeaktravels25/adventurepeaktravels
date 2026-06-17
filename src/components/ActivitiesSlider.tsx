"use client";

import { useEffect, useMemo, useState } from "react";

const ACTIVITIES = [
  "https://commonerscauseway.com/wp-content/uploads/2024/08/Mini-Mandalas-in-Lakshadweep-edited.jpg",
  "https://m.media-amazon.com/images/I/71auSYE6ZzL._UF1000,1000_QL80_.jpg",
  "https://images.pexels.com/photos/26852222/pexels-photo-26852222/free-photo-of-boats-on-tropical-ocean-coast.jpeg",
  "https://kalasmiq.com/cdn/shop/files/2_1e979924-3331-4d51-ac11-6719d821798c.png",
  "https://images.pexels.com/photos/29799163/pexels-photo-29799163/free-photo-of-tranquil-beach-and-ocean-under-open-sky.jpeg",
  "https://curlytales.com/wp-content/uploads/2023/05/Snorkelling.jpg",
  "https://shrutisfairytales.com/wp-content/uploads/2024/12/Scuba-Diving-in-Andaman-and-Nicobar.jpg",
];

export function ActivitiesSlider() {
  const [loaded, setLoaded] = useState(false);
  const slides = useMemo(() => [...ACTIVITIES, ...ACTIVITIES], []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-0 md:px-6 pb-10 md:pb-24">
      <div className="px-6 md:px-0 flex items-end justify-between mb-4 md:mb-8 gap-4">
        <div>
          <p className="hidden md:block text-sm font-semibold uppercase tracking-widest text-primary">Experiences</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Activities</h2>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className={`flex gap-4 pl-4 pr-4 md:p-5 w-max ${loaded ? "activities-marquee" : ""}`} style={{ animationPlayState: loaded ? "running" : "paused" }}>
          {slides.map((src, index) => (
            <div key={`${src}-${index}`} className="w-40 md:w-56 aspect-[3/4] overflow-hidden rounded-xl bg-secondary shrink-0">
              <img src={src} alt={`Activity ${index + 1}`} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
