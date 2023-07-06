const defaultState = {
    num: 10,
    formData: {}
}

interface actionRes {
    type: string
    val: any
}

let reducer = (state = defaultState, action: actionRes) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case 'addFormData':
            console.log(action.val)
            newState.formData = action.val
            console.log(newState)
            break
    }
    return newState
}

export default reducer