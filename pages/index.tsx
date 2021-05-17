import { useControls } from 'leva'

function TargetColor() {
  const { targetColor } = useControls({
    targetColor: {
      options: ["red", "blue", "green"],
      value: "red"
    },
  })
  return <>{ targetColor }</>
}

function TargetType() {
  const { targetType } = useControls({
    targetType: {
      options: ["cone", "cube", "sphere"],
      value: "cone"
    }
  })
  return (
    <div>
      <pre>{JSON.stringify(targetType, null, '  ')}</pre>
    </div>
  )
}

function TargetSound() {
  const { targetSound } = useControls({
    targetSound: {
      options: ["beep", "boop"],
      value: "beep"
    }
  })
  return (
    <div>
      <pre>{JSON.stringify(targetSound, null, '  ')}</pre>
    </div>
  )
}

function DistractorsCount() {
  const { distractorsCount } = useControls({ 
    distractorsCount: {
      min: 0,
      max: 50,
      step: 1,
      value: 0,
    }
  })
  return <>{distractorsCount}</>
}

function DistractorTypes() {
  const { distractorTypes } = useControls({
    distractorTypes: {
      min: 1,
      max: 3,
      step: 1,
      value: 1,
    },
  })

  return (
    <div>
      <pre>{JSON.stringify(distractorTypes, null, '  ')}</pre>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <TargetColor />
      <TargetType />
      <TargetSound /> 
      <DistractorsCount />
      <DistractorTypes /> 
    </>
  )
}
