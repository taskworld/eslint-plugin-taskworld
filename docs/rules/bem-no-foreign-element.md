# Disallow classNames that belong to other React component (bem-no-foreign-element)

We use a React component to encapsulate a BEM “block.”
Any element inside a block should be private to that component, and should not be used anywhere else.
If it needs to be reused, it is better to extract it into an actual, reusable component.

Note, however, that it may be namespaced using dot notation:

```jsx
const CoolList = ({ children }) => (
  <ul className='tw-cool-list'>{children}</ul>
);

CoolList.Item = ({ children }) => (
  <li className='tw-cool-list__item'>{children}</li>
);

// usage:
var example = (
  <CoolList>
    <CoolList.Item>One</CoolList>
    <CoolList.Item>Two</CoolList>
  </CoolList>
);
```


## Rule Details

This rule ensures that `FileName.react.js` may only use BEM class name `tw-file-name`.

The following patterns are considered warnings:

```js
// WonderfulComponent.react.js
var example = (
  <div className='tw-form'>
  </div>
);
```

The following patterns are not warnings:

```js
// WonderfulComponent.react.js
var example = (
  <div className='tw-wonderful-component'>
  </div>
);
```

Note that `tw-icon` is an exception, but this is probably temporary.
We better use `<Icon icon='workspace' />` instead of `<i className='tw-icon-workspace' />`.
