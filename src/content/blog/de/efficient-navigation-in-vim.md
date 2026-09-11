---
title: Effizient navigieren in Vim
author: Lena Fuhrimann
pubDate: 2020-07-15
tags: ["vim", "productivity", "editor", "navigation"]
description:
  "Meistere effiziente Navigation in Vim – mit diesem umfassenden Guide zu
  Bewegungstasten, Suchtechniken und nützlichen Plugins, die dein Editiertempo
  steigern."
image: ../../../assets/blog/vim.jpg
---

Beim Editieren einer Datei ist es entscheidend, dass du deinen Cursor recht
schnell bewegen kannst. [Vim](https://www.vim.org/) und
[Neovim](https://neovim.io/) bieten dafür viele Wege, die je nach Situation mehr
oder weniger effizient und nützlich sind. Dieser Artikel untersucht die
verschiedenen Arten, den Cursor zu bewegen, und vergleicht sie. «Effizienz»
meint hier, den Cursor mit möglichst wenig Zeit und Aufwand (also möglichst
wenigen Tastenanschlägen) zu navigieren.

## Mit der Maus

**TL;DR: Nicht empfohlen**

Mit dem Mauszeiger durch Vim zu navigieren, erscheint Nutzenden, die von einem
GUI-Editor wie [Visual Studio Code](https://code.visualstudio.com/) oder
Ähnlichem kommen, vielleicht naheliegend. In Vim ist das Ziel aber, die Finger
auf der «Home Row» der Tastatur zu behalten (jener Reihe, in der die Tasten `F`
und `J` liegen), und sie nicht weit Richtung Touchpad oder gar Maus bewegen zu
müssen. Das soll die Belastung von Händen und Handgelenken reduzieren und das
Editieren effizienter machen. Von der Navigation mit der Maus ist daher in den
meisten Situationen dringend abzuraten – sie ist sogar standardmässig
deaktiviert.

Sie zu aktivieren, kann für Umsteigende von einem der genannten Editoren
hilfreich sein, die einen sanften Übergang wollen: Sie erlauben sich anfangs die
Maus und schalten sie später auf ihrem Lernweg wieder ab. Um die Maus-Navigation
einzuschalten, fügst du Folgendes in deine Konfigurationsdatei ein (entweder
`~/.vimrc` oder `~/.config/nvim/init.vim`):

```vim
" Maus-Unterstützung temporär aktivieren
set mouse=a
```

Damit kannst du den Cursor per Klick bewegen und durch den aktuellen Buffer
scrollen.

## Mit den Pfeiltasten

**TL;DR: Nicht empfohlen**

Auch hier gilt: Wer andere Texteditoren oder gar Textverarbeitungen wie
[LibreOffice Writer](https://www.libreoffice.org/discover/writer/) gewohnt ist,
greift verständlicherweise auf Bekanntes zurück. In diesen Programmen navigiert
man per Tastatur meist mit den Pfeiltasten. Davon ist abzuraten, weil … du ahnst
es: Sie zwingen dich, die Finger von der Home Row wegzubewegen.

Die Alternative ist, wie im nächsten Abschnitt beschrieben, die Tasten `h`, `j`,
`k` und `l`, die praktischerweise mittig liegen – genau dort, wo du die Finger
die meiste Zeit ohnehin hast.

## Mit h, j, k, l

**TL;DR: Für kleine Bewegungen nutzen. Mit relativen Zeilennummern
kombinieren.**

`h`, `j`, `k` und `l` sind die grundlegenden Bewegungstasten in Vim. Du solltest
sie statt der üblichen Pfeiltasten verwenden, um – wie oben besprochen – die
Finger möglichst auf der Home Row zu lassen. Das braucht etwas Übung, zahlt sich
aber aus.

Ganz wichtig: Drücke diese Tasten nicht mehrfach hintereinander und halte sie
schon gar nicht gedrückt, um mehrere Spalten oder Zeilen zu überbrücken. Wie
viele Befehle in Vim lassen sie sich mit Zahlen präfixen, um sich mehrfach zu
bewegen. Statt zwölfmal `j` zu drücken, kannst du zum Beispiel `12j` verwenden –
offensichtlich viel effizienter (3 statt 12 Tastenanschläge). Es empfiehlt sich
aber, diese Tasten nur für kleine Bewegungen zu nutzen und hauptsächlich, um
Zeilen hoch- oder runterzugehen, denn für längere vertikale und für horizontale
Distanzen gibt es effizientere Wege.

Sehr nützlich ist es, relative Zeilennummern zu aktivieren, um auf einen Blick
zu sehen, welche Zahl du `j` oder `k` voranstellen musst, um zu einer bestimmten
Zeile zu springen. Du aktivierst sie, indem du folgende zwei Zeilen in deine
Konfigurationsdatei einfügst:

```vim
" Relative Zeilennummern aktivieren
set relativenumber
set number
```

Damit wird immer die absolute Nummer der Zeile angezeigt, auf welcher der Cursor
gerade steht, und für alle anderen die relative Nummer.

## Navigation innerhalb einer Zeile

**TL;DR: Meistens `f` verwenden. Auch `w`, `b`, `e`, `^` und `$` im Blick
behalten.**

Bisher haben wir uns vor allem die Navigation von Zeile zu Zeile angeschaut. Der
nächste Schritt ist die Navigation innerhalb einer Zeile. Naheliegend ist oft,
`w` oder `W` zum nächsten Wort, `b` oder `B` zum vorherigen Wort oder `e` bzw.
`E` direkt ans Ende des nächsten Worts zu verwenden. Bei allen betrachtet die
Kleinbuchstaben-Variante als «Wort», was wir intuitiv als solches sehen, und
nutzt Trennzeichen wie `-`, `/` oder `.`, um Wörter voneinander abzugrenzen. Die
Grossbuchstaben-Variante betrachtet alles als Wort, was durch Whitespace
getrennt ist. Natürlich lässt sich jedem dieser Befehle eine Zahl voranstellen,
um mehrere Wörter auf einmal zu überspringen (z.B. `7w`). Weitere nützliche
Befehle sind `^`, das zum ersten Nicht-Whitespace-Zeichen der Zeile springt, und
`$`, das zum letzten Zeichen einer Zeile springt. Nehmen wir folgende Zeile

```txt
abc def-ghi-jkl mno
```

mit dem Cursor auf dem Zeichen `g`: Dann sind die folgenden Befehle jeweils der
effizienteste Weg zu einem bestimmten Zielzeichen:

| Zielzeichen | Befehl     |
| ----------- | ---------- |
| `j`         | `2w`       |
| `m`         | `W`        |
| `d`         | `B`        |
| `i`         | `e`        |
| `l`         | `E`        |
| `a`         | `^` or `0` |
| `o`         | `$`        |

Wenn du mehrere Wörter vor- und zurückspringst oder an eine bestimmte Stelle
innerhalb eines Worts willst, sind `t` und `f` unglaublich hilfreich. Besonders
`f` springt zum nächsten Vorkommen eines bestimmten Zeichens und erlaubt dir so
grosse Sprünge innerhalb einer Zeile. Der Unterschied: `f` springt auf ein
Zeichen, `t` direkt davor. `t` ist deshalb vor allem nützlich, um alles bis zu
einem Zeichen zu löschen. Die Grossbuchstaben-Varianten `F` und `T` tun
dasselbe, nur rückwärts. All diese Befehle lassen sich mit `;` «wiederholen»,
was zum nächsten Vorkommen des Zielzeichens springt, während `,` zum vorherigen
springt.

Ein weiterer erwähnenswerter Befehl ist `%`. Du kannst ihn verwenden, wenn unter
deinem Cursor ein Zeichen steht, das Teil eines Paars ist (z.B. `[` oder `}`).
Der Befehl `%` bringt den Cursor zum entsprechenden «Partner» dieses Zeichens.
Setzt du den Cursor also auf ein `(` und führst diesen Befehl aus, landest du
bei der schliessenden `)`.

## Changelist und Jumplist

**TL;DR: Mit `ctrl+o` und `ctrl+i` «zurück» und «vorwärts» springen. Mit `g;`
zur letzten Änderung springen.**

Die Jumplist enthält alle Stellen in beliebigen Buffern, zu denen du kürzlich
gesprungen bist (z.B. mit `12j`). Du erreichst sie mit `:jumps`. Die Befehle, um
in der Jumplist vor- und zurückzuspringen, sind `ctrl+o` bzw. `ctrl+i`. Sie sind
sehr nützlich, weil sie sich wie die «Zurück»- und «Vorwärts»-Buttons im Browser
verhalten.

Die Changelist hingegen enthält alle Stellen im aktuellen Buffer, an denen du
kürzlich etwas geändert hast. Du erreichst sie mit dem Befehl `:changes`. Sehr
nützlich ist hier `g;`, das zur letzten Stelle springt, an der du etwas geändert
hast (also in der Changelist zurückspringt). `g,` bringt dich dagegen dorthin
zurück, wo du vorher warst (springt also in der Changelist vorwärts). So kannst
du bequem zwischen einem Referenzpunkt (z.B. einer Dokumentation) und der
Stelle, an der du gerade editierst, hin- und herwechseln.

## Suche

**TL;DR: Ideal für grössere Distanzen – vertikal wie horizontal**

Mit Abstand einer der effizientesten Wege, längere Distanzen horizontal und
vertikal in einem Buffer zurückzulegen, ist die Suche. Mit der Taste `/` suchst
du nach einem Begriff und springst bequem zu seiner Stelle. Mit `n` und `N`
springst du zum nächsten bzw. vorherigen Vorkommen des Suchbegriffs. Die Taste
`?` sucht von der aktuellen Cursorposition aus rückwärts (was `n` und `N`
umkehrt). Auch wenn der Hauptzweck des Suchbefehls offensichtlich das Suchen
ist, ist er ein unglaublich mächtiges Werkzeug für schnelle und effiziente
Navigation.

Die Nutzungserfahrung des Suchbefehls lässt sich massiv verbessern, indem du
folgende Einstellungen in deine Konfigurationsdatei einfügst:

```vim
" Inkrementell schon beim Tippen suchen
set incsearch
" Smart Case für die Suche verwenden
set ignorecase
set smartcase
" Suchtreffer hervorheben
set hlsearch
" <C-L> verwenden, um die Hervorhebung von :set hlsearch zu löschen.
if maparg('<C-L>', 'n') ==# ''
  nnoremap <silent> <C-L> :nohlsearch<C-R>=has('diff')?'<Bar>diffupdate':''<CR><CR><C-L>
endif
```

`incsearch` sorgt dafür, dass das Suchmuster schon während des Tippens
inkrementell angewendet wird, statt erst nach dem Drücken der Enter-Taste. Die
Kombination aus `ignorecase` und `smartcase` ignoriert die
Gross-/Kleinschreibung des Suchbegriffs, solange du keine Grossbuchstaben
verwendest, und beachtet sie, sobald mindestens ein Grossbuchstabe vorkommt –
sehr bequem und überraschend intuitiv. `hlsearch` hebt alle Treffer des
Suchbegriffs hervor, sodass du einfach mit `n` und `N` dazwischen springen
kannst. Die letzte Anweisung lässt dich die hervorgehobenen Suchergebnisse mit
`ctrl+l` löschen, um deine Ansicht aufzuräumen, wenn du mit Suchen und Springen
fertig bist.

Insgesamt ist die Suche eines der mächtigsten Werkzeuge für intuitive und
effiziente Navigation. Sie deckt den häufigen Fall ab, dass du das Wort oder
einen Wortteil kennst, zu dem du willst, deine Augen aber noch nicht direkt
dorthin gerichtet sind. Ausserdem ist sie in vielen Fällen schlicht der
schnellste Weg, irgendwohin zu springen, und schlägt darin andere
Navigationsmethoden recht häufig.

## Grobe Bewegungen

**TL;DR: Nur für sehr spezifische Fälle. `gg` und `G` sind hilfreich, um eine
Datei kennenzulernen.**

In diesem Abschnitt geht es um das, was man als «grobe Bewegungen» bezeichnen
kann. Sie lassen dich grössere Distanzen im Buffer überbrücken, opfern dafür
aber Präzision. Genau deshalb sind diese Befehle weniger nützlich. Vim kann ein
sehr effizienter Texteditor sein, indem du dir überlegst, was du ändern willst,
mit wenigen Tastenanschlägen präzise dorthin springst, in den Insert Mode
wechselst, die Änderung mit skalpellartiger Präzision vornimmst und den Insert
Mode danach sofort wieder verlässt. Die Bewegungsbefehle in diesem Abschnitt
bringen den Cursor dagegen grob im Dokument umher, wobei sich kaum auf einen
Blick vorhersagen lässt, in welcher Zeile und Spalte er genau landet.

Ein gutes Beispiel sind die Tasten `H`, `M` und `L`, die den Cursor an den
oberen Rand, in die Mitte bzw. an den unteren Rand des aktuellen Viewports
bringen. Das ist zwar eine grosse Bewegung mit nur einem Tastenanschlag, aber
sehr wahrscheinlich landet der Cursor nicht exakt auf der benötigten Zeile,
sodass du zusätzlich mehrfach `j` oder `k` drücken musst – was deutlich mehr
Nachdenken und viel mehr Tastenanschläge bedeutet als mit anderen Methoden.
Ähnlich sind die Tasten `{` und `}`, die den Cursor zum nächsten Absatz bringen
(ein durch Leerzeilen abgegrenzter Textblock).

Eine nützliche Ausnahme sind die Befehle `gg` und `G`, die den Cursor zur ersten
bzw. letzten Zeile eines Buffers bringen. Wohin dich diese Bewegungen führen,
lässt sich mühelos vorhersagen. Besonders `G` ist praktisch, weil du damit mit
nur zwei Tastenanschlägen etwas an eine Datei anhängen kannst (`G` gefolgt von
`o`).

## Plugins

**TL;DR: Nur die nötigen Plugins installieren. Schau dir fzf an!**

Bisher haben wir nur über Features gesprochen, die in Vim eingebaut sind oder
sich in einer unveränderten Installation konfigurieren lassen. Es gibt aber
viele nützliche Plugins, welche die Navigation in Vim noch effizienter machen.
Wichtig ist, sie sorgfältig auszuwählen, denn jedes Plugin kann Vim langsamer
und/oder instabiler machen.

### fzf

Eines der nützlichsten Plugins ist [fzf](https://github.com/junegunn/fzf.vim),
das ohnehin grossartig ist. Es bietet viele hilfreiche Befehle wie `:BLines`, um
den aktuellen Buffer mit intelligentem Fuzzy Matching zu durchsuchen, oder
`:Rg`, um sogar das ganze Projekt nach bestimmten Mustern zu durchsuchen – was
dich im Gegensatz zu den bisherigen Methoden auch zwischen Dateien navigieren
lässt. fzf eignet sich zum Springen zwischen Dateien und Buffern, aber auch
zwischen verschiedenen Stellen innerhalb davon. Ich empfehle dir sehr, es
auszuprobieren und folgende Zeilen in deine Konfigurationsdatei einzufügen:

```vim
" Zu einer bestimmten Datei springen
nnoremap <C-P> :Files<cr>
" Das ganze Projekt durchsuchen
nnoremap \ :Rg<space>
```

Mit der ersten Zeile öffnest du Dateien im aktuellen Projekt, indem du `ctrl+p`
drückst und dann mit Fuzzy Matching tippst. Die zweite Zeile erlaubt dir, mit
`\` das gesamte Projekt per Fuzzy Matching zu durchsuchen (im Gegensatz zu `/`,
das den aktuellen Buffer durchsucht).

### Sneak

Ein weiteres nützliches Plugin ist
[Sneak](https://github.com/justinmk/vim-sneak). Statt nach einer Suche mehrfach
`n` zu drücken, um zum richtigen Vorkommen des Suchbegriffs zu springen, hebt es
jedes Vorkommen hervor und weist ihm eine eindeutige Zeichenkombination zu. Mit
dieser Kombination springst du mit sehr wenigen Tastenanschlägen direkt dorthin.

Ein zusätzlicher Bonus: Etwas sehr Ähnliches gibt es als Browser-Erweiterung,
die viele weitere Vim-Befehle im Webbrowser verfügbar macht und Surfen nur mit
der Tastatur ermöglicht. Sie heisst [Vimium](https://github.com/philc/vimium).

## Fazit

Natürlich gibt es noch viele andere Wege, in Vim-Buffern zu navigieren, die hier
nicht abgedeckt sind. Das sind nur einige der möglichen Navigationstechniken,
und welche in welcher Situation am bequemsten und intuitivsten sind, ist oft
Geschmackssache.

Ausserdem behandelt dieser Artikel nur Bewegungsbefehle. Befehle, die beim
Bewegen des Cursors an eine bestimmte Stelle gleichzeitig in den Insert Mode
wechseln (z.B. `A`, das den Cursor ans Zeilenende bringt und in den Insert Mode
geht), bespricht er nicht. Die können zwar unglaublich nützlich sein, hätten
hier aber den Rahmen gesprengt.

Ich empfehle dir sehr, möglichst viele verschiedene Techniken kennenzulernen und
sorgfältig zu überlegen, welche in welcher Situation Sinn ergibt. Scheu dich
nicht, dich ein wenig zu zwingen, verschiedene auszuprobieren, bis du deinen
eigenen Werkzeugkasten für unterschiedliche Situationen gefunden hast. Es
braucht etwas Übung, bis das ins Muskelgedächtnis übergeht – aber es lohnt sich,
um aus Vim den effizienten Texteditor zu machen, der er sein kann.

Ein vollständiges Konfigurationsbeispiel findest du in meinen eigenen
[Dotfiles](https://github.com/cloudlena/dotfiles/blob/master/nvim/.config/nvim/init.vim).
