// The Motion Language as code. One module per site; components never define curves or
// durations of their own (if they need one, a token is missing here).

export const LANGUAGE = {
  name: "default",
  verbs: {}, // e.g. { cross: "atravessar: entrar em algo", swing: "balançar: mudar de conteúdo" }
  material: "paper",
  ease: {
    enter: [0.22, 1, 0.36, 1], // signature curve for entrances
    chapter: [0.76, 0, 0.24, 1], // chapter turns
    snap: "power4.out", // mechanical micro feedback
  },
  duration: { fast: 0.35, base: 0.8, slow: 1.3 }, // seconds
  stagger: 0.06,
  screens: { chapter: 2, beat: 1, readPause: 0.6 }, // scroll length, in screens
  scrub: 0.6,
  eventColor: "#d6336c",
  forbidden: [], // e.g. ["fade puro", "rotação > 15°", "bounce"]
};

/** A site's language: the defaults with its own choices on top. */
export function defineLanguage(overrides = {}) {
  return {
    ...LANGUAGE,
    ...overrides,
    ease: { ...LANGUAGE.ease, ...overrides.ease },
    duration: { ...LANGUAGE.duration, ...overrides.duration },
    screens: { ...LANGUAGE.screens, ...overrides.screens },
  };
}

const toCss = (e) => (Array.isArray(e) ? `cubic-bezier(${e.join(", ")})` : null);

/** Mirrors the language into CSS custom properties, so CSS and JS share one curve. */
export function applyCssTokens(lang = LANGUAGE, root = document.documentElement) {
  for (const [k, v] of Object.entries(lang.ease)) {
    const css = toCss(v);
    if (css) root.style.setProperty(`--ease-${k}`, css);
  }
  for (const [k, v] of Object.entries(lang.duration)) root.style.setProperty(`--dur-${k}`, `${v}s`);
  root.style.setProperty("--stagger", `${lang.stagger}s`);
  root.style.setProperty("--color-event", lang.eventColor);
}

/** Registers the signature curves as GSAP CustomEases ("enter", "chapter"), when available. */
export function registerGsapEases(gsap, CustomEase, lang = LANGUAGE) {
  if (!gsap || !CustomEase) return;
  gsap.registerPlugin(CustomEase);
  for (const [k, v] of Object.entries(lang.ease)) {
    if (Array.isArray(v)) CustomEase.create(k, `M0,0 C${v[0]},${v[1]} ${v[2]},${v[3]} 1,1`);
  }
}
