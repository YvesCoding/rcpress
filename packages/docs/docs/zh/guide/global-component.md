# 全局组件

> 你可以设置一个全局组件，这个全局组件能在 markdown 的任何位置直接引用

## 如何设置？

新建一个文件，路径为： `.rcpress/globalComponent.js`。在里面导入你想设置的全局组件，导出一个默认的 Object 即可。例如：

```js
import { Alert, Button, Switch } from 'antd';
export default {
  Alert,
  Button,
  Switch
};
```

这时候，你可以在`markdown`中直接使用了。

<Button>
全局组件
</Button>

<br />

<Switch defaultChecked style={{marginTop:'15px'}} />

<br />

<Alert message="成功" style={{marginTop:'15px'}} description="成功使用全局组件" type="success" showIcon />

## 默认的全局组件

### PageCustomer

```js
<PageCustomer>
  {ctx => {
    return `当前页面路径(不包含base)： ${ctx.path}`;
  }}
</PageCustomer>
```

<PageCustomer>
{
    ctx => {
        return `当前页面路径(不包含base)： ${ctx.path}`
    }
}
</PageCustomer>
