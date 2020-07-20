import { notes, notesEpics } from "./notes";
import { codes, codesEpics } from "./codes";
import { auth, authEpics } from "./auth";
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

export const rootReducers = combineReducers({ codes, notes, auth });
export const rootEpics = combineEpics(
 codesEpics.getCodesEpic,
 notesEpics.addNoteEpic,
 notesEpics.getNotesEpic,
 notesEpics.updateNoteEpic,
 notesEpics.deleteNoteEpic,
 authEpics.loginEpic,
 authEpics.registerEpic,
 authEpics.checkUserEpic,
 authEpics.logoutEpic
);
