# Disallow bare modifiers in React classNames (bem-no-bare-modifier)

In BEM, modifiers are used to modify a BEM block or BEM element.
It does not make sense to use it on its own,
but in the past, it has been (ab)used, probably to save typing.
This may potentially lead to className clashes.


## Rule Details

This rule aims to detect JSX className attributes.

The following patterns are considered warnings:

```js
<div className='--icon'></div>
```

The following patterns are not warnings:

```js
<div className='tw-tag --selected'></div>
```

```js
<div className='tw-list__item --selected'></div>
```

## Further Reading

* https://en.bem.info/method/naming-convention/
