import Image from "next/image";
import { site } from "@/content/site";
import { Section } from "./Section";

export function Media() {
  const { id, label, title } = site.sections.media;
  const { image, title: heading, text } = site.media;
  return (
    <Section id={id} label={label} title={title}>
      <div className="grid items-center gap-8 md:grid-cols-9 md:gap-10">
        <div className="overflow-hidden rounded-lg border border-line bg-surface md:col-span-5">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
            className="block h-auto w-full"
          />
        </div>
        <div className="md:col-span-4">
          <h3 className="text-2xl leading-snug font-semibold tracking-[-0.01em]">{heading}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{text}</p>
        </div>
      </div>
    </Section>
  );
}
