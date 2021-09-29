import { config } from '../config'
import { GiphyResponse } from './models'
import { GET } from '../helpers/http'

export async function getRandomGIF(tag: string): Promise<string> | never {
    const query = new URLSearchParams({
        api_key: config.giphy.apiKey,
        rating: 'pg',
        tag,
    })

    try {
        const resp = await GET(`${config.giphy.baseURL}${config.giphy.randomGIFPath}`, query)
        const giphyRes = resp.body as GiphyResponse

        return giphyRes.data.image_original_url
    } catch (err) {
        throw new Error('giphy error')
    }
}
