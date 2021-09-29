interface GiphyConfig {
    baseURL: string
    randomGIFPath: string
    apiKey: string
}

export interface Config {
    giphy: GiphyConfig
}

function readEnvVars(name: string): string {
    const key = process.env[name]

    if (!key) {
        throw new Error(`Key ${name} does not exist`)
    }

    return key
}

const giphyConf: GiphyConfig = {
    baseURL: 'https://api.giphy.com',
    randomGIFPath: '/v1/gifs/random',
    apiKey: readEnvVars('GIPHY_KEY'),
}

export const config: Config = {
    giphy: giphyConf,
}
