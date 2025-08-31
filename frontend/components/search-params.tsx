import { parseAsFloat, createLoader, parseAsString } from 'nuqs/server'

export const coordinatesSearchParams = {
    search: parseAsString.withDefault(""),
    perPage: parseAsFloat.withDefault(0)
}

export const loadSearchParams = createLoader(coordinatesSearchParams)