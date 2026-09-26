import { site } from "@/content/site";
import { Section } from "./Section";
import { ChipList } from "./ui";

export function Services() {
  const { id, label, title } = site.sections.services;
  return (
    <Section id={id} label={label} title={title}>
      {/* One bordered sheet split by hairlines, rather than six floating cards. */}
      <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        {site.services.map((service) => (
          <li key={service.title} className="flex flex-col bg-surface p-5 sm:p-7">
            <h3 className="text-xl leading-snug font-semibold tracking-[-0.01em]">{service.title}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{service.description}</p>
            <ChipList items={service.tech} label={`Tools for ${service.title}`} className="mt-auto pt-5" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
