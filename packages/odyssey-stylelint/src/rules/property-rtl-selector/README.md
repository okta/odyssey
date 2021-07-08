# odyssey/property-rtl-selector

Specify physcial CSS properties that require an additional `[dir='rtl']` selector for RTL support.

```css
.foo {
  transform: translateX(50%);
}

[dir='rtl'] .foo {
  transform: translateX(-50%);
}
```

## Options

`array|string`: `["array", "of", "unprefixed", "properties", or "/regex/"]|"property"|"/regex/"`

A string surrounded with `"/"` is interpreted as a regular expression. This allows easy targeting of shorthands. For example: `/^background/` will match `background`, `background-size`, `background-color`, etc.

Given:

```
["box-shadow", "transform", "/^background/"]
```

The following patterns **are** considered violations:

```css
.foo {
  box-shadow: 0 8px 12px #777777;
}
```

```css
.foo {
  transform: rotate(20deg);
}
```

```css
.foo {
  -webkit-transform: rotate(20deg);
}
```

```css
.foo {
  background-position: right 0.5rem center;
  transform: translateX(50%);
}

[dir='rtl'] .foo {
  transform: translateX(-50%);
}
```

```css
.foo {
  background: left 1rem center no-repeat url("../assets/background.png");
}
```

```css
.foo {
  background-position: left 1rem center;
}
```

The following patterns **are not** considered violations:

```css
.foo {
  color: #777777;
  transform: scale(.75);
}

[dir='rtl'] .foo {
  transform: scale(.75);
}
```

```css
.foo {
  no-background: unset;
}
```
