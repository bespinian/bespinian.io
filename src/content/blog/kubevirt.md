---
title: What is KubeVirt? Run Virtual Machines on Kubernetes like containers
author: Christof Lüthi - tim&koko
pubDate: 2025-10-06
tags: ["kubernetes", "kubevirt", "virtualization", "kvm", "containers"]
description:
  "Discover how KubeVirt extends Kubernetes to run and manage virtual machines
  alongside containers using the same APIs, tools, and workflows."
image: ../../assets/blog/servers.jpg
---

Running containers on Kubernetes is now the standard - but many organizations
still depend on critical workloads that live inside virtual machines. Rewriting
or replacing them isn’t always realistic. KubeVirt bridges this gap, extending
Kubernetes so you can run and manage virtual machines just like containers -
with the same APIs, tools, and automation you already use.

## What is KubeVirt

KubeVirt was initiated by Red Hat in 2016 and has been available as open-source
software since 2017. The project is part of the Cloud Native Computing
Foundation (CNCF) and moved to the Incubating maturity level in April 2022.

KubeVirt is a Kubernetes extension based on the operator pattern. This allows us
to run and manage virtual machines (VMs) alongside containers - all with the
same APIs, tools, and workflows.

## Why KubeVirt exists

Kubernetes revolutionized how we deploy and manage containerized applications.
But what about the workloads that still run as VMs that can’t be easily
containerized? Rewriting or refactoring them can be complex and expensive or
even not possible. That’s where KubeVirt comes in.

KubeVirt lets you:

- Run VMs inside Kubernetes, just like Pods.
- Use the same Kubernetes tools - kubectl, Helm, Argo CD, etc.
- Use the same cloud-native Workflows - GitOps, pipelines
- Manage both containers and VMs from a single control plane.

KubeVirt is not about replacing VMs - it’s about unifying how you build and run
them.

## Core concepts

| KubeVirt Resource / Tool                 | Description                                                                     | Kubernetes Analogy    |
| ---------------------------------------- | ------------------------------------------------------------------------------- | --------------------- |
| VirtualMachine (VM)                      | Defines a VM’s configuration and lifecycle                                      | Deployment            |
| VirtualMachineInstance (VMI)             | A running instance of a VM; created when you start a VirtualMachine             | Pod                   |
| VirtualMachineInstanceReplicaSet (VMIRS) | Ensures a desired number of VM instances (like scaling a stateless VM workload) | ReplicaSet            |
| DataVolume (DV)                          | Manages disk images - powered by the Containerized Data Importer (CDI)          | PersistentVolumeClaim |
| PersistentVolumeClaim (PVC)              | Requests storage for VM disks (block or file)                                   | PersistentVolumeClaim |
| VirtualMachineSnapshot                   | Captures the state of a VM and its disks for backup or restore                  | VolumeSnapshot        |
| virtctl CLI                              | Command-line tool for managing VMs                                              | kubectl for VMs       |
| KubeVirt Operator (CR)                   | Manages lifecycle of the KubeVirt components on the cluster                     | Operator              |

## How it works

Under the hood:

- KubeVirt uses the Linux KVM Hypervisor (Kernel-Based Virtual Machines)
- KVM virtual machines are regular Linux processes
- KubeVirt/Kubernetes isolates this process with Linux kernel features like
  control groups (cgroups) and kernel namespaces - just like any other
  containerized process.
- Each KVM process runs encapsulated in a pod. Kubernetes does not know anything
  about VMs - there are only pods and containers.
- The Kubernetes scheduler decides where to run the VM Pod
- KubeVirt uses a DaemonSet to prepare the VM Pod (network, devices, …)
- VM pods run tooling to communicate with the KVM hypervisor (QEMU, libvirt) to
  start the virtual machine inside the VM Pod
- Networking and storage use the same CNI and CSI plugins from kubernetes

## Start your first VM

As a prerequisite to starting virtual machines on your kubernetes cluster, you
need to have the KubeVirt operator up and running. You can install the operator
using

```shell
export V=$(curl -s https://storage.googleapis.com/kubevirt-prow/release/kubevirt/kubevirt/stable.txt)
kubectl create -f "https://github.com/kubevirt/kubevirt/releases/download/${V}/kubevirt-operator.yaml"
kubectl create -f "https://github.com/kubevirt/kubevirt/releases/download/${V}/kubevirt-cr.yaml"
```

To interact with the virtual machine, you most likely want to use the `virtctl`
tool. You can download `virtctl` from the github releases page or directly
within your shell:

```shell
ARCH=$(uname -s | tr A-Z a-z)-$(uname -m | sed 's/x86_64/amd64/') || windows-amd64.exe
curl -L -o virtctl https://github.com/kubevirt/kubevirt/releases/download/${V}/virtctl-${V}-${ARCH}
chmod +x virtctl
```

Now it is time to start your first VM. Create a file named `vm-cirros.yaml` with
the following content:

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

Use the following command to create the new VirtualMachine resource in your
Kubernetes cluster:

```shell
kubectl apply -f vm-cirros.yaml
```

This will create the virtual machine resource in the cluster. Since we have set
the `runStrategy` to `Always` we request KubeVirt to make sure the VM is always
running. It is therefore expected that the KubeVirt Operator will automatically
pick up the resource and create a running VM instance. A pod encapsulating a
virtual machine is always called `virt-launcher-<vm-name>-\*`.

```shell
kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
virt-launcher-vm-cirros-k9dlb   3/3     Running   0          10m
...
```

You can use the `virtctl` command to manage the state (start, stop, …) of your
VM as well as to enter the console, ssh or vnc to your VM:

```shell
virtctl console vm-cirros
login as 'cirros' user. default password: 'gocubsgo'. use 'sudo' for root.
cirros login:
```

Congratulations, you have successfully started your first virtual machine on
Kubernetes.

## When to use KubeVirt

Use KubeVirt when you:

- **Have legacy or vendor-provided apps that can’t be containerized**: Run them
  as VMs inside your Kubernetes platform, alongside modern containerized
  services.
- **Are building a unified platform for both VMs and containers**: One control
  plane (Kubernetes) for networking, storage, monitoring, and automation.
- **Want to modernize gradually**: Lift-and-shift workloads first as VMs, then
  refactor them into containers at your own pace.
- **Need consistent CI/CD or GitOps for everything**: Manage VM definitions in
  Git, deploy with Argo CD just like containers.
- **Run ephemeral or test VMs in Kubernetes clusters**: Great for development,
  integration testing, or ephemeral sandbox environments.
- many more

## Why KubeVirt matters

KubeVirt matters because it unifies the management of virtual machines and
containers under a single Kubernetes control plane. This allows teams to
modernize at their own pace - running legacy applications as VMs while building
new services as containers. By treating VMs as native Kubernetes resources,
KubeVirt enables consistent automation, observability, and GitOps workflows
across all workloads. It removes the need for parallel infrastructures, reduces
operational complexity, and bridges the gap between traditional virtualization
and cloud-native computing.
