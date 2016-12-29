const Twit = require('twit');

const T = new Twit({
  consumer_key:         't5euIxJVSiA0zGCo9d3gNfV3b',
  consumer_secret:      'baLZFHSjrM2hIMklO1vQyBKeGLXUDvBDPPgv9SdGColtOvP8Hr',
  access_token:         '814568617127936000-RgY3EdaN3KaZPQFVxfm18F7DL55rOxf',
  access_token_secret:  'XR1ryze98siFFqzgOjgRkgY7G4H5uhl6HEYkndUq0cls0',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

module.exports = T;