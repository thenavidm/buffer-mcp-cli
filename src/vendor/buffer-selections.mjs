/** Buffer @bufferapp/cli 1.2.2 selection renderer, ISC. See THIRD_PARTY_NOTICES.md. */
const ALL_FIELDS_TOKEN = "all";
function emptyPathTree() {
  return { includeAll: false, children: {} };
}
function fullPathTree() {
  return { includeAll: true, children: {} };
}
function pathTreeIsEmpty(tree) {
  return !tree.includeAll && Object.keys(tree.children).length === 0;
}
function buildPathTree(paths) {
  const root = emptyPathTree();
  for (const path of paths) {
    if (path === ALL_FIELDS_TOKEN) {
      return fullPathTree();
    }
    const segments = path.split(".").filter((segment) => segment.length > 0);
    if (segments.length === 0) {
      continue;
    }
    let cursor = root;
    for (const segment of segments) {
      cursor.children[segment] ??= emptyPathTree();
      cursor = cursor.children[segment];
    }
    cursor.includeAll = true;
  }
  return root;
}
function pad(n) {
  return " ".repeat(n);
}
function wrapBlock(label, inner, indent) {
  const indentation = pad(indent);
  return `${indentation}${label} {
${inner}
${indentation}}`;
}
function childPathsFor(paths, key) {
  return paths.includeAll ? fullPathTree() : paths.children[key];
}
function tryResolveInputPath(ctx, path) {
  const joined = path.join(".");
  if (ctx.inputPaths.includes(joined)) {
    ctx.resolvedPaths.add(joined);
  }
}
function pickMatchingPaths(paths, fieldNames) {
  if (paths.includeAll) {
    return fullPathTree();
  }
  return {
    includeAll: false,
    children: Object.fromEntries(
      Object.entries(paths.children).filter(([key]) => fieldNames.has(key))
    )
  };
}
function renderMemberBlocks(members, paths, ctx) {
  const lines = [];
  for (const [memberName, memberNode] of Object.entries(members)) {
    if (memberNode.kind !== "object") continue;
    const memberFieldNames = new Set(Object.keys(memberNode.fields));
    const memberPaths = pickMatchingPaths(paths, memberFieldNames);
    if (pathTreeIsEmpty(memberPaths)) continue;
    const inner = renderNode(memberNode, memberPaths, {
      ...ctx,
      indent: ctx.indent + 2
    });
    if (inner.length > 0) {
      lines.push(wrapBlock(`... on ${memberName}`, inner, ctx.indent));
    }
  }
  return lines;
}
function renderObject(node, paths, ctx) {
  const fieldNames = paths.includeAll ? Object.keys(node.fields) : Object.keys(paths.children);
  const lines = [];
  for (const fieldName of fieldNames) {
    const child = node.fields[fieldName];
    const requestedPath = [...ctx.basePath, fieldName].join(".");
    if (child === void 0) {
      ctx.unknownPaths.push(requestedPath);
      continue;
    }
    tryResolveInputPath(ctx, [...ctx.basePath, fieldName]);
    if (child.kind === "leaf") {
      lines.push(`${pad(ctx.indent)}${fieldName}`);
      continue;
    }
    const childPaths = paths.includeAll ? fullPathTree() : paths.children[fieldName];
    const inner = renderNode(child, childPaths, {
      ...ctx,
      indent: ctx.indent + 2,
      basePath: [...ctx.basePath, fieldName]
    });
    if (inner.length > 0) {
      lines.push(wrapBlock(fieldName, inner, ctx.indent));
    }
  }
  return lines.join("\n");
}
function renderConnection(node, paths, ctx) {
  const itemsRequested = childPathsFor(paths, "items");
  const pageInfoRequested = childPathsFor(paths, "pageInfo");
  const lines = [];
  if (itemsRequested !== void 0) {
    tryResolveInputPath(ctx, [...ctx.basePath, "items"]);
    const inner = renderNode(node.items, itemsRequested, {
      ...ctx,
      indent: ctx.indent + 4,
      basePath: [...ctx.basePath, "items"]
    });
    lines.push(
      wrapBlock("edges", wrapBlock("node", inner, ctx.indent + 2), ctx.indent)
    );
  }
  if (pageInfoRequested !== void 0) {
    tryResolveInputPath(ctx, [...ctx.basePath, "pageInfo"]);
    if (node.pageInfo.kind === "object") {
      const inner = renderNode(node.pageInfo, pageInfoRequested, {
        ...ctx,
        indent: ctx.indent + 2,
        basePath: [...ctx.basePath, "pageInfo"]
      });
      lines.push(wrapBlock("pageInfo", inner, ctx.indent));
    }
  }
  return lines.join("\n");
}
function markTypenameResolved(paths, ctx) {
  if (paths.includeAll || "__typename" in paths.children) {
    tryResolveInputPath(ctx, [...ctx.basePath, "__typename"]);
  }
}
function renderUnion(node, paths, ctx) {
  markTypenameResolved(paths, ctx);
  const { blocks, rendered } = renderUnionMembers(node.members, paths, ctx);
  const errorBlocks = renderErrorMemberBlocks(node, rendered, ctx);
  return [`${pad(ctx.indent)}__typename`, ...blocks, ...errorBlocks].join("\n");
}
function renderUnionMembers(members, paths, ctx) {
  const blocks = [];
  const rendered = /* @__PURE__ */ new Set();
  for (const [memberName, memberNode] of Object.entries(members)) {
    if (memberNode.kind !== "object") continue;
    const memberFieldNames = new Set(Object.keys(memberNode.fields));
    const memberPaths = pickMatchingPaths(paths, memberFieldNames);
    if (pathTreeIsEmpty(memberPaths)) continue;
    const inner = renderNode(memberNode, memberPaths, {
      ...ctx,
      indent: ctx.indent + 2
    });
    if (inner.length > 0) {
      blocks.push(wrapBlock(`... on ${memberName}`, inner, ctx.indent));
      rendered.add(memberName);
    }
  }
  return { blocks, rendered };
}
function renderErrorMemberBlocks(node, alreadyRendered, ctx) {
  const errorMembers = node.errorMembers;
  if (!errorMembers || errorMembers.length === 0) return [];
  const blocks = [];
  for (const memberName of errorMembers) {
    if (alreadyRendered.has(memberName)) continue;
    const member = node.members[memberName];
    if (!member || member.kind !== "object") continue;
    if (member.fields.message === void 0) continue;
    const inner = `${pad(ctx.indent + 2)}message`;
    blocks.push(wrapBlock(`... on ${memberName}`, inner, ctx.indent));
  }
  return blocks;
}
function renderInterface(node, paths, ctx) {
  markTypenameResolved(paths, ctx);
  const lines = [`${pad(ctx.indent)}__typename`];
  const sharedFieldNames = new Set(Object.keys(node.shared));
  const sharedPaths = pickMatchingPaths(paths, sharedFieldNames);
  const sharedInner = renderObject(
    { kind: "object", fields: node.shared },
    sharedPaths,
    ctx
  );
  if (sharedInner.length > 0) {
    lines.push(sharedInner);
  }
  lines.push(...renderMemberBlocks(node.impls, paths, ctx));
  return lines.join("\n");
}
function renderNode(node, paths, ctx) {
  switch (node.kind) {
    case "leaf":
      return "";
    case "object":
      return renderObject(node, paths, ctx);
    case "connection":
      return renderConnection(node, paths, ctx);
    case "union":
      return renderUnion(node, paths, ctx);
    case "interface":
      return renderInterface(node, paths, ctx);
  }
}
function renderSelections(tree, paths, baseIndent = 4) {
  const pathTree = buildPathTree(paths);
  const inputPaths = paths.filter((path) => path !== ALL_FIELDS_TOKEN);
  const ctx = {
    indent: baseIndent,
    basePath: [],
    unknownPaths: [],
    resolvedPaths: /* @__PURE__ */ new Set(),
    inputPaths
  };
  const selections = renderNode(tree, pathTree, ctx);
  const unresolved = inputPaths.filter(
    (path) => !ctx.resolvedPaths.has(path) && !ctx.unknownPaths.includes(path)
  );
  return {
    selections,
    unknownPaths: [...ctx.unknownPaths, ...unresolved]
  };
}
function collectAllPaths(tree) {
  const out = [];
  walkTree(tree, [], out);
  return [...new Set(out)];
}
function walkTree(node, path, out) {
  switch (node.kind) {
    case "leaf":
      if (path.length > 0) {
        out.push(path.join("."));
      }
      return;
    case "object":
      for (const [name, child] of Object.entries(node.fields)) {
        walkTree(child, [...path, name], out);
      }
      return;
    case "connection":
      walkTree(node.items, [...path, "items"], out);
      walkTree(node.pageInfo, [...path, "pageInfo"], out);
      return;
    case "union":
      out.push(joinPath(path, "__typename"));
      for (const memberNode of Object.values(node.members)) {
        walkTree(memberNode, path, out);
      }
      return;
    case "interface":
      out.push(joinPath(path, "__typename"));
      for (const [name, child] of Object.entries(node.shared)) {
        walkTree(child, [...path, name], out);
      }
      for (const implNode of Object.values(node.impls)) {
        walkTree(implNode, path, out);
      }
  }
}
function joinPath(path, leaf) {
  return path.length === 0 ? leaf : `${path.join(".")}.${leaf}`;
}

export {renderSelections,collectAllPaths};
