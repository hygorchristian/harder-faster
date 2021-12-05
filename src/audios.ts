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
		index: 50,
	},
	{
		name: '002',
		path: 'audios/02.mp3',
		index: 58,
	},
	{
		name: '003',
		path: 'audios/03.mp3',
		index: 18,
	},
	{
		name: '004',
		path: 'audios/04.mp3',
		index: 34,
	},
	{
		name: '005',
		path: 'audios/05.mp3',
		index: 0,
	},
	{
		name: '006',
		path: 'audios/06.mp3',
		index: 9,
	},
	{
		name: '007',
		path: 'audios/07.mp3',
		index: 16,
	},
	{
		name: '008',
		path: 'audios/08.mp3',
		index: 25,
	},
	{
		name: '009',
		path: 'audios/09.mp3',
		index: 32,
	},
	{
		name: '010',
		path: 'audios/10.mp3',
		index: 41,
	},
	{
		name: '011',
		path: 'audios/11.mp3',
		index: 48,
	},
	{
		name: '012',
		path: 'audios/12.mp3',
		index: 57,
	},
	{
		name: '013',
		path: 'audios/13.mp3',
		index: 2,
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
		index: 20,
	},
	{
		name: '016',
		path: 'audios/16.mp3',
		index: 36,
	},
	{
		name: '017',
		path: 'audios/17.mp3',
		index: 52,
	},
	//---- harder
	{
		name: '018',
		path: 'audios/18.mp3',
		index: 13,
	},
	{
		name: '019',
		path: 'audios/19.mp3',
		index: 29,
	},
	{
		name: '020',
		path: 'audios/20.mp3',
		index: 45,
	},
	{
		name: '021',
		path: 'audios/21.mp3',
		index: 61,
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
		index: 22,
	},
	{
		name: '024',
		path: 'audios/24.mp3',
		index: 38,
	},
	{
		name: '025',
		path: 'audios/25.mp3',
		index: 54,
	},
	{
		name: '026',
		path: 'audios/26.mp3',
		index: 15,
	},
	{
		name: '027',
		path: 'audios/27.mp3',
		index: 31,
	},
	{
		name: '028',
		path: 'audios/28.mp3',
		index: 47,
	},
	{
		name: '029',
		path: 'audios/29.mp3',
		index: 63,
	},

]

class AudioLoader{
	context = new AudioContext()
	audios: Audio[] = []

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


