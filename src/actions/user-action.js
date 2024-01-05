// src/store/actions/userActions.js
import { createAction } from '@reduxjs/toolkit';

export const setUser = createAction('user/setUser');
export const setLoading = createAction('user/setLoading');
export const logout = createAction('user/logout');
