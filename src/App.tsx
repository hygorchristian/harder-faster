import React, {useEffect, useState} from 'react';
import AudioLoader, { Audio } from './audios'
import SoundBuffer from './SoundBuffer'
import { GlobalStyles, Container, Pad, Grid } from './styles'

type PadButtonProps = {
	padInfo?: any;
	index: number;
	onClick: () => void;
}

function PadButton({padInfo, index, ...props}: PadButtonProps){
	return (
		<Pad className={Boolean(padInfo) ? 'hasData' : ''} {...props}>{/*padInfo?.name*/}</Pad>
	)
}

function App() {
	const [audios, setAudios] = useState<Audio[]>([]);

	const handleAudio = (buffer: AudioBuffer) => {
		SoundBuffer.addChunk(buffer)
	}

	useEffect(() => {
		AudioLoader.loadAll().then(() => {
			setAudios(AudioLoader.audios)
		})
	}, [])

  return (
  	<>
			<GlobalStyles />
			<Container>
				<Grid>
					{Array(64).fill(0).map((_, index) => {
						const padInfo = audios.find(audio => audio.index === index)
						return <PadButton index={index} key={index} padInfo={padInfo} onClick={() => padInfo && handleAudio(padInfo.buffer)} />
					})}
				</Grid>
			</Container>
		</>

  );
}

export default App;
