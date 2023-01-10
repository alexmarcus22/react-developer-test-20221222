declare type ResponseState = {
  data: Data[],
  loading: boolean,
  errResp: {
    errMsg: string
  }
}

declare type Data = {
  id: number,
  timestamp: number,
  diff: diff[]
}

declare type ProjectData = {
  id: number,
  timestamp: number,
  diff: diff[]
}

declare type Responses = {
  users: ResponseState,
  projects: ResponseState
}

declare interface diff {
  name: string,
  oldValue: string,
  newValue: string
}
