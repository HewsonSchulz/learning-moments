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

export const currentDate = () => {
    const date = new Date()
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export const updateStateObject = (setter, state, value) => {
    setter(prevState => ({
        ...prevState,
        [state]: value
    }))
}
