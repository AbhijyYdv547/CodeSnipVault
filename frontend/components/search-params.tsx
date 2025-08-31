import { parseAsFloat, createLoader, parseAsString, parseAsInteger } from 'nuqs/server'

export const coordinatesSearchParams = {
    search: parseAsString.withDefault(""),
    perPage: parseAsFloat.withDefault(0),
    offset: parseAsInteger.withDefault(1),
}

export const loadSearchParams = createLoader(coordinatesSearchParams)