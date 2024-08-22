import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getCaretCoordinates = (
  element: HTMLInputElement,
  position: number
) => {
  const div = document.createElement("div");
  const copyStyle = getComputedStyle(element);

  for (const prop of copyStyle) {
    (div.style as any)[prop] = (copyStyle as any)[prop];
  }

  div.style.position = "absolute";
  div.style.visibility = "hidden";
  div.style.whiteSpace = "pre-wrap";
  div.style.wordWrap = "break-word";
  div.textContent = element.value.substring(0, position);

  const span = document.createElement("span");
  span.textContent = element.value.substring(position) || ".";
  div.appendChild(span);

  document.body.appendChild(div);

  const { offsetTop: top, offsetLeft: spanLeft } = span;

  const inputRect = element.getBoundingClientRect();
  const inputWidth = inputRect.width;
  const textWidth = div.offsetWidth;

  const left = inputRect.left + spanLeft + (inputWidth - textWidth) / 2;

  document.body.removeChild(div);

  return { top, left };
};
