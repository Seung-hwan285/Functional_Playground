import React from 'react';
import logo from './logo.svg';
import './App.css';
import { IO } from 'fp-ts/IO';
import {constVoid, pipe} from "fp-ts/function";
import Counter from "./components/Counter";

function App() {

  const handleClick:IO<void>=()=>{
    pipe(
        console.log('test'),
        constVoid
    );
  }

  return (
    <div className="App">
      <Counter/>
    </div>
  );
}

export default App;
