# Code Style & Conventions

## SCSS

### Syntax & Formatting

A just-the-facts guide to properly written multi-line CSS rules:

- Use one discrete selector per line in multi-selector rulesets
- Opening brace on the same line as the rule set
- Include a single space before the opening brace of a ruleset
- Properties are grouped by type: box, border, background, text, other
- Include one declaration per line in a declaration block
- Two (2) spaces before each declaration (no tabs)
- Include a single space after the colon of a declaration
- Include a semi-colon at the end of the last declaration in a declaration block
- Place the closing brace of a ruleset in the same column as the first character of the ruleset
- Make meaningful use of whitespace to separate rulesets and comments
- Prefer HSL color values to RGB to longform hex to shortform hex to color names
- Prefer single quoted strings
- Quote attribute values in selectors
- Where allowed, avoid specifying units for zero-values
- Re: Zeroes, always display leading zeroes and never display trailing zeroes
- Include a space after commas
- Local variables should be declared before property declarations
- Mixin inclusions with no `@content` come before property declarations

```scss
.planet,
.asteroid {
  display: block;
  padding: 0.5em;
  border: 0;
  color: hsl(240, 6%, 12%);

  &:hover {
    background-image: url('/images/orbit.svg');
  }
}
```

#### Strings

##### Encoding

To avoid any issues with character encoding, be sure to declare UTF-8 encoding via `@charset`.

```scss
@charset 'utf-8';
```

##### Quotes

While CSS and Sass don't require strings to be quoted, it's good practice for a few reasons:

- Quoting helps differentiate strings from identifiers like `initial` or `serif`.
- Color names are parsed as identifiers when unquoted
- Syntax highlighters often fail when encountering unquoted strings

If a string contains single quotes (`'`), you may opt to wrap the string in double quotes (`"`) instead of escaping (`\'`).

#### Numbers

##### Calculations

Arithmetic should always be wrapped in parentheses to improve readability and ensure the contents are evaluated appropriately. This is true for both Sass math and extended `calc()`.

```scss
width: (100% / 3);

width: calc((100% / 3) - 2em);
```

##### Magic Numbers

Otherwise known as an "unnamed numerical constant", magic numbers are fixed values without a logical derivation.

**They should be avoided at all costs.** This <a href="https://css-tricks.com/magic-numbers-in-css/">CSS Tricks article</a> does a great job of illustrating the possible pitfalls.

If no other solution can be found, please include a comment to inform the next contributor how you arrived at the existing value.

#### Colors

Color literals should not be used in property delcarations. Instead, use a known color variable or design token.

```scss
color: cv('red', '500');

color: $text-body;
```

#### Declaration Sorting

Properties should be sorted by type. Rougly, this means properties related to box, border, background, text, then others. Specifically, we refer to the <a href="https://github.com/brandon-rhodes/Concentric-CSS/blob/master/style3.css">Concentric CSS</a> standard.

#### Nesting

Selector nesting is a powerful feature of Sass, but can quickly generate over-specific CSS. These guidelines should help keep code efficient without problematic results. Generally, generating selectors via nesting should be avoided - with a hard limit at nesting 3 levels deep.

Especially avoid using the current selector reference (`&`) for generating class names. While individual modules may appear tidy, this makes those selectors unsearchable since they do not exist in the codebase.

```scss
// Don't

.planet {
  &--ring {
    color: $ring-color;
  }
}
```

##### Exceptions

Here are a few examples of when nesting is encouraged.

###### Pseudos

Pseudo-classes and pseudo-elements are optimal candidates for nesting. This ensures pseudos are applied to the appropriate class name automatically and keeps the code clean.

```scss
.planet {
  background-color: $ocean;

  &:hover {
    background-color: $cloudy;
  }

  &::before {
    content: 'pseudo atmosphere';
  }
}
```

###### Modifications

Nesting modification classes or their targets can help make their scope clear.

```scss
.is-planet-frozen {
  &.planet {
    background-color: $ice;
  }

  .planet--ring {
    background-color: $ice;
  }
}

.planet {
  &.is-planet-frozen {
    background-color: $ice;
  }

  &.is-planet-molten {
    background-color: $lava;
  }
}
```

###### Context

The current selector reference (`&`) can be a powerful way to include contextual styling with the modified element.

```scss
.planet {
  .black-hole & {
    display: none;
  }

  .solar-system & {
    display: block;
  }
}
```
