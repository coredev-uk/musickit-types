declare namespace MusicKit {
    /**
     * Configuration options for setting up the playback queue.
     * 
     * This interface defines the various ways to populate the music player's queue.
     * You can specify content by ID, URL, or pre-loaded media items. Only one
     * content source should be provided per queue operation.
     * 
     * @example
     * ```typescript
     * // Queue a single song
     * await musicKit.setQueue({ song: 'songId123' });
     * 
     * // Queue multiple songs with custom start position
     * await musicKit.setQueue({ 
     *   songs: ['song1', 'song2', 'song3'], 
     *   startPosition: 1 
     * });
     * 
     * // Queue an album
     * await musicKit.setQueue({ album: 'albumId456' });
     * ```
     */
    interface SetQueueOptions {
        /**
         * Apple Music catalog album identifier.
         * 
         * When provided, the entire album's track listing will be added to the queue
         * in the album's original track order.
         */
        album?: string | undefined;

        /**
         * Pre-loaded media items to add to the queue.
         * 
         * Use this option when you have already constructed MediaItem objects
         * and want to queue them directly without additional API calls.
         */
        items?: Descriptor[] | undefined;

        /**
         * Additional query parameters for API requests.
         * 
         * These parameters are passed to the underlying Apple Music API calls
         * when fetching content for the queue. Useful for specifying relationships,
         * localization, or other API options.
         */
        parameters?: QueryParameters | undefined;

        /**
         * Apple Music catalog playlist identifier.
         * 
         * When provided, all tracks from the playlist will be added to the queue
         * in their playlist order. Note that some tracks may be unavailable
         * depending on the user's subscription and regional restrictions.
         */
        playlist?: string | undefined;

        /**
         * Single Apple Music catalog song identifier.
         * 
         * Use this option to queue a single track. The song will be the only
         * item in the queue unless autoplay is enabled.
         */
        song?: string | undefined;

        /**
         * Array of Apple Music catalog song identifiers.
         * 
         * Use this option to queue multiple specific tracks. The songs will be
         * added to the queue in the order provided in the array.
         */
        songs?: string[] | undefined;

        /**
         * Array of Apple Music catalog music video identifiers.
         * 
         * Use this option to queue music videos for playback. Note that video
         * playback may have different requirements and limitations compared
         * to audio-only content.
         */
        musicVideos?: string[] | undefined;

        /**
         * Apple Music catalog station identifier.
         * 
         * When provided, the station's content will be used to populate the queue.
         * Stations typically provide continuous, auto-generated playlists.
         */
        station?: string | undefined;

        /**
         * Zero-based index of the item to start playback from.
         * 
         * When queuing multiple items, this determines which track will begin
         * playing immediately. Defaults to 0 (first item) if not specified.
         * 
         * @example
         * ```typescript
         * // Start playing the third song in the queue
         * await musicKit.setQueue({ 
         *   songs: ['song1', 'song2', 'song3'], 
         *   startPosition: 2 
         * });
         * ```
         */
        startPosition?: number | undefined;

        /**
         * Direct content URL for queue initialization.
         * 
         * This can be an Apple Music URL (music.apple.com) or iTunes URL
         * that will be resolved to appropriate content for queuing.
         * 
         * @example
         * ```typescript
         * await musicKit.setQueue({ 
         *   url: 'https://music.apple.com/us/album/example/123456789' 
         * });
         * ```
         */
        url?: string | undefined;
    }
}
