# Leaf Design Foundations

This document is the starting point for Leaf's design system. It records the current brand foundations in a format that can be used by design, product, marketing, sales, and future automation.

Status: foundational draft  
Source: core brand colour reference supplied June 2026

## Principles

- Lead with warmth and clarity.
- Use Coral as the primary brand signal, not as a default text color.
- Use the Stone palette to keep surfaces calm and recognizably Leaf.
- Use Ink for primary text and functional UI contrast.
- Use Aqua sparingly as a highlight or supporting accent.
- Use secondary colours for variety, categorization, and expressive moments; do not let them replace Coral as the brand signal.
- Prefer stable, named tokens over one-off color values in product work.
- Use sentence case rather than all-caps labels in most brand and product surfaces.
- Use confident medium-to-semibold weights for headings, balanced by lighter labels and supporting text.
- Treat exported logo artwork as production-ready source assets. Choose the padded or no-padding export intentionally rather than cropping files by hand.

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
| `color.neutral.canvas` | Canvas | `#FFFDFB` | `255 253 251` | High-clarity warm surface, cards, documents, default light utility field |
| `color.neutral.ink` | Ink | `#171412` | `23 20 18` | Primary text, high-contrast iconography, strongest brand foreground |
| `color.neutral.warm-grey` | Warm Grey | `#656565` | `101 101 101` | Secondary text, muted foreground, subdued UI labels |

### Highlight Colour

| Token | Name | HEX | RGB | Role |
| --- | --- | --- | --- | --- |
| `color.highlight.aqua` | Aqua | `#7AD8CE` | `122 216 206` | Supporting highlight, positive accents, selected details |

### Secondary Palette

The secondary palette is for moments that need more variety than the primary palette can provide: campaigns, editorial graphics, data visualization, badges, illustrations, community content, and product categorization. These colours are support actors. Coral, Stone, Light Stone, Aqua, Ink, Canvas, and Warm Grey remain the recognizable Leaf foundation.

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
| `color.secondary.lilac` | Lilac | `#D8CFF0` | `216 207 240` | Pale cool accent, gentle editorial and community moments |
| `color.secondary.heather` | Heather | `#AAA2D4` | `170 162 212` | Soft cool accent, variety in charts or campaign sets |

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

### Logos

Leaf's logo system includes the core Leaf mark plus service and property sub logos. Service and property logos now ship in two export modes: `padding/` and `no-padding/`.

Use `padding/` exports when the logo is being shared, dropped into a loose canvas, or used where the asset needs to carry its own safe area. The padded margin is equal to 50% of the Leaf icon.

Use `no-padding/` exports inside applications, components, cards, watermarks, navigation, or any layout where the surrounding system already controls spacing. This avoids extra invisible space creating alignment or sizing issues.

| Group | Role | Source |
| --- | --- | --- |
| Core Leaf icon | App icons, compact brand marks, favicons, small-space brand moments | `assets/logos/_ leaf/icon/{padding,no-padding}/` |
| Core Leaf logo | Default company logo lockup | `assets/logos/_ leaf/logo/{padding,no-padding}/` |
| Answers | Service sub logo for Leaf Answers | `assets/logos/answers/{padding,no-padding}/` |
| Creative | Service sub logo for Leaf Creative | `assets/logos/creative/{padding,no-padding}/` |
| Performance | Service sub logo for Leaf Performance | `assets/logos/performance/{padding,no-padding}/` |
| Signal | Service sub logo for Leaf Signal | `assets/logos/signal/{padding,no-padding}/` |
| Stores | Service sub logo for Leaf Stores | `assets/logos/stores/{padding,no-padding}/` |
| Strategy | Service sub logo for Leaf Strategy | `assets/logos/strategy/{padding,no-padding}/` |
| Blog | Property logo for Leaf Blog editorial surfaces | `assets/logos/blog/{padding,no-padding}/` |
| Colectivo | Property logo for Leaf Colectivo, the podcast | `assets/logos/colectivo/{padding,no-padding}/` |

- Use SVG for product, web, deck, and layout work whenever the output context supports vector assets.
- Use PNG only when a raster asset is required by the destination.
- Do not trim, crop, or manually reframe a padded export to make the artwork appear larger; switch to the matching `no-padding/` export instead.
- When placing padded logos in layout, align the export frame to the grid; the visible artwork already accounts for clear space inside that frame.
- When placing no-padding logos, provide spacing through the component, grid, or surrounding layout.
- Use Coral exports for primary brand placement on light, Stone, or Canvas surfaces.
- Use Ink or Black exports when Coral would create too much emphasis or when the surrounding system is monochrome.
- Use White or Negative exports only on dark, Ink, or Coral surfaces where the mark needs strong contrast.
- Use the service sub logos for the named service surface. Use the Blog and Colectivo property logos for editorial and podcast contexts rather than treating them as services.
- Keep SVG and PNG variants paired when adding or updating logo exports.

### Backgrounds

- Use `Light Stone` as the default brand background for warm, editorial, or marketing surfaces.
- Use `Stone` for secondary sections, grouped areas, and quiet contrast against `Light Stone`.
- Use `Canvas` when content density, legibility, or document-like clarity matters.
- Use `Ink` for high-impact brand moments only when the surrounding experience can support strong contrast.
- Use pure `White` and pure `Black` only when a destination, asset format, or strict contrast context requires them.

### Text

- Use `Ink` for primary text on `Light Stone`, `Stone`, `Canvas`, `Coral`, and `Aqua`.
- Use `Warm Grey` for secondary text on `Light Stone`, `Stone`, and `Canvas`.
- Do not use `Coral`, `Aqua`, `Light Stone`, or `Stone` for body text.
- Avoid white body text on `Coral`; it does not meet normal-size text contrast guidance.

### Brand Accent

- Use `Coral` to make something feel distinctly Leaf.
- Use `Aqua` as a highlight, not as a competing brand color.
- Do not let `Coral` and `Aqua` carry important text contrast against each other.

### Secondary Colour

- Use secondary colours when a surface needs multiple distinct categories, varied campaign moments, editorial illustration, or chart series.
- Keep secondary colours subordinate to the primary system. A secondary colour should rarely dominate a full page or product surface.
- Pair secondary colour fields with Ink or black SVG icons when building content libraries, onboarding collections, learning hubs, editorial navigation, or page-category cards.
- Keep the icon style consistent inside a collection. Let the colour vary by category while the icon treatment and label surface stay stable.
- Do not use secondary colours for product states such as success, warning, error, focus, or disabled until those state tokens are defined separately.
- Prefer Ink text on Marigold, Butter, Apricot, Rosehip, Sage, Laurel, Eucalyptus, Harbor, Heather, and Lilac.
- Treat Rosehip as a display or accent colour; avoid relying on it for normal body text.

### Notion Gallery Page Covers

Notion gallery banners should be generated as page-cover images because Notion gallery views use the page cover as the card image. Each page cover should use one secondary colour as the full image field and one centered black icon from `assets/icons/<theme>/<icon>/black/png/`. This keeps the collection visually varied while preserving a consistent Leaf card system.

Use `tools/notion_banner_generator.py` for generated PNG exports. The default Notion page-cover format is `1500x600`. The icon should stay centered and occupy roughly one third of the shorter side so it remains readable when Notion crops the cover into a gallery-card preview. Generated files should live in `exports/notion-banners/` unless a downstream workflow needs a committed asset.

## Accessibility Notes

Contrast ratios are calculated against WCAG relative luminance guidance.

| Pair | Contrast | Guidance |
| --- | ---: | --- |
| Ink on Canvas | 18.07:1 | Passes normal text |
| Ink on Light Stone | 16.80:1 | Passes normal text |
| Ink on Stone | 15.20:1 | Passes normal text |
| Ink on Coral | 5.93:1 | Passes normal text |
| Ink on Aqua | 10.95:1 | Passes normal text |
| Warm Grey on Canvas | 5.74:1 | Passes normal text |
| Warm Grey on Light Stone | 5.34:1 | Passes normal text |
| Warm Grey on Stone | 4.83:1 | Passes normal text |
| White on Coral | 3.09:1 | Use only for large text or non-critical display text |
| Ink on Warm Grey | 3.15:1 | Use only for large text or graphic elements |
| Aqua on Warm Grey | 3.48:1 | Use only for large text or graphic elements |

As a default implementation rule, use Ink text on Coral and Aqua fills.

### Secondary Contrast

| Pair | Contrast | Guidance |
| --- | ---: | --- |
| Ink on Marigold | 10.12:1 | Passes normal text |
| Ink on Butter | 14.41:1 | Passes normal text |
| Ink on Apricot | 9.15:1 | Passes normal text |
| Ink on Rosehip | 5.54:1 | Passes normal text |
| Ink on Sage | 14.31:1 | Passes normal text |
| Ink on Laurel | 8.44:1 | Passes normal text |
| Ink on Eucalyptus | 9.93:1 | Passes normal text |
| Ink on Harbor | 6.22:1 | Passes normal text |
| Ink on Lilac | 12.31:1 | Passes normal text |
| Ink on Heather | 7.71:1 | Passes normal text |

## Implementation Tokens

### CSS Custom Properties

```css
:root {
  --leaf-color-brand-coral: #fb5e48;
  --leaf-color-neutral-light-stone: #f9f4f1;
  --leaf-color-neutral-stone: #f2e8e1;
  --leaf-color-neutral-canvas: #fffdfb;
  --leaf-color-neutral-ink: #171412;
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
  --leaf-color-secondary-lilac: #d8cff0;
  --leaf-color-secondary-heather: #aaa2d4;
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
      "canvas": { "value": "#FFFDFB", "rgb": "255 253 251" },
      "ink": { "value": "#171412", "rgb": "23 20 18" },
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
      "lilac": { "value": "#D8CFF0", "rgb": "216 207 240" },
      "heather": { "value": "#AAA2D4", "rgb": "170 162 212" }
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
- Logo minimum sizing and lockup-specific placement examples.
- Icon sizing, stroke/fill guidance, and selection rules.
- Color roles for product states such as success, warning, error, focus, and disabled.
- Secondary palette usage examples for charts, categories, and campaign systems.
- Exported token files for downstream apps.
