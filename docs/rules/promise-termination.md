# Ensure that a promise is either returned or ended with done. (promise-termination)

From the Python Philosophy:

```
Errors should never pass silently.
Unless explicitly silenced.
```

Note that there is currently [a proposal to report “potentially unhandled rejections”](https://gist.github.com/benjamingr/0237932cee84712951a2), and [Bluebird supports it](https://github.com/petkaantonov/bluebird/blob/master/API.md#error-management-configuration), but its default behavior is to simply log the stack trace.

__This may cause your system to be in an unpredictable state__ [and goes against Node.js caution of error handling](https://nodejs.org/api/domain.html#domain_warning_don_t_ignore_errors):

> By the very nature of how `throw` works in JavaScript, there is almost never any way to safely "pick up where you left off", without leaking references, or creating some other sort of undefined brittle state.

We can use global rejection events, or we could be explicit and terminate every promise chain ourselves. Again, quoting the Python Philosophy:

```
Explicit is better than implicit.
```


## Rule Details

This rule ensures that all promise chains should end properly. Quoting from [Q’s documentation](https://github.com/kriskowal/q/tree/26ae6a2406626bb97ac7880bc770878dbfc9aefa#the-end):

> When you get to the end of a chain of promises, you should either return the last promise or end the chain. Since handlers catch errors, it’s an unfortunate pattern that the exceptions can go unobserved.
>
> So, either return it,
>
> ```javascript
> return foo()
> .then(function () {
>     return "bar";
> });
> ```
>
> Or, end it.
>
> ```javascript
> foo()
> .then(function () {
>     return "bar";
> })
> .done();
> ```

The following patterns are considered warnings:

```js
function example () {
  UserModel.findAll().then(function() {
    console.log('ヤバい！！！！');
  });
}
```

```js
function example () {
  return UserModel.findAll().then(function() {
    console.log('ヤバい！！！！');
  }).done();
}
```

The following patterns are not warnings:

```js
function example () {
  return UserModel.findAll().then(function() {
    console.log('ヤバい！！！！');
  });
}
```

```js
function example () {
  UserModel.findAll().then(function() {
    console.log('ヤバい！！！！');
  }).done();
}
```

## When Not To Use It

You don't need to use this when you are not dealing with Promise chains, or when you are [properly handling potentially unhandled rejections](https://github.com/petkaantonov/bluebird/blob/master/API.md#global-rejection-events).


## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
