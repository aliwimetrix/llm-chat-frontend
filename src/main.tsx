import { createRoot } from 'react-dom/client'
import './index.css'
import { OpenAI } from './OpenAI.tsx'

createRoot(document.getElementById('root')!).render(
    <OpenAI />
)
