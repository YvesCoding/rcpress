---
heroImage: /logo.png
actionText: Get Started →
actionLink: /guide/
featureText: Features
showStar: true
features:
  - title: Rich Function
    details: You can customize scrollbar, rail, scroll container, etc. Rich APIs and Events
  - title: Easy To Use
    details: Each property is optional, and a custom scrollbar can appear just by wrapping the content
  - title: Good compatibility
    details: Compatible with TypeSciprt, SSR, PC, mobile phone, touch screen

footer: MIT Licensed | Copyright © 2018-present Yi(Yves) Wang
---

## Get Started

1. Install `magic-scroll` via `yarn` or `npm`

```bash
npm install magic-scroll -S
# yarn add magic-scroll
```

2.  Import `magic-scroll`

```js
import Scrollbar from 'magic-scroll'; // highlight-line
```

3. Wrap the content.

```jsx
<div className="demo-container">
  <Scrollbar>
    <div className="demo-content">
      <span className="demo-content-text">Hello! Magic Scroll!</span>
    </div>
  </Scrollbar>
</div>
```

4. You will get the custom scrollbar below.
