export type RecraftElement = {
    type: keyof HTMLElementTagNameMap | ((props: Record<string, string>) => RecraftElement);
    props: Record<string, string>;
    children: (string | RecraftElement)[];
  } | string;