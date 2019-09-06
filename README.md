### 搭建react-native 组件库

> 搭建组件库用typescript 进行编写

- 搭建react-native + typescript 
- 安装storybook 进行调试
- 发布到npm 然后进行进行使用

#### 搭建基础环境
```
1. 搭建基础项目

    react-native init rnDemo
    cd MyProject rnDemo

2. 安装typescript 依赖

    yarn add tslib @types/react @types/react-native
    yarn add --dev react-native-typescript-transformer typescript

3. tsconfig.json 

    {
        "compilerOptions": {
            "importHelpers": true,
            "target": "es2015",
            "jsx": "react",
            "noEmit": true,
            "moduleResolution": "node"
        },
        "exclude": [
            "node_modules"
        ]
    }    

4. 新建 rn-cli.config.js

    module.exports = {
        getTransformModulePath() {
            return require.resolve('react-native-typescript-transformer');
        },
        getSourceExts() {
            return ['ts', 'tsx'];
        }
    }
  
- 基础react + typescript 搭建完成 
- 开始集成 storybook 
---

5. 进入项目中安装 storybook

    npx -p @storybook/cli sb init

6. 修改更目录下的 App.js
    
    import StorybookUI from './storybook';

    module.exports = StorybookUI
        

7. 开始跑项目 
    react-native run-ios/android
    npm run storybook

ps. 如果跑项目失败，删除你的node_modules 重新安装 (包与包之间的依赖关系) 
```




ps. 在未集成原生模块之前采用： npm i rn_mint  直接使用




---

roadmap:

### 基础react-native 组件

- input 组件 
- toast 组件

...

### 原生模块组件(同时支持 android/ios)

- 调用相机
- 扫描二维码
- 调取图库


ps. ios 端支持 pod 和 link 方式
