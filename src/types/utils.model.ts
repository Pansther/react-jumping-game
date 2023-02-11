export type SetStateType<T> = (
  state: Partial<T> | ((prev: T) => Partial<T>)
) => void;

export interface PositionType {
  x: number;
  y: number;
}
