import { createStore } from 'redux';

// 로컬 스토리지에서 상태값을 불러오는 함수
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        // console.error('Failed to load state from local storage:', error);
        return undefined; 
    }
};

// 리듀서 함수
function reducer(state = { number: 0 }, action) {
    switch (action.type) {
        case 'HOME':
            return { ...state, number: 0 };
        case 'LOGIN':
            return { ...state, number: 1 };
        case 'JOIN':
            return { ...state, number: 2 };
        case 'SEARCH_ID':
            return { ...state, number: 3 };
        case 'SEARCH_PWD':
            return { ...state, number: 4 };
        case 'CHANGE_PWD':
            return { ...state, number: action.payload.number, userId: action.payload.userId };
        case 'WELCOME':
            return { ...state, number: action.payload.number, userId: action.payload.userId };
        case 'FIRST_QUESTION':
            return { ...state, number: action.payload.number, userId: action.payload.userId };
        case 'AFTER_LOGIN':
            return { ...state, number: 7 };
        case 'MYPAGE':
            return { ...state, number: 8 };
        case 'BOARD_POST':
            return { ...state, number: 9 };
        case 'DELETE_ANIMATION':
            return { ...state, number: 11 };
        default:
            return state;
    }
}

// 초기 상태를 불러오기
const initialState = loadStateFromLocalStorage();

// 리덕스 스토어를 생성
const store = createStore(reducer, initialState);

// 상태값이 변경될 때마다 로컬 스토리지에 저장
store.subscribe(() => {
    const state = store.getState();
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (error) {
        // console.error('Failed to save state to local storage:', error);
    }
});

export const clearLocalStorage = () => {
    try {
        localStorage.removeItem('reduxState');
    } catch (error) {
        // console.error('Failed to remove item from local storage:', error);
    }
};

export default store;