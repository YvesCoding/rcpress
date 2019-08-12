# 在 Markdown 中使用 JSX

> 得益于[mdx](https://github.com/mdx-js/mdx)，你可以在 markdown 中使用 `jsx`

## 例子

我们来做一个显示当前文件修改时间的组件。文件结构如下：

```bash
├── showTime.md
├── showTime.js
```

首先在 `showTime.js` 中引入`moment.js`, `PageContext` 和 `React`

```js
import React from 'react';
import moment from 'moment';
import { PageContext } from 'antdsite';
```

接着我们编写我们的`ShowTime`组件代码并导出

```js
export const ShowTime = () => {
  return (
    <PageContext.Consumer>
      {context => {
        return (
          <div className="modifiedTime modifiedTimeLeft">
            {context.currentLocaleWebConfig.themeConfig.lastUpdated}{' '}
            {moment(context.currentPageInfo.fields.modifiedTime).format('YYYY-MM-DD HH:mm:SS')}
          </div>
        );
      }}
    </PageContext.Consumer>
  );
};
```

> 注意
>
> 上面用到的`currentLocaleWebConfig`和`currentPageInfo`都是在[自定义主题](/zh/guide/theme)一节中提到过的，属于`PageContext`的一部分。

最后，在我们的`showTime.md`里导入并使用

```jsx
import { ShowTime } from './ShowTime';

<ShowTime />;
```

效果如下：

import {ShowTime} from '@components/ShowModifiedTime'

<ShowTime />

## 使用`antd`

```jsx
import {Button,Switch} from 'antd';

<Button>Button</Button>
<br />
<Switch defaultChecked style={{marginTop:'15px'}} />
```

效果如下：

<Button>Button</Button>

<br />

<Switch defaultChecked style={{marginTop:'15px'}} />
