export const generateOptions = (method, body) => {
    if (body !== undefined) {
        return {
            method,
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(body),
        }
    }

    return {
        method,
        headers: { 'Content-Type': 'application/json', }
    }
}
