[tOC]
# account_book
微信记账小程序

# 项目功能描述

名称：收支记账管理工具

基本功能：

- 实现微信小程序的**注册与登录**和用户密码的修改 (可与微信账号绑定)
- 小程序端能够记录用户输入的不同类型的日常**收入与支出**[数据 (文本、数字、时间)写入]
-  小程序端能够对记录进行**删除**操作[数据删除]
- 小程序端能够实现对收支记录进行**备注**以及对已有备注的修改[数据修改]
- 能够实现日、周、月的**收支统计**，以及指定时间范围内的收支统计能够进行不同类型的过滤[数据查找]

扩张功能：

- 能够通过上传图片为小程序界面更换背景[文件上传]
- 增加登录验证码
- 实现后台管理界面进行数据管理

# Git提交的信息

提交希望按照下面的规范来提交信息，具体也可参考angular的规范

> 使用图标使用gitmoji, 需要本地安装再使用

- feat：新功能（feature）

- fix：修补bug

- docs：文档（documentation）

- style： 格式（不影响代码运行的变动）

- refactor：重构（即不是新增功能，也不是修改bug的代码变动）

- test：增加测试

- chore：构建过程或辅助工具的变动

如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。

```sh
# 小栗子1，修复了前端用户个人信息页面中的头像加载错误问题
git commit -m "fix: (front)用户头像加载路径错误问题"
# 小栗子2，新增用户个人记账统计折线图接口
git commit -m "feat: (end)用户记账统计折线图接口"
```

# UI组件库&图表库

[vantweapp文档——基本控件组件库](https://youzan.github.io/vant-weapp/#/home)

[echarts-for-wexin文档——图表组件库](https://echarts.apache.org/handbook/zh/how-to/cross-platform/wechat-app/)

[echarts的github地址](https://github.com/ecomfe/echarts-for-weixin)

> 注：暂未安装echarts

# 参考UI

1. 微信记账本
   1. ​	

