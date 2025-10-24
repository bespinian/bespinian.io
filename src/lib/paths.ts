import { languages } from "../i18n/ui";
import { getCollection } from "astro:content";

/**
 * Generates static paths for all supported languages
 * Use this in getStaticPaths() for any [lang] route
 */
export function getLanguagePaths() {
  return Object.keys(languages).map((lang) => ({
    params: { lang },
  }));
}

/**
 * Removes language prefix from a pathname for language switching
 * @param pathname - The current pathname
 * @param currentLang - The current language code
 * @returns The pathname without language prefix
 */
export function removeLanguagePrefix(
  pathname: string,
  currentLang: string,
): string {
  return pathname.replace(`/${currentLang}`, "").replace(/^\/de|^\/ch/, "");
}

/**
 * Generates static paths for a collection across all languages
 * Use this for detail pages like [lang]/blog/[...slug].astro
 */
export async function getCollectionStaticPaths<T extends keyof any>(
  collectionName: T,
) {
  const items = await getCollection(collectionName as any);
  return Object.keys(languages).flatMap((lang) =>
    items.map((item: any) => ({
      params: { lang, slug: item.slug },
      props: { [getSingularName(collectionName as string)]: item },
    })),
  );
}

/**
 * Helper to convert collection names to singular for prop names
 */
function getSingularName(collectionName: string): string {
  const mapping: Record<string, string> = {
    blog: "post",
    customers: "customer",
    jobs: "job",
    services: "service",
  };
  return mapping[collectionName] || collectionName.replace(/s$/, "");
}
