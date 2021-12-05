class SoundBuffer {
	private debug = true;
	private sampleRate = 48000;
	private ctx = new AudioContext()
	private chunks : Array<AudioBufferSourceNode> = [];
	private isPlaying: boolean = false;
	private startTime: number = 0;
	private lastChunkOffset: number = 0;

	private createChunk(audioBuffer:AudioBuffer)  {
		var source = this.ctx.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(this.ctx.destination);
		source.onended = (e:Event) => {
			this.chunks.splice(this.chunks.indexOf(source),1);
			if (this.chunks.length == 0) {
				this.isPlaying = false;
				this.startTime = 0;
				this.lastChunkOffset = 0;
			}
		};

		return source;
	}

	private log(data:string) {
		if (this.debug) {
			console.log(new Date().toUTCString() + " : " + data);
		}
	}

	public addChunk(data: AudioBuffer) {
		if (this.isPlaying) { // schedule & add right now
			this.log("chunk accepted");
			let chunk = this.createChunk(data);
			chunk.start(this.startTime + this.lastChunkOffset);
			// @ts-ignore
			this.lastChunkOffset += chunk.buffer.duration;
			this.chunks.push(chunk);
		}  else  { // add & schedule entire buffer
			this.log("queued chunks scheduled");
			this.isPlaying = true;
			let chunk = this.createChunk(data);
			this.chunks.push(chunk);
			this.startTime = this.ctx.currentTime;
			this.lastChunkOffset = 0;
			for (let i = 0;i<this.chunks.length;i++) {
				let chunk = this.chunks[i];
				chunk.start(this.startTime + this.lastChunkOffset);
				// @ts-ignore
				this.lastChunkOffset += chunk.buffer.duration;
			}
		}
	}
}

export default new SoundBuffer()
