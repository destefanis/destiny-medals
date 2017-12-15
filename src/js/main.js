// Import React, ReactDOM and the DummyComponent.
import React from 'react'
import ReactDOM from 'react-dom'
import { DefaultComponent } from './components/app.jsx'

// Define the root element.
const root = document.getElementById('root')

// Append the DummyComponent instance to the root element.
ReactDOM.render(
  <DefaultComponent />, 
  root
)
