export const fetchOptions = (method, body) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    return options
}
