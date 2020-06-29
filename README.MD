# Emoji Supported?

Test whether an emoji is supported by the browser.

Extracted from [GitLab FOSS](https://gitlab.com/gitlab-org/gitlab-foss/-/raw/ee189fd511e1a2c06f05e0d40e1d0b8875151391/app/assets/javascripts/emoji/support/unicode_support_map.js).

## Installation

```sh
npm i --save emoji-supported

yarn add emoji-supported
```

```js
import emojiSupported from "emoji-supported";

emojiSupported("🇺🇸"); //=> boolean
emojiSupported("😃"); //=> boolean
```

## License

MIT
