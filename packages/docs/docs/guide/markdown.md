# Markdown Extensions

## Tip box

Input:

```markdown
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: error
This is a dangerous waring
:::
```

Output:

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: error
This is a dangerous waring
:::

You can also override the default title and use a custom title.

Input:

```markdown
::: tip | Title with spaces
This is a tip for a custom title
:::
```

Output:

::: tip | Title with spaces
This is a tip for custom title .
:::

**See also:**

- [Markdown alert config](../config/#alert)
