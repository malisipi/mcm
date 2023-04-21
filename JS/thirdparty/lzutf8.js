/*!
 LZ-UTF8 v0.6.3

 Copyright (c) 2021, Rotem Dan
 Released under the MIT license.

 Build date: 2022-07-06 

 Please report any issue at https://github.com/rotemdan/lzutf8.js/issues
*/
var IE10SubarrayBugPatcher,LZUTF8;!function(r){r.runningInNodeJS=function(){return"object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node},r.runningInMainNodeJSModule=function(){return r.runningInNodeJS()&&require.main===module},r.commonJSAvailable=function(){return"object"==typeof module&&"object"==typeof module.exports},r.runningInWebWorker=function(){return"undefined"==typeof window&&"object"==typeof self&&"function"==typeof self.addEventListener&&"function"==typeof self.close},r.runningInNodeChildProcess=function(){return r.runningInNodeJS()&&"function"==typeof process.send},r.runningInNullOrigin=function(){return"object"==typeof window&&"object"==typeof window.location&&"object"==typeof document&&("http:"!==document.location.protocol&&"https:"!==document.location.protocol)},r.webWorkersAvailable=function(){return"function"==typeof Worker&&!r.runningInNullOrigin()&&(!r.runningInNodeJS()&&!(navigator&&navigator.userAgent&&0<=navigator.userAgent.indexOf("Android 4.3")))},r.log=function(e,t){void 0===t&&(t=!1),"object"==typeof console&&(console.log(e),t&&"object"==typeof document&&(document.body.innerHTML+=e+"<br/>"))},r.createErrorMessage=function(e,t){return void 0===t&&(t="Unhandled exception"),null==e?t:(t+=": ","object"==typeof e.content?r.runningInNodeJS()?t+e.content.stack:"{}"!==(n=JSON.stringify(e.content))?t+n:t+e.content:"string"==typeof e.content?t+e.content:t+e);var n},r.printExceptionAndStackTraceToConsole=function(e,t){r.log(r.createErrorMessage(e,t=void 0===t?"Unhandled exception":t))},r.getGlobalObject=function(){return"object"==typeof global?global:"object"==typeof window?window:"object"==typeof self?self:{}},r.toString=Object.prototype.toString,r.commonJSAvailable()&&(module.exports=r)}(LZUTF8=LZUTF8||{}),function(){if("function"==typeof Uint8Array&&0!==new Uint8Array(1).subarray(1).byteLength){function e(e,t){function n(e,t,n){return e<t?t:n<e?n:e}e|=0,t|=0,arguments.length<1&&(e=0),arguments.length<2&&(t=this.length),e<0&&(e=this.length+e),t<0&&(t=this.length+t),e=n(e,0,this.length);var r=(t=n(t,0,this.length))-e;return new this.constructor(this.buffer,this.byteOffset+e*this.BYTES_PER_ELEMENT,r=r<0?0:r)}var t=["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"],n=void 0;if("object"==typeof window?n=window:"object"==typeof self&&(n=self),void 0!==n)for(var r=0;r<t.length;r++)n[t[r]]&&(n[t[r]].prototype.subarray=e)}}(IE10SubarrayBugPatcher=IE10SubarrayBugPatcher||{}),function(f){function e(){}e.compressAsync=function(e,r,o){var i=new f.Timer,u=new f.Compressor;if(!o)throw new TypeError("compressAsync: No callback argument given");if("string"==typeof e)e=f.encodeUTF8(e);else if(null==e||!(e instanceof Uint8Array))return void o(void 0,new TypeError("compressAsync: Invalid input argument, only 'string' and 'Uint8Array' are supported"));function s(e){if(e<a.length){var t=void 0;try{t=u.compressBlock(a[e])}catch(e){return void o(void 0,e)}c.push(t),i.getElapsedTime()<=20?s(e+1):(f.enqueueImmediate(function(){return s(e+1)}),i.restart())}else{var n=f.ArrayTools.concatUint8Arrays(c);f.enqueueImmediate(function(){var e;try{e=f.CompressionCommon.encodeCompressedBytes(n,r.outputEncoding)}catch(e){return void o(void 0,e)}f.enqueueImmediate(function(){return o(e)})})}}var a=f.ArrayTools.splitByteArray(e,r.blockSize),c=[];f.enqueueImmediate(function(){return s(0)})},e.createCompressionStream=function(){var o=new f.Compressor,i=new(require("readable-stream").Transform)({decodeStrings:!0,highWaterMark:65536});return i._transform=function(e,t,n){var r;try{r=f.BufferTools.uint8ArrayToBuffer(o.compressBlock(f.BufferTools.bufferToUint8Array(e)))}catch(e){return void i.emit("error",e)}i.push(r),n()},i},f.AsyncCompressor=e}(LZUTF8=LZUTF8||{}),function(f){function e(){}e.decompressAsync=function(e,r,o){if(!o)throw new TypeError("decompressAsync: No callback argument given");var i=new f.Timer;try{e=f.CompressionCommon.decodeCompressedBytes(e,r.inputEncoding)}catch(e){return void o(void 0,e)}function u(e){if(e<a.length){var t=void 0;try{t=s.decompressBlock(a[e])}catch(e){return void o(void 0,e)}c.push(t),i.getElapsedTime()<=20?u(e+1):(f.enqueueImmediate(function(){return u(e+1)}),i.restart())}else{var n=f.ArrayTools.concatUint8Arrays(c);f.enqueueImmediate(function(){var e;try{e=f.CompressionCommon.encodeDecompressedBytes(n,r.outputEncoding)}catch(e){return void o(void 0,e)}f.enqueueImmediate(function(){return o(e)})})}}var s=new f.Decompressor,a=f.ArrayTools.splitByteArray(e,r.blockSize),c=[];f.enqueueImmediate(function(){return u(0)})},e.createDecompressionStream=function(){var o=new f.Decompressor,i=new(require("readable-stream").Transform)({decodeStrings:!0,highWaterMark:65536});return i._transform=function(e,t,n){var r;try{r=f.BufferTools.uint8ArrayToBuffer(o.decompressBlock(f.BufferTools.bufferToUint8Array(e)))}catch(e){return void i.emit("error",e)}i.push(r),n()},i},f.AsyncDecompressor=e}(LZUTF8=LZUTF8||{}),function(o){var e,i;(i=e=o.WebWorker||(o.WebWorker={})).compressAsync=function(e,t,n){var r,o;"ByteArray"!=t.inputEncoding||e instanceof Uint8Array?(r={token:Math.random().toString(),type:"compress",data:e,inputEncoding:t.inputEncoding,outputEncoding:t.outputEncoding},i.globalWorker.addEventListener("message",o=function(e){e=e.data;e&&e.token==r.token&&(i.globalWorker.removeEventListener("message",o),"error"==e.type?n(void 0,new Error(e.error)):n(e.data))}),i.globalWorker.postMessage(r,[])):n(void 0,new TypeError("compressAsync: input is not a Uint8Array"))},i.decompressAsync=function(e,t,n){function r(e){(e=e.data)&&e.token==o.token&&(i.globalWorker.removeEventListener("message",r),"error"==e.type?n(void 0,new Error(e.error)):n(e.data))}var o={token:Math.random().toString(),type:"decompress",data:e,inputEncoding:t.inputEncoding,outputEncoding:t.outputEncoding};i.globalWorker.addEventListener("message",r),i.globalWorker.postMessage(o,[])},i.installWebWorkerIfNeeded=function(){"object"==typeof self&&void 0===self.document&&null!=self.addEventListener&&(self.addEventListener("message",function(e){var t=e.data;if("compress"==t.type){var n=void 0;try{n=o.compress(t.data,{outputEncoding:t.outputEncoding})}catch(e){return void self.postMessage({token:t.token,type:"error",error:o.createErrorMessage(e)},[])}(n={token:t.token,type:"compressionResult",data:n,encoding:t.outputEncoding}).data instanceof Uint8Array&&-1===navigator.appVersion.indexOf("MSIE 10")?self.postMessage(n,[n.data.buffer]):self.postMessage(n,[])}else if("decompress"==t.type){var r=void 0;try{r=o.decompress(t.data,{inputEncoding:t.inputEncoding,outputEncoding:t.outputEncoding})}catch(e){return void self.postMessage({token:t.token,type:"error",error:o.createErrorMessage(e)},[])}(n={token:t.token,type:"decompressionResult",data:r,encoding:t.outputEncoding}).data instanceof Uint8Array&&-1===navigator.appVersion.indexOf("MSIE 10")?self.postMessage(n,[n.data.buffer]):self.postMessage(n,[])}}),self.addEventListener("error",function(e){o.log(o.createErrorMessage(e.error,"Unexpected LZUTF8 WebWorker exception"))}))},i.createGlobalWorkerIfNeeded=function(){return!!i.globalWorker||!!o.webWorkersAvailable()&&(i.scriptURI||"object"!=typeof document||null!=(e=document.getElementById("lzutf8"))&&(i.scriptURI=e.getAttribute("src")||void 0),!!i.scriptURI&&(i.globalWorker=new Worker(i.scriptURI),!0));var e},i.terminate=function(){i.globalWorker&&(i.globalWorker.terminate(),i.globalWorker=void 0)},e.installWebWorkerIfNeeded()}(LZUTF8=LZUTF8||{}),function(e){function t(e,t,n){this.container=e,this.startPosition=t,this.length=n}t.prototype.get=function(e){return this.container[this.startPosition+e]},t.prototype.getInReversedOrder=function(e){return this.container[this.startPosition+this.length-1-e]},t.prototype.set=function(e,t){this.container[this.startPosition+e]=t},e.ArraySegment=t}(LZUTF8=LZUTF8||{}),function(e){(e=e.ArrayTools||(e.ArrayTools={})).copyElements=function(e,t,n,r,o){for(;o--;)n[r++]=e[t++]},e.zeroElements=function(e,t,n){for(;n--;)e[t++]=0},e.countNonzeroValuesInArray=function(e){for(var t=0,n=0;n<e.length;n++)e[n]&&t++;return t},e.truncateStartingElements=function(e,t){if(e.length<=t)throw new RangeError("truncateStartingElements: Requested length should be smaller than array length");for(var n=e.length-t,r=0;r<t;r++)e[r]=e[n+r];e.length=t},e.doubleByteArrayCapacity=function(e){var t=new Uint8Array(2*e.length);return t.set(e),t},e.concatUint8Arrays=function(e){for(var t=0,n=0,r=e;n<r.length;n++)t+=(a=r[n]).length;for(var o=new Uint8Array(t),i=0,u=0,s=e;u<s.length;u++){var a=s[u];o.set(a,i),i+=a.length}return o},e.splitByteArray=function(e,t){for(var n=[],r=0;r<e.length;){var o=Math.min(t,e.length-r);n.push(e.subarray(r,r+o)),r+=o}return n}}(LZUTF8=LZUTF8||{}),function(e){var t;(t=e.BufferTools||(e.BufferTools={})).convertToUint8ArrayIfNeeded=function(e){return"function"==typeof Buffer&&Buffer.isBuffer(e)?t.bufferToUint8Array(e):e},t.uint8ArrayToBuffer=function(e){var t;if(Buffer.prototype instanceof Uint8Array)return t=new Uint8Array(e.buffer,e.byteOffset,e.byteLength),Object.setPrototypeOf(t,Buffer.prototype),t;for(var n=e.length,r=new Buffer(n),o=0;o<n;o++)r[o]=e[o];return r},t.bufferToUint8Array=function(e){if(Buffer.prototype instanceof Uint8Array)return new Uint8Array(e.buffer,e.byteOffset,e.byteLength);for(var t=e.length,n=new Uint8Array(t),r=0;r<t;r++)n[r]=e[r];return n}}(LZUTF8=LZUTF8||{}),function(o){var e;(e=o.CompressionCommon||(o.CompressionCommon={})).getCroppedBuffer=function(e,t,n,r){void 0===r&&(r=0);r=new Uint8Array(n+r);return r.set(e.subarray(t,t+n)),r},e.getCroppedAndAppendedByteArray=function(e,t,n,r){return o.ArrayTools.concatUint8Arrays([e.subarray(t,t+n),r])},e.detectCompressionSourceEncoding=function(e){if(null==e)throw new TypeError("detectCompressionSourceEncoding: input is null or undefined");if("string"==typeof e)return"String";if(e instanceof Uint8Array||"function"==typeof Buffer&&Buffer.isBuffer(e))return"ByteArray";throw new TypeError("detectCompressionSourceEncoding: input must be of type 'string', 'Uint8Array' or 'Buffer'")},e.encodeCompressedBytes=function(e,t){switch(t){case"ByteArray":return e;case"Buffer":return o.BufferTools.uint8ArrayToBuffer(e);case"Base64":return o.encodeBase64(e);case"BinaryString":return o.encodeBinaryString(e);case"StorageBinaryString":return o.encodeStorageBinaryString(e);default:throw new TypeError("encodeCompressedBytes: invalid output encoding requested")}},e.decodeCompressedBytes=function(e,t){if(null==t)throw new TypeError("decodeCompressedData: Input is null or undefined");switch(t){case"ByteArray":case"Buffer":var n=o.BufferTools.convertToUint8ArrayIfNeeded(e);if(n instanceof Uint8Array)return n;throw new TypeError("decodeCompressedData: 'ByteArray' or 'Buffer' input type was specified but input is not a Uint8Array or Buffer");case"Base64":if("string"!=typeof e)throw new TypeError("decodeCompressedData: 'Base64' input type was specified but input is not a string");return o.decodeBase64(e);case"BinaryString":if("string"!=typeof e)throw new TypeError("decodeCompressedData: 'BinaryString' input type was specified but input is not a string");return o.decodeBinaryString(e);case"StorageBinaryString":if("string"!=typeof e)throw new TypeError("decodeCompressedData: 'StorageBinaryString' input type was specified but input is not a string");return o.decodeStorageBinaryString(e);default:throw new TypeError("decodeCompressedData: invalid input encoding requested: '".concat(t,"'"))}},e.encodeDecompressedBytes=function(e,t){switch(t){case"String":return o.decodeUTF8(e);case"ByteArray":return e;case"Buffer":if("function"!=typeof Buffer)throw new TypeError("encodeDecompressedBytes: a 'Buffer' type was specified but is not supported at the current envirnment");return o.BufferTools.uint8ArrayToBuffer(e);default:throw new TypeError("encodeDecompressedBytes: invalid output encoding requested")}}}(LZUTF8=LZUTF8||{}),function(o){var t,e,i,u;e=t=o.EventLoop||(o.EventLoop={}),u=[],e.enqueueImmediate=function(e){u.push(e),1===u.length&&i()},e.initializeScheduler=function(){function t(){for(var e=0,t=u;e<t.length;e++){var n=t[e];try{n.call(void 0)}catch(e){o.printExceptionAndStackTraceToConsole(e,"enqueueImmediate exception")}}u.length=0}var n,e,r;i=o.runningInNodeJS()?function(){return setImmediate(t)}:"object"==typeof window&&"function"==typeof window.addEventListener&&"function"==typeof window.postMessage?(n="enqueueImmediate-"+Math.random().toString(),window.addEventListener("message",function(e){e.data===n&&t()}),e=o.runningInNullOrigin()?"*":window.location.href,function(){return window.postMessage(n,e)}):"function"==typeof MessageChannel&&"function"==typeof MessagePort?((r=new MessageChannel).port1.onmessage=t,function(){return r.port2.postMessage(0)}):function(){return setTimeout(t,0)}},e.initializeScheduler(),o.enqueueImmediate=function(e){return t.enqueueImmediate(e)}}(LZUTF8=LZUTF8||{}),function(e){var n;(n=e.ObjectTools||(e.ObjectTools={})).override=function(e,t){return n.extend(e,t)},n.extend=function(e,t){if(null==e)throw new TypeError("obj is null or undefined");if("object"!=typeof e)throw new TypeError("obj is not an object");if("object"!=typeof(t=null==t?{}:t))throw new TypeError("newProperties is not an object");if(null!=t)for(var n in t)e[n]=t[n];return e}}(LZUTF8=LZUTF8||{}),function(o){o.getRandomIntegerInRange=function(e,t){return e+Math.floor(Math.random()*(t-e))},o.getRandomUTF16StringOfLength=function(e){for(var t="",n=0;n<e;n++){for(var r=void 0;55296<=(r=o.getRandomIntegerInRange(0,1114112))&&r<=57343;);t+=o.Encoding.CodePoint.decodeToString(r)}return t}}(LZUTF8=LZUTF8||{}),function(e){function t(e){this.outputBufferCapacity=e=void 0===e?1024:e,this.outputPosition=0,this.outputString="",this.outputBuffer=new Uint16Array(this.outputBufferCapacity)}t.prototype.appendCharCode=function(e){this.outputBuffer[this.outputPosition++]=e,this.outputPosition===this.outputBufferCapacity&&this.flushBufferToOutputString()},t.prototype.appendCharCodes=function(e){for(var t=0,n=e.length;t<n;t++)this.appendCharCode(e[t])},t.prototype.appendString=function(e){for(var t=0,n=e.length;t<n;t++)this.appendCharCode(e.charCodeAt(t))},t.prototype.appendCodePoint=function(e){if(e<=65535)this.appendCharCode(e);else{if(!(e<=1114111))throw new Error("appendCodePoint: A code point of ".concat(e," cannot be encoded in UTF-16"));this.appendCharCode(55296+(e-65536>>>10)),this.appendCharCode(56320+(e-65536&1023))}},t.prototype.getOutputString=function(){return this.flushBufferToOutputString(),this.outputString},t.prototype.flushBufferToOutputString=function(){this.outputPosition===this.outputBufferCapacity?this.outputString+=String.fromCharCode.apply(null,this.outputBuffer):this.outputString+=String.fromCharCode.apply(null,this.outputBuffer.subarray(0,this.outputPosition)),this.outputPosition=0},e.StringBuilder=t}(LZUTF8=LZUTF8||{}),function(r){function e(){this.restart()}e.prototype.restart=function(){this.startTime=e.getTimestamp()},e.prototype.getElapsedTime=function(){return e.getTimestamp()-this.startTime},e.prototype.getElapsedTimeAndRestart=function(){var e=this.getElapsedTime();return this.restart(),e},e.prototype.logAndRestart=function(e,t){void 0===t&&(t=!0);var n=this.getElapsedTime(),e="".concat(e,": ").concat(n.toFixed(3),"ms");return r.log(e,t),this.restart(),n},e.getTimestamp=function(){return this.timestampFunc||this.createGlobalTimestampFunction(),this.timestampFunc()},e.getMicrosecondTimestamp=function(){return Math.floor(1e3*e.getTimestamp())},e.createGlobalTimestampFunction=function(){var t,e,n,r;"object"==typeof process&&"function"==typeof process.hrtime?(t=0,this.timestampFunc=function(){var e=process.hrtime(),e=1e3*e[0]+e[1]/1e6;return t+e},t=Date.now()-this.timestampFunc()):"object"==typeof chrome&&chrome.Interval?(e=Date.now(),(n=new chrome.Interval).start(),this.timestampFunc=function(){return e+n.microseconds()/1e3}):"object"==typeof performance&&performance.now?(r=Date.now()-performance.now(),this.timestampFunc=function(){return r+performance.now()}):Date.now?this.timestampFunc=function(){return Date.now()}:this.timestampFunc=function(){return(new Date).getTime()}},r.Timer=e}(LZUTF8=LZUTF8||{}),function(r){function e(e){void 0===e&&(e=!0),this.MinimumSequenceLength=4,this.MaximumSequenceLength=31,this.MaximumMatchDistance=32767,this.PrefixHashTableSize=65537,this.inputBufferStreamOffset=1,e&&"function"==typeof Uint32Array?this.prefixHashTable=new r.CompressorCustomHashTable(this.PrefixHashTableSize):this.prefixHashTable=new r.CompressorSimpleHashTable(this.PrefixHashTableSize)}e.prototype.compressBlock=function(e){if(null==e)throw new TypeError("compressBlock: undefined or null input received");return"string"==typeof e&&(e=r.encodeUTF8(e)),e=r.BufferTools.convertToUint8ArrayIfNeeded(e),this.compressUtf8Block(e)},e.prototype.compressUtf8Block=function(e){if(!e||0==e.length)return new Uint8Array(0);for(var t=this.cropAndAddNewBytesToInputBuffer(e),n=this.inputBuffer,r=this.inputBuffer.length,o=(this.outputBuffer=new Uint8Array(e.length),this.outputBufferPosition=0),i=t;i<r;i++){var u,s,a=n[i],c=i<o;i>r-this.MinimumSequenceLength?c||this.outputRawByte(a):(u=this.getBucketIndexForPrefix(i),s=(c||null!=(s=this.findLongestMatch(i,u))&&(this.outputPointerBytes(s.length,s.distance),o=i+s.length,c=!0),c||this.outputRawByte(a),this.inputBufferStreamOffset+i),this.prefixHashTable.addValueToBucket(u,s))}return this.outputBuffer.subarray(0,this.outputBufferPosition)},e.prototype.findLongestMatch=function(e,t){var n=this.prefixHashTable.getArraySegmentForBucketIndex(t,this.reusableArraySegmentObject);if(null==n)return null;for(var r,o=this.inputBuffer,i=0,u=0;u<n.length;u++){var s=n.getInReversedOrder(u)-this.inputBufferStreamOffset,a=e-s,c=void 0,c=void 0===r?this.MinimumSequenceLength-1:r<128&&128<=a?i+(i>>>1):i;if(a>this.MaximumMatchDistance||c>=this.MaximumSequenceLength||e+c>=o.length)break;if(o[s+c]===o[e+c])for(var f=0;;f++){if(e+f===o.length||o[s+f]!==o[e+f]){c<f&&(r=a,i=f);break}if(f===this.MaximumSequenceLength)return{distance:a,length:this.MaximumSequenceLength}}}return void 0!==r?{distance:r,length:i}:null},e.prototype.getBucketIndexForPrefix=function(e){return(7880599*this.inputBuffer[e]+39601*this.inputBuffer[e+1]+199*this.inputBuffer[e+2]+this.inputBuffer[e+3])%this.PrefixHashTableSize},e.prototype.outputPointerBytes=function(e,t){t<128?(this.outputRawByte(192|e),this.outputRawByte(t)):(this.outputRawByte(224|e),this.outputRawByte(t>>>8),this.outputRawByte(255&t))},e.prototype.outputRawByte=function(e){this.outputBuffer[this.outputBufferPosition++]=e},e.prototype.cropAndAddNewBytesToInputBuffer=function(e){var t,n;return void 0===this.inputBuffer?(this.inputBuffer=e,0):(t=Math.min(this.inputBuffer.length,this.MaximumMatchDistance),n=this.inputBuffer.length-t,this.inputBuffer=r.CompressionCommon.getCroppedAndAppendedByteArray(this.inputBuffer,n,t,e),this.inputBufferStreamOffset+=n,t)},r.Compressor=e}(LZUTF8=LZUTF8||{}),function(s){function e(e){this.minimumBucketCapacity=4,this.maximumBucketCapacity=64,this.bucketLocators=new Uint32Array(2*e),this.storage=new Uint32Array(2*e),this.storageIndex=1}e.prototype.addValueToBucket=function(e,t){e<<=1,this.storageIndex>=this.storage.length>>>1&&this.compact();var n,r,o=this.bucketLocators[e];0===o?(o=this.storageIndex,n=1,this.storage[this.storageIndex]=t,this.storageIndex+=this.minimumBucketCapacity):(r=o+(n=(n=this.bucketLocators[e+1])===this.maximumBucketCapacity-1?this.truncateBucketToNewerElements(o,n,this.maximumBucketCapacity/2):n),0===this.storage[r]?(this.storage[r]=t,r===this.storageIndex&&(this.storageIndex+=n)):(s.ArrayTools.copyElements(this.storage,o,this.storage,this.storageIndex,n),o=this.storageIndex,this.storageIndex+=n,this.storage[this.storageIndex++]=t,this.storageIndex+=n),n++),this.bucketLocators[e]=o,this.bucketLocators[e+1]=n},e.prototype.truncateBucketToNewerElements=function(e,t,n){return s.ArrayTools.copyElements(this.storage,e+t-n,this.storage,e,n),s.ArrayTools.zeroElements(this.storage,e+n,t-n),n},e.prototype.compact=function(){var e=this.bucketLocators,t=this.storage;this.bucketLocators=new Uint32Array(this.bucketLocators.length),this.storageIndex=1;for(var n=0;n<e.length;n+=2){var r=e[n+1];0!==r&&(this.bucketLocators[n]=this.storageIndex,this.bucketLocators[n+1]=r,this.storageIndex+=Math.max(Math.min(2*r,this.maximumBucketCapacity),this.minimumBucketCapacity))}this.storage=new Uint32Array(8*this.storageIndex);for(n=0;n<e.length;n+=2){var o,i,u=e[n];0!==u&&(o=this.bucketLocators[n],i=this.bucketLocators[n+1],s.ArrayTools.copyElements(t,u,this.storage,o,i))}},e.prototype.getArraySegmentForBucketIndex=function(e,t){var n=this.bucketLocators[e<<=1];return 0===n?null:void 0===t?new s.ArraySegment(this.storage,n,this.bucketLocators[e+1]):t},e.prototype.getUsedBucketCount=function(){return Math.floor(s.ArrayTools.countNonzeroValuesInArray(this.bucketLocators)/2)},e.prototype.getTotalElementCount=function(){for(var e=0,t=0;t<this.bucketLocators.length;t+=2)e+=this.bucketLocators[t+1];return e},s.CompressorCustomHashTable=e}(LZUTF8=LZUTF8||{}),function(r){function e(e){this.maximumBucketCapacity=64,this.buckets=new Array(e)}e.prototype.addValueToBucket=function(e,t){var n=this.buckets[e];void 0===n?this.buckets[e]=[t]:(n.length===this.maximumBucketCapacity-1&&r.ArrayTools.truncateStartingElements(n,this.maximumBucketCapacity/2),n.push(t))},e.prototype.getArraySegmentForBucketIndex=function(e,t){e=this.buckets[e];return void 0===e?null:void 0===t?new r.ArraySegment(e,0,e.length):t},e.prototype.getUsedBucketCount=function(){return r.ArrayTools.countNonzeroValuesInArray(this.buckets)},e.prototype.getTotalElementCount=function(){for(var e=0,t=0;t<this.buckets.length;t++)void 0!==this.buckets[t]&&(e+=this.buckets[t].length);return e},r.CompressorSimpleHashTable=e}(LZUTF8=LZUTF8||{}),function(c){function e(){this.MaximumMatchDistance=32767,this.outputPosition=0}e.prototype.decompressBlockToString=function(e){return e=c.BufferTools.convertToUint8ArrayIfNeeded(e),c.decodeUTF8(this.decompressBlock(e))},e.prototype.decompressBlock=function(e){this.inputBufferRemainder&&(e=c.ArrayTools.concatUint8Arrays([this.inputBufferRemainder,e]),this.inputBufferRemainder=void 0);for(var t=this.cropOutputBufferToWindowAndInitialize(Math.max(4*e.length,1024)),n=0,r=e.length;n<r;n++){var o=e[n];if(o>>>6!=3)this.outputByte(o);else{var i=o>>>5;if(n==r-1||n==r-2&&7==i){this.inputBufferRemainder=e.subarray(n);break}if(e[n+1]>>>7==1)this.outputByte(o);else for(var u=31&o,o=void 0,s=(6==i?(o=e[n+1],n+=1):(o=e[n+1]<<8|e[n+2],n+=2),this.outputPosition-o),a=0;a<u;a++)this.outputByte(this.outputBuffer[s+a])}}return this.rollBackIfOutputBufferEndsWithATruncatedMultibyteSequence(),c.CompressionCommon.getCroppedBuffer(this.outputBuffer,t,this.outputPosition-t)},e.prototype.outputByte=function(e){this.outputPosition===this.outputBuffer.length&&(this.outputBuffer=c.ArrayTools.doubleByteArrayCapacity(this.outputBuffer)),this.outputBuffer[this.outputPosition++]=e},e.prototype.cropOutputBufferToWindowAndInitialize=function(e){if(!this.outputBuffer)return this.outputBuffer=new Uint8Array(e),0;var t=Math.min(this.outputPosition,this.MaximumMatchDistance);if(this.outputBuffer=c.CompressionCommon.getCroppedBuffer(this.outputBuffer,this.outputPosition-t,t,e),this.outputPosition=t,this.outputBufferRemainder){for(var n=0;n<this.outputBufferRemainder.length;n++)this.outputByte(this.outputBufferRemainder[n]);this.outputBufferRemainder=void 0}return t},e.prototype.rollBackIfOutputBufferEndsWithATruncatedMultibyteSequence=function(){for(var e=1;e<=4&&0<=this.outputPosition-e;e++){var t=this.outputBuffer[this.outputPosition-e];if(e<4&&t>>>3==30||e<3&&t>>>4==14||e<2&&t>>>5==6)return this.outputBufferRemainder=this.outputBuffer.subarray(this.outputPosition-e,this.outputPosition),void(this.outputPosition-=e)}},c.Decompressor=e}(LZUTF8=LZUTF8||{}),function(s){var e,t,a,c;e=s.Encoding||(s.Encoding={}),t=e.Base64||(e.Base64={}),a=new Uint8Array([65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,48,49,50,51,52,53,54,55,56,57,43,47]),c=new Uint8Array([255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,62,255,255,255,63,52,53,54,55,56,57,58,59,60,61,255,255,255,0,255,255,255,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,255,255,255,255,255,255,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,255,255,255,255]),t.encode=function(e){return e&&0!=e.length?s.runningInNodeJS()?s.BufferTools.uint8ArrayToBuffer(e).toString("base64"):t.encodeWithJS(e):""},t.decode=function(e){return e?s.runningInNodeJS()?s.BufferTools.bufferToUint8Array(Buffer.from(e,"base64")):t.decodeWithJS(e):new Uint8Array(0)},t.encodeWithJS=function(e,t){if(void 0===t&&(t=!0),!e||0==e.length)return"";for(var n,r=a,o=new s.StringBuilder,i=0,u=e.length;i<u;i+=3)i<=u-3?(n=e[i]<<16|e[i+1]<<8|e[i+2],o.appendCharCode(r[n>>>18&63]),o.appendCharCode(r[n>>>12&63]),o.appendCharCode(r[n>>>6&63]),o.appendCharCode(r[63&n]),n=0):i===u-2?(n=e[i]<<16|e[i+1]<<8,o.appendCharCode(r[n>>>18&63]),o.appendCharCode(r[n>>>12&63]),o.appendCharCode(r[n>>>6&63]),t&&o.appendCharCode(61)):i===u-1&&(n=e[i]<<16,o.appendCharCode(r[n>>>18&63]),o.appendCharCode(r[n>>>12&63]),t&&(o.appendCharCode(61),o.appendCharCode(61)));return o.getOutputString()},t.decodeWithJS=function(e,t){if(!e||0==e.length)return new Uint8Array(0);var n=e.length%4;if(1==n)throw new Error("Invalid Base64 string: length % 4 == 1");2==n?e+="==":3==n&&(e+="="),t=t||new Uint8Array(e.length);for(var r=0,o=e.length,i=0;i<o;i+=4){var u=c[e.charCodeAt(i)]<<18|c[e.charCodeAt(i+1)]<<12|c[e.charCodeAt(i+2)]<<6|c[e.charCodeAt(i+3)];t[r++]=u>>>16&255,t[r++]=u>>>8&255,t[r++]=255&u}return 61==e.charCodeAt(o-1)&&r--,61==e.charCodeAt(o-2)&&r--,t.subarray(0,r)}}(LZUTF8=LZUTF8||{}),function(s){var e;(e=(e=s.Encoding||(s.Encoding={})).BinaryString||(e.BinaryString={})).encode=function(e){if(null==e)throw new TypeError("BinaryString.encode: undefined or null input received");if(0===e.length)return"";for(var t=e.length,n=new s.StringBuilder,r=0,o=1,i=0;i<t;i+=2){var u=void 0,u=i==t-1?e[i]<<8:e[i]<<8|e[i+1];n.appendCharCode(r<<16-o|u>>>o),r=u&(1<<o)-1,15===o?(n.appendCharCode(r),r=0,o=1):o+=1,t-2<=i&&n.appendCharCode(r<<16-o)}return n.appendCharCode(32768|t%2),n.getOutputString()},e.decode=function(e){if("string"!=typeof e)throw new TypeError("BinaryString.decode: invalid input type");if(""==e)return new Uint8Array(0);for(var t,n=new Uint8Array(3*e.length),r=0,o=0,i=0,u=0;u<e.length;u++){var s=e.charCodeAt(u);32768<=s?(32769==s&&r--,i=0):(o=0==i?s:(t=o<<i|s>>>15-i,n[r++]=t>>>8,n[r++]=255&t,s&(1<<15-i)-1),15==i?i=0:i+=1)}return n.subarray(0,r)}}(LZUTF8=LZUTF8||{}),function(e){(e=(e=e.Encoding||(e.Encoding={})).CodePoint||(e.CodePoint={})).encodeFromString=function(e,t){var n=e.charCodeAt(t);if(n<55296||56319<n)return n;e=e.charCodeAt(t+1);if(56320<=e&&e<=57343)return e-56320+(n-55296<<10)+65536;throw new Error("getUnicodeCodePoint: Received a lead surrogate character, char code ".concat(n,", followed by ").concat(e,", which is not a trailing surrogate character code."))},e.decodeToString=function(e){if(e<=65535)return String.fromCharCode(e);if(e<=1114111)return String.fromCharCode(55296+(e-65536>>>10),56320+(e-65536&1023));throw new Error("getStringFromUnicodeCodePoint: A code point of ".concat(e," cannot be encoded in UTF-16"))}}(LZUTF8=LZUTF8||{}),function(e){var r;e=(e=e.Encoding||(e.Encoding={})).DecimalString||(e.DecimalString={}),r=["000","001","002","003","004","005","006","007","008","009","010","011","012","013","014","015","016","017","018","019","020","021","022","023","024","025","026","027","028","029","030","031","032","033","034","035","036","037","038","039","040","041","042","043","044","045","046","047","048","049","050","051","052","053","054","055","056","057","058","059","060","061","062","063","064","065","066","067","068","069","070","071","072","073","074","075","076","077","078","079","080","081","082","083","084","085","086","087","088","089","090","091","092","093","094","095","096","097","098","099","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","244","245","246","247","248","249","250","251","252","253","254","255"],e.encode=function(e){for(var t=[],n=0;n<e.length;n++)t.push(r[e[n]]);return t.join(" ")}}(LZUTF8=LZUTF8||{}),function(e){var t;t=e.Encoding||(e.Encoding={}),(e=t.StorageBinaryString||(t.StorageBinaryString={})).encode=function(e){return t.BinaryString.encode(e).replace(/\0/g,"耂")},e.decode=function(e){return t.BinaryString.decode(e.replace(/\u8002/g,"\0"))}}(LZUTF8=LZUTF8||{}),function(a){var i,t,n,r;i=a.Encoding||(a.Encoding={}),(t=i.UTF8||(i.UTF8={})).encode=function(e){return e&&0!=e.length?a.runningInNodeJS()?a.BufferTools.bufferToUint8Array(Buffer.from(e,"utf8")):t.createNativeTextEncoderAndDecoderIfAvailable()?n.encode(e):t.encodeWithJS(e):new Uint8Array(0)},t.decode=function(e){return e&&0!=e.length?a.runningInNodeJS()?a.BufferTools.uint8ArrayToBuffer(e).toString("utf8"):t.createNativeTextEncoderAndDecoderIfAvailable()?r.decode(e):t.decodeWithJS(e):""},t.encodeWithJS=function(e,t){if(!e||0==e.length)return new Uint8Array(0);t=t||new Uint8Array(4*e.length);for(var n=0,r=0;r<e.length;r++){var o=i.CodePoint.encodeFromString(e,r);if(o<=127)t[n++]=o;else if(o<=2047)t[n++]=192|o>>>6,t[n++]=128|63&o;else if(o<=65535)t[n++]=224|o>>>12,t[n++]=128|o>>>6&63,t[n++]=128|63&o;else{if(!(o<=1114111))throw new Error("Invalid UTF-16 string: Encountered a character unsupported by UTF-8/16 (RFC 3629)");t[n++]=240|o>>>18,t[n++]=128|o>>>12&63,t[n++]=128|o>>>6&63,t[n++]=128|63&o,r++}}return t.subarray(0,n)},t.decodeWithJS=function(e,t,n){if(void 0===t&&(t=0),!e||0==e.length)return"";void 0===n&&(n=e.length);for(var r,o,i=new a.StringBuilder,u=t,s=n;u<s;){if((o=e[u])>>>7==0)r=o,u+=1;else if(o>>>5==6){if(n<=u+1)throw new Error("Invalid UTF-8 stream: Truncated codepoint sequence encountered at position "+u);r=(31&o)<<6|63&e[u+1],u+=2}else if(o>>>4==14){if(n<=u+2)throw new Error("Invalid UTF-8 stream: Truncated codepoint sequence encountered at position "+u);r=(15&o)<<12|(63&e[u+1])<<6|63&e[u+2],u+=3}else{if(o>>>3!=30)throw new Error("Invalid UTF-8 stream: An invalid lead byte value encountered at position "+u);if(n<=u+3)throw new Error("Invalid UTF-8 stream: Truncated codepoint sequence encountered at position "+u);r=(7&o)<<18|(63&e[u+1])<<12|(63&e[u+2])<<6|63&e[u+3],u+=4}i.appendCodePoint(r)}return i.getOutputString()},t.createNativeTextEncoderAndDecoderIfAvailable=function(){return!!n||"function"==typeof TextEncoder&&(n=new TextEncoder("utf-8"),r=new TextDecoder("utf-8"),!0)}}(LZUTF8=LZUTF8||{}),function(o){o.compress=function(e,t){if(void 0===t&&(t={}),null==e)throw new TypeError("compress: undefined or null input received");var n=o.CompressionCommon.detectCompressionSourceEncoding(e);return t=o.ObjectTools.override({inputEncoding:n,outputEncoding:"ByteArray"},t),n=(new o.Compressor).compressBlock(e),o.CompressionCommon.encodeCompressedBytes(n,t.outputEncoding)},o.decompress=function(e,t){if(void 0===t&&(t={}),null==e)throw new TypeError("decompress: undefined or null input received");return t=o.ObjectTools.override({inputEncoding:"ByteArray",outputEncoding:"String"},t),e=o.CompressionCommon.decodeCompressedBytes(e,t.inputEncoding),e=(new o.Decompressor).decompressBlock(e),o.CompressionCommon.encodeDecompressedBytes(e,t.outputEncoding)},o.compressAsync=function(e,t,n){var r;null==n&&(n=function(){});try{r=o.CompressionCommon.detectCompressionSourceEncoding(e)}catch(e){return void n(void 0,e)}t=o.ObjectTools.override({inputEncoding:r,outputEncoding:"ByteArray",useWebWorker:!0,blockSize:65536},t),o.enqueueImmediate(function(){(t.useWebWorker&&o.WebWorker.createGlobalWorkerIfNeeded()?o.WebWorker:o.AsyncCompressor).compressAsync(e,t,n)})},o.decompressAsync=function(e,t,n){var r;null==n&&(n=function(){}),null==e?n(void 0,new TypeError("decompressAsync: undefined or null input received")):(t=o.ObjectTools.override({inputEncoding:"ByteArray",outputEncoding:"String",useWebWorker:!0,blockSize:65536},t),r=o.BufferTools.convertToUint8ArrayIfNeeded(e),o.EventLoop.enqueueImmediate(function(){t.useWebWorker&&o.WebWorker.createGlobalWorkerIfNeeded()?o.WebWorker.decompressAsync(r,t,n):o.AsyncDecompressor.decompressAsync(e,t,n)}))},o.createCompressionStream=function(){return o.AsyncCompressor.createCompressionStream()},o.createDecompressionStream=function(){return o.AsyncDecompressor.createDecompressionStream()},o.encodeUTF8=function(e){return o.Encoding.UTF8.encode(e)},o.decodeUTF8=function(e){return o.Encoding.UTF8.decode(e)},o.encodeBase64=function(e){return o.Encoding.Base64.encode(e)},o.decodeBase64=function(e){return o.Encoding.Base64.decode(e)},o.encodeBinaryString=function(e){return o.Encoding.BinaryString.encode(e)},o.decodeBinaryString=function(e){return o.Encoding.BinaryString.decode(e)},o.encodeStorageBinaryString=function(e){return o.Encoding.StorageBinaryString.encode(e)},o.decodeStorageBinaryString=function(e){return o.Encoding.StorageBinaryString.decode(e)}}(LZUTF8=LZUTF8||{});