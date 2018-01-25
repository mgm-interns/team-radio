import React from 'react';

const scoreSource = {
  content: `
  # User score rules:
  
  How to get point of station score? You can get point from: 
  *	Like on your songs :  Each like on your song which you added, you get 1 point . Remember you cannot like your song. When you like a song (not yours) you spend 1 point. When your point equal zero, you cannot like song. You can like more than 1 times. It help the song you like was played more soon.
  *	Adding your song: For each song you add you get 1 point, each your song was skipped you lose 1 point. When your point is -1. You need to wait a minute to continue add new song and then your point reset to zero.
  
  
  # What can you do with your point? 
    
    *	You can like for the song you like to  make it be play soon, because the song in top of like  is played first.
    
  #### What can you do with your point?
  
  Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~ 

  1. First ordered list item
    1. First ordered list item
        1. First ordered list item
        2. First ordered list item
            3. First ordered list item
  2. Another item
  ⋅⋅* Unordered sub-list. 
  1. Actual numbers don't matter, just that it's a number
  ⋅⋅1. Ordered sub-list
  4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses


  [I'm an inline-style link](https://www.google.com)
  
  [I'm an inline-style link with title](https://www.google.com "Google's Homepage")
  
  [I'm a reference-style link][Arbitrary case-insensitive reference text]
  
  [I'm a relative reference to a repository file](../blob/master/LICENSE)
  
  [You can use numbers for reference-style link definitions][1]
  
  Or leave it empty and use the [link text itself].
  
  URLs and URLs in angle brackets will automatically get turned into links. 
  http://www.example.com or <http://www.example.com> and sometimes 
  example.com (but not on Github, for example).
  
  Some text to show that the reference links can follow later.
  
  [arbitrary case-insensitive reference text]: https://www.mozilla.org
  [1]: http://slashdot.org
  [link text itself]: http://www.reddit.com

Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
  
  > Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 


<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=g20t_K9dlhU)

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a *separate paragraph*.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the *same paragraph*.
`,
};

export default scoreSource;
