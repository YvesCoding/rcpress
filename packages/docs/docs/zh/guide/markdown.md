# Markdown 扩展

## 提示框

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

你也可以覆盖默认的标题,使用自定义标题。

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

**具体配置参考:**

- [Markdown alert 配置项](../config/#alert)
