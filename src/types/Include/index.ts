/**
 * T가 N의 부분집합이면(할당 가능하다면), T를 반환
 * 그렇지 않으면 never를 반환
 *
 * 주어진 타입 T가 다른 타입 N에 포함되는지를 검사
 */
export type Include<T, N> = T extends N ? T : never;
