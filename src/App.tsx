import { LayoutContainer } from '@/styled-components'
import { Navbar } from './components'
import { Home } from './pages'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux'

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <LayoutContainer>
        <Home />
      </LayoutContainer>
    </Provider>
  )
}

export default App
