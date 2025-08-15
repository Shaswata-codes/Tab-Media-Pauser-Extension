(function () {
  'use strict';

  function pauseAllMedia() {
    const videos = document.querySelectorAll('video');
    const audios = document.querySelectorAll('audio');
    let pausedCount = 0;

    videos.forEach(video => {
      if (!video.paused && !video.ended) {
        video.pause();
        pausedCount++;
      }
    });

    audios.forEach(audio => {
      if (!audio.paused && !audio.ended) {
        audio.pause();
        pausedCount++;
      }
    });

    if (pausedCount > 0) {
      console.log(`Paused ${pausedCount} media elements`);
    }
  }

  function resumeAllMedia() {
    const videos = document.querySelectorAll('video');
    const audios = document.querySelectorAll('audio');
    let resumedCount = 0;

    videos.forEach(video => {
      if (video.paused && !video.ended) {
        video.play().catch(() => {});
        resumedCount++;
      }
    });

    audios.forEach(audio => {
      if (audio.paused && !audio.ended) {
        audio.play().catch(() => {});
        resumedCount++;
      }
    });

    if (resumedCount > 0) {
      console.log(`Resumed ${resumedCount} media elements`);
    }
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'pauseMedia') {
      pauseAllMedia();
      sendResponse({ success: true });
    } else if (message.action === 'resumeMedia') {
      resumeAllMedia();
      sendResponse({ success: true });
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAllMedia();
    }
  });
})();
