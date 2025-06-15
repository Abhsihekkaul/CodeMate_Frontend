import { BrowserRouter, Route, Routes } from "react-router"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import AppStore from "./utils/AppStore"
import Feed from "./components/Feed"

function App() {

  return (
    <>
    <Provider store={AppStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>} >
            <Route path="/" element={<Feed/>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/Connections" element={<Profile />}/>
          </Route>

        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
