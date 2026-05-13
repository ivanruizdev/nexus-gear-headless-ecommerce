// File: src/services/voiceRecognition.ts

// This interface extends the browser's Window object to include
// the Web Speech API, which is not yet in TypeScript's default types.
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

// Resolve browser compatibility (Chrome uses webkitSpeechRecognition)
const SpeechRecognitionAPI =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

/**
 * Creates and returns a configured SpeechRecognition instance.
 * Returns null if the browser does not support the Web Speech API.
 */
export function createVoiceRecognition(
  onTranscript: (text: string) => void,
  onError: (errorType: string) => void,
  onEnd: () => void
): SpeechRecognitionInstance | null {
  if (!SpeechRecognitionAPI) {
    console.warn('Web Speech API is not supported in this browser.')
    return null
  }

  const recognition: SpeechRecognitionInstance = new SpeechRecognitionAPI()

  recognition.lang = 'es-MX'
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  // Called when the user's voice is successfully captured and converted to text
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript
    onTranscript(transcript)
  }

  // Called when something goes wrong (mic denied, network error, etc.)
  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    if (event.error === 'not-allowed') {
      onError('Permiso de micrófono denegado. Por favor, permítelo en tu navegador.')
    } else {
      onError(`Error de reconocimiento de voz: ${event.error}`)
    }
  }

  // Called when the recognition session ends (either by result or silence)
  recognition.onend = () => {
    onEnd()
  }

  return recognition
}
