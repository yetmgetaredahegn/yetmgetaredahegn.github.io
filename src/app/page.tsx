import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Media } from "@/components/Media";
import { Process } from "@/components/Process";
import { ProjectCard } from "@/components/ProjectCard";
import { ProofStrip } from "@/components/ProofStrip";
import { Section } from "@/components/Section";
import { Services } from "@/components/Services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: site.seo.description, path: "/" });

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: `${site.url}/`,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
  sameAs: [site.links.upwork, site.links.linkedin, site.links.github],
};

export default function Home() {
  const work = site.sections.work;
  const [featured, ...rest] = [...site.caseStudies].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <ProofStrip />
      <Services />
      <Section id={work.id} label={work.label} title={work.title} wide>
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="lg:col-span-2">
            <ProjectCard study={featured} />
          </div>
          {rest.map((study) => (
            <ProjectCard key={study.slug} study={study} />
          ))}
        </div>
      </Section>
      <Experience />
      <Media />
      <Process />
      <Contact />
    </>
  );
}
