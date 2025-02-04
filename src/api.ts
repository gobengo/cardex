import { Link, UnknownLink } from 'multiformats/link'
import { Writer } from './writer/api'
import { Reader, ReadResult } from './reader/api'

export type CARLink = Link<Uint8Array, 0x0202>

export type MultihashCodec = number
export type DigestLength = number

export type Await<T> = T | PromiseLike<T>

export interface IndexItem {
  digest: Uint8Array
  offset: number
}

export interface ReaderState {
  bytesReader: BytesReaderState
}

export interface BytesReaderState {
  pos: number
  have: number
  offset: number
  currentChunk: Uint8Array
}

export interface CloseOptions {
  releaseLock?: boolean
  closeWriter?: boolean
}

export interface IndexWriter<S> {
  writer: Writer<Uint8Array>
  state: S
  add (cid: UnknownLink, offset: number): Await<IndexWriter<S>>
  close (options?: CloseOptions): Await<void>
}

export interface IndexReader<S extends ReaderState = ReaderState, V extends IndexItem = IndexItem> {
  reader: Reader<Uint8Array>
  state: S
  read (): Await<ReadResult<V>>
  cancel (reason?: any): Await<void>
}
