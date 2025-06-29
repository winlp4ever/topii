/**
 * Rewrites markdown links in the format [[#number]](link) to [#number](link).
 *
 * @param markdown - The markdown string containing links to be rewritten.
 * @returns The markdown string with links rewritten.
 */
export function rewriteMarkdownLinks(markdown: string): string {
  return markdown.replace(
    /\[\[([^\]]+)\]\]\(([^)]+?)\)/g,
    '[$1]($2)',
  );
}