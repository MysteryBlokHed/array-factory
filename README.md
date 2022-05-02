# array-factory

Array methods that only evaluate for each element when they're needed.

## Why to use

### Use case

If you have a large array and want to use array methods such as `map` or `filter`,
it might noticably slow down the page while it's in progress.
Using array-factory, each element is only checked with the function when it's actually needed.

```typescript
// Double every value in an array using map

// Normal map
// Entire array is mapped at once
const giantArray = Array(100_000_000).fill(2)
const mapped = giantArray.map(el => el * 2)

for (const value of giantArray) {
  console.log(value)
}

// Factory map
// One element is mapped at a time
const giantArray = Array(100_000_000).fill(2)
const mapped = giantArray.factoryMap(el => el * 2)

for (const value of giantArray) {
  console.log(value)
}
```

This is done with the use of ES6 generators.
Using the factory map code, the function `el => el * 2` is only run on each value
when that value is used.

### Refactoring old code

If you are interested in using array-factory, the change is as simple as importing the library
and replacing function calls with their factory versions.

```typescript
// Old
const abc = [1, 2, 3]

for (const value of abc.map(el => el * 2)) {
  console.log(value)
}

// New
import 'array-factory' // ES6
require('array-factory') // CommonJS

const abc = [1, 2, 3]

for (const value of abc.factoryMap(el => el * 2)) {
  console.log(value)
}
```

### Exported functions

Each factory function is also exported if you prefer to import each function instead.

```typescript
import { factoryMap } from 'array-factory' // ES6
const { factoryMap } = require('array-factory') // CommonJS

const abc = [1, 2, 3]

for (const value of factoryMap(abc, el => el * 2)) {
  console.log(value)
}
```

## Supported functions

| Original | Factory         |
| :------- | :-------------- |
| `map`    | `factoryMap`    |
| `filter` | `factoryFilter` |
| `flat`   | `factoryFlat`   |

All supported functions are both exported and added to Array prototypes.

## Use

### In a Node project

To use in a Node project, add array-factory as a dependency.

```sh
# npm
npm install array-factory

# yarn
yarn add array-factory
```

You can then import and use functions:

```javascript
import { factoryMap } from 'array-factory'
```

### In a normal UserScript

In a UserScript that isn't built with some build tool, you can `@require` the library:

```javascript
// @require     https://gitlab.com/MysteryBlokHed/array-factory/-/raw/main/array-factory.user.js
```

You can replace `main` with a specific release tag like `v0.1.0` to require a specific version:

```javascript
// @require     https://gitlab.com/MysteryBlokHed/array-factory/-/raw/v0.1.0/array-factory.user.js
```

Each release tag also has a minified version of the script available,
which can be used by changing the file extension to `.min.user.js`:

```javascript
// @require     https://gitlab.com/MysteryBlokHed/array-factory/-/raw/v0.1.0/array-factory.min.user.js
```

Functions are available on the global `ArrayFactory` object:

```javascript
const { factoryMap } = ArrayFactory
```

#### Type declarations

The types included with the npm package still work when the library is `@require`'d.
Just add the types as a dev dependency for a Node project or install them globally.
With the package installed, include the following reference line somewhere in your TypeScript source file:

```typescript
/// <reference types="array-factory" />
```

## Building

### Setup

Building this project requires Node.js and Yarn.
To install dependencies, run:

```sh
yarn install
```

### Build

To build the project, run:

```sh
yarn build
```

To automatically build when a source file is modified, run:

```sh
yarn dev
```

Built JS files and type declarations will be placed in the `lib/` directory,
and the UserScript will be placed in the root. The `package.json` file is configured
to publish files in the `lib/` directory to npm.

### Test

To test the project, run:

```sh
yarn test
```

This project uses Jest for tests.

## License

This project is licensed under either of

- Apache License, Version 2.0, ([LICENSE-APACHE](LICENSE-APACHE) or
  <http://www.apache.org/licenses/LICENSE-2.0>)
- MIT license ([LICENSE-MIT](LICENSE-MIT) or
  <http://opensource.org/licenses/MIT>)

at your option.

This project was created from [a template](https://gitlab.com/MysteryBlokHed/array-factory)
licensed under the MIT license
([LICENSE](https://gitlab.com/MysteryBlokHed/array-factory/-/blob/main/LICENSE)
or <http://opensource.org/licenses/MIT>).
