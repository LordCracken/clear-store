declare type AppDispatch = typeof import('./').store.dispatch;
declare type RootState = ReturnType<typeof import('./').store.getState>;
