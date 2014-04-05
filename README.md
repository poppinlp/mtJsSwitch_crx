##mtJsSwitch\_crx

前端调试小助手chrome插件

- 自动添加jsdebug和phpdebug参数。其中jsdebug只添加在对非test环境的美团页面的请求（其他请求不添加）上；phpdebug只添加在线下环境和test环境的美团页面的请求上。
- 通过开关控制。开关的状态记录在插件的storage中。
- 修改onerror事件为alert方便发现错误。
- 支持白名单。添加参数的时候会忽略白名单中的URL。

####update

- 2014-3-15 添加对于js的alert error的开关
- 2014-3-17 phpdebug修复对于dev.sankuai的支持
- 2014-3-24 自定义白名单完工，UI更新
- 2014-3-26
  - 支持键盘快捷键，ctrl+j、ctrl+p、ctrl+a分别对应jsdebug、phpdebug、alerterror
  - 快捷键更改状态时页面自动刷新
  - 更新参数存在url中时的处理方式
- 2013-4-5 储存方式由chrome.storage换成localStorage

####TODO

- 忽略网页中的插件报错
