# Global Components

> You can set up a global component that can be referenced directly anywhere in the markdown

## How to set up?

Create a new file with the path: `.rcpress/globalComponent.js`. Import the global component you want to set and export a default Object. E.g:

```js
import { Alert, Button, Switch } from 'antd';
export default {
  Alert,
  Button,
  Switch
};
```

At this time, you can use it directly in `markdown`.

<Button>
Global component
</Button>

<br />

<Switch defaultChecked style={{marginTop:'15px'}} />

<br />

<Alert message="success" style={{marginTop:'15px'}} description="Successful use of global components" type="success" showIcon />

## Default global component

### PageCustomer

```js
<PageCustomer>
  {ctx => {
    return `Current page path (not including base): ${ctx.path}`;
  }}
</PageCustomer>
```

<PageCustomer>
{
    ctx => {
        return `Current page path (not including base): ${ctx.path}`
    }
}
</PageCustomer>
