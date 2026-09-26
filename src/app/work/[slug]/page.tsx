import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getCaseStudy, site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

// Only the case studies in site.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return site.caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({ title: study.title, description: study.oneLiner, path: `/work/${study.slug}/` });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return <CaseStudyLayout study={study} />;
}
