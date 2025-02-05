import "./App.css";
import { Routes, Route } from "react-router";
import Auth from "./pages/auth/auth";
import MyChats from "./pages/chat/myChats";
import Chat from "./pages/chat/chat";
import UserProfile from "./pages/user-profile/userProfile";
import CreateGroupChat from "./pages/group-chat/createGroupChat";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<Auth />} />
        <Route path="/my-chats" element={<MyChats />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/create-group-chat" element={<CreateGroupChat />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
