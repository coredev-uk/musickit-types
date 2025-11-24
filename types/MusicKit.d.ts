/// <reference path="MusicKit.Player.d.ts" />

/**
 * Use the MusicKit namespace to configure MusicKit JS and to access app
 * instances, control music playback, and fetch data from the Apple Music API.
 */

declare namespace MusicKit {
  /**
   * Configuration options for an Apple Music application.
   * 
   * This interface defines the metadata that identifies your app to Apple Music services.
   * All properties are optional but recommended for a complete integration.
   * 
   * @see [MusicKit.js Documentation](https://js-cdn.music.apple.com/musickit/v3/docs/index.html?path=/docs/reference-javascript-musickit--page)
   */
  interface AppConfiguration {
    /**
     * The build number of your app.
     */
    build?: string | undefined;
    /**
     * A URL for your app icon.
     */
    icon?: string | undefined;
    /**
     * The name of your app.
     */
    name?: string | undefined;
    /**
     * The version of your app.
     */
    version?: string | undefined;
  }

  /**
   * Represents formatted playback duration broken down into hours and minutes.
   * 
   * Used by utility functions to provide human-readable time formatting.
   */
  interface FormattedPlaybackDuration {
    /** The number of complete hours in the duration. */
    hours: number;
    /** The number of complete minutes remaining after hours. */
    minutes: number;
  }

  /**
   * Configuration options for embedded Apple Music players.
   * 
   * Used when generating embed code for web players.
   */
  interface EmbedOptions {
    /** The height of the embedded player in pixels or CSS units. */
    height: number | string;
    /** The width of the embedded player in pixels or CSS units. */
    width: number | string;
  }

  /** 
   * Global array of MusicKit errors that have occurred during the session.
   */
  const errors: MKError[];

  /** 
   * The current version of the MusicKit library.
   */
  const version: string;

  /** 
   * Internal logging interface for debugging MusicKit operations.
   * @internal
   */
  const __log: Logger;

  /**
   * Enumeration of possible user authorization states for Apple Music.
   * 
   * These values represent the user's current permission level for accessing
   * Apple Music content and user data.
   */
  enum AuthStatus {
    /** The user has not yet been asked for authorization. */
    NOT_DETERMINED = 0,
    /** The user has explicitly denied authorization. */
    DENIED = 1,
    /** Authorization is restricted, possibly due to parental controls. */
    RESTRICTED = 2,
    /** The user has granted authorization. */
    AUTHORIZED = 3
  }

  /**
   * Internal logging interface for MusicKit debugging.
   * 
   * Provides methods to control and configure logging levels for development
   * and debugging purposes.
   * 
   * @internal
   */
  interface Logger {
    /** Clears all currently enabled logging levels. */
    clearLoggingLevels(): void;
    /** Returns the internal logger instance. */
    getLogger(): unknown;
    /** 
     * Sets the visibility of a specific logging level.
     * @param level The logging level to configure.
     * @param show Whether to show logs at this level.
     */
    setLoggingLevels(level: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR', show: boolean): void;
  }

  /**
   * Configuration object for initializing a MusicKit instance.
   * 
   * This interface defines all the options available when setting up MusicKit
   * for your application, including authentication, playback, and UI preferences.
   */
  interface Configuration {
    /**
     * Application metadata configuration.
     * 
     * Provides identifying information about your app to Apple Music services.
     */
    app?: AppConfiguration | undefined;
    /**
     * Controls whether declarative markup is enabled.
     * 
     * When true, MusicKit will automatically detect and handle HTML elements
     * with Apple Music attributes.
     */
    declarativeMarkup?: boolean | undefined;
    /**
     * JWT token that identifies your app as a trusted Apple Developer Program member.
     * 
     * This token is required for most MusicKit operations and should be obtained
     * from your Apple Developer account.
     */
    developerToken?: string | undefined;
    /**
     * The iTunes Store storefront identifier for the user's region.
     * 
     * Determines which content catalog is available and affects pricing/availability.
     */
    storefrontId?: string | undefined;
    /**
     * Preferred audio quality for music playback.
     * 
     * Higher bitrates provide better audio quality but consume more bandwidth.
     */
    bitrate?: PlaybackBitrate | undefined;
    /**
     * Internal source type identifier.
     * 
     * @internal
     */
    sourceType?: number | undefined;
    /**
     * Whether to suppress automatic error dialog display.
     * 
     * When true, your app is responsible for handling and displaying errors.
     */
    suppressErrorDialog?: boolean | undefined;
  }

  /**
   * Initializes and configures a new MusicKit instance.
   * 
   * This is the primary entry point for setting up MusicKit in your application.
   * The returned promise resolves with a fully configured MusicKit instance.
   * 
   * @param configuration Configuration options for the MusicKit instance.
   * @returns Promise that resolves to the configured MusicKit instance.
   */
  function configure(configuration: Configuration): Promise<MusicKitInstance>;

  /**
   * Retrieves the currently active MusicKit instance.
   * 
   * Returns the MusicKit instance that was previously configured with `configure()`.
   * If no instance exists, this will throw an error.
   * 
   * @returns The active MusicKit instance.
   */
  function getInstance(): MusicKitInstance;

  /**
   * Generates a formatted artwork URL with specified dimensions.
   *
   * Takes an artwork object and returns a URL with the requested dimensions.
   * This is useful for displaying artwork at different sizes in your UI.
   *
   * @param artwork The artwork resource object from an Apple Music item.
   * @param height The desired artwork height in pixels.
   * @param width The desired artwork width in pixels.
   * @returns A URL string for the artwork at the specified dimensions.
   */
  function formatArtworkURL(artwork: Artwork, height?: number, width?: number): string;

  /**
   * Converts milliseconds to a formatted duration object.
   *
   * Useful for displaying track durations, playback progress, or other
   * time-based information in a human-readable format.
   *
   * @param milliseconds The duration in milliseconds to format.
   * @returns An object containing hours and minutes.
   */
  function formattedMilliseconds(milliseconds: number): FormattedPlaybackDuration;

  /**
   * Converts seconds to a formatted duration object.
   *
   * Similar to `formattedMilliseconds` but accepts seconds as input.
   *
   * @param seconds The duration in seconds to format.
   * @returns An object containing hours and minutes.
   */
  function formattedSeconds(seconds: number): FormattedPlaybackDuration;

  /**
   * Generates HTML embed code for Apple Music web players.
   *
   * Creates embeddable player markup for Apple Music content that can be
   * inserted into web pages.
   *
   * @param url The iTunes or Apple Music URL for the content to embed.
   * @param options Configuration object specifying player dimensions.
   * @returns HTML string containing the embed code.
   */
  function generateEmbedCode(url: string, options: EmbedOptions): string;

  /**
   * Formats a time duration into a readable string format.
   * 
   * Converts seconds into a MM:SS or HH:MM:SS format suitable for display
   * in media players and time indicators.
   * 
   * @param seconds The time duration in seconds.
   * @param separator The character to use between time components (default: ':').
   * @returns A formatted time string.
   */
  function formatMediaTime(seconds: number, separator?: string): string;
}
