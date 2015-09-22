### filesystem-bower-resolver

Filesystem [pluggable Resolver](http://bower.io/docs/pluggable-resolvers/) for [bower](http://bower.io)

#### Requirements

* nodejs/npm
* bower v1.5+

#### Install

You can install it either globally:

```
npm install --global filesystem-bower-resolver
```

or add it as `devDependency` to your `package.json` file

#### Usage

Add `filesystem-bower-resolver` to [.bowerrc](http://bower.io/docs/config/)

```
...
{
  "resolvers": [
    "filesystem-bower-resolver"
  ]
}
```

define your dependency to `bower.json` as file path:

```
"dependencies": {
    "some-component": "1.0.0",
    "some-component": "./some-component"
},
"resolutions": {
    "some-component": "*"
}
```

...and bower will resolve to your local version of `some-component`
