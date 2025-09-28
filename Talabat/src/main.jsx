import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
const CLIENT_ID = '151531384727-sl292v5uqmr6to93j6vu5gqgre9sbkuh.apps.googleusercontent.com'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId={CLIENT_ID}> */}
      <App />
    {/* </GoogleOAuthProvider>     */}
  </StrictMode>,
)
