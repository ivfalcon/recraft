import { RecraftElement } from "./types/index.ts";

function recraft(
  type: keyof HTMLElementTagNameMap,
  props: Record<string, string>,
  ...args: string[]
): RecraftElement {
  const children = ([] as RecraftElement[]).concat(...args);
  return {
    type,
    props,
    children,
  };
}

function changed(node1: RecraftElement, node2: RecraftElement) {
  if (typeof node1 !== 'string' && typeof node2 !== 'string') {
    return node1.type !== node2.type;
  }
  return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2;
}

function updateElement(parent: HTMLElement | null, newNode?: RecraftElement, oldNode?: RecraftElement, index = 0) {
  if (!parent) return;
  if (!oldNode && newNode) {
    parent.appendChild(
      render(newNode)
    );
  } else if (!newNode) {
    parent.removeChild(
      parent.childNodes[index]
    );
  } else if (oldNode && changed(newNode, oldNode)) {
    parent.replaceChild(
      render(newNode),
      parent.childNodes[index]
    );
  } else if (typeof newNode !== 'string' && oldNode && typeof oldNode !== 'string' && newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;

    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        parent.childNodes[index] as HTMLElement,
        // @ts-ignore
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

function render(node: RecraftElement) {
  if (typeof node === 'string') {
    console.log('NODE is sring:', node)
    return document.createTextNode(node);
  }

  if (typeof node.type === "function") {
    const result = node.type(node.props);
    return render(result);
  }
  const element = document.createElement(node.type);

  if (node.props) {
    Object.keys(node.props).forEach((key) => {
      element.setAttribute(key, node.props[key]);
    });
  }

  node.children.forEach((child) => {
    if (typeof child === "string") {
      return element.appendChild(document.createTextNode(child));
    }
    return element.appendChild(render(child));
  });

  return element;
}

const title = (
  <h1 class="title" style="text-decoration: underline">
    Hola mundo!
  </h1>
);

const Subtitle = ({ text }: { text: string }) => <h2>{text}</h2>;

const Menu = (
  { name, secondName, thirdName }: {
    name: string;
    secondName: string;
    thirdName: string;
  },
) => (
  <ul>
    <li>{name}</li>
    <li>{secondName}</li>
    <li>{thirdName}</li>
  </ul>
);

document.body.appendChild(render(title));
document.body.appendChild(
  render(<Subtitle text="probando componentes funcionales" />),
);
document.body.appendChild(
  render(<Subtitle text="otro subtitle reutilizado" />),
);

document.body.appendChild(
  render(<Menu name="Ivan" secondName="Flores" thirdName="Alcón" />),
);

const a = (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const b = (
  <ul>
    <li>item 1</li>
    <li>hello!</li>
  </ul>
);

const $root = document.getElementById('root');
const $reload = document.getElementById('reload');

updateElement($root, a);
$reload?.addEventListener('click', () => {
  updateElement($root, b, a);
});

const foo = 'hey';

document.body.appendChild(
  render(foo),
);
