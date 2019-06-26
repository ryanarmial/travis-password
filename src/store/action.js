import { SET_SEARCH, SET_EDITING } from './action-type';

export function set_search (payload) {
  return {
    type: SET_SEARCH,
    payload,
  }
}

export function set_editing (payload) {
  return {
    type: SET_EDITING,
    payload,
  }
}