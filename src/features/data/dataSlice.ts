import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import api from '../../lib/api'

const Responses: Responses = {
  users: {
    loading: false,
    errResp: {
      errMsg: ""
    },
    data: []
  },
  projects: {
    loading: false,
    errResp: {
      errMsg: ""
    },
    data: []
  },
}

export const dataReducer = createSlice({
  name: 'users',
  initialState: Responses,
  reducers: {
    startUsersLoading: state => {
      state.users.loading = true;
    },
    usersHaveError: (state, action) => {
      state.users.errResp = {
        errMsg: action.payload
      }
      state.users.loading = false;
    },
    usersSuccess: (state, action) => {
      state.users.data = action.payload;
      state.users.loading = false;
      state.users.errResp = {
        errMsg: ''
      }
    },
    startProjectsLoading: state => {
      state.projects.loading = true;
    },
    projectsHaveError: (state, action) => {
      state.projects.errResp = {
        errMsg: action.payload
      }
      state.projects.loading = false;
    },
    projectsSuccess: (state, action) => {
      state.projects.data = action.payload;
      state.projects.loading = false;
      state.projects.errResp = {
        errMsg: ''
      }
    },
  },
});

const { startUsersLoading, startProjectsLoading, usersHaveError, projectsHaveError, projectsSuccess, usersSuccess } = dataReducer.actions;

export const fetchAllData = (sort: Boolean, type: String) => {
  return async (dispatch: Dispatch) => {
    if (type.includes('users')) {
      dispatch(startUsersLoading());
      await api.getUsersDiff().then(({ data }) => {
        dispatch(usersSuccess(data));
      }).catch((err) => dispatch(usersHaveError(err)))
    }
    if (type.includes('projects')) {
      dispatch(startProjectsLoading());
      await api.getProjectsDiff().then(({ data }) => {
        dispatch(projectsSuccess(data));
      }).catch((err) => dispatch(projectsHaveError(err)))
    }
  }
}

export const reducer = dataReducer.reducer