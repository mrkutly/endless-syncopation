import { renderWithContexts } from './test-utils'
import App from './App'

test('renders without crashing', () => {
	renderWithContexts(<App />)
})
