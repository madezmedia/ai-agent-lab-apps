// Shared analytics for every Mad EZ lander: Whop Pixel is inline on each page; this adds PostHog.
// Inert until POSTHOG_KEY is set (the CoS creates the "madez-media" project and hands over the phc_ key).
// Privacy defaults: in-memory persistence (no cookies), person profiles only after an opt-in, no session replay.
(function () {
  var POSTHOG_KEY = ''; // phc_... (public project key; safe to ship in the page)
  var POSTHOG_HOST = 'https://us.i.posthog.com';
  var queue = [];

  window.madezTrack = function (name, props) {
    props = props || {};
    props.lane = 'agent-lab';
    if (window.posthog && window.posthog.__loaded) window.posthog.capture(name, props);
    else queue.push([name, props]);
  };

  if (!POSTHOG_KEY) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://us-assets.i.posthog.com/static/array.js';
  s.onload = function () {
    window.posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      persistence: 'memory',
      person_profiles: 'identified_only',
      capture_pageview: true,
      disable_session_recording: true,
      loaded: function (ph) {
        ph.register({ lane: 'agent-lab', whop_biz: 'biz_KcfL8Gsb1rw7SL' });
        queue.splice(0).forEach(function (e) { ph.capture(e[0], e[1]); });
      },
    });
  };
  document.head.appendChild(s);
})();
