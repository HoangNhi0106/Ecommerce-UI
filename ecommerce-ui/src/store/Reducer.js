export const SHOW_CONFIRM = 'SHOW_CONFIRM';
export const HIDE_CONFIRM = 'HIDE_CONFIRM';

export const initialState = {
    show: false,
    text: ''
};

export const ConfirmReducer = (initialState, action) => {
    switch (action.type) {
        case SHOW_CONFIRM:
            return {
                show: true,
                text: action.payload.text
            };
        case HIDE_CONFIRM:
            return {
                show: false,
                text: ''
            };
        default:
            return {
                show: false,
                text: ''
            };
    }
};

export default ConfirmReducer;