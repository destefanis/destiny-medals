// Import React, ReactDOM and the DummyComponent.
import React from 'react'
import ReactDOM from 'react-dom'
import { TestComponent } from './components/app.jsx'

// Define the root element.
const root = document.getElementById('root')

// Append the DummyComponent instance to the root element.
ReactDOM.render(<TestComponent />, root)
