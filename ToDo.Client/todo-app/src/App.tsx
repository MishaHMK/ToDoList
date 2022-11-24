import React, {ChangeEvent, FC, useState} from 'react';
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import { BoardList } from './components/board/boardList';
import { ObjectiveList } from './components/objective/objectivesList';
import { UserRegister } from './components/user/userRegister';
import { UserLogin } from './components/user/userLogin';
import './App.css';


const App: FC = () => { 

  return (
    <div className="App">
      <div className="container">
          <BrowserRouter>
                  <Routes>
                      <Route path="boards" element={<BoardList/>} />
                      <Route path="items/:id" element={<ObjectiveList/>} />
                      <Route path="register" element={<UserRegister/>} />
                      <Route path="login" element={<UserLogin/>} />
                  </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
