const https = require('https')

const parseJson = (string) => {
    try {
        return JSON.parse(string)
    } catch (e) {
        return {
            error: JSON.stringify(e)
        }
    }
}

const httpsGetData = (url, params) => {
    const options = {
        host: 'bronkz.app',
        port: 443,
        path: `/api-ws${url}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (params?.query) options.path += params.query

    let data = ''

    return new Promise((resolve, reject) => {
        try {
            https.get(options, (res) => {
                res.setEncoding('utf-8')
                res.on('data', (chunk) => {
                    data += chunk
                })
                res.on('end', () => {
                    resolve(data)
                })
            })
        } catch (e) {
            console.log('httpsGetData error', e)
            reject()
        }
    })
}

const httpsPostData = (url, body) => {
    // const postData = JSON.stringify(body)
    // const options = {
    //     hostname: 'bronkz.app',
    //     port: 443,
    //     path: `/api-ws${url}`,
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': Buffer.byteLength(postData)
    //     }
    // };
    //
    // const req = https.request(options, (res) => {
    //     res.on('data', (d) => {
    //         process.stdout.write(d)
    //     })
    // })
    //
    // req.on('error', (e) => {
    //     console.log('httpsPostData error', e);
    // })
    //
    // req.write(postData)
    // req.end()

    const postData = JSON.stringify(body);

    const options = {
        hostname: 'bronkz.app',
        port: 443,
        path: `/api-ws${url}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
        },
    };

    const req = https.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

// Write data to request body
    req.write(postData);
    req.end();
}

module.exports = { parseJson, httpsGetData, httpsPostData }
