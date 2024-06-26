type _Equals1<A1, A2> = A1 extends A2 ? (A2 extends A1 ? 1 : 0) : 0;
type _Equals2<A1, A2> =
  (<A>() => A extends A2 ? 1 : 0) extends <A>() => A extends A1 ? 1 : 0 ? 1 : 0;

export type Equals<A1, A2> = _Equals1<A1, A2> extends 1 ? 1 : _Equals2<A1, A2>;
