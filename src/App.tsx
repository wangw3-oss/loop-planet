import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import LandingPage from './components/LandingPage'
import MainCanvas from './components/MainCanvas'

function App() {
  return (
    <Router basename="/loop-planet">
      <div className="app-container">
        <Routes>
          <Route 
            path="/" 
            element={
              <CSSTransition
                timeout={500}
                classNames="fade"
              >
                <LandingPage />
              </CSSTransition>
            }
          />
          <Route 
            path="/main"
            element={
              <CSSTransition
                timeout={500}
                classNames="fade"
              >
                <MainCanvas />
              </CSSTransition>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App