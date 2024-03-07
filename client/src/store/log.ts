const log = (store) => (next) => (action) => {
  console.log(store)
  next(action)
}

export default log
