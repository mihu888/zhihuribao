import { Text, StyleSheet, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { Component } from 'react'
import {WebView} from 'react-native-webview'
import {Divider} from '@rneui/themed'
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class newsscreen extends Component {
  constructor(props){
    super(props)

      this.state={
        isloading:true,
        url:'',
        news:'',
        image:'',
        title:'',
      }
  }
  componentDidMount(){
      fetch(url1)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      this.setState({news:json.body,id:json.id,image:json.image,title:json.title});
    })
    .catch((error) => console.error(error))
    .finally(() => 
      this.setState({isloading:false})
    )
  }
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <View style={{height:800,flex:16}}>
            <WebView
            source={{html:'<div style="display:flex;justify-content:center;position: relative;"><img src='
            +this.state.image
            +' width="2800"><font style="position: absolute; bottom: 0; left: 0" size="6" color="#ffffff">'
            +this.state.title
            +'</font></div>'+this.state.news}}
            originWhitelist={['*']}
            textZoom={300}
            automaticallyAdjustContentInsets
            style={{flex:1}}
            // injectedJavaScript={`
            //   const meta = document.createElement('meta');
            //   meta.setAttribute('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0,user-scalable=no');
            //   meta.setAttribute('name', 'viewport');
            //   document.getElementsByTagName('head')[0].appendChild(meta);
            // `}
            />
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1, alignItems:'center'}} >
            <TouchableOpacity
            onPress={()=>this.props.navigation.goBack()}
            >
              <Ionicons name={'chevron-back-outline'} size={35} style={{flex:1,verticalAlign:'middle'}} />
            </TouchableOpacity>
          </View>
          <Divider orientation='vertical'/>
          <View style={{flex:2, alignItems:'center', justifyContent:'center'}} >
            <TouchableOpacity
            onPress={()=>{
              url1=`https://news-at.zhihu.com/api/4/story/${this.state.id}/long-comments`;
              url2=`https://news-at.zhihu.com/api/4/story/${this.state.id}/short-comments`;
              console.log(url1,url2);
              this.props.navigation.navigate('comment',{url1:url1,url2:url2})
            }}>
              <Ionicons name={'chatbox-outline'} size={35} style={{flex:2,verticalAlign:'middle'}} />
            </TouchableOpacity>
          </View>
          <View style={{flex:2, alignItems:'center'}} ><TouchableOpacity>
            <Ionicons name={'thumbs-up-outline'} size={35} style={{flex:2,verticalAlign:'middle'}} />
          </TouchableOpacity></View>
          <View style={{flex:2, alignItems:'center'}} ><TouchableOpacity>
            <Ionicons name={'star-outline'} size={35} style={{flex:2,verticalAlign:'middle'}} />
          </TouchableOpacity></View>
          <View style={{flex:2, alignItems:'center'}} ><TouchableOpacity>
            <Ionicons name={'share-outline'} size={35} style={{flex:2,verticalAlign:'middle'}} />
          </TouchableOpacity></View>
        </View>
      </SafeAreaView>
      
    )
  }
}

const styles = StyleSheet.create({})