declare namespace MusicKit {
  /**
   * Event definitions for MusicKit instance notifications.
   * 
   * This interface maps event names to their corresponding payload types.
   * Use these events to respond to changes in playback state, authorization,
   * user interactions, and other MusicKit operations.
   * 
   * @example
   * ```typescript
   * musicKit.addEventListener('playbackStateDidChange', (event) => {
   *   console.log('Playback state changed to:', event.state);
   * });
   * ```
   */
  interface Events {
    /**
     * Fired when the user's Apple Music authorization status changes.
     * 
     * This event occurs when a user grants, denies, or revokes permission
     * to access their Apple Music account.
     */
    authorizationStatusDidChange: { authorizationStatus: AuthStatus };

    /**
     * Fired before the authorization status is about to change.
     * 
     * This event allows you to prepare your UI for authorization changes
     * before they occur.
     */
    authorizationStatusWillChange: unknown;

    /**
     * Fired when a user is eligible to see Apple Music subscription offers.
     * 
     * Use this event to display subscription prompts or upgrade offers
     * at appropriate times.
     */
    eligibleForSubscribeView: unknown;

    /**
     * Fired when the MusicKit library has finished loading.
     * 
     * This event indicates that all MusicKit APIs are ready for use.
     */
    loaded: unknown;

    /**
     * Fired when enough audio data has been buffered to begin playback.
     * 
     * This event indicates that the player has sufficient data to start
     * playing without immediate buffering interruptions.
     */
    mediaCanPlay: unknown;

    /**
     * Fired after the currently playing media item has changed.
     * 
     * This event provides the new media item that is now active.
     */
    mediaItemStateDidChange: MediaItem;

    /**
     * Fired before the currently playing media item is about to change.
     * 
     * This event provides the media item that will become active.
     */
    mediaItemStateWillChange: MediaItem;

    /**
     * Fired when a playback error occurs.
     * 
     * This event provides error information when playback fails due to
     * network issues, DRM problems, or other playback-related errors.
     */
    mediaPlaybackError: { message: string };

    /**
     * Fired when media item metadata has finished loading.
     * 
     * This event occurs when additional metadata (like lyrics, artwork,
     * or extended attributes) becomes available for the current item.
     */
    metadataDidChange: unknown;

    /**
     * Fired when the audio playback bitrate changes.
     * 
     * This event indicates quality changes due to network conditions
     * or user preferences.
     */
    playbackBitrateDidChange: { bitrate: number };

    /**
     * Fired when the total duration of the current media item changes.
     * 
     * This typically occurs when transitioning between items or when
     * duration metadata becomes available.
     */
    playbackDurationDidChange: unknown;

    /**
     * Fired when the amount of buffered audio data changes.
     * 
     * Use this event to display buffer progress indicators in your UI.
     */
    bufferedProgressDidChange: { progress: number };

    /**
     * Fired when playback progress updates during playback.
     * 
     * This event fires regularly during playback to indicate how much
     * of the current item has been played.
     */
    playbackProgressDidChange: { progress: number };

    /**
     * Fired after the playback state changes.
     * 
     * This event indicates transitions between playing, paused, stopped,
     * loading, and other playback states.
     */
    playbackStateDidChange: { 
      /** The currently active media item. */
      nowPlayingItem: MusicKit.MediaItem; 
      /** The previous playback state. */
      oldState: PlaybackStates; 
      /** The new current playback state. */
      state: PlaybackStates 
    };

    /**
     * Fired before the playback state is about to change.
     * 
     * This event allows you to prepare your UI for playback state
     * transitions before they occur.
     */
    playbackStateWillChange: { 
      /** The currently active media item. */
      nowPlayingItem: MusicKit.MediaItem; 
      /** The current playback state. */
      oldState: PlaybackStates; 
      /** The playback state that will become active. */
      state: PlaybackStates 
    };

    /**
     * Fired when AirPlay or other playback target availability changes.
     * 
     * This event indicates when external playback devices (like AirPlay
     * speakers) become available or unavailable.
     */
    playbackTargetAvailableDidChange: unknown;

    /**
     * Fired when the current playback time position changes.
     * 
     * This event provides detailed timing information about the current
     * playback position and remaining time.
     */
    playbackTimeDidChange: { 
      /** Total duration of the current item in seconds. */
      currentPlaybackDuration: number; 
      /** Current playback position in seconds. */
      currentPlaybackTime: number; 
      /** Remaining time in seconds. */
      currentPlaybackTimeRemaining: number; 
    };

    /**
     * Fired when the player volume changes.
     * 
     * This event occurs when the user adjusts volume through your UI
     * or system controls.
     */
    playbackVolumeDidChange: Event;

    /**
     * Fired when another MusicKit player becomes primary.
     * 
     * This event occurs when playback starts in another browser tab or
     * application, causing this instance to become secondary.
     */
    primaryPlayerDidChange: unknown;

    /**
     * Fired when the playback queue contents change.
     * 
     * This event occurs when items are added, removed, or reordered
     * in the playback queue.
     */
    queueItemsDidChange: MediaItem[];

    /**
     * Fired when the current position in the playback queue changes.
     * 
     * This event occurs when skipping tracks or manually changing
     * the queue position.
     */
    queuePositionDidChange: { 
      /** The previous queue position. */
      oldPosition: number; 
      /** The new queue position. */
      position: number 
    };

    /**
     * Fired when the user's storefront country code changes.
     * 
     * This event occurs when the detected or configured regional
     * storefront changes, affecting available content.
     */
    storefrontCountryCodeDidChange: unknown;

    /**
     * Fired when the storefront identifier changes.
     * 
     * This event indicates changes to the iTunes Store region,
     * which affects content availability and pricing.
     */
    storefrontIdentifierDidChange: unknown;

    /**
     * Fired when the user's authentication token changes.
     * 
     * This event occurs during login, logout, or token refresh operations.
     */
    userTokenDidChange: { userToken: string };

    /**
     * Fired when the currently playing item changes.
     * 
     * This is similar to `mediaItemStateDidChange` but provides the item
     * in a different payload format.
     */
    nowPlayingItemDidChange: { item: MediaItem };

    /**
     * Fired when the repeat mode setting changes.
     * 
     * This event indicates changes between no repeat, repeat all,
     * and repeat one modes.
     */
    repeatModeDidChange: PlayerRepeatMode;

    /**
     * Fired when the shuffle mode setting changes.
     * 
     * This event indicates when shuffle is enabled or disabled.
     */
    shuffleModeDidChange: PlayerShuffleMode;

    /**
     * Fired when the autoplay setting changes.
     * 
     * This event indicates when automatic playlist continuation
     * is enabled or disabled.
     */
    autoplayEnabledDidChange: boolean;

    /**
     * Fired when timed metadata is received during playback.
     * 
     * This event provides synchronized metadata like chapter information,
     * lyrics timing, or other time-based data embedded in the audio stream.
     */
    timedMetadataDidChange: {
      /** Album name from the metadata. */
      album: string;
      /** Binary metadata blob if available. */
      blob: Blob;
      /** Array of related links with descriptions. */
      links: { description: string, url: string }[];
      /** Performer or artist name from the metadata. */
      performer: string;
      /** Storefront-specific Adam IDs for the content. */
      storefrontAdamIds: {[id: string]: string};
      /** Track or content title from the metadata. */
      title: string;
    };

    /**
     * Fired when the underlying HTML media element is created.
     * 
     * This event provides access to the native audio element used
     * for playback, useful for advanced audio manipulation.
     */
    mediaElementCreated: { mediaElement: unknown };
  }
}
