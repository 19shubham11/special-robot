import got, { OptionsOfJSONResponseBody } from 'got'

export function GET(url: string, queryParams: URLSearchParams = new URLSearchParams()) {
    const requestURL = `${url}?${queryParams}`

    const options: OptionsOfJSONResponseBody = {
        responseType: 'json',
    }
    return got.get(requestURL, options)
}
