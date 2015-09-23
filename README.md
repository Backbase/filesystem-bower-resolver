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

#### Usage Example

Add `filesystem-bower-resolver` to [.bowerrc](http://bower.io/docs/config/)

```
...
{
  "resolvers": [
    "filesystem-bower-resolver"
  ]
}
```

define your dependency in `bower.json` as file path:

```
"dependencies": {
    "dependency-that-depends-on-my-component-1.0.0": "0.1.2",
    "my-component": "./my-component-dir#100.0.0"
}
"resolutions": {
    "my-component": "100.0.0"
}
```

> be sure that `./my-component-dir/bower.json` contains `"version": "100.0.0"`  
> `1.0.0`, `0.1.2` and `100.0.0` are just examples, any valid semvers will work 

...and bower will install your local `./my-component-dir`
