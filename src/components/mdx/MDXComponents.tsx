import { Callout } from "./Callout";
import { KeyConcept } from "./KeyConcept";
import { AnalogyBlock } from "./AnalogyBlock";
import { ThinkAbout } from "./ThinkAbout";
import { InlineDefinition } from "./InlineDefinition";
import { DifficultyBadge } from "./DifficultyBadge";
import { PillarBadge } from "./PillarBadge";
import type { MDXComponents as MDXComponentsType } from "mdx/types";

// Map of custom components available in MDX files
export const mdxComponents: MDXComponentsType = {
  Callout,
  KeyConcept,
  AnalogyBlock,
  ThinkAbout,
  InlineDefinition,
  DifficultyBadge,
  PillarBadge,
};
