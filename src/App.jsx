import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { getStudentContext } from './config'
import { fetchSchool, fetchClasses, fetchResult } from './api'

import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ClassSelect from './components/ClassSelect.jsx'
import RollNumberEntry from './components/RollNumberEntry.jsx'
import LoadingState from './components/LoadingState.jsx'
import ResultCard from './components/ResultCard.jsx'
import NotFoundState from './components/NotFoundState.jsx'
import WhatsAppFab from './components/WhatsAppFab.jsx'

// Steps: hero -> class -> roll -> loading -> result | notfound
const STEP = {
  HERO: 'hero',
  CLASS: 'class',
  ROLL: 'roll',
  LOADING: 'loading',
  RESULT: 'result',
  NOTFOUND: 'notfound'
}

export default function App() {
  const student = useMemo(getStudentContext, [])

  const [step, setStep] = useState(STEP.HERO)

  const [school, setSchool] = useState(null)
  const [classes, setClasses] = useState([])
  const [loadingClasses, setLoadingClasses] = useState(false)

  const [selectedClass, setSelectedClass] = useState('')
  const [rollNo, setRollNo] = useState('')

  const [result, setResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    fetchSchool().then(setSchool)
  }, [])

  const goToClassStep = () => {
    setStep(STEP.CLASS)
    if (classes.length === 0) {
      setLoadingClasses(true)
      fetchClasses()
        .then(setClasses)
        .finally(() => setLoadingClasses(false))
    }
  }

  const goToRollStep = () => setStep(STEP.ROLL)

  const submitRollNumber = async () => {
    setStep(STEP.LOADING)
    const res = await fetchResult(selectedClass, rollNo.trim())
    if (res.success) {
      setResult(res.data)
      setStep(STEP.RESULT)
    } else {
      setErrorMessage(res.message)
      setStep(STEP.NOTFOUND)
    }
  }

  const resetToClassStep = () => {
    setRollNo('')
    setResult(null)
    setErrorMessage('')
    goToClassStep()
  }

  const backLabel =
    step === STEP.CLASS ? 'Back to home'
    : step === STEP.ROLL ? 'Back to classes'
    : undefined

  const onBack =
    step === STEP.CLASS ? () => setStep(STEP.HERO)
    : step === STEP.ROLL ? () => setStep(STEP.CLASS)
    : undefined

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-50/60 via-white to-white">
      <Header school={school} onBack={onBack} backLabel={backLabel} />

      <main className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          {step === STEP.HERO && (
            <Hero key="hero" school={school} studentName={student.name} onCheckResult={goToClassStep} />
          )}

          {step === STEP.CLASS && (
            <ClassSelect
              key="class"
              classes={classes}
              loadingClasses={loadingClasses}
              selected={selectedClass}
              onSelect={setSelectedClass}
              onContinue={goToRollStep}
            />
          )}

          {step === STEP.ROLL && (
            <RollNumberEntry
              key="roll"
              selectedClass={selectedClass}
              rollNo={rollNo}
              setRollNo={setRollNo}
              onChangeClass={() => setStep(STEP.CLASS)}
              onSubmit={submitRollNumber}
            />
          )}

          {step === STEP.LOADING && <LoadingState key="loading" />}

          {step === STEP.RESULT && result && (
            <ResultCard
              key="result"
              result={result}
              selectedClass={selectedClass}
              rollNo={rollNo.trim()}
              onReset={resetToClassStep}
            />
          )}

          {step === STEP.NOTFOUND && (
            <NotFoundState
              key="notfound"
              message={errorMessage}
              onTryAgain={() => setStep(STEP.ROLL)}
              onChangeClass={() => setStep(STEP.CLASS)}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="py-6 text-center text-xs text-slate-400">
        {school?.name || 'Educare Public School'} &middot; Result Portal
      </footer>

      <WhatsAppFab />
    </div>
  )
}
