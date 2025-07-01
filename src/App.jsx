import { BrowserRouter, Route, Routes } from "react-router"
import Body from "./components/Body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import AppStore from "./utils/AppStore"
import Feed from "./components/Feed"
import EditProfile from "./components/EditProfile"
import SignUp from "./components/SignUp"
import Connections from "./components/Connections"
import Request from "./components/Request"
import ChatBook from "./components/ChatBook"

function App() {

  return (
    <>
    <Provider store={AppStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>} >
            <Route path="/" element={<Feed />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Profile" element={<Profile />}/>
            <Route path="/Connections" element={<Connections />}/>
            <Route path="/Profile/edit" element={<EditProfile />} />
            <Route path="/MateChat" element={<ChatBook />} />
            <Route path="/Requests" element={<Request />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
