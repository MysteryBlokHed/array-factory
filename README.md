# webpack-ts-userscript-library

A template to create UserScript libraries using TypeScript and Webpack tested with Jest.

<!-- Info on how to use the template -->

## Difference between this and the original template

### Use case

This template should only be used if you're making a library for other UserScript developers.
Its Webpacked `.user.js` file adds exported members to a global object, letting them be used like this:

```typescript
// Use the exported hello function from the library
const { hello } = LibraryName
hello()
```

The template is also configured to be easily published to npm for developers that don't want to `@require` the library.

### Documentation

Documentation is generated with TypeDoc.
On GitLab repositories, the latest documentation is automatically built and hosted on GitLab Pages.

## Customizing the template

### Changing UserScript info

You can search for `webpack-ts-userscript-library` and `LibraryName` across the template's files to find what needs replacing.

The UserScript's name, description, version, and author are all retrieved from the project's `package.json`.
Anything else such as the site to match and the grants are changed from the [Webpack Config].

There's a call to `genBanner` that can be used to change the values added to the banner.
To add a single value, add a string key and value. To add multiple values for
the same key (eg. multiple `@match`'s), use an array as the value.

Example:

```javascript
const banner = genBanner({
  name: 'my-userscript',
  version: '0.1.0',
  match: ['*://example.com/*', 'https://*.foo.com/bar*'],
})

/* Above example becomes: */
// ==UserScript==
// @name        my-userscript
// @version     0.1.0
// @match       *://example.com/*
// @match       https://*.foo.com/bar*
// ==/UserScript==
```

### Creating a release commit

To create a commit for a release version, run `yarn release`.
This will build the UserScript normally alongside a minified version in production mode.
It then all files with `git add .`,
and prompt you to add a version to the commit message.
You can then create a new tag and release for your project.

Both minified and unminified versions are generated since some UserScript hosting sites don't allow minified scripts.
You can use the `.min.user.js` file when you're able to, and the normal `.user.js` file otherwise.

<!-- These instructions can be updated to fit your project's requirements -->

## Use

### In a Node project

To use in a Node project, add webpack-ts-userscript-library as a dependency.

```sh
# npm
npm install webpack-ts-userscript-library

# yarn
yarn add webpack-ts-userscript-library
```

You can then import and use functions:

```javascript
import { someFunction } from 'webpack-ts-userscript-library'
```

### In a normal UserScript

In a UserScript that isn't built with some build tool, you can `@require` the library:

```javascript
// @require     https://gitlab.com/MysteryBlokHed/webpack-ts-userscript-library/-/raw/main/webpack-ts-userscript-library.user.js
```

<!-- Make sure that this is true for your project -->

You can replace `main` with a specific release tag like `v0.1.0` to require a specific version:

```javascript
// @require     https://gitlab.com/MysteryBlokHed/webpack-ts-userscript-library/-/raw/v0.1.0/webpack-ts-userscript-library.user.js
```

Each release tag also has a minified version of the script available,
which can be used by changing the file extension to `.min.user.js`:

```javascript
// @require     https://gitlab.com/MysteryBlokHed/webpack-ts-userscript-library/-/raw/v0.1.0/webpack-ts-userscript-library.min.user.js
```

Functions are available on the global `LibraryName` object:

```javascript
const { someFunction } = LibraryName
```

#### Type declarations

The types included with the npm package still work when the library is `@require`'d.
Just add the types as a dev dependency for a Node project or install them globally.
With the package installed, include the following reference line somewhere in your TypeScript source file:

```typescript
/// <reference types="webpack-ts-userscript-library" />
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

This project was created from [a template](https://gitlab.com/MysteryBlokHed/webpack-ts-userscript-library)
licensed under the MIT license
([LICENSE](https://gitlab.com/MysteryBlokHed/webpack-ts-userscript-library/-/blob/main/LICENSE)
or <http://opensource.org/licenses/MIT>).

[webpack config]: webpack.config.js
