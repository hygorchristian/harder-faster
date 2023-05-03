type OnChangeCallback = (index: number) => void

class SoundBuffer {
	private debug = true;
	private sampleRate = 48000;
	private ctx: AudioContext | any = new AudioContext()
	private chunks: Array<AudioBufferSourceNode> = [];
	private isPlaying: boolean = false;
	private startTime: number = 0;
	private lastChunkOffset: number = 0;
	private onChange:OnChangeCallback = (index: number) => null
  private indexes: number[] = []
  private lastTimeAdded = Date.now()

  public stop() {
    this.ctx = null
    this.ctx = new AudioContext()
    this.onChange(-1)
  }

	private createChunk(audioBuffer:AudioBuffer) {
		const source = this.ctx.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(this.ctx.destination);
		source.onended = (e:Event) => {
			this.chunks.splice(this.chunks.indexOf(source),1);
      this.onChange(Number(this.indexes.shift()))
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

	public addOnChangeListener(callback: OnChangeCallback){
	  this.onChange = callback
  }

	public addChunk(data: AudioBuffer, index: number) {
	  const wasPlayedTogether = this.lastTimeAdded < Date.now() - 20
    const startTime = this.startTime + this.lastChunkOffset


	  this.indexes.push(index)
		if (this.isPlaying) { // schedule & add right now
			this.log("chunk accepted");
			let chunk = this.createChunk(data);

			chunk.start(startTime);
			// @ts-ignore
			this.lastChunkOffset += chunk.buffer.duration;
			this.chunks.push(chunk);
		}
		else  { // add & schedule entire buffer
			this.log("queued chunks scheduled");
			this.isPlaying = true;
			this.onChange(Number(this.indexes.shift()))
			let chunk = this.createChunk(data);
			this.chunks.push(chunk);
			this.startTime = this.ctx.currentTime;
			this.lastChunkOffset = 0;
			for (let i = 0;i<this.chunks.length;i++) {
				let chunk = this.chunks[i];
				chunk.start(startTime);
				// @ts-ignore
				this.lastChunkOffset += chunk.buffer.duration;
			}
		}

		this.lastTimeAdded = Date.now()
	}
}

export default new SoundBuffer()
