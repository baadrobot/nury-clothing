import { AnyAction } from "redux";
 
// AC is any ActionCreator, just like T is any type
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
}

export function withMatcher<AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;
// ...args значит оно будет переведено в массив
export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;
export function withMatcher(actionCreator: Function) {
    // записываем в type тип объекта action который передали аргументом в эту ф-ию withMatcher
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
    return {type, payload};
}