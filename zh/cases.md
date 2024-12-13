---
outline: deep
---

# 案例分析
>  假设一：
   有一株菌命名为BIO001，我们使用二代测序仪进行测序拿到了全基因组序列文件（fastq格式），对于BIO001菌株的这次测序我们也命名了一个测序编号BIO001_E001（测序编号自定义，满足唯一性要求即可）

> 假设二：
    我们拿到的全基因组双端测序文件为：BIO001_R1.fq.gz, BIO001_R2.fq.gz 且这两个文件存放于 /rawdata/20241205（自定义，此处使用了日期）路径下，测序文件必须按约定的格式存储:
```        
/rawdata/20241205/{菌株编号}/{测序编号}/{菌株编号}_R1.fq.gz
/rawdata/20241205/{菌株编号}/{测序编号}/{菌株编号}_R2.fq.gz
```
最终菌株（BIO001）本次测序（BIO001_E001）的fastq文件存储效果如下： 
```
/rawdata/20241205/BIO001/BIO001_E001/BIO001_R1.fq.gz
/rawdata/20241205/BIO001/BIO001_E001/BIO001_R1.fq.gz
```

# 1.创建工作流
```
biocmd workflow create --name "单菌分析流程" --code singlestrain --step qcstat
biocmd workflow create --name "单菌分析流程" --code singlestrain --step datafilter
biocmd workflow create --name "单菌分析流程" --code singlestrain --step dataassembly --prestep "datafilter"
```

# 2.创建工作流算法
```
biocmd script create --workflow singlestrain --step qcstat --script biohubx/qcstat:v0.1.0
biocmd script create --workflow singlestrain --step datafilter --script biohubx/datafilter:v0.1.0
biocmd script create --workflow singlestrain --step dataassembly --script biohubx/assembly:v0.1.0
```

# 3.创建算法的Input模板
```
biocmd env create --workflow singlestrain --step qcstat --type Input --key file1 --feature _R1.fq.gz
biocmd env create --workflow singlestrain --step qcstat --type Input --key file2 --feature _R2.fq.gz
biocmd env create --workflow singlestrain --step qcstat --type Output --key file1 --feature qcstat.txt
biocmd env create --workflow singlestrain --step qcstat --type Mount --key rawdata --feature "/rawdata:/rawdata"
biocmd env create --workflow singlestrain --step qcstat --type Mount --key resultdata --feature "/root/resultdata:/data/resultdata"

biocmd env create --workflow singlestrain --step datafilter --type Input --key file1 --feature _R1.fq.gz
biocmd env create --workflow singlestrain --step datafilter --type Input --key file2 --feature _R2.fq.gz
biocmd env create --workflow singlestrain --step datafilter --type Output --key file1 --feature .clean.1.fq.gz
biocmd env create --workflow singlestrain --step datafilter --type Output --key file2 --feature .clean.2.fq.gz
biocmd env create --workflow singlestrain --step datafilter --type Mount --key rawdata --feature "/rawdata:/rawdata"
biocmd env create --workflow singlestrain --step datafilter --type Mount --key resultdata --feature "/root/resultdata:/data/resultdata"

biocmd env create --workflow singlestrain --step dataassembly --type Input --key file1 --feature .clean.1.fq.gz
biocmd env create --workflow singlestrain --step dataassembly --type Input --key file2 --feature .clean.2.fq.gz
biocmd env create --workflow singlestrain --step dataassembly --type Output --key file1 --feature .fas 
biocmd env create --workflow singlestrain --step dataassembly --type Mount --key cleandata --feature "/rawdata:/rawdata"
biocmd env create --workflow singlestrain --step dataassembly --type Mount --key resultdata --feature "/root/resultdata:/data/resultdata"
```

# 4.注册样本地址
```
biocmd file create --basedir /rawdata/20241205
```

# 5.创建分析任务
```
biocmd task create --workflow singlestrain --step qcstat --uniqueno BIO001_E001
biocmd task create --workflow singlestrain --step dataassembly --uniqueno BIO001_E001
```
