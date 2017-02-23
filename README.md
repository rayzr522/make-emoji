# make-emoji
Takes a single square image and splices it into multiple smaller images for use as Discord emojis. I made this in 10 minutes for a friend.

## Installation
`yarn global add make-emoji`
> Or `npm install -g make-emoji`, but yarn is better! ༼ ºل͟º༽

## Usage
`make-emoji <input> <slices> <output>`

**Example:**

`make-emoji myFile.png 6 derp`

File structure would be:
```shell
emoji-output-<date>/
– derp0.png
– derp1.png
– derp2.png
– derp3.png
– ...
– derp35.png
```

The input image MUST be square!