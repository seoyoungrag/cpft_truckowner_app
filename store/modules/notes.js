import { ajax } from "rxjs/observable/dom/ajax";
import { of } from "rxjs";
import { map, mergeMap, catchError, withLatestFrom } from "rxjs/operators";
import { ofType } from "redux-observable";

const CHANGE_NOTE_INPUT = "notes/CHANGE_NOTE_INPUT";

const ADD_NOTE = "notes/ADD_NOTE";
const ADD_NOTE_SUCCESS = "notes/ADD_NOTE_SUCCESS";
const ADD_NOTE_FAILURE = "notes/ADD_NOTE_FAILURE";

const GET_NOTES = "notes/GET_NOTE";
const GET_NOTES_FAILURE = "notes/GET_NOTES_FAILURE";
const GET_NOTES_SUCCESS = "notes/GET_NOTES_SUCCESS";

const TOGGLE_NOTE = "notes/TOGGLE_NOTE";

const UPDATE_NOTE = "notes/UPDATE_NOTE";
const UPDATE_NOTE_SUCCESS = "notes/UPDATE_NOTE_SUCCESS";
const UPDATE_NOTE_FAILURE = "notes/UPDATE_NOTE_FAILURE";

const DELETE_NOTE = "notes/DELETE_NOTE";
const DELETE_NOTE_SUCCESS = "notes/DELETE_NOTE_SUCCESS";
const DELETE_NOTE_FAILURE = "notes/DELETE_NOTE_FAILURE";

export const updateNote = () => ({
  type: UPDATE_NOTE,
});
export const updateNoteSuccess = ({ note }) => ({
  type: UPDATE_NOTE_SUCCESS,
  payload: {
    note,
  },
});
export const updateNoteFailure = (error) => ({
  type: UPDATE_NOTE_FAILURE,
  payload: {
    error,
  },
});

export const changeNoteInput = ({ value }, isEditing) => ({
  type: CHANGE_NOTE_INPUT,
  payload: { value, isEditing },
});
export const toggleNote = ({ id, text }) => ({
  type: TOGGLE_NOTE,
  payload: {
    id,
    text,
  },
});

export const addNote = () => ({
  type: ADD_NOTE,
});

export const addNoteSuccess = (note) => ({
  type: ADD_NOTE_SUCCESS,
  payload: {
    note,
  },
});
export const addNoteFailure = (error) => ({
  type: ADD_NOTE_FAILURE,
  payload: {
    error,
  },
});

export const getNotes = () => ({
  type: GET_NOTES,
});
export const getNotesSuccess = ({ notes }) => ({
  type: GET_NOTES_SUCCESS,
  payload: {
    notes,
  },
});
export const getNotesFailure = (error) => ({
  type: GET_NOTES_FAILURE,
  payload: {
    error,
  },
});

export const deleteNote = ({ id }) => ({
  type: DELETE_NOTE,
  payload: {
    id,
  },
});
export const deleteNoteSuccess = ({ id }) => ({
  type: DELETE_NOTE_SUCCESS,
  payload: {
    id,
  },
});
export const deleteNoteFailure = (error) => ({
  type: DELETE_NOTE_FAILURE,
  payload: {
    error,
  },
});
const getNotesEpic = (action$, state$) => {
  return action$.pipe(
    ofType(GET_NOTES),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      // localStorage의 userInfo를 JSON.parse를 통해 string을 JSON화 시킨후 token값만 가져옵니다.
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      // 헤더에 Authroization을 토큰값과 함께 넣어줍니다.
      return ajax
        .get(`/api/notes/`, {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        })
        .pipe(
          map((response) => {
            const notes = response.response;
            return getNotesSuccess({ notes });
          }),
          catchError((error) =>
            of({
              type: GET_NOTES_FAILURE,
              payload: error,
              error: true,
            })
          )
        );
    })
  );
};

const deleteNoteEpic = (action$, state$) => {
  return action$.pipe(
    ofType(DELETE_NOTE),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const token = localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo")).token
        : null;
      return ajax
        .delete(`/api/notes/${action.payload.id}/`, {
          "Content-Type": "application/json",
          Authorization: `token ${token}`,
        })
        .pipe(
          map((response) => {
            return deleteNoteSuccess({ id: action.payload.id });
          }),
          catchError((error) =>
            of({
              type: DELETE_NOTE_FAILURE,
              payload: error,
              error: true,
            })
          )
        );
    })
  );
};
const addNoteEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_NOTE),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return ajax.post(`/api/notes/`, { text: state.notes.noteInput }).pipe(
        map((response) => {
          const note = response.response;
          return addNoteSuccess(note);
        }),
        catchError((error) =>
          of({
            type: ADD_NOTE_FAILURE,
            payload: error,
            error: true,
          })
        )
      );
    })
  );
};

const updateNoteEpic = (action$, state$) => {
  return action$.pipe(
    ofType(UPDATE_NOTE),
    withLatestFrom(state$),

    mergeMap(([action, state]) => {
      return ajax
        .patch(`/api/notes/${state.notes.editing.id}/`, {
          text: state.notes.editing.text,
        })
        .pipe(
          map((response) => {
            const note = response.response;
            return updateNoteSuccess({ note });
          }),
          catchError((error) =>
            of({
              type: UPDATE_NOTE_FAILURE,
              payload: error,
              error: true,
            })
          )
        );
    })
  );
};

const initialState = {
  noteInput: "",
  notes: [],
  // 에러 관련 state 등록.
  error: {
    triggered: false,
    message: "",
  },
  // 수정하는 노트아이템을 표시하는 state 추가.
  editing: {
    id: null,
    text: "",
  },
};
export const notes = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_NOTE_INPUT:
      return {
        ...state,
        noteInput: action.payload.value,
      };
    case ADD_NOTE_SUCCESS:
      const { note } = action.payload;
      return {
        ...state,
        notes: [note].concat(state.notes),
        noteInput: "",
        // 성공시 에러 초기화.
        error: {
          triggered: false,
          message: "",
        },
      };
    case ADD_NOTE_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: "Error! Please Try With Unempty Note",
        },
      };
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload.notes.results,
      };

    case GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload.notes,
      };
    case GET_NOTES_FAILURE:
      return {
        ...state,
        error: {
          triggered: true,
          message: "Error! Please Try Again!",
        },
      };
    case TOGGLE_NOTE:
      return {
        ...state,
        editing: {
          id: parseInt(action.payload.id, 10),
          note: action.payload.text,
        },
      };

    case CHANGE_NOTE_INPUT:
      if (action.payload.isEditing) {
        return {
          ...state,
          editing: {
            ...state.editing,
            text: action.payload.value,
          },
        };
      }
      return {
        ...state,
        noteInput: action.payload.value,
      };
    case UPDATE_NOTE_SUCCESS:
      const { id, text } = action.payload.note;
      let notes = state.notes;
      let index = notes.findIndex((note, i) => {
        return note.id === id;
      });
      notes[parseInt(index, 10)] = {
        id,
        text,
      };
      return {
        ...state,
        editing: {
          id: null,
          note: "",
        },
        notes,
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export const notesEpics = {
  addNoteEpic,
  getNotesEpic,
  updateNoteEpic,
  deleteNoteEpic,
};
