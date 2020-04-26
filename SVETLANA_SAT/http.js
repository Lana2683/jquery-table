class Http {
    get(url, ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => 
                fetch(url)
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err)), ms)
        })   
    }

    post(url,ms, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => 
                fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err)), ms)
        })   
    }

    put(url, ms, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => 
                fetch(url, {
                            method: 'PUT',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                .then(res => res.json())
                .then(data => resolve(data))
                .catch(err => reject(err)), ms)
        })   
    }

    delete(url, ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => 
                fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json'
                            }
                        })
                .then(res => res.json())
                .then(() => resolve('Deleted'))
                .catch(err => reject(err)), ms)
        })   
    }
}
