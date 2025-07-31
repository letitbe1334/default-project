declare module 'panzoom' {
  interface PanzoomInstance {
    on(event: 'pan' | 'zoom', callback: (event: Event) => void): void
    zoomTo(x: number, y: number, scale: number): void
    // 필요하면 추가 메서드 정의
  }

  export default function panzoom(
    element: HTMLElement,
    options?: {
      autocenter?: boolean
      bounds?: boolean
    }
  ): PanzoomInstance
}
