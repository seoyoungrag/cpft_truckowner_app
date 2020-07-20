import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import { rootReducers, rootEpics } from "./modules";

const epicMiddleware = createEpicMiddleware();

export default createStore(rootReducers, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpics);
