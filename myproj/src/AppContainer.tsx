import { Provider } from "react-redux"
import store from "./redux/redux-store"
import { FC } from "react"
import { App } from "./App"

type PropsType = {}
const AppContainer: FC<PropsType> = () => {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }

  
export default AppContainer