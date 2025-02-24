import { GraphData } from "./graph";


export type State = 'IDLE' |
  'SCHEDULED' |
  'PENDING' |
  'RUNNING' |
  'COMPLETED' |
  'FAILED' |
  'CRASHED' |
  'ARCHIVED' |
  'DELETED' |
  'CANCELLING' |
  'CANCELLED';


export interface DataState {
  name: string | null;
  state: State;
  data: GraphData | null;
  error: string | null;
  message: string | null;
}