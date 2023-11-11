// ==UserScript==
// @name         Ad-Blocker Script for YouTube
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Tries to get rid of those pesky YouTube ads, without to temper too much with the rest of the app.
// @author       TheRealKoeDev
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @updateURL    https://github.com/TheRealKoeDev/AdBlockScriptForYoutube/raw/main/script.user.js
// @downloadURL  https://github.com/TheRealKoeDev/AdBlockScriptForYoutube/raw/main/script.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Hide AdElements via CSS
    {
        const hiddenCssElements = `
            #offer-module,
            #player-ads,
            .ytd-display-ad-renderer,
            .ytp-paid-content-overlay,
            .ytd-promoted-sparkles-web-renderer,
            .ytd-video-masthead-ad-v3-renderer,
            [target-id="engagement-panel-ads"],
            ytd-action-companion-ad-rendere,
            ytd-ad-slot-renderer,
            ytd-in-feed-ad-layout-renderer,
            ytd-merch-shelf-renderer {
                display: none !important;
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.innerText = hiddenCssElements;

        document.head.appendChild(styleSheet);
    }

    // Video Adblocker
    {
        function fastForwardVideo(videoElement) {
            const isVideoElement = videoElement instanceof HTMLVideoElement;
            if (!isVideoElement) {
                return;
            }

            videoElement.volume = 0;
            videoElement.playbackRate = 10;
            videoElement.currentTime = Number.MAX_SAFE_INTEGER;
        }

        function skipPlayerAd(videoPlayerElement) {
            const videoTag = videoPlayerElement.getElementsByTagName('video')[0];
            fastForwardVideo(videoTag);

            const skipButtons = videoPlayerElement.querySelector('.videoAdUiSkipButton,.ytp-ad-skip-button,.ytp-ad-skip-button-modern');
            skipButtons?.click();
        }

        function monitorVideoPlayerAds(videoPlayer) {
            function isPlayingAds(videoPlayer) {
                return videoPlayer?.classList?.contains('ad-showing');
            }

            const observerConfig = {
                attributes: true,
                attributeFilter: ['class'],
            };

            new MutationObserver((mutationRecords) => {
                const ads = mutationRecords.some(mutationRecord => isPlayingAds(mutationRecord.target));
                if (ads) {
                    // This seems to be triggered again after the first ad skip, so it is fine for now even for multipe ads
                    skipPlayerAd(videoPlayer);
                }
            }).observe(videoPlayer, observerConfig);

            if (isPlayingAds(videoPlayer)) {
                skipPlayerAd(videoPlayer);
            }
        }

        const videoPlayerId = 'movie_player';
        const videoPlayer = document.getElementById(videoPlayerId);
        if (videoPlayer) {
            monitorVideoPlayerAds(videoPlayer);
            // The player seems to be kept in the html, so we dont need to keep detecting
            return;
        }

        const observerConfig = {
            childList: true,
            subtree: true,
        };

        new MutationObserver((mutationRecords, observer) => {
            const addedVideoPlayer = mutationRecords.find(mutationRecord => mutationRecord.target?.id === videoPlayerId)?.target;
            if (addedVideoPlayer) {
                monitorVideoPlayerAds(addedVideoPlayer);
                // The player seems to be kept in the html, so we dont need to keep detecting
                observer.disconnect();
            }
        }).observe(document.body, observerConfig);
    }
})();
