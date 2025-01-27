// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { initFormatters } from './formatters-template.actual'
import type { Locales, Translations } from './types.actual'
import { loadedFormatters, loadedLocales, locales } from './util.actual'

import en_us from './en-us'
import de_at from './de_at'
import it from './it'
import de from './de'

import en_us_test from './en-us/test'
import en_us_some_other_namespace from './en-us/some-other_namespace'
import de_at_test from './de_at/test'
import de_at_some_other_namespace from './de_at/some-other_namespace'
import it_test from './it/test'
import it_some_other_namespace from './it/some-other_namespace'
import de_test from './de/test'
import de_some_other_namespace from './de/some-other_namespace'

const localeTranslations = {
	'en-us': {
		...en_us,
		test: en_us_test,
		'some-other_namespace': en_us_some_other_namespace
	},
	de_at: {
		...de_at,
		test: de_at_test,
		'some-other_namespace': de_at_some_other_namespace
	},
	it: {
		...it,
		test: it_test,
		'some-other_namespace': it_some_other_namespace
	},
	de: {
		...de,
		test: de_test,
		'some-other_namespace': de_some_other_namespace
	},
}

export const loadLocale = (locale: Locales): void => {
	if (loadedLocales[locale]) return

	loadedLocales[locale] = localeTranslations[locale] as unknown as Translations
	loadFormatters(locale)
}

export const loadAllLocales = (): void => locales.forEach(loadLocale)

export const loadFormatters = (locale: Locales): void => {
	loadedFormatters[locale] = initFormatters(locale)
}
