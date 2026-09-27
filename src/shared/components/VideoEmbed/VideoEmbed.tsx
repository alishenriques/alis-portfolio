import { Play } from "lucide-react";

import { styles } from "./styles/index.styles";

export type VideoEmbedProps = {
  /**
   * YouTube video id (the part after `v=` or `youtu.be/`). Omit to render a
   * "coming soon" placeholder in the same 16:9 frame, so the final layout can
   * be previewed before the video is actually uploaded/linked.
   */
  youtubeId?: string;
  /** Accessible name for the embedded player, or for the placeholder. Not a visible heading — the caller renders its own if it wants one. */
  title: string;
  /** Caption shown in the placeholder while `youtubeId` isn't set yet — a prop, not hardcoded, so any caller can phrase it for its own context. */
  comingSoonText: string;
};

/**
 * A responsive 16:9 video frame. With `youtubeId`, embeds the real
 * youtube-nocookie.com player; without it, shows a placeholder (dashed
 * border, play icon, `comingSoonText`) in the exact same frame, so a page can
 * ship the final layout ahead of the real video.
 */
export function VideoEmbed({ youtubeId, title, comingSoonText }: VideoEmbedProps) {
  return (
    <div className={styles.frame}>
      {youtubeId ? (
        <iframe
          className={styles.media}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={title}>
          <span className={styles.playIcon} aria-hidden="true">
            <Play size={24} fill="currentColor" />
          </span>
          <p className={styles.placeholderText}>{comingSoonText}</p>
        </div>
      )}
    </div>
  );
}
