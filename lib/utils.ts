import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function splitContactInfoFromHTML(html: string): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const elements = doc.body.querySelectorAll("p, a, br, strong, h1, i");
  console.log(html);
  const result: string[] = [];
  elements.forEach((element) => {
    if (element.tagName === "A") {
      // Extract text from anchor tags
      result.push(element.textContent || "");
    } else if (element.tagName === "P") {
      // Split content inside <p> by <br> and trim
      result.push(
        ...element.innerHTML.split("<br>").map((line) => line.trim())
      );
    } else if (
      element.tagName == "STRONG" ||
      element.tagName === "H1" ||
      element.tagName === "I"
    ) {
      // Extract text from <strong>, <h1>, and <i> tags
      console.log(element.firstChild?.textContent);
      result.push(element.firstChild?.textContent || "");
    }
  });

  return result.filter(Boolean); // Remove empty strings
}
