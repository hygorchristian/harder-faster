import path from 'path'

export type Audio = {
	path: string;
	name: string;
	index: number;
	buffer?: any;
}

const audios: Audio[] = [
	{
		name: '001',
		path: 'audios/01.mp3',
		index: 0,
	},
	{
		name: '002',
		path: 'audios/02.mp3',
		index: 10,
	},
	{
		name: '003',
		path: 'audios/03.mp3',
		index: 20,
	},
	{
		name: '004',
		path: 'audios/04.mp3',
		index: 30,
	},
	{
		name: '005',
		path: 'audios/05.mp3',
		index: 2,
	},
	{
		name: '006',
		path: 'audios/06.mp3',
		index: 3,
	},
	{
		name: '007',
		path: 'audios/07.mp3',
		index: 12,
	},
	{
		name: '008',
		path: 'audios/08.mp3',
		index: 13,
	},
	{
		name: '009',
		path: 'audios/09.mp3',
		index: 22,
	},
	{
		name: '010',
		path: 'audios/10.mp3',
		index: 23,
	},
	{
		name: '011',
		path: 'audios/11.mp3',
		index: 32,
	},
	{
		name: '012',
		path: 'audios/12.mp3',
		index: 33,
	},
	{
		name: '013',
		path: 'audios/13.mp3',
		index: 1,
	},
	//---- work it
	{
		name: '014',
		path: 'audios/14.mp3',
		index: 4,
	},
	{
		name: '015',
		path: 'audios/15.mp3',
		index: 14,
	},
	{
		name: '016',
		path: 'audios/16.mp3',
		index: 24,
	},
	{
		name: '017',
		path: 'audios/17.mp3',
		index: 34,
	},
	//---- harder
	{
		name: '018',
		path: 'audios/18.mp3',
		index: 5,
	},
	{
		name: '019',
		path: 'audios/19.mp3',
		index: 15,
	},
	{
		name: '020',
		path: 'audios/20.mp3',
		index: 25,
	},
	{
		name: '021',
		path: 'audios/21.mp3',
		index: 35,
	},
	// ---
	{
		name: '022',
		path: 'audios/22.mp3',
		index: 6,
	},
	{
		name: '023',
		path: 'audios/23.mp3',
		index: 16,
	},
	{
		name: '024',
		path: 'audios/24.mp3',
		index: 26,
	},
	{
		name: '025',
		path: 'audios/25.mp3',
		index: 36,
	},
	{
		name: '026',
		path: 'audios/26.mp3',
		index: 7,
	},
	{
		name: '027',
		path: 'audios/27.mp3',
		index: 17,
	},
	{
		name: '028',
		path: 'audios/28.mp3',
		index: 27,
	},
	{
		name: '029',
		path: 'audios/29.mp3',
		index: 37,
	},

]

const song = [
  // intro
  0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3,
  // bridge
  4, 5, 6, 7, 8, 9, 10, 11, 12,
  4, 5, 6, 7, 8, 9, 10, 11, 12,
  4, 5, 6, 7, 8, 9, 10, 11, 12,
  4, 5, 6, 7, 8, 9, 10, 11, 12,
  // work it
  13, 5, 14, 7, 15, 9, 16, 11, 12,
  // harder better
  4, 17, 6, 18, 8, 19, 10, 20, 12,
  // more than
  21, 5, 22, 7, 23, 9, 24, 11, 12,
  // hour after
  4, 25, 6, 26, 8, 27, 10, 28, 12,
  // work it
  13, 5, 14, 7, 15, 9, 16, 11, 12,
  // harder better
  4, 17, 6, 18, 8, 19, 10, 20, 12,
  // more than
  21, 5, 22, 7, 23, 9, 24, 11, 12,
  // hour after
  4, 25, 6, 26, 8, 27, 10, 28, 12,
]

class AudioLoader{
	context = new AudioContext()
	audios: Audio[] = []

  fullsong = song

	audiosToPromise = () => audios.map((audio) => new Promise((resolve, reject) => {
		fetch(audio.path).then(response => response.arrayBuffer()).then(buffer => this.context.decodeAudioData(buffer)).then(buffer => {
			resolve({
				...audio,
				buffer
			})
		}).catch(reject);
	}))

	loadAll = async () => {
		this.audios = await Promise.all(this.audiosToPromise()) as Audio[]
	}
}

export default new AudioLoader()


