import { useCallback, useEffect, useState } from "react";

/** How long (ms) the "copied" confirmation stays visible before resetting. */
const COPIED_RESET_DELAY_MS = 1800;

/**
 * Copies a text string to the clipboard and exposes a short-lived `copied`
 * confirmation state that resets automatically.
 *
 * @example
 * const { copied, copy } = useClipboard(email.address);
 * <button onClick={copy}>{copied ? "Copiado" : "Copiar"}</button>
 */
export function useClipboard(text: string) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, COPIED_RESET_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [copied]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard API can be denied in some browsers/contexts — fail silently.
      setCopied(false);
    }
  }, [text]);

  return { copied, copy };
}
