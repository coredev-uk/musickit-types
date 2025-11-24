declare namespace MusicKit {

    /**
     * Manages the playback queue of media items.
     * 
     * The Queue interface provides comprehensive control over the sequence of media
     * items that will be played. It supports operations like adding, removing, and
     * reordering tracks, as well as navigation through the queue.
     * 
     * @see [MusicKit.js Documentation](https://js-cdn.music.apple.com/musickit/v3/docs/index.html?path=/docs/reference-javascript-queue--page)
     */
    interface Queue {
        /**
         * Whether the queue contains no media items.
         * 
         * Useful for determining if content needs to be loaded before playback can begin.
         */
        readonly isEmpty: boolean;

        /**
         * All media items currently in the playback queue.
         * 
         * This array represents the complete sequence of tracks that will be played,
         * including the currently playing item and any upcoming tracks.
         */
        items: MediaItem[];

        /**
         * Total number of items in the queue.
         * 
         * Equivalent to `items.length` but provided as a direct property for convenience.
         */
        readonly length: number;

        /**
         * The next media item that will play after the current item.
         * 
         * Returns `undefined` if there are no more playable items in the queue,
         * which may happen at the end of a playlist when repeat mode is disabled.
         */
        readonly nextPlayableItem?: MediaItem | undefined;

        /**
         * Index of the next playable item in the queue array.
         * 
         * This index corresponds to the position in the `items` array of the
         * next track that will play.
         */
        readonly nextPlayableItemIndex: number;
        /**
         * The current queue position.
         */
        readonly position: number;
        /**
         * The previous playable media item in the queue.
         */
        readonly previousPlayableItem?: MediaItem | undefined;
        /**
         * The previous playable index in the queue.
         */
        readonly previousPlayableItemIndex: number;
        /**
         * @TODO: Add description
         */
        readonly hasAutoplayStation: boolean;
        /**
         * The queue items but with some extra properties.
         */
        _queueItems: Array<{
            /**
             * Whether the item is an autoplay item or not.
             */
            isAutoplay: boolean;
            /**
             * The media item.
             */
            item: MediaItem;
        }>;
        /**
         * Reindexes the queue.
         */
        _reindex(): void;

        /**
         * Add an event listener for a MusicKit queue by name.
         *
         * @param name The name of the event.
         * @param callback The callback function to remove.
         */
        addEventListener(name: string, callback: () => any): void;
        /**
         * Inserts the media items defined by the queue descriptor after the last
         * media item in the current queue.
         */
        append(descriptor: Descriptor): void;
        /**
         * Returns the index in the playback queue for a media item descriptor.
         *
         * @param descriptor A descriptor can be an instance of the MusicKit.MediaItem
         * class, or a string identifier.
         */
        indexForItem(descriptor: Descriptor): number;
        /**
         * Returns the media item located in the indicated array index.
         */
        item(index: number): MediaItem | null | undefined;
        /**
         * Inserts the media items defined by the queue descriptor into the current
         * queue immediately after the currently playing media item.
         */
        prepend(descriptor: any): void;
        /**
         * Removes an event listener for a MusicKit queue by name.
         *
         * @param name The name of the event.
         * @param callback The callback function to remove.
         */
        removeEventListener(name: string, callback: () => any): void;
    }
}
