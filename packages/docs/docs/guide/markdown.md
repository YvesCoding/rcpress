# Markdown Extensions

## Ant Design Components

### Prompt box

> The corresponding component of the prompt box is [Alert](https://ant.design/components/alert/)

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

## Line highlighting in the code block

Enter:

````markdown
```js{4}
export default {
  data() {
    return {
      msg: 'Highlighted!'
    };
  }
};
```
````

Output:

```js{4}
export default {
  data() {
    return {
      msg: 'Highlighted!'
    };
  }
};
```

**reference:**

- [gatsby-remark-prismjs](https://www.npmjs.com/package/gatsby-remark-prismjs#line-highlighting)

## Display line number

Enter:

````markdown
```javascript{numberLines:true}{4}
// In your gatsby-config.js
Plugins: [
  {
    Resolve: `gatsby-transformer-remark`,
    Options: {
      Plugins: [`gatsby-remark-prismjs`]
    }
  }
];
```
````

Output:

```javascript{numberLines:true}{4}
// In your gatsby-config.js
Plugins: [
  {
    Resolve: `gatsby-transformer-remark`,
    Options: {
      Plugins: [`gatsby-remark-prismjs`]
    }
  }
];
```

**reference:**

- [gatsby-remark-prismjs](https://www.npmjs.com/package/gatsby-remark-prismjs#optional-add-line-numbering)

## Highlight the code in the line

Enter:

```markdown
I can highlight this code with css syntax: `css>>>.some-class { background-color: red }`

I can highlight this code with js syntax: `js>>>const foo = 'bar';`
```

Output:

I can highlight this code with css syntax: `css>>>.some-class { background-color: red }`

I can highlight this code with js syntax: `js>>>const foo = 'bar';`

**reference:**

- [gatsby-remark-prismjs](https://www.npmjs.com/package/gatsby-remark-prismjs#inline-code-blocks)
