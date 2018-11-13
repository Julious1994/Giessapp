
const joinURL = (baseURL, url) => {
    return `${baseURL}/${url}`;
}

const Headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
}

class Service {
    constructor() {
        this.baseURL = "https://shaufel.intern.elsdoerfer.com/tools/api";
    }

    request(url, method = 'POST', data = null) {
        url = joinURL(this.baseURL, url);
        const options = {
            headers: Headers,
            method,
        };
        if(data) {
            options.body = JSON.stringify({...data});
        }
        return fetch(url, options);
    }

    getAll(url, data = {}) {
        const method = "POST";
        this.request(url, data, method);
    }

    get(url) {
        const method = "GET";
        return this.request(url, method).then(res => res.json());
    }

    delete() {

    }
}

export default Service;
