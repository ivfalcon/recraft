(() => {
  // app.tsx
  function recraft(type, props, ...args) {
    const children = [].concat(...args);
    return {
      type,
      props,
      children
    };
  }
  function changed(node1, node2) {
    if (typeof node1 !== "string" && typeof node2 !== "string") {
      return node1.type !== node2.type;
    }
    return typeof node1 !== typeof node2 || typeof node1 === "string" && node1 !== node2;
  }
  function updateElement(parent, newNode, oldNode, index = 0) {
    if (!parent)
      return;
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
    } else if (typeof newNode !== "string" && oldNode && typeof oldNode !== "string" && newNode.type) {
      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;
      for (let i = 0; i < newLength || i < oldLength; i++) {
        updateElement(
          parent.childNodes[index],
          // @ts-ignore
          newNode.children[i],
          oldNode.children[i],
          i
        );
      }
    }
  }
  function render(node) {
    if (typeof node === "string") {
      console.log("NODE is sring:", node);
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
  var title = /* @__PURE__ */ recraft("h1", { class: "title", style: "text-decoration: underline" }, "Hola mundo!");
  var Subtitle = ({ text }) => /* @__PURE__ */ recraft("h2", null, text);
  var Menu = ({ name, secondName, thirdName }) => /* @__PURE__ */ recraft("ul", null, /* @__PURE__ */ recraft("li", null, name), /* @__PURE__ */ recraft("li", null, secondName), /* @__PURE__ */ recraft("li", null, thirdName));
  document.body.appendChild(render(title));
  document.body.appendChild(
    render(/* @__PURE__ */ recraft(Subtitle, { text: "probando componentes funcionales" }))
  );
  document.body.appendChild(
    render(/* @__PURE__ */ recraft(Subtitle, { text: "otro subtitle reutilizado" }))
  );
  document.body.appendChild(
    render(/* @__PURE__ */ recraft(Menu, { name: "Ivan", secondName: "Flores", thirdName: "Alc\xF3n" }))
  );
  var a = /* @__PURE__ */ recraft("ul", null, /* @__PURE__ */ recraft("li", null, "item 1"), /* @__PURE__ */ recraft("li", null, "item 2"));
  var b = /* @__PURE__ */ recraft("ul", null, /* @__PURE__ */ recraft("li", null, "item 1"), /* @__PURE__ */ recraft("li", null, "hello!"));
  var $root = document.getElementById("root");
  var $reload = document.getElementById("reload");
  updateElement($root, a);
  $reload?.addEventListener("click", () => {
    updateElement($root, b, a);
  });
  var foo = "hey";
  document.body.appendChild(
    render(foo)
  );
})();
