import React, {ChangeEvent, FC, useState} from 'react';
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
import { BoardList } from './components/board/boardList';
import ObjectiveList from './components/objective/objectivesList';
import './App.css';


const App: FC = () => { 

  return (
    <div className="App">
      <div className="container">
          <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<BoardList/>} />
                      <Route path="items/:id" element={<ObjectiveList/>} />
                  </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;


//<ObjectiveList/> <BoardList/>