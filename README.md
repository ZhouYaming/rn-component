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
### 新建基础组件并且调试
storybook/stories/input
```
import React from 'react'

import { View , TextInput, Text , StyleSheet } from 'react-native' 

interface Iprops{
    title ?: string
    changeVals ?:(v:any) => void
}

class BaseInput extends React.Component<Iprops>{

    render(){
        return (
            <View style={styles.center_box}>
                <View style={styles.base_text}><Text style={styles.title}>{this.props.title}</Text></View>
                <View style={styles.base_ipt}><TextInput style={styles.ipt} onChangeText={this.changeVals}/></View>
            </View>    
        )
    }

    changeVals = (e) =>{
        this.props.changeVals(e)
    }
}

const styles = StyleSheet.create({
    center_box:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection:'row'
    },
    base_ipt:{
        borderColor:"#fef",
        height:30,
        marginLeft:10,
        marginRight:16,
        flex:1,
    },
    base_text:{
        height:30,
        marginLeft:16,
    },
    ipt:{
        borderColor:"#Fa0",
        borderBottomWidth:1,
        height:30,
        paddingLeft:10,
    },
    title:{
        lineHeight:30,
    }
})

export default BaseInput
```
stories/index.js
``` js
import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// eslint-disable-next-line import/extensions
import Button from './Button';
import CenterView from './CenterView';

import BaseInput from './Input'

storiesOf('input',module).add('基础niput',()=><BaseInput title={"getnamewwww"} changeVals={action('get-ipt-value')}/>)

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('with text', () => (
    <Button onPress={action('clicked-text')}>
      <Text>Hello Button</Text>
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onPress={action('clicked-emoji')}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ));

```
![结果图](https://github.com/onionRunning/daily_record/blob/master/asset/day_by_day/06/img.jpeg)


### 发布你的react-native组件库

stories新建 root.ts 作为对外暴露文件
```ts
import BaseIpt from "./Input"



export default {
    BaseIpt
}
```

```
package.json
{
  "name": "rn_mint",
  "version": "0.0.2",
  "main": "lib/root.ts",       // 指定对外暴露文件
  "publisher":"onion_running",
  "Private":false,
  "scripts": {
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint .",
    "storybook": "start-storybook -p 7007"
  },
  "dependencies": {

  },
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/runtime": "^7.5.5",
    "@react-native-community/eslint-config": "^0.0.5",
    "@storybook/addon-actions": "^5.1.11",
    "@storybook/addon-links": "^5.1.11",
    "@storybook/addons": "^5.1.11",
    "@storybook/react-native": "^5.1.11",
    "@storybook/react-native-server": "^5.1.11",
    "babel-jest": "^24.9.0",
    "babel-loader": "^8.0.6",
    "eslint": "^6.3.0",
    "jest": "^24.9.0",
    "metro-react-native-babel-preset": "^0.56.0",
    "react-dom": "16.8.6",
    "react-native-typescript-transformer": "^1.2.13",
    "react-test-renderer": "16.8.6",
    "typescript": "^3.6.2",
    "@types/react": "^16.9.2",
    "@types/react-native": "^0.60.11",
    "react": "16.8.6",
    "react-native": "0.60.5",
    "tslib": "^1.10.0"
  },
  "jest": {
    "preset": "react-native"
  }
}

// 注意 dependencies 不要有依赖配置 否则会出现引包错乱的问题


2. 添加对外暴露文件文件  build.sh 
rm -rf lib
cd storybook 
cp -r stories ../lib 

3. 发布
npm login
npm publish 

发布的时候遇到的问题
1. 发布失败 没有忽略文件中的大文件
2. 发布时需要更改镜像源
```

### 项目中使用

ps. 在未集成原生模块之前采用： npm i rn_mint  直接使用

react-native 中直接引用
```tsx
import React from 'react'

import T from 'rn_mint'
const Ipt = T.BaseIpt


function Temp(){
    const getvals = (e) =>{
        alert(e)
    }
    return <Ipt title='name' changeVals={getvals}/>
}

export default Temp
```
ps. 由于本项目目前是有typescript编写, 暂时没有处理转译js ，所以js中引用会出现报错。目前只支持 rn项目typescript版本

---

roadmap:

### 优化
- 支持js 引用
- 引用方式优化

### 基础react-native 组件

- input 组件 
- toast 组件

...

### 原生模块组件(同时支持 android/ios)

- 调用相机
- 扫描二维码
- 调取图库
...

ps. ios 端支持 pod 和 link 方式
