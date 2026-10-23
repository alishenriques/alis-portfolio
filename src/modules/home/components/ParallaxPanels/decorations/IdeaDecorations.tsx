import type { ComponentType } from "react";

import { Database, Lightbulb, Monitor, Plug, Server, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";

import { Floating } from "./Floating";
import { WindowChrome } from "./WindowChrome";
import { styles } from "../styles/index.styles";

type StackLayer = {
  label: string;
  Icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
};

// The layers of a complete online system, top (what the visitor sees) to bottom.
const STACK_LAYERS: StackLayer[] = [
  { label: "front-end", Icon: Monitor },
  { label: "back-end", Icon: Server },
  { label: "database", Icon: Database },
  { label: "integrations", Icon: Plug },
];

// A 3×2 wall of artworks for the digital-exhibition window; the highlighted one is "on display".
const GALLERY_FRAMES = 6;
const GALLERY_FEATURED = 1;

/**
 * Hero slide 3's decorations (turning ideas into digital products): a light
 * bulb, a creative-site mockup, an online-store product card, a digital
 * exhibition wall and a full-stack diagram (front-end, back-end, database,
 * integrations). Purely decorative; the parent is `aria-hidden`.
 */
export function IdeaDecorations({ active }: { active: boolean }) {
  return (
    <div data-decor="ideas" data-active={active} className={active ? styles.group : styles.groupHidden}>
      <Floating rotate={-4} depth={-0.5} className={cn(styles.panelBase, styles.sitePanel)}>
        <WindowChrome title="my-idea.app" />
        <div className={styles.siteBody}>
          <span className={styles.siteHeadline} />
          <span className={styles.siteLine} />
          <span className={styles.siteLineShort} />
          <span className={styles.siteButton} />
        </div>
      </Floating>

      <Floating rotate={5} depth={0.6} className={cn(styles.panelBase, styles.bulbTile)}>
        <Lightbulb size={44} aria-hidden={true} />
      </Floating>

      <Floating rotate={-3} depth={-0.4} className={cn(styles.panelBase, styles.storePanel)}>
        <WindowChrome title="store" />
        <div className={styles.storeBody}>
          <span className={styles.storeImage} />
          <div className={styles.storeRow}>
            <span className={styles.storePrice}>R$ 149,90</span>
            <span className={styles.storeCart}>
              <ShoppingCart size={12} aria-hidden={true} />
            </span>
          </div>
        </div>
      </Floating>

      <Floating rotate={3} depth={0.4} className={cn(styles.panelBase, styles.stackPanel)}>
        <WindowChrome title="full stack" />
        <ul className={styles.stackList}>
          {STACK_LAYERS.map(({ label, Icon }) => (
            <li key={label} className={styles.stackItem}>
              <Icon size={12} aria-hidden={true} />
              {label}
            </li>
          ))}
        </ul>
      </Floating>

      <Floating rotate={4} depth={0.9} className={cn(styles.panelBase, styles.galleryPanel)}>
        <WindowChrome title="exhibition" />
        <div className={styles.galleryGrid}>
          {Array.from({ length: GALLERY_FRAMES }, (_, index) => (
            <span key={index} className={index === GALLERY_FEATURED ? styles.galleryFrameFeatured : styles.galleryFrame} />
          ))}
        </div>
      </Floating>
    </div>
  );
}
