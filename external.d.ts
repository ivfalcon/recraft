type RecraftElement = {
  type: keyof HTMLElementTagNameMap | ((props: Record<string, string>) => RecraftElement);
  props: Record<string, string>;
  children: (string | RecraftElement)[];
}  | string;

// external.d.ts
declare module JSX {
    type Element = RecraftElement;
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }