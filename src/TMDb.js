
class TMDb {

    constructor(APIkey) {
        if (!APIkey) throw new Error('API key is not exists.')
        
        console.log(`Documentation: https://developers.themoviedb.org/3/getting-started/introduction`)

        this._APIkey = APIkey
        this._target = 'https://api.themoviedb.org/3'
        this._imagesStorage = 'https://image.tmdb.org/t/p/'
    }

    getImgPath(url, format = 'original') {
        return this._imagesStorage + format + url
    }

    toQueryString(options) {

        if (!options) return `?api_key=${this._APIkey}`;

        let query = []
        options.api_key = this._APIkey

        for (let key in options) {
            query.push(`${encodeURI(key)}=${encodeURI(options[key])}`)
        }

        return '?' + query.join('&')
    }

    resolveURL(url, options) {
        return this._target + url + this.toQueryString(options)
    }

    Request(url, options) {
        
        return new Promise((resolve, reject) => {   

            let xhr = new XMLHttpRequest()
            let method, body

            if (options && options.method && options.body) {
                method = options.method.toUpperCase()
                body = options.body
                delete options.method
                delete options.body
            } else method = 'GET'
            
            xhr.open(method, this.resolveURL(url, options), true)

            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    let error = new Error(xhr.statusText)
                    error.code = xhr.status
                    reject(error)
                }
            }

            xhr.onerror = () => {
                reject(new Error('Request error.'))
            }

            xhr.send(body)
        })
    }
}
export default TMDb