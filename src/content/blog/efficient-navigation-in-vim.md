---
title: Efficient Navigation in Vim
author: Lena Fuhrimann
date: 2020-07-15
tags: ["vim", "productivity", "editor", "navigation"]
excerpt:
  "Master efficient navigation in Vim with this comprehensive guide covering
  movement keys, search techniques, and useful plugins to boost your editing
  speed."
---

When editing a file, it is quite crucial that you can navigate your cursor
around rather quickly. [Vim](https://www.vim.org/) and
[Neovim](https://neovim.io/) allow for many ways of doing so which, depending on
the situation, can be more or less efficient and useful. This article examines
the different ways of moving the cursor and compares them. Here, the term
"efficiency" refers to navigating the cursor with as little time and effort
(i.e., the number of keystrokes) as possible.

## Using the Mouse

**TL;DR: Not recommended**

Using the mouse pointer to navigate Vim may seem like an obvious choice for
users coming from a GUI editor like
[Visual Studio Code](https://code.visualstudio.com/) or similar. However, in
Vim, the goal is to keep your fingers on the "home row" of the keyboard (the row
where the `F` and the `J` keys reside) and not having to move them greatly
towards the touchpad or even the mouse. This should reduce the strain on your
hands and wrists and make editing more efficient. Therefore, navigating with the
mouse should be highly discouraged in most situations and is even disabled by
default.

It can be helpful to enable it for users transitioning from one of the
aforementioned editors who would like to have a smooth transition by allowing
themselves to use the mouse initially and switching it back off again later in
their learning journey. To turn on mouse navigation, add the following to your
configuration file (either `~/.vimrc` or `~/.config/nvim/init.vim`):

```vim
" Temporarily enable mouse support
set mouse=a
```

This will allow you to point and click to move the cursor and to scroll through
the current buffer.

## Using the Arrow Keys

**TL;DR: Not recommended**

Again, for users used to other text editors or even word-processing software
like [LibreOffice Writer](https://www.libreoffice.org/discover/writer/), it may
be tempting to use what they know. In these programs, you mostly use the arrow
keys for keyboard-based navigation. This is not recommended because... you
guessed it: They require the user to move their fingers away from the home row.

The alternative is, as described in the next section, to use the `h`, `j`, `k`
and `l` keys on the keyboard which are conveniently placed at the center and
where you most likely have your fingers most of the time.

## Using h,j,k,l

**TL;DR: Use for small navigation. Use with relative line numbers.**

`h`, `j`, `k` and `l` are the basic movement keys in Vim. They should be used
instead of the usual arrow keys on the keyboard to, as discussed above, keep
your fingers on the home row as much as possible. It takes a little practice but
will pay off eventually.

One hugely important thing to do with these keys is to not press them multiple
times in sequence, or even hold them down to move several columns or rows. As
with many commands in Vim, they can be prefixed with numbers to move multiple
times. For example, `12j` can be used rather than pressing the `j` key twelve
times which is, obviously, much more efficient (3 vs. 12 keystrokes). However,
it is recommendable to only use these keys for small movements and mostly to
move lines up or down because there are more efficient ways of moving longer
vertical distances or horizontal distances in general.

It can be very useful to enable relative line numbers to see at a glance what
number to prefix `j` or `k` with to move to a certain line. They can be enabled
by adding the following two lines to your configuration file:

```vim
" Enable relative line numbers
set relativenumber
set number
```

This will always show the absolute number of the line the cursor is currently on
and relative numbers for all others.

## Navigation Within a Line

**TL;DR: Mostly use `f`. Also consider `w`,`b`,`e`,`^` and `$`.**

So far, we've mostly looked at navigating from one line to another. The next
step is to navigate within a line. Often, the straightforward thing to do is to
use `w` or `W` to move to the next word, `b` or `B` to move to the previous word
or even `e` or `E` to move directly to the end of the next word. For all of
them, the lowercase variant considers a "word" to be what we intuitively see as
one using delimiters like `-`, `/` or `.` to separate one word from another. The
uppercase variant considers anything a word that is delimited by whitespace.
Obviously, any of these commands can be prefixed with a number to jump multiple
words in one go (e.g., `7w`). Other useful commands are `^` which moves to the
first non-whitespace character of the line and `$` to move to the last character
of a line. Considering the following line

```txt
abc def-ghi-jkl mno
```

with the cursor currently on the `g` character, pressing the following commands
is the most efficient way to get to a specific target character:

| Target Character | Command    |
| ---------------- | ---------- |
| `j`              | `2w`       |
| `m`              | `W`        |
| `d`              | `B`        |
| `i`              | `e`        |
| `l`              | `E`        |
| `a`              | `^` or `0` |
| `o`              | `$`        |

When moving multiple words back and forth or to a specific place within a word,
`t` and `f` are incredibly helpful. Especially `f` moves to the next occurrence
of a specific character, which lets you make big jumps within a line. The
difference is that `f` moves to a character and `t` moves to right before a
character. So `t` is mostly useful for deleting everything to a character. These
commands' uppercase variants `F` and `T` do the same thing, but backwards. All
of these commands can be "repeated" with the `;` command which jumps to the next
occurrence of the targeted character while `,` jumps to the previous one.

Another command worth mentioning at this point is `%` which you can use when a
character which is part of a pair (e.g., `[` or `}`) is currently under your
cursor. The `%` command will take the cursor to the corresponding "partner" of
that character in the pair. So placing the cursor on a `(` and then executing
this command will take you to its closing `)`.

## Changelist and Jumplist

**TL;DR: Use `ctrl+o` and `ctrl+i` to jump "back" and "forward". Use `g;` to
jump to last edit.**

The jumplist contains all the points in any buffer you recently jumped to (e.g.,
with `12j`). It can be accessed with `:jumps`. The commands to jump back and
forth in the jumplist are `ctrl+o` and `ctrl+i` respectively. They can be very
useful because they act like the "back" and "forward" buttons in a web browser.

The changelist, on the other hand, contains all the points in the current buffer
where you have recently changed something. It can be accessed with the
`:changes` command. A very useful command here is `g;` which jumps to the last
place where you have changed something (i.e., jumps back in the changelist).
`g,`, on the other hand, takes you back to where you were before (i.e., jumps
forward in the changelist). This allows you to easily switch back and forth
between a point of reference (e.g., some documentation) and the place where you
are currently editing.

## Search

**TL;DR: Great for moving larger distances vertically and horizontally**

By far, one of the most efficient ways of moving longer distances horizontally
and vertically in a buffer is to use the search. The `/` key lets you search for
a term and conveniently jump to its location. Pressing the `n` and `N` keys
jumps to the next and previous occurrence of the search term, respectively. The
`?` key searches backwards from the current cursor position (which inverts `n`
and `N`). Even though, the main purpose of the search command is obviously to
search, it is an incredibly powerful tool to navigate quickly and efficiently.

The user experience of the search command can be vastly improved by adding the
following settings to your configuration file:

```vim
" Incrementally search while typing
set incsearch
" Use smart case for searching
set ignorecase
set smartcase
" Highlight searches
set hlsearch
" Use <C-L> to clear the highlighting of :set hlsearch.
if maparg('<C-L>', 'n') ==# ''
  nnoremap <silent> <C-L> :nohlsearch<C-R>=has('diff')?'<Bar>diffupdate':''<CR><CR><C-L>
endif
```

`incsearch` will make sure that the search pattern is applied incrementally
while typing, instead of only after pressing the enter key. The combination of
`ignorecase` and `smartcase` ignores the case of the search term when not using
any uppercase letters and doesn't ignore it when using at least one uppercase
letter, which is quite convenient and surprisingly intuitive. `hlsearch`
highlights any matches for the search term, allowing to easily jump between them
using `n` and `N`. The last statement lets you clear the highlighted search
results by pressing `ctrl+l` to unclutter your view, once done searching and
jumping.

All in all, search is one of the most powerful tools for intuitive and efficient
navigation. It covers the common use case of knowing the word or part of a word
to navigate to, but not having your eyes directly pointed there yet.
Furthermore, it's simply the fastest way of jumping somewhere in many cases and
beats other methods of navigation quite often in that regard.

## Clunky Movements

**TL;DR: Use for very specific use cases only. Consider `gg` and `G` for getting
to know a file.**

In this section, we'll discuss what can be referred to as "clunky movements".
They let the user navigate larger distances in the buffer while sacrificing
precision. These commands are less useful for exactly that reason. Vim can be a
very efficient text editor by letting the user think about what they want to
change, jumping precisely there with very few keystrokes, entering insert mode,
performing a change with scalpel-like precision and finally exiting insert mode
as soon as it's done. The movement commands in this section, however, get the
cursor around the document as a whole while it's hard for the user to predict at
a glance, which line and column exactly they will land on.

A good example are the `H`, `M` and `L` keys which take the cursor to the top,
the middle or the bottom of the current view port respectively. While this is a
large movement with just one keystroke, it's highly likely that they won't
exactly get the cursor to the line needed but rather will have to be accompanied
by pressing `j` or `k` multiple times, which will result in much more thinking
and many more keystrokes than what can be achieved with other methods. Similar
are the `{` and `}` keys, which take the cursor to the next paragraph (a block
of text delimited by blank lines).

A useful exception to that are the `gg` and `G` commands, which take the cursor
to the first or the last line of a buffer, respectively. It's easy and
effortless to predict where these movements will take you. Especially the `G`
command can be quite useful because it allows appending to a file with just two
keystrokes (`G` followed by `o`).

## Plugins

**TL;DR: Install only the necessary plugins. Check out fzf!**

So far, we've only talked about features that are built into Vim or that can be
configured on a vanilla installation. However, there are many useful plugins
which can make navigating Vim even more efficient. It is important to carefully
pick them, though, as any plugin can make Vim slower and/or less stable.

### fzf

One of the most useful plugins is [fzf](https://github.com/junegunn/fzf.vim)
which is a great one to have in general. It offers many helpful commands like
`:BLines` for searching the current buffer with intelligent fuzzy matching or
`:Rg` for even searching the whole project for specific patterns which, in
contrast to the other methods we've looked at so far, lets the user navigate
between files. fzf is a tool that can be used for jumping between files and
buffers but also, between different locations within them. I highly recommend
checking it out and adding the following lines to your configuration file:

```vim
" Jump to specific file
nnoremap <C-P> :Files<cr>
" Search whole project
nnoremap \ :Rg<space>
```

The first line lets you open files in the current project by pressing `ctrl+p`
and then typing with fuzzy matching. The second line allows searching the entire
project with fuzzy matching by pressing `\` (in contrast to `/` which searches
the current buffer).

### Sneak

Another useful plugin is [Sneak](https://github.com/justinmk/vim-sneak). Instead
of pressing `n` multiple times after a search to jump to the correct occurrence
of the search term, it highlights each occurrence and assigns them a unique
character combination. By pressing this combination, you can quickly jump to
that occurrence with very few keystrokes.

An added bonus is that something very similar exists as a browser extension
which allows using many other Vim commands in a web browser and makes browsing
using only the keyboard possible. It's called
[Vimium](https://github.com/philc/vimium).

## Conclusion

Obviously, there are many other ways of navigating Vim buffers that aren't
covered here. These are only some of the navigation techniques that can be used,
and which ones are most convenient and intuitive in which situations is often a
matter of taste.

Another thing to note is that this article only talks about motion commands. It
does not discuss commands that go into insert mode while moving the cursor to a
specific place (e.g., the `A` command which moves the cursor to the end of a
line and enters insert mode). While those can be incredibly useful, discussing
them here would have gone beyond the scope of this article.

I highly recommend getting to know as many different techniques as possible and
carefully thinking about which one makes sense in which situation. You shouldn't
be afraid of forcing yourself a bit to use different ones until you have found
your own toolbox of useful ones for different situations. It takes some practice
to get these into muscle memory, but it's worth it all the while to make Vim the
efficient text editor it can be.

For a full example of a configuration, check out my own
[dotfiles](https://github.com/cloudlena/dotfiles/blob/master/nvim/.config/nvim/init.vim).
