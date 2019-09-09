# Using JSX in Markdown

> Thanks to [mdx](https://github.com/mdx-js/mdx), you can use `jsx` in markdown.

## Example

Let's make a component that shows the current file modified time. The structure of the files is as follow:

```bash
├── showTime.md
├── showTime.js
```

Firstly, import `moment.js`, `PageContext` and `React` in `showTime.js`

```js
import React from 'react';
import moment from 'moment';
import { PageContext } from '@app';
```

Then we write code of our `ShowTime` component and export it.

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

> Note
>
> The `current Locale WebConfig` and `current PageInfo` used above are parts of `PageContext` and both mentioned in the section [Custom Themes](/guide/theme#get-site-data-and-current-page-data).

Finally, import and use it in our `showTime.MD`

```jsx
import { ShowTime } from './ShowTime';

<ShowTime />;
```

The result is as follow:

import {ShowTime} from '@components/ShowModifiedTime'

<ShowTime />

## Use `antd`

```jsx
import {Button,Switch} from 'antd'

<Button>Button</Button>
<br />
<Switch defaultChecked style={{marginTop:'15px'}} />
```

The result is as follow:

<Button>Button</Button>

<br />

<Switch defaultChecked style={{marginTop:'15px'}} />
