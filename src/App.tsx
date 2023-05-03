import React, {useEffect, useState} from 'react';
import AudioLoader, { Audio } from './audios'
import SoundBuffer from './SoundBuffer'
import { GlobalStyles, Container, Pad, Grid, Control } from './styles'
import keys from './keys'

type PadButtonProps = {
	padInfo?: Audio;
	index: number;
	onClick: () => void;
  currentPlaying: number;
}

function PadButton({padInfo, index, currentPlaying, ...props}: PadButtonProps){
  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    if(Boolean(padInfo)) {
      setClasses(prev => [...prev, 'hasData'])

      const handler = (e: any) => {
        if(e.code === keys[index].key) props.onClick()
      }

      window.addEventListener('keydown', handler)

      return () =>  window.removeEventListener('keydown', handler)
    }
  }, [padInfo])

  useEffect(() => {
    if(currentPlaying === padInfo?.index) {
      setClasses(prev => [...prev, 'active'])
    }
    else {
      setClasses(prev => prev.filter(cls => cls !== 'active'))
    }
  }, [currentPlaying])

	return (
		<Pad className={classes.join(' ')} {...props}>
      {keys[index].label}
		</Pad>
	)
}

function App() {
	const [audios, setAudios] = useState<Audio[]>([]);
	const [currentPlaying, setCurrentPlaying] = useState(-1);

	const handleAudio = ({buffer, index}: Audio) => {
		SoundBuffer.addChunk(buffer, index)
	}

	const autoPlay = () => {
	  SoundBuffer.stop()
	  const buffers = AudioLoader.fullsong.map((note: number) => {
	    const audio = audios[note]
      return audio
    })

    // @ts-ignore
    buffers.forEach(audio => SoundBuffer.addChunk(audio.buffer, audio.index))
  }

  const stop = () => {
	  SoundBuffer.stop()
  }

	useEffect(() => {
		AudioLoader.loadAll().then(() => {
			setAudios(AudioLoader.audios)
      SoundBuffer.addOnChangeListener(index => setCurrentPlaying(index))
		})
	}, [])

  return (
  	<>
			<GlobalStyles />
			<Container>
				<Grid>
					{Array(10 * 4).fill(0).map((_, index) => {
						const padInfo = audios.find(audio => audio.index === index)
						return (
              <PadButton
                index={index}
                key={index}
                padInfo={padInfo}
                currentPlaying={currentPlaying}
                onClick={() => padInfo && handleAudio(padInfo)}
              />
            )
					})}
				</Grid>
        <Control>
          <button onClick={autoPlay}>Auto play ;)</button>
          <button onClick={stop}>Stop</button>
        </Control>

			</Container>
		</>

  );
}

export default App;
