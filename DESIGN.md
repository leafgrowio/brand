# Leaf Design Foundations

This document is the starting point for Leaf's design system. It records the current brand foundations in a format that can be used by design, product, marketing, sales, and future automation.

Status: foundational draft  
Source: core brand colour reference supplied June 2026

## Principles

- Lead with warmth and clarity.
- Use Coral as the primary brand signal, not as a default text color.
- Use the Stone palette to keep surfaces calm and recognizably Leaf.
- Use Black for primary text and functional UI contrast.
- Use Aqua sparingly as a highlight or supporting accent.
- Use secondary colours for variety, categorization, and expressive moments; do not let them replace Coral as the brand signal.
- Prefer stable, named tokens over one-off color values in product work.
- Use sentence case rather than all-caps labels in most brand and product surfaces.
- Use confident medium-to-semibold weights for headings, balanced by lighter labels and supporting text.

## Colour Palette

### Core Brand Colour

| Token | Name | HEX | RGB | Role |
| --- | --- | --- | --- | --- |
| `color.brand.coral` | Coral | `#FB5E48` | `251 94 72` | Primary brand color, hero moments, emphasis, key brand surfaces |

### Primary Palette

| Token | Name | HEX | RGB | Role |
| --- | --- | --- | --- | --- |
| `color.neutral.light-stone` | Light Stone | `#F9F4F1` | `249 244 241` | Default warm page background, quiet surface color |
| `color.neutral.stone` | Stone | `#F2E8E1` | `242 232 225` | Secondary warm surface, panels, subtle grouping |
| `color.neutral.white` | White | `#FFFFFF` | `255 255 255` | High-clarity surface, cards, documents, assets on dark fills |
| `color.neutral.black` | Black | `#000000` | `0 0 0` | Primary text, high-contrast iconography, strongest UI foreground |
| `color.neutral.warm-grey` | Warm Grey | `#656565` | `101 101 101` | Secondary text, muted foreground, subdued UI labels |

### Highlight Colour

| Token | Name | HEX | RGB | Role |
| --- | --- | --- | --- | --- |
| `color.highlight.aqua` | Aqua | `#7AD8CE` | `122 216 206` | Supporting highlight, positive accents, selected details |

### Secondary Palette

The secondary palette is for moments that need more variety than the primary palette can provide: campaigns, editorial graphics, data visualization, badges, illustrations, community content, and product categorization. These colours are support actors. Coral, Stone, Light Stone, Aqua, Black, and Warm Grey remain the recognizable Leaf foundation.

This set is tuned from the previous extended palette into a warmer, softer, more Leaf-native range. It avoids duplicating Coral, keeps the brightest tones calmer, removes candy-like pinks and purples, and gives the system botanical, editorial, and premium accent options.

| Token | Name | HEX | RGB | Role |
| --- | --- | --- | --- | --- |
| `color.secondary.marigold` | Marigold | `#EFB75A` | `239 183 90` | Warm accent, optimistic badges, campaign details |
| `color.secondary.butter` | Butter | `#F6E49D` | `246 228 157` | Soft warm accent, light highlights, illustration fills |
| `color.secondary.apricot` | Apricot | `#F4A38F` | `244 163 143` | Warm companion to Coral, gentle campaign accents |
| `color.secondary.rosehip` | Rosehip | `#D96B7C` | `217 107 124` | Expressive accent, human warmth, high-energy details |
| `color.secondary.sage` | Sage | `#DCE8C4` | `220 232 196` | Fresh light accent, calm grouping, low-intensity fills |
| `color.secondary.laurel` | Laurel | `#8EBB91` | `142 187 145` | Fresh mid accent, grounded organic moments |
| `color.secondary.eucalyptus` | Eucalyptus | `#9FC7BC` | `159 199 188` | Muted green-blue accent, calm support colour |
| `color.secondary.harbor` | Harbor | `#4FA3A6` | `79 163 166` | Strong blue-green accent, charts and active illustration details |
| `color.secondary.heather` | Heather | `#AAA2D4` | `170 162 212` | Soft cool accent, variety in charts or campaign sets |
| `color.secondary.mulberry` | Mulberry | `#5C263D` | `92 38 61` | Deep accent, premium contrast, editorial depth |

## Typography

Leaf uses Mona Sans as the main brand and product font. Source Serif 4 is an optional editorial serif for moments that need extra craft, emphasis, or long-form warmth.

| Font | Role | Use for |
| --- | --- | --- |
| Mona Sans | Default system font | Product UI, navigation, labels, body copy, landing pages, dense information, operational surfaces |
| Source Serif 4 | Editorial/highlight serif | Blogs, long-form content, banners, marketing communications, pull quotes, selected highlight moments |

### Typography Weights

| Use | Font | Weight |
| --- | --- | --- |
| Brand and editorial headlines | Source Serif 4 | `800` |
| Pull quotes and editorial accents | Source Serif 4 Italic | `500` |
| Product/UI/body copy/landing pages | Mona Sans | Use context-appropriate weights, generally regular to semibold |

Mona Sans wins for most interfaces, landing pages, product surfaces, and general brand communication. Use Source Serif 4 selectively when a moment should feel more editorial, crafted, or premium. Do not use Source Serif 4 for routine UI, forms, tables, dense operational views, navigation, or small labels.

Load Mona Sans and Source Serif 4 from Google Fonts for online usage. The brand book imports Mona Sans weights `200..900` plus only the landed Source Serif 4 weights: normal `800` and italic `500`.

## Recommended Usage

### Backgrounds

- Use `Light Stone` as the default brand background for warm, editorial, or marketing surfaces.
- Use `Stone` for secondary sections, grouped areas, and quiet contrast against `Light Stone`.
- Use `White` when content density, legibility, or document-like clarity matters.
- Use `Black` for high-impact brand moments only when the surrounding experience can support strong contrast.

### Text

- Use `Black` for primary text on `Light Stone`, `Stone`, `White`, `Coral`, and `Aqua`.
- Use `Warm Grey` for secondary text on `Light Stone`, `Stone`, and `White`.
- Do not use `Coral`, `Aqua`, `Light Stone`, or `Stone` for body text.
- Avoid white body text on `Coral`; it does not meet normal-size text contrast guidance.

### Brand Accent

- Use `Coral` to make something feel distinctly Leaf.
- Use `Aqua` as a highlight, not as a competing brand color.
- Do not let `Coral` and `Aqua` carry important text contrast against each other.

### Secondary Colour

- Use secondary colours when a surface needs multiple distinct categories, varied campaign moments, editorial illustration, or chart series.
- Keep secondary colours subordinate to the primary system. A secondary colour should rarely dominate a full page or product surface.
- Pair secondary colour fields with black SVG icons when building content libraries, onboarding collections, learning hubs, editorial navigation, or page-category cards.
- Keep the icon style consistent inside a collection. Let the colour vary by category while the icon treatment and label surface stay stable.
- Do not use secondary colours for product states such as success, warning, error, focus, or disabled until those state tokens are defined separately.
- Prefer Black text on Marigold, Butter, Apricot, Rosehip, Sage, Laurel, Eucalyptus, Harbor, and Heather.
- Use White text on Mulberry.
- Treat Rosehip as a display or accent colour; avoid relying on it for normal body text.

## Accessibility Notes

Contrast ratios are calculated against WCAG relative luminance guidance.

| Pair | Contrast | Guidance |
| --- | ---: | --- |
| Black on White | 21.00:1 | Passes normal text |
| Black on Light Stone | 19.24:1 | Passes normal text |
| Black on Stone | 17.41:1 | Passes normal text |
| Black on Coral | 6.80:1 | Passes normal text |
| Black on Aqua | 12.54:1 | Passes normal text |
| Warm Grey on White | 5.83:1 | Passes normal text |
| Warm Grey on Light Stone | 5.34:1 | Passes normal text |
| Warm Grey on Stone | 4.83:1 | Passes normal text |
| White on Coral | 3.09:1 | Use only for large text or non-critical display text |
| Black on Warm Grey | 3.60:1 | Use only for large text or graphic elements |
| Aqua on Warm Grey | 3.48:1 | Use only for large text or graphic elements |

As a default implementation rule, use Black text on Coral and Aqua fills.

### Secondary Contrast

| Pair | Contrast | Guidance |
| --- | ---: | --- |
| Black on Marigold | 11.59:1 | Passes normal text |
| Black on Butter | 16.50:1 | Passes normal text |
| Black on Apricot | 10.48:1 | Passes normal text |
| Black on Rosehip | 6.34:1 | Passes normal text |
| Black on Sage | 16.38:1 | Passes normal text |
| Black on Laurel | 9.67:1 | Passes normal text |
| Black on Eucalyptus | 11.37:1 | Passes normal text |
| Black on Harbor | 7.12:1 | Passes normal text |
| Black on Heather | 8.83:1 | Passes normal text |
| White on Mulberry | 11.67:1 | Passes normal text |

## Implementation Tokens

### CSS Custom Properties

```css
:root {
  --leaf-color-brand-coral: #fb5e48;
  --leaf-color-neutral-light-stone: #f9f4f1;
  --leaf-color-neutral-stone: #f2e8e1;
  --leaf-color-neutral-white: #ffffff;
  --leaf-color-neutral-black: #000000;
  --leaf-color-neutral-warm-grey: #656565;
  --leaf-color-highlight-aqua: #7ad8ce;
  --leaf-color-secondary-marigold: #efb75a;
  --leaf-color-secondary-butter: #f6e49d;
  --leaf-color-secondary-apricot: #f4a38f;
  --leaf-color-secondary-rosehip: #d96b7c;
  --leaf-color-secondary-sage: #dce8c4;
  --leaf-color-secondary-laurel: #8ebb91;
  --leaf-color-secondary-eucalyptus: #9fc7bc;
  --leaf-color-secondary-harbor: #4fa3a6;
  --leaf-color-secondary-heather: #aaa2d4;
  --leaf-color-secondary-mulberry: #5c263d;
  --leaf-font-sans: "Mona Sans", Arial, sans-serif;
  --leaf-font-serif: "Source Serif 4", Georgia, serif;
  --leaf-font-serif-headline-weight: 800;
  --leaf-font-serif-quote-weight: 500;
}
```

### JSON Tokens

```json
{
  "color": {
    "brand": {
      "coral": { "value": "#FB5E48", "rgb": "251 94 72" }
    },
    "neutral": {
      "light-stone": { "value": "#F9F4F1", "rgb": "249 244 241" },
      "stone": { "value": "#F2E8E1", "rgb": "242 232 225" },
      "white": { "value": "#FFFFFF", "rgb": "255 255 255" },
      "black": { "value": "#000000", "rgb": "0 0 0" },
      "warm-grey": { "value": "#656565", "rgb": "101 101 101" }
    },
    "highlight": {
      "aqua": { "value": "#7AD8CE", "rgb": "122 216 206" }
    },
    "secondary": {
      "marigold": { "value": "#EFB75A", "rgb": "239 183 90" },
      "butter": { "value": "#F6E49D", "rgb": "246 228 157" },
      "apricot": { "value": "#F4A38F", "rgb": "244 163 143" },
      "rosehip": { "value": "#D96B7C", "rgb": "217 107 124" },
      "sage": { "value": "#DCE8C4", "rgb": "220 232 196" },
      "laurel": { "value": "#8EBB91", "rgb": "142 187 145" },
      "eucalyptus": { "value": "#9FC7BC", "rgb": "159 199 188" },
      "harbor": { "value": "#4FA3A6", "rgb": "79 163 166" },
      "heather": { "value": "#AAA2D4", "rgb": "170 162 212" },
      "mulberry": { "value": "#5C263D", "rgb": "92 38 61" }
    }
  },
  "font": {
    "sans": { "value": "Mona Sans" },
    "serif": { "value": "Source Serif 4" },
    "serif-headline-weight": { "value": 800 },
    "serif-quote-weight": { "value": 500 }
  }
}
```

## Naming Standard

- Use lowercase kebab-case for token ids.
- Group tokens by role first, then color name.
- Keep human-readable names title-cased in documentation.
- Do not use raw HEX values in implementation when a token exists.

## Next Foundations To Document

- Typography scale and Mona Sans + Source Serif 4 usage.
- Voice and interface capitalization rules.
- Logo usage, clear space, sizing, and background rules.
- Icon sizing, stroke/fill guidance, and selection rules.
- Color roles for product states such as success, warning, error, focus, and disabled.
- Secondary palette usage examples for charts, categories, and campaign systems.
- Exported token files for downstream apps.
