import { getCollection, type CollectionKey } from "astro:content";
import { languages } from "../i18n/ui";

const LANGUAGE_CODE_PATTERN = /^[a-z]{2}$/;

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
  const languagePattern = new RegExp(
    `^\\/(${Object.keys(languages).join("|")})`,
  );
  return pathname.replace(`/${currentLang}`, "").replace(languagePattern, "");
}

/**
 * Parses collection items and groups them by base slug and language
 * Handles both language-specific subdirectories (en/file.md) and legacy files (file.md)
 */
function groupItemsByLanguage(items: any[]): Map<string, Map<string, any>> {
  const itemsByBaseSlug = new Map<string, Map<string, any>>();

  for (const item of items) {
    const id = item.id;
    const parts = id.split("/");

    if (parts.length === 2 && LANGUAGE_CODE_PATTERN.test(parts[0])) {
      // This is a language-specific file in a subdirectory (e.g., "en/axpo")
      const lang = parts[0];
      const baseSlug = parts[1];

      if (!itemsByBaseSlug.has(baseSlug)) {
        itemsByBaseSlug.set(baseSlug, new Map());
      }
      const langMap = itemsByBaseSlug.get(baseSlug);
      if (langMap) {
        langMap.set(lang, item);
      }
    } else {
      // This is a file not in a language subdirectory (legacy or default)
      if (!itemsByBaseSlug.has(id)) {
        itemsByBaseSlug.set(id, new Map());
      }
      const langMap = itemsByBaseSlug.get(id);
      if (langMap) {
        langMap.set("en", item);
      }
    }
  }

  return itemsByBaseSlug;
}

/**
 * Generates static paths for a collection across all languages
 * Use this for detail pages like [lang]/blog/[...slug].astro
 *
 * This function supports language-specific content files organized in subdirectories:
 * - Language-specific files are in subdirectories: en/axpo.md, de/axpo.md, ch/axpo.md
 * - If no language-specific file exists, it falls back to the English version
 */
export async function getCollectionStaticPaths<T extends CollectionKey>(
  collectionName: T,
) {
  const items = await getCollection(collectionName);
  const itemsByBaseSlug = groupItemsByLanguage(items);

  // Generate paths for all languages
  return Array.from(itemsByBaseSlug.entries()).flatMap(
    ([baseSlug, langItems]) =>
      Object.keys(languages).map((lang) => {
        // Try to get the language-specific item, fall back to English
        const item = langItems.get(lang) || langItems.get("en");
        if (!item) {
          throw new Error(
            `No content found for ${baseSlug} in ${lang} or fallback (en)`,
          );
        }

        return {
          params: { lang, slug: baseSlug },
          props: { [getSingularName(collectionName)]: item },
        };
      }),
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

/**
 * Gets collection items for a specific language
 * Returns language-specific versions if available, otherwise falls back to English
 * Removes duplicate entries (base slug appears only once per language)
 */
export async function getCollectionByLanguage<T extends CollectionKey>(
  collectionName: T,
  lang: string,
) {
  const items = await getCollection(collectionName);
  const itemsByBaseSlug = groupItemsByLanguage(items);

  // Return items for the requested language, falling back to English
  // Normalize the ID to use the base slug (without language prefix)
  return Array.from(itemsByBaseSlug.entries()).map(([baseSlug, langItems]) => {
    const item = langItems.get(lang) || langItems.get("en");
    if (!item) {
      throw new Error(
        `No content found for ${baseSlug} in ${lang} or fallback (en)`,
      );
    }
    return {
      ...item,
      id: baseSlug, // Use base slug as ID for consistent URLs
    };
  });
}
