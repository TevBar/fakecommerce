// components/store/actions.ts
export const loginSuccess = (token: string | null) => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
});

export const logout = () => ({
    type: 'LOGOUT',
});
