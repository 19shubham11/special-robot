import assert from 'assert'
import nock from 'nock'

import * as gif from './api'
import { Config } from '../config'
import { GiphyResponse } from './models'

describe('getRandomGIF', () => {
    afterEach(nock.cleanAll)

    const mockConf: Config = {
        giphy: {
            baseURL: 'http://giphy/something',
            randomGIFPath: '/random',
            apiKey: 'lol',
        },
    }

    const giphyAPI = gif.api(mockConf, 'g')

    it('should return a url if giphy returns 200', async () => {
        const mockURL = 'https://mocked-gif-url'
        const mockResp: GiphyResponse = {
            data: {
                type: 'gif',
                image_original_url: mockURL,
                id: 'fdfdd',
                title: 'Mock Gif!',
            },
        }

        nock(mockConf.giphy.baseURL).persist().get(mockConf.giphy.randomGIFPath).query(true).reply(200, mockResp)

        const url = await giphyAPI.getRandomGIF('fun')
        assert.strictEqual(url, mockURL)
    })

    it('should throw if giphy returns 40x', async () => {
        nock(mockConf.giphy.baseURL).persist().get(mockConf.giphy.randomGIFPath).query(true).reply(400)

        await assert.rejects(giphyAPI.getRandomGIF('fun'), (err: Error) => {
            assert.match(err.message, /giphy error/)
            return true
        })
    })
})
