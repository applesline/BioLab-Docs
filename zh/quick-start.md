# 快速开始

::: tip
前置条件：至少需要两台电脑，一台作为数据存储节点、一台作为数据分析节点
配置一台安装了docker环境的机器作为分析节点并确保2375端口处于开放状态
:::

## 一、配置生信分析环境 （docker）

::: tip
必要的前置条件：配置一台安装了docker环境的机器作为分析节点并确保2375端口处于开放状态
:::

**验证环境是否可用**

```shell
curl http://[安装了docker机器的IP]:2375/containers/json
```
假设你的ip是192.168.2.100，则输入
```shell
curl http://192.168.2.100:2375/containers/json
```
配置正常的情况下返回：
```shell
 [] 
```
## 二、部署本地化BioLab服务
```shell
docker run -d \
  --network=host \
  -v .:/root \
  biohubx/biolab-server:v0.1.0 
```
下载很慢的话，参考这里：https://github.com/DaoCloud/public-image-mirror/issues/2328 配置镜像加速（已验证可用）
```shell
"registry-mirrors":[
    "https://mirror.tuna.tsinghua.edu.cn/docker/"
]
```

## 三、部署BioLab客户端服务
```shell
docker run -d \
  --network=host \
  -p 8080:8080 \
  -v .:/root \
  biohubx/biolab-server:v0.1.0 
```


## 二、获取生信分析算法

```shell
docker pull biohubx/qcstat:v0.1.0
```
一般docker官方的镜像库下载都会很慢，配置一下国内镜像加速(清华大学镜像加速)
```shell
"registry-mirrors":[
    "https://mirror.tuna.tsinghua.edu.cn/docker/"
]
```
