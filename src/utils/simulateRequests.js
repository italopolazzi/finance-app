async function simulateResolveRequest(resolveObject, milliseconds = 2000) {
    return new Promise((resolve, reject) => {
        try {
            const timeout = setTimeout(() => {
                resolve(resolveObject)
                clearTimeout(timeout)
            }, milliseconds);
        } catch (error) {
            reject(error)
        }
    })
}

async function simulateRejectRequest(rejectObject, milliseconds = 2000) {
    return new Promise((resolve, reject) => {
        try {
            const timeout = setTimeout(() => {
                clearTimeout(timeout)
                throw Error("")
            }, milliseconds);
        } catch (error) {
            reject(rejectObject)
        }
    })
}

export {
    simulateResolveRequest,
    simulateRejectRequest
}