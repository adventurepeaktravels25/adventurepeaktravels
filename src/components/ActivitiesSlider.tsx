"use client";

import { useEffect, useMemo, useState } from "react";
import activity1 from "@/assets/activities/1.jpg.jpeg";
import activity2 from "@/assets/activities/2.jpg.jpeg";
import activity3 from "@/assets/activities/3.jpg.jpeg";
import activity4 from "@/assets/activities/4.jpg.jpeg";
import activity5 from "@/assets/activities/5.jpg.jpeg";
import activity6 from "@/assets/activities/6.jpg.jpeg";
import activity7 from "@/assets/activities/7.jpg.jpeg";
import activity8 from "@/assets/activities/8.jpg.jpeg";
import activity9 from "@/assets/activities/9.jpg.jpeg";

const ACTIVITIES = [
  activity9,
  activity8,
  activity7,
  activity6,
  activity5,
  activity4,
  activity3,
  activity2,
  activity1,
];

export function ActivitiesSlider() {
  const [loaded, setLoaded] = useState(false);
  const slides = useMemo(() => [...ACTIVITIES, ...ACTIVITIES], []);
  const getImageSrc = (image: (typeof ACTIVITIES)[number]) =>
    typeof image === "string" ? image : image.src;

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-0 md:px-6 pb-10 md:pb-24">
      <div className="px-6 md:px-0 flex items-end justify-between mb-4 md:mb-8 gap-4">
        <div>
          <p className="hidden md:block text-sm font-semibold uppercase tracking-widest text-primary">
            Experiences
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold">Activities</h2>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className={`flex gap-4 pl-4 pr-4 md:p-5 w-max ${loaded ? "activities-marquee" : ""}`}
          style={{ animationPlayState: loaded ? "running" : "paused" }}
        >
          {slides.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="w-40 md:w-56 aspect-[3/4] overflow-hidden rounded-xl bg-secondary shrink-0"
            >
              <img
                src={getImageSrc(src)}
                alt={`Activity ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
