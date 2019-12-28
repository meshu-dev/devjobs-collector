class TimeHelper
{
	wait(seconds)
	{
		let milliseconds = seconds * 1000;
		Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
	}
}

module.exports = TimeHelper;
