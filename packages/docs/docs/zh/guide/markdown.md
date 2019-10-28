# Markdown 扩展

## Ant Design 组件

> RcPress 可以将一些 markdown 语法标记渲染成常用的 Ant Design 组件

### 提示框

> 对应组件： [Alert](https://ant.design/components/alert-cn/)

输入：

```markdown
::: tip-zh
这是一个提示
:::

::: warning-zh
这是一个警告
:::

::: error-zh
这是一个严重警告
:::
```

输出：

::: tip-zh
这是一个提示
:::

::: warning-zh
这是一个警告
:::

::: error-zh
这是一个严重警告
:::

你也可以自定义标题：

输入：

```markdown
::: tip | 有空格的 标题
这是一个自定义标题的提示
:::
```

输出：

::: tip | 有空格的 标题
这是一个自定义标题的提示
:::

**也可以查看:**

- [Markdown alert 配置项](../config/#alert)

## 代码块中的行高亮

输入：

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

输出：

```js{4}
export default {
  data() {
    return {
      msg: 'Highlighted!'
    };
  }
};
```

**参考：**

- [gatsby-remark-prismjs](https://www.npmjs.com/package/gatsby-remark-prismjs#line-highlighting)

## 显示行号

输入：

````markdown
```javascript{numberLines:true}{4}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-prismjs`]
    }
  }
];
```
````

输出：

```javascript{numberLines:true}{4}
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-prismjs`]
    }
  }
];
```

**参考：**

- [gatsby-remark-prismjs](https://www.npmjs.com/package/gatsby-remark-prismjs#optional-add-line-numbering)

## 高亮行内的代码

输入：

```markdown
我可以用 css 语法高亮这段代码：`css>>>.some-class { background-color: red }`

我可以用 js 语法高亮这段代码：`js>>>const foo = 'bar';`
```

输出：

我可以用 css 语法高亮这段代码：`css>>>.some-class { background-color: red }`

我可以用 js 语法高亮这段代码：`js>>>const foo = 'bar';`

**参考：**

- [gatsby-remark-prismjs](https://www.npmjs.com/package/gatsby-remark-prismjs#inline-code-blocks)

## emoji :tada:

输入：

```markdown
:tada: :100:
```

输出：

:tada: :100:
