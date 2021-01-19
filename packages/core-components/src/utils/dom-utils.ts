import { isFocusable, isHidden } from '@a11y/focus-trap/focusable';

/*
 * The MIT License (MIT)
 *
 * Copyright © 2018 Andreas Mehlsen andmehlsen@gmail.com
 * 
 * Modifications Copyright 2020 Okta, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
 */

/**
 * Traverses the slots of the open shadowroots and returns all children matching the query.
 * We need to traverse each child-depth one at a time because if an element should be skipped
 * (for example because it is hidden) we need to skip all of it's children. If we use querySelectorAll("*")
 * the information of whether the children is within a hidden parent is lost.
 * @param {ShadowRoot | HTMLElement} root
 * @param skipNode
 * @param isMatch
 * @param {number} maxDepth
 * @param {number} depth
 * @returns {HTMLElement[]}
 */
export const advancedQuerySelector = (root: ShadowRoot | HTMLElement,
  skipNode: ((elem: HTMLElement) => boolean),
  isMatch: ((elem: HTMLElement) => boolean),
  maxDepth: number = 20,
  depth: number = 0): HTMLElement[] => {
  let matches: HTMLElement[] = [];

  // If the depth is above the max depth, abort the searching here.
  if (depth >= maxDepth) {
    return matches;
  }

  // Traverses a slot element
  const traverseSlot = (slot: HTMLSlotElement) => {

    // Only check nodes that are of the type Node.ELEMENT_NODE
    // Read more here https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    const assignedNodes = slot.assignedNodes().filter(node => node.nodeType === 1);
    for (const slotNode of assignedNodes) {
      matches.push(...advancedQuerySelector(<HTMLElement>slotNode, skipNode, isMatch, maxDepth, depth + 1));
    }

    return [];
  };

  let currentElement = <HTMLElement>root;
  if (currentElement.shadowRoot) {
    root = currentElement.shadowRoot;
  }

  // Go through each child and continue the traversing if necessary
  // Even though the typing says that children can't be undefined, Edge 15 sometimes gives an undefined value.
  // Therefore we fallback to an empty array if it is undefined.
  const children = <HTMLElement[]>Array.from(root.children || []);
  for (const child of children) {

    // Check if the element and its descendants should be skipped
    if (skipNode(child)) {
      continue;
    }

    // If the element matches we always add it
    if (isMatch(child)) {
      matches.push(child);
    }

    if (child.shadowRoot != null) {

      // If the element has a shadow root we need to traverse it
      matches.push(...advancedQuerySelector(child.shadowRoot, skipNode, isMatch, maxDepth, depth + 1));

    } else if (child.tagName === "SLOT") {

      // If the child is a slot we need to traverse each assigned node
      matches.push(...traverseSlot(<HTMLSlotElement>child));

    } else {

      // Traverse the children of the element
      matches.push(...advancedQuerySelector(child, skipNode, isMatch, maxDepth, depth + 1));
    }
  }

  return matches;
}

export const getFocusableElements = (element: HTMLElement) => {
  return advancedQuerySelector(element, isHidden, isFocusable);
}

export const getActiveElement = (): HTMLElement => {
  let activeElement: HTMLElement = <HTMLElement> document.activeElement;
  while (activeElement && activeElement.shadowRoot) {
    activeElement = <HTMLElement> activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}
