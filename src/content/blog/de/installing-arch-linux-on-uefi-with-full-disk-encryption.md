---
title:
  Arch Linux auf UEFI mit vollständiger Festplattenverschlüsselung installieren
author: Lena Fuhrimann
pubDate: 2021-03-12
tags: ["linux", "arch-linux", "installation", "encryption", "uefi"]
description:
  "Eine knappe Schritt-für-Schritt-Anleitung zur Installation von Arch Linux auf
  UEFI-Systemen mit vollständiger Festplattenverschlüsselung via LUKS."
image: ../../../assets/blog/arch-installation.jpg
---

Dies ist eine Schritt-für-Schritt-Anleitung zur Installation von Arch Linux auf
[UEFI](https://de.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface) mit
vollständiger Festplattenverschlüsselung. Sie enthält bewusst keine unnötigen
Worte und keinen Schnickschnack. Sie stützt sich stark auf den
[Installations-Guide des Arch-Linux-Wikis](https://wiki.archlinux.org/index.php/Installation_guide)
– wenn du also einmal feststeckst, konsultiere ihn und den Rest des wunderbaren
Arch-Wikis.

## ISO herunterladen

1. Lade das neueste ISO von der
   [Arch-Linux-Website](https://archlinux.org/download/) herunter

## Bootfähigen USB-Stick erstellen

Diesen Schritt kannst du überspringen, wenn du Arch Linux nur in einer VM
betreiben willst. Starte das ISO in dem Fall einfach aus deinem bevorzugten
VM-Management-Tool wie [QEMU](https://www.qemu.org/).

1. Stecke einen USB-Stick in deinen Computer
1. Führe `lsblk` aus, um die richtige Disk zu finden
1. Führe `sudo umount /dev/sdx` aus (oder wie auch immer der USB-Stick heisst)
1. Führe
   `sudo dd bs=4M if=pfad/zum/input.iso of=/dev/sdx oflag=sync status=progress`
   aus, um das ISO auf den USB-Stick zu schreiben. Vergiss nicht, die beiden
   Pfade durch die korrekten zu ersetzen.
1. Stecke den USB-Stick in den Zielcomputer und boote davon

Sobald du den Arch-Linux-Prompt siehst, bist du bereit für den nächsten Schritt.

## UEFI-Unterstützung prüfen

1. Führe `ls /sys/firmware/efi/efivars` aus, um zu prüfen, ob dieses Verzeichnis
   existiert. Falls nicht, unterstützt dein System kein UEFI und diese Anleitung
   ist nicht für dich – konsultiere stattdessen den offiziellen
   [Arch-Linux-Installations-Guide](https://wiki.archlinux.org/index.php/Installation_guide).

## Konnektivität herstellen

1. Verbinde den Computer per Ethernet (empfohlen) oder führe `iwctl` aus, um
   dich ins WLAN einzuloggen
1. Prüfe die Internetverbindung mit `ping archlinux.org`
1. Stelle mit `timedatectl set-ntp true` sicher, dass die Uhr synchronisiert ist

## Partitionieren

1. Prüfe die vorhandenen Laufwerke und Partitionen mit `lsblk` und starte dann
   die Partitionierung mit `gdisk /dev/nvme0n1` (oder wie auch immer die Disk
   heisst)
1. Lösche mit `d` alle bestehenden Partitionen
1. Erstelle mit `n` die Boot-Partition: Standardnummer, Standard-Startsektor,
   Endsektor bei `+512M` und als Typ `ef00` «EFI System»
1. Erstelle mit `n` die Root-Partition: Standardnummer, Standard-Startsektor,
   Standard-Endsektor und als Typ `8300` «Linux filesystem»
1. Drücke `w`, um die Partitionen zu schreiben
1. Führe `lsblk` erneut aus, um die Partitionierung zu prüfen

## Root-Partition verschlüsseln

1. Führe `cryptsetup luksFormat /dev/nvme0n1p2` aus, tippe dann `YES` und das
   neue Verschlüsselungspasswort, um die Root-Partition zu verschlüsseln
1. Führe `cryptsetup open /dev/nvme0n1p2 root` aus, um die verschlüsselte
   Partition zu öffnen

## Dateisysteme erstellen

1. Erstelle das Boot-Dateisystem mit `mkfs.fat -F32 /dev/nvme0n1p1` (oder wie
   auch immer die Partition heisst)
1. Erstelle das Root-Dateisystem mit `mkfs.ext4 /dev/mapper/root`

## Dateisysteme einhängen

1. Führe `mount /dev/mapper/root /mnt` aus, um das Root-Dateisystem einzuhängen
1. Führe `mount --mkdir /dev/nvme0n1p1 /mnt/boot` aus, um dein Boot-Dateisystem
   einzuhängen
1. Führe `lsblk` erneut aus, um das Einhängen zu prüfen

## Swap-Datei erstellen (auf VMs nicht nötig)

1. Führe `free --mebi` aus, um die Gesamtzahl der Mebibyte RAM deines Systems
   anzuzeigen. Die Zahl steht in der Tabelle unter `Mem` und `total`. Wir
   verwenden sie im nächsten Befehl.
1. Führe `dd if=/dev/zero of=/mnt/swapfile bs=1M count=xxxx status=progress`
   aus, um die Swap-Datei zu erstellen, wobei «xxxx» die gewünschte Grösse in
   Mebibyte ist (üblicherweise etwa das 1,5-Fache deines RAM)
1. Führe `chmod 600 /mnt/swapfile` aus, um die richtigen Berechtigungen zu
   setzen
1. Führe `mkswap /mnt/swapfile` aus, um daraus eine echte Swap-Datei zu machen
1. Führe `swapon /mnt/swapfile` aus, um sie zu aktivieren

## Arch Linux installieren

1. Führe `pacstrap -K /mnt base base-devel linux linux-firmware neovim` aus, um
   Arch Linux zu installieren (`linux-firmware` wird auf VMs nicht benötigt)

## Dateisystemtabelle generieren

1. Führe `genfstab -U /mnt >> /mnt/etc/fstab` aus, um die fstab mit UUIDs zu
   generieren

## In deine neue Linux-Installation wechseln

1. Führe `arch-chroot /mnt` aus, um in deine neue Arch-Linux-Installation zu
   wechseln

## Locales setzen

1. Führe `ln -sf /usr/share/zoneinfo/Europe/Zurich /etc/localtime` aus (oder
   deine Zeitzone), um die Zeitzone zu setzen
1. Führe `hwclock --systohc` aus
1. Führe `nvim /etc/locale.gen` aus und kommentiere die Locale aus, die du
   verwenden willst (z.B. `en_US.UTF-8 UTF-8`)
1. Führe `locale-gen` aus, um die Locales zu generieren
1. Führe `echo 'LANG=en_US.UTF-8' > /etc/locale.conf` aus

## Hostnamen setzen

1. Führe `echo 'arch' > /etc/hostname` aus (oder wie dein Hostname lauten soll)
1. Führe `nvim /etc/hosts` aus und füge folgende Zeilen ein:

```txt
127.0.0.1     localhost
::1           localhost
127.0.1.1     arch.localdomain        arch
```

Für die letzte Zeile: Ersetze `arch` durch den Hostnamen, den du im letzten
Schritt gewählt hast.

## Root-Passwort setzen

1. Führe `passwd` aus und setze dein Root-Passwort

## Initramfs konfigurieren

1. Führe `nvim /etc/mkinitcpio.conf` aus und ergänze im Array `HOOKS` `encrypt`
   zwischen `block` und `filesystems` sowie `resume` zwischen `filesystems` und
   `fsck`
1. Führe `mkinitcpio -P` aus

## Boot-Eintrag erstellen

1. Führe `pacman -S efibootmgr intel-ucode` aus (oder `amd-ucode` bei einem
   AMD-Prozessor), um den EFI-Boot-Manager und den CPU-Microcode zu installieren
1. Führe `filefrag -v /swapfile | less` aus, um den Offset der Swap-Datei zu
   ermitteln. Es ist die erste Zahl unter «physical_offset» in der Zeile mit ext
   «0:». Notiere dir die Zahl.
1. Führe `blkid -s UUID -o value /dev/nvme0n1p2` aus, um die UUID des Geräts zu
   erhalten
1. Führe
   `efibootmgr --disk /dev/nvme0n1 --part 1 --create --label "Arch Linux" --loader /vmlinuz-linux --unicode 'cryptdevice=UUID=xxxx:root root=/dev/mapper/root resume=/dev/mapper/root resume_offset=yyyy rw initrd=\intel-ucode.img initrd=\initramfs-linux.img' --verbose`
   aus und ersetze dabei «xxxx» durch die UUID des Geräts `nvme0n1p2` und «yyyy»
   durch den Offset der Swap-Datei, um dem Boot-Manager unser verschlüsseltes
   Dateisystem bekannt zu machen

## NetworkManager installieren

1. Führe `pacman -S networkmanager` aus, um NetworkManager zu installieren
1. Führe `systemctl enable NetworkManager` aus, damit NetworkManager beim Booten
   startet

## Neu starten

1. Führe `exit` aus, um in die äussere Shell zurückzukehren
1. Führe `reboot` aus, um das Setup zu verlassen

## Mit dem WLAN verbinden (nur nötig, wenn keine Ethernet-Verbindung besteht)

1. Führe `nmcli device wifi list` aus, um die verfügbaren Netzwerke aufzulisten
1. Führe `nmcli device wifi connect MY_WIFI --ask` aus, um dich mit einem davon
   zu verbinden

## Benutzer anlegen

1. Führe `EDITOR=nvim visudo` aus und kommentiere
   `%wheel ALL=(ALL) NOPASSWD: ALL` aus, damit Mitglieder der Gruppe `wheel`
   privilegierte Befehle ausführen dürfen
1. Führe `useradd --create-home --groups wheel lena` aus (oder wie dein Benutzer
   heissen soll), um den Benutzer anzulegen
1. Führe `passwd lena` aus, um dein Passwort zu setzen
1. Führe `exit` aus und melde dich mit deinem neuen Benutzer wieder an

## Window Manager installieren

1. Führe `sudo pacman -S sway swayidle swaylock` aus, um Sway zu installieren
1. Füge Folgendes in `~/.zlogin` ein (oder in die Datei deiner Shell):

```bash
# Window Manager starten
if [ -z $DISPLAY ] && [ "$(tty)" = "/dev/tty1" ]; then
  exec sway
fi
```

## Sound einrichten

1. Führe `sudo pacman -S pipewire pipewire-pulse wireplumber` aus, um Pipewire
   zu installieren

## Bluetooth einrichten

1. Führe `sudo pacman -S bluez bluez-utils` aus, um die Bluetooth-Utilities zu
   installieren
1. Führe `sudo systemctl enable bluetooth.service --now` aus, um Bluetooth zu
   starten

## Root-Benutzer sperren (für zusätzliche Sicherheit)

1. Führe `sudo passwd --lock root` aus, um den Root-Benutzer auszusperren

## Firewall installieren

1. Führe `sudo pacman -S nftables` aus, um die Firewall zu installieren
1. Führe `sudo nvim /etc/nftables.conf` aus, um die Konfiguration nach unseren
   Wünschen anzupassen (z.B. gemäss dem
   [Arch-Wiki](https://wiki.archlinux.org/title/nftables#Workstation))
1. Führe `sudo systemctl enable nftables.service --now` aus, um die Firewall zu
   aktivieren

## Zeitsynchronisation aktivieren

1. Führe `sudo systemctl enable systemd-timesyncd.service --now` aus, um die
   automatische Zeitsynchronisation zu aktivieren

## Energiemanagement verbessern (nur auf Laptops sinnvoll)

1. Führe `sudo pacman -S thermald auto-cpufreq` aus, um die
   Energiemanagement-Tools zu installieren
1. Führe `sudo systemctl enable thermald.service --now` aus, damit thermische
   Optimierungen automatisch laufen
1. Führe `sudo systemctl enable auto-cpufreq.service --now` aus, damit
   Performance-Optimierungen automatisch laufen

## Geplantes fstrim aktivieren (nur bei SSDs sinnvoll)

1. Führe `sudo systemctl enable fstrim.timer --now` aus, um regelmässiges
   Aufräumen deiner SSD zu aktivieren

## Geplante Mirrorlist-Updates aktivieren

1. Führe `sudo pacman -S reflector` aus, um reflector zu installieren
2. Führe `sudo nvim /etc/xdg/reflector/reflector.conf` aus und passe die Datei
   nach deinen Wünschen an
3. Führe `sudo systemctl enable reflector.timer --now` aus, damit reflector
   regelmässig läuft

## Swappiness reduzieren (nur sinnvoll bei mehr als 4 GB RAM)

1. Führe `echo 'vm.swappiness=10' | sudo tee /etc/sysctl.d/99-swappiness.conf`
   aus, um die Swappiness dauerhaft zu reduzieren

## Dotfiles installieren

1. Führe `sudo pacman -S git` aus, um Git zu installieren
1. Installiere [CloudLenas Dotfiles](https://github.com/cloudlena/dotfiles/)
   oder andere, um deine Installation anzupassen
