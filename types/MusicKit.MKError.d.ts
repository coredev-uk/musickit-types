declare namespace MusicKit {
    /**
     * Error class for MusicKit-specific exceptions and failures.
     * 
     * MKError extends the standard JavaScript Error class to provide detailed
     * information about failures in MusicKit operations, including authentication,
     * playback, API requests, and media handling.
     * 
     * @example
     * ```typescript
     * try {
     *   await musicKit.authorize();
     * } catch (error) {
     *   if (error instanceof MusicKit.MKError) {
     *     switch (error.errorCode) {
     *       case MusicKit.MKError.AUTHORIZATION_ERROR:
     *         console.log('User denied authorization');
     *         break;
     *       case MusicKit.MKError.SUBSCRIPTION_ERROR:
     *         console.log('User needs Apple Music subscription');
     *         break;
     *       default:
     *         console.log('Other error:', error.description);
     *     }
     *   }
     * }
     * ```
     * 
     * @see [MusicKit.js Documentation](https://js-cdn.music.apple.com/musickit/v3/docs/index.html?path=/docs/reference-javascript-mkerror--page)
     */
    class MKError extends Error {
        /**
         * Specific error code identifying the type of failure.
         * 
         * Use this code to programmatically handle different error conditions.
         * The code will match one of the static constants defined on MKError.
         */
        errorCode: string;

        /**
         * Human-readable description of the error.
         * 
         * Provides additional context about what went wrong and may include
         * suggestions for resolution. This text is suitable for logging but
         * may not be appropriate for direct display to end users.
         */
        description?: string | undefined;

        /**
         * User lacks permission to access the requested resource or endpoint.
         * 
         * This typically occurs when trying to access premium content without
         * a subscription, or when accessing user data without proper authorization.
         */
        static ACCESS_DENIED: string;

        /**
         * User authorization failed or was denied.
         * 
         * This error occurs when the user explicitly denies permission during
         * the authorization flow, or when existing authorization becomes invalid.
         */
        static AUTHORIZATION_ERROR: string;

        /**
         * MusicKit configuration is invalid or incomplete.
         * 
         * Common causes include missing or invalid developer tokens, incorrect
         * app configuration, or unsupported configuration combinations.
         */
        static CONFIGURATION_ERROR: string;

        /**
         * Content is restricted and cannot be accessed.
         * 
         * This may occur due to regional restrictions, parental controls,
         * content ratings, or other platform-specific limitations.
         */
        static CONTENT_RESTRICTED: string;

        /**
         * Method called with invalid or missing parameters.
         * 
         * Check that all required parameters are provided with correct types
         * and valid values according to the API documentation.
         */
        static INVALID_ARGUMENTS: string;

        /**
         * Digital Rights Management certificate could not be applied.
         * 
         * This low-level error indicates problems with the content protection
         * system required for playing encrypted media content.
         */
        static MEDIA_CERTIFICATE: string;

        /**
         * Media item descriptor is malformed or invalid.
         * 
         * This occurs when trying to play content using an invalid media item
         * ID, corrupted descriptor, or unsupported media format.
         */
        static MEDIA_DESCRIPTOR: string;

        /**
         * DRM decryption key could not be obtained.
         * 
         * This indicates problems with the content protection system,
         * possibly due to network issues or invalid authorization.
         */
        static MEDIA_KEY: string;

        /**
         * DRM license validation failed.
         * 
         * The content protection license is invalid, expired, or could not
         * be verified against the content being played.
         */
        static MEDIA_LICENSE: string;

        /**
         * General media playback failure.
         * 
         * This covers various playback-related errors including unsupported
         * formats, corrupted media, or platform-specific playback limitations.
         */
        static MEDIA_PLAYBACK: string;

        /**
         * Encrypted Media Extensions (EME) session could not be created.
         * 
         * This low-level error indicates problems with the browser's content
         * protection capabilities required for encrypted media playback.
         */
        static MEDIA_SESSION: string;

        /**
         * Network connectivity or communication failure.
         * 
         * This includes connection timeouts, DNS resolution failures,
         * server unreachability, or other network-related issues.
         */
        static NETWORK_ERROR: string;

        /**
         * Requested resource does not exist.
         * 
         * The specified content ID, URL, or resource could not be found
         * in the Apple Music catalog or user's library.
         */
        static NOT_FOUND: string;

        /**
         * API rate limit or quota exceeded.
         * 
         * Your application has made too many requests in a given time period.
         * Implement proper rate limiting and retry logic with exponential backoff.
         */
        static QUOTA_EXCEEDED: string;

        /**
         * Generic server-side error occurred.
         * 
         * This indicates problems on Apple's servers that are typically
         * temporary. Retry the operation with appropriate delays.
         */
        static SERVER_ERROR: string;

        /**
         * Apple Music services are temporarily unavailable.
         * 
         * This may be due to maintenance, outages, or high load on Apple's
         * infrastructure. Implement retry logic with exponential backoff.
         */
        static SERVICE_UNAVAILABLE: string;

        /**
         * User's Apple Music subscription is inactive or expired.
         * 
         * The user needs an active Apple Music subscription to access the
         * requested content or features. Direct users to subscription management.
         */
        static SUBSCRIPTION_ERROR: string;

        /**
         * Unclassified or unexpected error occurred.
         * 
         * This catch-all error code is used for failures that don't fit
         * into other categories. Check the error description for more details.
         */
        static UNKNOWN_ERROR: string;

        /**
         * Operation or feature is not supported.
         * 
         * The requested operation is not available on the current platform,
         * browser, or in the current configuration context.
         */
        static UNSUPPORTED_ERROR: string;
    }
}
