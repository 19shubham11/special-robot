import { Config } from '../config'
import { GiphyResponse } from './models'
import * as http from '../helpers/http'

type ContentRating = 'g' | 'pg' | 'pg13' | 'r'

export interface API {
    getRandomGIF(tag: string): Promise<string> | never
}

export function api(config: Config, rating: ContentRating): API {
    async function getRandomGIF(tag: string): Promise<string> | never {
        const query = new URLSearchParams({
            api_key: config.giphy.apiKey,
            rating,
            tag,
        })

        try {
            const resp = await http.GET(`${config.giphy.baseURL}${config.giphy.randomGIFPath}`, query)
            const giphyRes = resp.body as GiphyResponse

            return giphyRes.data.image_original_url
        } catch (err) {
            throw new Error('giphy error')
        }
    }

    return { getRandomGIF }
}
