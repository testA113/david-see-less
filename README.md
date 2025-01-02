# David See-Less - You decide what you want to see!

This Chrome extension allows you to filter out a list of words/names you don't want to see on webpages anymore.

## Overview

Sometimes we need a break from certain people. This Chrome Extension gives you some time away from the noise of David Seymour. It works like an ad blocker, but for any mention of David Seymour in articles and images.

## Features

- Supports blocking articles, images and paragraphs mentioning David Seymour.
- Contains custom rules for New Zealand news sites to browse without interruptions.
  - NZ Herald
  - Stuff
  - Newsroom
  - RNZ
  - The Spinoff
  - The Press
  - The Post
  - Otago Daily Times
  - Reddit

## Installation (for Users)

Just install the extension from [the Chrome Web
Store](https://chrome.google.com/webstore/detail/filterbubble/amgnookcdbjfnnppjdddkbjdacdajlmk)!

Then surf the web as normal without worrying about leaving your filter bubble.

## Installation (for Developers)

Want to hack on David See-Less? Sweet!

Here's a how to to get the source of the Chrome Extension running in your environment.

1. Grab latest source
<pre>
git clone https://github.com/testA113/David-See-Less
</pre>

2. Enable Chrome Extension in your Chrome install
<pre>
Open Chrome.
Navigate to Settings... Tools... Extensions.
Click + on "Developer mode"
Click "Load unpacked extensions..."
Navigate to directory you installed FilterBubble and click Open.
</pre>

3. Configuration
<pre>
Right click on the icon in the browser and click on Options.
Enter words to filter, one word/phrase per line
Click on Save
</pre>

4. Reload some webpage with your blacklisted words (or just google for them) and see them and related content magically disappear. You are now in your filter bubble!

## Meta

- This project is inspired by and in parts based on
  - [Filter Bubble](https://github.com/asmaier/FilterBubble)
  - [Trump Blocker](https://chrome.google.com/webstore/detail/trump-blocker/nhmckipmafnikgjnaeadpngccggobaej)
  - [Trump Filter](https://github.com/RobSpectre/Trump-Filter)
  - [PokeGone](https://github.com/JamieFarrelly/PokeGone)
- This work is licensed under GPLv3.
