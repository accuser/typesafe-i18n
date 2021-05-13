# :earth_africa: typesafe-i18n

**An opinionated, fully type-safe, lightweight localization library for TypeScript projects with no external dependencies.**

<img src="https://raw.githubusercontent.com/ivanhofer/typesafe-i18n/master/docs/typesafe-i18n-demo.gif" width="100%">

[![npm version](https://badgen.net/npm/v/typesafe-i18n)](https://badgen.net/npm/v/typesafe-i18n)
[![types included](https://badgen.net/npm/types/typesafe-i18n)](https://badgen.net/npm/types/typesafe-i18n)
[![bundlse size](https://badgen.net/bundlephobia/minzip/typesafe-i18n)](https://badgen.net/bundlephobia/minzip/typesafe-i18n)
[![bump version & publish to npm](https://github.com/ivanhofer/typesafe-i18n/actions/workflows/release.yml/badge.svg?branch=master)](https://github.com/ivanhofer/typesafe-i18n/actions/workflows/release.yml)


## Advantages

:baby_chick: [lightweight](#sizes)\
:ok_hand: [easy to use syntax](#syntax)\
:running: [fast and efficient](#performance)\
:speech_balloon: [supports plural rules](#plural)\
:twisted_rightwards_arrows: allows [formatting of values](#formatters) e.g. locale-dependent date or number formats\
:muscle: can be used for [frontend, backend and API](#usage) projects\
:safety_vest: [prevents you from making mistakes](#typesafety)\
:no_entry: no external dependencies


<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Typesafety](#typesafety)
- [Syntax](#syntax)
- [formatters](#formatters)
- [Sizes](#sizes)
- [Performance](#performance)



<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->

## Installation

```
$ npm install --save typesafe-i18n
```


<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->

## Usage

> The package can be used inside JavaScript and TypeScript applications, but you will get a lot of benefits using it together with TypeScript, since the [watcher](#typesafety) will generate a few wrappers for easier usage.

You can use `typesafe-i18n` in a variety of project-setups:

 - [Node.js](https://github.com/ivanhofer/typesafe-i18n/tree/master/examples/node) apis, backends, scripts, ...
 - [Svelte/Sapper/SvelteKit](https://github.com/ivanhofer/typesafe-i18n/tree/master/examples/svelte) applications
 - [React](https://github.com/ivanhofer/typesafe-i18n/tree/master/examples/react) applications
 - [Browser](https://github.com/ivanhofer/typesafe-i18n/tree/master/examples/browser) projects
 - [other frameworks](#other-frameworks) like React, VueJS, Angular and others ...

### General

The `typesafe-i18n` package exports a few different objects you can use to localize your applications:

 - [i18nString (LLL)](#i18nString)
 - [i18nObject (LL)](#i18nObject)
 - [i18n (L)](#i18n)

In order to get full typechecking support, you sould use the exported functions in `i18n-utils.ts` generated by the [watcher](#typesafety). It contains fully typed wrappers for the following core functionalities.

#### i18nString

The `i18nString` contains the core of the localization engine. To initialize it, you need to pass your desired `locale` and the `formatters` (optional) you want to use.\
You will get an object back that can be used to transform your translation strings.

```typescript
import { i18nString } from 'typesafe-i18n'

const locale = 'en'
const formatters = {
   uppercase: (value) => value.toUpperCase()
}

const LLL = i18nString(locale, formatters)

LLL('Hello {name|uppercase}!', { name: 'world' }) // => 'Hello WORLD!'
```

#### i18nObject

The `i18nObject` wraps your translations for a certain locale. To initialize it, you need to pass your desired `locale`, your `translations`-object and the `formatters` (optional) you want to use.\
You will get an object back that can be used to access and apply your translations.

```typescript
import { i18nObject } from 'typesafe-i18n'

const locale = 'en'
const translations = {
   HI: "Hello {name}!",
   RESET_PASSWORD: "reset password"
   /* ... */
}
const formatters = { /* ... */ }

const LL = i18nObject(locale, translations, formatters)

LL.HI({ name: 'world' }) // => 'Hello world!'
LL.RESET_PASSWORD() // => 'reset password'
```

#### i18n

Wrap all your locales with `i18n`. To initialize it, you need to pass a callback to get the `translations`-object for a given locale and a callback to initialize the `formatters` you want to use (optional).\
You will get an object back that can be used to access all your locales and apply your translations.


```typescript
import { i18n } from 'typesafe-i18n'

const localeTranslations = {
   en: { TODAY: "Today is {date|weekday}" },
   de: { TODAY: "Heute ist {date|weekday}" },
   it: { TODAY: "Oggi è {date|weekday}" },
}

const loadLocale = (locale) => localeTranslations[locale]

const initFormatters = (locale) => {
   const dateFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' })

   return {
      weekday: (value) => dateFormatter.format(value)
   }
}

const L = i18n(loadLocale, initFormatters)

const now = new Date()

L.en.TODAY({ date: now }) // => 'Today is friday'
L.de.TODAY({ date: now }) // => 'Heute ist Freitag'
L.it.TODAY({ date: now }) // => 'Oggi è venerdì'

```

A good usecase for this object could be inside your API, when your locale is dynamic e.g. derived from a users session:

```typescript
function doSomething(session) {

   /* ... */

   const locale = session.language
   return L[locale].SUCCESS_MESSAGE()
}

```

### Other frameworks

All you need is inside the [generated](#typesafety) file `i18n-utils.ts`. You can use the functions in there to create a small wrapper for your application.

> Feel free to open an [issue](https://github.com/ivanhofer/typesafe-i18n/issues), if you need a guide for a specific framework.



<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->

## Typesafety

The `typesafe-i18n` package allows us to be 100% typesafe for our tranlsation functions and even the translations for other locales itself. It generates TypeScript definitions based on your base locale. Here you can see some examples where the generated types can help you:

#### typesafe auto-completion for all your defined locales
![typesafe locales completion](https://raw.githubusercontent.com/ivanhofer/typesafe-i18n/master/docs/01_typesafe-locales-completion.png)

#### typesafe auto-completion for all available translations
![typesafe translation key completion](https://raw.githubusercontent.com/ivanhofer/typesafe-i18n/master/docs/02_typesafe-key-completion.png)

#### you will get an error if you forget to pass arguments
![typesafe number of arguments](https://raw.githubusercontent.com/ivanhofer/typesafe-i18n/master/docs/03_typesafe-nr-of-arguments.png)

#### you will get an error if you pass the wrong type arguments
![typesafe arguments 1](https://raw.githubusercontent.com/ivanhofer/typesafe-i18n/master/docs/04_typesafe-arguments.png)
![typesafe arguments 2](https://raw.githubusercontent.com/ivanhofer/typesafe-i18n/master/docs/04_typesafe-arguments-2.png)

#### you will get an error if you forgot to add a translation in a locale
![typesafe keys in translations](https://raw.githubusercontent.com/ivanhofer/typesafe-i18n/master/docs/05_typesafe-keys-in-translations.png)

#### you will get an error when a translation is missing an argument
![typesafe arguments in translation](https://raw.githubusercontent.com/ivanhofer/typesafe-i18n/master/docs/06_typesafe-arguments-in-translation.png)


In order to get get full typesafety for your locales, you can start the watcher during development. The watcher listens for changes you make to your [base locale file](#folder-structure) and generates the corresponding TypeScript types.

Make sure you have installed `node` version `> 12.x` and are using a `typescript` version `> 3.x.x`.

 > The watcher will generate a different output depending on your TypeScript version. Older versions don't support all the features `typesafe-i18n` need to provide you with the best types. Make sure to use a TypeScript version `> 4.1.x` to benefit from all the typechecking features.

You can choose between two variants to run the watcher:

- as a [rollup-plugin](#rollup-plugin)
- as a [webpack-plugin](#webpack-plugin)
- as a [node-process](#node-process)

### rollup-plugin

If you are already using `rollup` as your bundler, you can add the `typesafeI18n`-Plugin to your `rollup.config.js`.

```typescript
import typesafeI18n from 'typesafe-i18n/rollup/rollup-plugin-typesafe-i18n'

export default {
   input: ...,
   output: ...,
   plugins: {
		...
      typescript(),

      // looks for changes in your base locale file in development mode & optimizes code in production mode
      typesafeI18n({ /* options go here */ })
   }
}
```

You can pass [options](#options) to the watcher by creating a `.typesafe-i18n.json` file in the root of your workspace, or by passing it as an argument to the `typesafeI18n` plugin.

The rollup plugin has an advantage over the node-process, since it can also be used to optimize the translations.

Currently implemented optimizations:

 - get rid of the arguments type informations inside your base-translation:\
   These types inside your base translations e.g. `Hello {name:string}!` are only used from the watcher to generate types for your translation. The rollup plugin removes these types from the translations in order to reduce bundle size by a few bytes. The example above will be optimized to `Hello {name}!` inside your production bundle.
 - include only certain locales:\
	If you want to create an own bundle per locale. When running rollup to create your production-bundle, you can specify the `'locales'` [option](#options) to include only certain locales. The rollup plugin will remove all other locales from the production bundle.

More [optimizations](#performance) will follow.


### webpack-plugin

If you are already using `webpack` as your bundler, you can add the `TypesafeI18nPlugin` to your `webpack.config.js`.

```typescript
const TypesafeI18nPlugin = require('typesafe-i18n/webpack/webpack-plugin-typesafe-i18n').default

module.exports = {
   entry: ...,
   module: ...,
   output: ...,
   plugins: [
      ...
      // looks for changes in your base locale file in development mode
      new TypesafeI18nPlugin({ /* options go here */ })
   ],
}
```

You can pass [options](#options) to the watcher by creating a `.typesafe-i18n.json` file in the root of your workspace, or by passing it as an argument to the constructor of `TypesafeI18nPlugin`.


### node-process

> This is the fallback option for all developers who aren't using rollup or webpack. Use this option if you bundle your application via parcel, esbuild etc. or if you don't use a bundler at all.

Start the watcher node process in your terminal:

```bash
> npx typesafe-i18n
```

or define a script in your `package.json` file:

```json
{
   "scripts": {
      "typesafe-i18n-watcher": "typesafe-i18n"
   }
}
```

Passing [options](#options) to the watcher is possible by creating a `.typesafe-i18n.json` file in the root of your workspace e.g.

```json
{
   "$schema": "https://unpkg.com/typesafe-i18n/schema/typesafe-i18n.json",

   "baseLocale": "de",
   "adapter": "svelte"
}
```

> You could use a npm-package like `npm-run-all` in order to start the watcher and you development-server in parallel.

Take a look at this [demo repository](https://github.com/ivanhofer/typesafe-i18n/tree/master/examples/node) to see how to run the watcher node process.



### folder structure

This project requires you to use an opinionated folder structure for your locales. All your localization files are located inside the `src/i18n` folder.

When running the watcher for the first time, a few files will be generated:

```
src/
   i18n/
      en/
         index.ts
      custom-types.ts
      formatters.ts
      i18n-types.ts
      i18n-util.ts
```

 > Some files are auto-generated on every change of your base locale file; please don't make manual changes to them, since they will be overwritten.

 - `en/index.ts`\
  	If 'en' is your [base locale](#baselocale), the file `src/i18n/en/index.ts` will contain your translations. Whenever you make changes to this file, the watcher will generate updated type definitions.

 - `custom-types.ts`\
	To [defining types](#custom-types) that are unknown to `typesafe-i18n`.

 - `formatters.ts`\
	In this file, you can configure the [formatters](#formatters) to use inside your translations.

 - `i18n-types.ts`\
	Type definitions are generated in this file. You don't have to understand them. They are just here to help TypeScript understand, how you need to call the translation functions.

 - `i18n-util.ts`\
   This file contains wrappers with type-informations around the [base i18n functions](#general).


### locales

Locales must follow a specific file pattern. For each locale, you have to create a folder with the name of the locale inside your `src/i18n` folder e.g. 'en', 'en-us', 'en-GB'. The name of the folder is also the name of the locale you use inside your code. Each locales folder needs to have an `index.ts` file with a default export. The file should export an object with string key-values pairs and should look something like:

```javascript
import type { Translation } from '../i18n-types';

const de: Translation = {

   /* your translations go here */

}

export default de
```
 > make sure to give it the type of `Translation` to get compile-errors, when some translations are missing

### custom types

If you want to pass arguments with your own types to the translation function, you need to tell `typesafe-i18n` how these types look like. In order to do this, you need to create an export with the exact name of that type inside this file.

If you have a translation with e.g. the type `Sum`,

```javascript
const translations: BaseTranslation = {
   RESULT: 'The result is: {0:Sum|calculate}'
}
```

you need to export `Sum` as a type in your `custom-types.ts` file

```javascript
export type Sum = {
   n1: number
   n2: number
   n2: number
}
```

### Options

You can set options for the [watcher](#typesafety) in order to get optimized output for your specific project. The available options are:

| key                                                       | type                                                           | default value                                 |
| --------------------------------------------------------- | -------------------------------------------------------------- | --------------------------------------------- |
| [baseLocale](#baseLocale)                                 | `string`                                                       | `'en'`                                        |
| [locales](#locales)                                       | `string[]`                                                     | `[]`                                          |
| [loadLocalesAsync](#loadLocalesAsync)                     | `boolean`                                                      | `true`                                        |
| [adapter](#adapter)                                       | `'node'` &#124; `'svelte'` &#124; `'react'` &#124; `undefined` | `undefined`                                   |
| [outputPath](#outputPath)                                 | `string`                                                       | `'./src/i18n/'`                               |
| [typesFileName](#typesFileName)                           | `string`                                                       | `'i18n-types'`                                |
| [utilFileName](#utilFileName)                             | `string`                                                       | `'i18n-util'`                                 |
| [formattersTemplateFileName](#formattersTemplateFileName) | `string`                                                       | `'formatters'`                                |
| [typesTemplateFileName](#typesTemplateFileName)           | `string`                                                       | `'custom-types'`                              |
| [adapterFileName](#adapterFileName)                       | `string` &#124; `undefined`                                    | `undefined`                                   |
| [tempPath](#tempPath)                                     | `string`                                                       | `'./node_modules/typesafe-i18n/temp-output/'` |


### baseLocale

Defines which locale to use for the types generation. You can find more information on how to structure your locales [here](#locales).

### locales

Specifies the locales you want to use. This can be useful if you want to create an own bundle for each locale. If you want to include only certain locales, you need to set the locales you want to use. If empty, all locales will be used.

> Note: requires the usage of the [rollup-plugin](#rollup-plugin)

### loadLocalesAsync

Whether to generate code that loads the locales asynchronously. If set to `true`, a locale will be loaded, when you first access it. If set to `false` all locales will be loaded when you init the i18n-functions.

### adapter

If this config is set, code will be generated that wraps i18n functions into useful helpers for that environment e.g. a `svelte`-store.

### outputPath

Folder in which the files should be generated and where your locale files are located.

### typesFileName

Name for the file where the types for your locales are generated.

### utilFileName

Name for the file where the typesafe i18n-functions are generated.

### formattersTemplateFileName

Name for the file where you can configure your formatters.

### typesTemplateFileName

Name for the file where you can configure your custom-types.

### adapterFileName

Name for the file when generating output for an adapter. The default filename is `i18n-[adapter]`.

### tempPath

Folder where the watcher can store temporary files. These files are generated when your base locale is analyzed and the types are generated. The folder will be cleared, after the types were generated. So make sure you use an empty folder, if you change this option.



<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->

## Syntax

For more information about the `LLL` object, read the [usage](#i18nString) section.

<!-- ------------------------------------------------------------------------------------------ -->

### passing arguments:

 > Syntax: `{index}`

```typescript
const APPLES = '{0} apples'

LLL(APPLES, 12) // => '12 apples'
```

<!-- ------------------------------------------------------------------------------------------ -->

### passing multiple arguments:

```typescript
const FRUITS = '{0} apples and {1} bananas'

LLL(FRUITS, 3, 7) // => '3 apples and 7 bananas'
```

<!-- ------------------------------------------------------------------------------------------ -->

### passing keyed arguments:

 > Syntax: `{key}`

```typescript
const FRUITS = '{nrOfApples} apples and {nrOfBananas} bananas'

LLL(FRUITS, { nrOfApples: 3, nrOfBananas: 7 }) // => '3 apples and 7 bananas'
```

<!-- ------------------------------------------------------------------------------------------ -->

### plural:

 > Syntax: `{{singular|plural}}`

```typescript
const APPLES = '{nrOfApples} {{apple|apples}}'

LLL(APPLES, { nrOfApples: 1 }) // => '1 apple'
LLL(APPLES, { nrOfApples: 2 }) // => '2 apples'
```

<!-- ------------------------------------------------------------------------------------------ -->

### plural (shorthand):

 > Syntax: `{{plural}}`

```typescript
const APPLES = '{nrOfApples} apple{{s}}'

LLL(APPLES, { nrOfApples: 0 }) // => '0 apples'
LLL(APPLES, { nrOfApples: 1 }) // => '1 apple'
LLL(APPLES, { nrOfApples: 5 }) // => '5 apples'
```
<!-- ------------------------------------------------------------------------------------------ -->

### plural (shorthand for only singular version):

 > Syntax: `{{singular|}}`

```typescript
const MEMBERS = '{0} weitere{{s|}} Mitglied{{er}}'

LLL(MEMBERS, 0) // => '0 weitere Mitglieder'
LLL(MEMBERS, 1) // => '1 weiteres Mitglied'
LLL(MEMBERS, 9) // => '9 weitere Mitglieder'
```

### plural (zero, one, other):

 > Syntax: `{{zero|one|other}}`

```typescript
const LIST_ITEMS = 'The list includes {{ no items | an item | ?? items }}'

LLL(LIST_ITEMS, 0) // => 'The list includes no items'
LLL(LIST_ITEMS, 1) // => 'The list includes an item'
LLL(LIST_ITEMS, 12) // => 'The list includes 12 items'
```

### plural (inject passed argument):

 > Syntax: `{{singular|?? plural}}`

```typescript
const BANANAS = '{{ a banana | ?? bananas }}'

LLL(BANANAS, 1) // => 'a banana'
LLL(BANANAS, 3) // => '3 bananas'
```

### plural (full syntax):

Under the hood, `typesafe-i18n` uses the [Intl.PluralRules](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) for detecting the plural form.\
The only small modificatin made is, that the values `0` and `'0'` are always mapped to `'zero'` instead of `'other'`.

 > Syntax: `{{zero|one|two|few|many|other}}`

```typescript
// locale set to 'ar-EG'

const PLURAL = 'I have {{zero|one|two|a few|many|a lot}} apple{{s}}'

LLL(PLURAL, 0) // => 'I have zero apples'
LLL(PLURAL, 1) // => 'I have one apple'
LLL(PLURAL, 2) // => 'I have two apples'
LLL(PLURAL, 6) // => 'I have a few apples'
LLL(PLURAL, 18) // => 'I have many apples'
```


<!-- ------------------------------------------------------------------------------------------ -->


### format passed in arguments:

Read the [formatters](#formatters) section to learn how you can configure formatters.

```typescript
const now = Date.now()

LLL('Today is {date|weekday}', { date: now }) // => 'Today is Friday'
LLL('Heute ist {date|weekday}', { date: now }) // => 'Heute ist Freitag'
```

Allows also to format values by multiple formatters in row. The formatters will be called from left to right.

```typescript
const now = Date.now()

LLL('Today is {date|weekday}', { date: now }) // => 'Today is Friday'
LLL('Today is {date|weekday|uppercase}', { date: now }) // => 'Today is FRIDAY'
LLL('Today is {date|weekday|uppercase|shorten}', { date: now }) // => 'Today is FRI'
```


<!-- ------------------------------------------------------------------------------------------ -->

### typesafe nr of arguments:

For information about the `LL` object, read the [usage](#Usage) section.

```typescript
const translation = {
   HI: 'Hello {0}'
}

LL.HI() // => ERROR: Expected 1 arguments, but got 0.
LL.HI('John', 'Jane') // => ERROR: Expected 1 arguments, but got 2.
LL.HI('John') // => 'Hi John'
```

<!-- ------------------------------------------------------------------------------------------ -->

### typesafe arguments:

 > Syntax: `{key:type}`

```typescript
const translation = {
   HI: 'Hello {name:string}'
}

LL.HI('John') // => ERROR: Argument of type 'string' is not assignable to parameter of type '{ name: string; }'.
LL.HI({ name: 'John' }) // => 'Hi John'
```

#### everything together:

```typescript
const MESSAGE = 'Hi {name:string|uppercase}, I want to buy {nrOfApples:number} apple{{s}}'

LLL(MESSAGE, { name: 'John', nrOfApples: 42 }) // => 'Hi JOHN, I would like to buy 42 apples'

```

### text only:

Of course `typesafe-i18n` can handle that as well.

```typescript
LLL('Welcome to my site') // => 'Welcome to my site'
```

Or if you are using the [i18nObject (LL)](#i18nObject):

```html
<script>
   const translation = {
      LOGIN: 'login'
   }
<script>

<div>
   {LL.LOGIN()} <!-- => 'login' -->
</div>
```


<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->

## formatters

You can specify your own formatters, that take an argument as an input and returns another value.

```typescript
const formatters = {
   roiCalculator: (value) => {
      return (value * 4.2) - 7
   }
}

LLL('Invest ${0} and get ${0|roiCalculator} in return', 100)
// => 'Invest $100 and get $413 in return'
```

<!-- TODO: create examples for date-fns or other common formatters -->

You can also use a few builtin formatters:

 - date\
   A wrapper for [Intl.DateTimeFormat](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
	```typescript
	import { date } from 'typesafe-i18n/formatters'

	const formatters = {
	   weekday: date({ weekday: 'long' })
	}

	LLL('Today is {0|weekday}', new Date()) // => 'Today is friday'
	```
 - time\
  	A wrapper for [Intl.DateTimeFormat](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
	```typescript
	import { time } from 'typesafe-i18n/formatters'

	const formatters = {
	   timeShort: time('en', { timeStyle: 'short' })
	}

	LLL('Next meeting: {0|timeShort}', meetingTime) // => 'Next meeting: 8:00 AM'
	```
 - number\
  	A wrapper for [Intl.NumberFormat](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
	```typescript
	import { number } from 'tyoesafe-i18n/formatters'

	const formatters = {
	   currency: number('en', { style: 'currency', currency: 'EUR' })
	}

	LLL('your balance is {0|currency}', 12345) // => 'your balance is €12,345.00'
	```
 - replace
	A wrapper for [String.prototype.replace](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
	```typescript
	import { replace } from 'typesafe-i18n/formatters'

	const formatters = {
	   noSpaces: replace(' ', '-')
	}

	LLL('The link is: https://www.xyz.com/{0|noSpaces}', 'super cool product')
	// => 'The link is: https://www.xyz.com/super-cool-product'

	```
 - uppercase\
 	A wrapper for [String.prototype.toUpperCase](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
	```typescript
	import { uppercase } from 'typesafe-i18n/formatters'

	const formatters = {
	   upper: uppercase
	}

	LLL('I sayed: {0|upper}', 'hello') // => 'I sayed: HELLO'
	```
 - lowercase\
  	A wrapper for [String.prototype.toLowerCase](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
	```typescript
	import { lowercase } from 'typesafe-i18n/formatters'

	const formatters = {
	   lower: lowercase
	}

	LLL('He sayed: {0|lower}', 'SOMETHING') // => 'He sayed: something'
	```



<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->

## Sizes

The footprint of the `typesafe-i18n` package is smaller compared to other existing i18n packages. Most of the magic happens in development mode, where the watcher generates TypeScript definitions for your translations. This means, you don't have to ship the whole package to your users. The only two parts, that are needed in production are:

- string-parser: detects variables, formatters and plural-rules in your localized strings
- translation function: injects arguments, formattes them and finds the correct plural form for the given arguments

These parts are bundled into the [core functions](#general). The sizes of the core functionalities are:

- [i18nString](#i18nString): 804 bytes gzipped
- [i18nObject](#i18nObject): 858 bytes gzipped
- [i18n](#i18n): 962 bytes gzipped

Apart from that there can be a small overhead depending on which utilities and wrappers you use.

There also exists a useful wrapper for some frameworks:
- [typesafe-i18n svelte-store](https://github.com/ivanhofer/typesafe-i18n/tree/master/examples/svelte#usage-in-javascript-projects): 1102 bytes gzipped
- [typesafe-i18n react-context](https://github.com/ivanhofer/typesafe-i18n/tree/master/examples/react#usage-in-javascript-projects): 1081 bytes gzipped



<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->
<!-- ------------------------------------------------------------------------------------------ -->

## Performance

The package was optimized for performance:
 - **the amount of network traffic is kept small**\
   The translation functions are [small](#sizes). Only the locales that are currently used are [loaded](#loadLocalesAsync).
 - **no unecessary workload**\
   Parsing your translation file for variables and formatters will only be performed when you access a translation for the first time. The result of that parsing process will be stored in an optimized object and kept in memory.
 - **fast translations**\
	Passing variables to the [translation function](#usage) will be fast, because its treated like a simple string concatenation. For formatting values, a single function is called per [formatter](#formatters).

If you use `typesafe-i18n` you will get a smaller bundle compared to other i18n solutions. But that does't mean, we should stop there. There are planned some possible optimizations, to improve the bundle size even further:

 - [x] get rid of the arguments type informations inside your base-translation [#13](https://github.com/ivanhofer/typesafe-i18n/issues/13)
 - [ ] rewrite keyed to index-based arguments [#15](https://github.com/ivanhofer/typesafe-i18n/issues/15)
 - [ ] inline translations for single-locale bundles[#14](https://github.com/ivanhofer/typesafe-i18n/issues/14)
