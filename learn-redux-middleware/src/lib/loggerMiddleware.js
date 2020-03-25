const loggerMiddleware = store => next => action => {
  //미들웨어 기본구조
  console.group(action && action.type);
  console.log("이전 상태", store.getState());
  console.log("액션", action);
  next(action);
  console.log("다음상태", store.getState());
  console.groupEnd();
};

export default loggerMiddleware;
