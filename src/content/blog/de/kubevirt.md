---
title:
  Was ist KubeVirt? Virtuelle Maschinen auf Kubernetes betreiben wie Container
author: Christof Lüthi - tim&koko
pubDate: 2025-10-06
tags: ["kubernetes", "kubevirt", "virtualization", "kvm", "containers"]
description:
  "Erfahre, wie KubeVirt Kubernetes erweitert, damit du virtuelle Maschinen
  neben Containern betreiben und verwalten kannst – mit denselben APIs, Tools
  und Workflows."
image: ../../../assets/blog/servers.jpg
---

Container auf Kubernetes zu betreiben, ist heute Standard – viele Organisationen
sind aber weiterhin auf kritische Workloads angewiesen, die in virtuellen
Maschinen leben. Sie neu zu schreiben oder zu ersetzen, ist nicht immer
realistisch. KubeVirt schliesst diese Lücke und erweitert Kubernetes so, dass du
virtuelle Maschinen genau wie Container betreiben und verwalten kannst – mit
denselben APIs, Tools und Automatisierungen, die du ohnehin schon nutzt.

## Was ist KubeVirt

KubeVirt wurde 2016 von Red Hat initiiert und ist seit 2017 als Open-Source-
Software verfügbar. Das Projekt gehört zur Cloud Native Computing Foundation
(CNCF) und erreichte im April 2022 den Reifegrad «Incubating».

KubeVirt ist eine Kubernetes-Erweiterung auf Basis des Operator-Patterns. Damit
können wir virtuelle Maschinen (VMs) neben Containern betreiben und verwalten –
alles mit denselben APIs, Tools und Workflows.

## Warum es KubeVirt gibt

Kubernetes hat revolutioniert, wie wir containerisierte Applikationen deployen
und verwalten. Aber was ist mit den Workloads, die weiterhin als VMs laufen und
sich nicht einfach containerisieren lassen? Sie neu zu schreiben oder zu
refactoren, kann komplex und teuer oder schlicht unmöglich sein. Genau hier
kommt KubeVirt ins Spiel.

Mit KubeVirt kannst du:

- VMs innerhalb von Kubernetes betreiben, genau wie Pods.
- Dieselben Kubernetes-Tools nutzen – kubectl, Helm, Argo CD usw.
- Dieselben cloud-nativen Workflows nutzen – GitOps, Pipelines
- Container und VMs über eine einzige Control Plane verwalten.

Bei KubeVirt geht es nicht darum, VMs zu ersetzen – es geht darum, zu
vereinheitlichen, wie du sie baust und betreibst.

## Kernkonzepte

| KubeVirt-Ressource / -Tool               | Beschreibung                                                                            | Kubernetes-Analogie   |
| ---------------------------------------- | --------------------------------------------------------------------------------------- | --------------------- |
| VirtualMachine (VM)                      | Definiert Konfiguration und Lebenszyklus einer VM                                       | Deployment            |
| VirtualMachineInstance (VMI)             | Eine laufende Instanz einer VM; entsteht beim Starten einer VirtualMachine              | Pod                   |
| VirtualMachineInstanceReplicaSet (VMIRS) | Stellt eine gewünschte Anzahl VM-Instanzen sicher (wie das Skalieren zustandsloser VMs) | ReplicaSet            |
| DataVolume (DV)                          | Verwaltet Disk-Images – angetrieben vom Containerized Data Importer (CDI)               | PersistentVolumeClaim |
| PersistentVolumeClaim (PVC)              | Fordert Storage für VM-Disks an (Block oder File)                                       | PersistentVolumeClaim |
| VirtualMachineSnapshot                   | Erfasst den Zustand einer VM und ihrer Disks für Backup oder Restore                    | VolumeSnapshot        |
| virtctl CLI                              | Kommandozeilen-Tool zur Verwaltung von VMs                                              | kubectl für VMs       |
| KubeVirt Operator (CR)                   | Verwaltet den Lebenszyklus der KubeVirt-Komponenten im Cluster                          | Operator              |

## Wie es funktioniert

Unter der Haube:

- KubeVirt nutzt den Linux-KVM-Hypervisor (Kernel-Based Virtual Machines)
- KVM-VMs sind ganz normale Linux-Prozesse
- KubeVirt/Kubernetes isoliert diesen Prozess mit Linux-Kernel-Features wie
  Control Groups (cgroups) und Kernel Namespaces – genau wie jeden anderen
  containerisierten Prozess.
- Jeder KVM-Prozess läuft gekapselt in einem Pod. Kubernetes weiss nichts über
  VMs – es gibt nur Pods und Container.
- Der Kubernetes-Scheduler entscheidet, wo der VM-Pod läuft
- KubeVirt nutzt ein DaemonSet, um den VM-Pod vorzubereiten (Netzwerk, Devices,
  …)
- VM-Pods führen Tooling aus, das mit dem KVM-Hypervisor (QEMU, libvirt)
  kommuniziert, um die virtuelle Maschine im VM-Pod zu starten
- Networking und Storage nutzen dieselben CNI- und CSI-Plugins von Kubernetes

## Starte deine erste VM

Voraussetzung, um virtuelle Maschinen auf deinem Kubernetes-Cluster zu starten,
ist ein laufender KubeVirt-Operator. Du installierst den Operator so:

```shell
export V=$(curl -s https://storage.googleapis.com/kubevirt-prow/release/kubevirt/kubevirt/stable.txt)
kubectl create -f "https://github.com/kubevirt/kubevirt/releases/download/${V}/kubevirt-operator.yaml"
kubectl create -f "https://github.com/kubevirt/kubevirt/releases/download/${V}/kubevirt-cr.yaml"
```

Um mit der virtuellen Maschine zu interagieren, willst du höchstwahrscheinlich
das Tool `virtctl` verwenden. Du kannst `virtctl` von der GitHub-Releases-Seite
oder direkt in deiner Shell herunterladen:

```shell
ARCH=$(uname -s | tr A-Z a-z)-$(uname -m | sed 's/x86_64/amd64/') || windows-amd64.exe
curl -L -o virtctl https://github.com/kubevirt/kubevirt/releases/download/${V}/virtctl-${V}-${ARCH}
chmod +x virtctl
```

Jetzt ist es Zeit, deine erste VM zu starten. Erstelle eine Datei namens
`vm-cirros.yaml` mit folgendem Inhalt:

```yaml
kind: VirtualMachine
metadata:
  name: vm-cirros
spec:
  runStrategy: Always
  template:
    metadata:
      labels:
        kubevirt.io/size: small
        kubevirt.io/domain: vm-cirros
    spec:
      domain:
        devices:
          disks:
            - name: containerdisk
              disk:
                bus: virtio
          interfaces:
            - name: default
              masquerade: {}
        resources:
          requests:
            memory: 64M
      networks:
        - name: default
          pod: {}
      volumes:
        - name: containerdisk
          containerDisk:
            image: quay.io/kubevirt/cirros-container-disk-demo
```

Erstelle die neue VirtualMachine-Ressource mit folgendem Befehl in deinem
Kubernetes-Cluster:

```shell
kubectl apply -f vm-cirros.yaml
```

Damit wird die Ressource der virtuellen Maschine im Cluster angelegt. Da wir
`runStrategy` auf `Always` gesetzt haben, fordern wir KubeVirt auf,
sicherzustellen, dass die VM immer läuft. Es ist daher zu erwarten, dass der
KubeVirt-Operator die Ressource automatisch aufnimmt und eine laufende
VM-Instanz erzeugt. Ein Pod, der eine virtuelle Maschine kapselt, heisst immer
`virt-launcher-<vm-name>-\*`.

```shell
kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
virt-launcher-vm-cirros-k9dlb   3/3     Running   0          10m
...
```

Mit dem Befehl `virtctl` kannst du den Zustand deiner VM verwalten (starten,
stoppen, …) und dich per Konsole, SSH oder VNC auf deine VM verbinden:

```shell
virtctl console vm-cirros
login as 'cirros' user. default password: 'gocubsgo'. use 'sudo' for root.
cirros login:
```

Gratuliere, du hast erfolgreich deine erste virtuelle Maschine auf Kubernetes
gestartet.

## Wann du KubeVirt einsetzen solltest

Setze KubeVirt ein, wenn du:

- **Legacy- oder Hersteller-Apps hast, die sich nicht containerisieren lassen**:
  Betreibe sie als VMs in deiner Kubernetes-Plattform, neben modernen
  containerisierten Services.
- **Eine einheitliche Plattform für VMs und Container aufbaust**: Eine Control
  Plane (Kubernetes) für Networking, Storage, Monitoring und Automatisierung.
- **Schrittweise modernisieren willst**: Workloads zuerst per Lift-and-Shift als
  VMs übernehmen und sie dann im eigenen Tempo in Container überführen.
- **Durchgängiges CI/CD oder GitOps für alles brauchst**: VM-Definitionen in Git
  verwalten und mit Argo CD deployen, genau wie Container.
- **Kurzlebige oder Test-VMs in Kubernetes-Clustern betreibst**: Ideal für
  Entwicklung, Integrationstests oder kurzlebige Sandbox-Umgebungen.
- und vieles mehr

## Warum KubeVirt wichtig ist

KubeVirt ist wichtig, weil es die Verwaltung von virtuellen Maschinen und
Containern unter einer einzigen Kubernetes-Control-Plane vereint. So können
Teams in ihrem eigenen Tempo modernisieren – Legacy-Applikationen als VMs
betreiben und gleichzeitig neue Services als Container bauen. Indem VMs als
native Kubernetes-Ressourcen behandelt werden, ermöglicht KubeVirt durchgängige
Automatisierung, Observability und GitOps-Workflows über alle Workloads hinweg.
Es macht parallele Infrastrukturen überflüssig, reduziert die
Betriebskomplexität und schlägt die Brücke zwischen klassischer Virtualisierung
und Cloud-native Computing.
