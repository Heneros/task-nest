export const AUTH_CONTROLLER = 'auth' as const;

export const AUTH_ROUTER = {
  REGISTRATION: '',
  LOGIN: '',
  LOGOUT: '',
  UPDATE: '',
  GET_ID: '',
  GET_ALL: '',
  DELETE_USER: ':userId/delete',
};

export const NOTES_CONTROLLER = 'notes' as const;

export const NOTES_ROUTER = {
  CREATE: '',
  UPDATE: '',
  DELETE: '',
  GET_ID: ':notesId/',
  GET_ALL: '',
};
