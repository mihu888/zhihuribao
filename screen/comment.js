import { Text, StyleSheet, StatusBar, View, ScrollView, SafeAreaView, FlatList, TouchableOpacity, Image, TextInput} from 'react-native'
import React, { Component } from 'react'
import {Divider} from '@rneui/themed'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class commentscreen extends Component {
  constructor(props){
    super(props)

      this.state={
        isloading:true,
        url:'',
        lcomment:'',
        scomment:'',
        comment:'',
      }
  }
  componentDidMount(){
      fetch(url1)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      this.setState({lcomment:json.comments})
    })
    .catch((error) => console.error(error))
    .finally(() => 
      this.setState({isloading:false})
    )
      fetch(url2)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      this.setState({scomment:json.comments})
    })
    .catch((error) => console.error(error))
    .finally(() => 
      this.setState({isloading:false})
    )
  }
  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        <View style={{flex:1,flexDirection:'row',marginTop: StatusBar.currentHeight}}>
          <TouchableOpacity
          onPress={()=>this.props.navigation.goBack()}
          style={{flex:1}}>
            <Ionicons name={'chevron-back-outline'} size={35} style={{flex:1,verticalAlign:'middle'}} />
          </TouchableOpacity>
          <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:20}}>
              {this.state.lcomment.length+this.state.scomment.length}条评论
            </Text>
          </View>
          <View style={{flex:1}}></View>
        </View>
        <Divider orientation='horizontal'/>
        <View style={{flex:12}}>
          <ScrollView style={{marginHorizontal:15}} showsVerticalScrollIndicator={false}>
            <View style={{height:50}}>
              <Divider orientation='horizontal'/>
              <Text style={{fontSize:18}}>
                {this.state.lcomment.length}条长评
              </Text>
            </View>
            <FlatList
            data={this.state.lcomment}

            renderItem={({item})=>(
              <View>
                <View style={{flexDirection:'row'}}>
                  <Image
                  source={{uri:`${item.avatar}`}}
                  style={{height:30,width:30,borderRadius:20}}
                  />
                  <View style={{justifyContent:'center',marginLeft:5}}>
                    <Text style={{fontWeight:'bold',fontSize:17}}>
                      {item.author}
                    </Text>
                  </View>
                </View>
                <View style={{marginLeft:35}}>
                  <Text style={{fontSize:17}}>
                    {item.content}
                  </Text>
                </View>
                <Divider orientation='horizontal'/>
              </View>
            )}
            />
            <View style={{height:50}}>
              <Divider orientation='horizontal'/>
              <Text style={{fontSize:18}}>
                {this.state.scomment.length}条短评
              </Text>
            </View>
            <FlatList
            data={this.state.scomment}

            renderItem={({item})=>(
              <View>
                <View style={{flexDirection:'row'}}>
                  <Image
                  source={{uri:`${item.avatar}`}}
                  style={{height:30,width:30,borderRadius:20}}
                  />
                  <View style={{justifyContent:'center',marginLeft:5}}>
                    <Text style={{fontWeight:'bold',fontSize:17}}>
                      {item.author}
                    </Text>
                  </View>
                </View>
                <View style={{marginLeft:35}}>
                  <Text style={{fontSize:17}}>
                    {item.content}
                  </Text>
                </View>
                <Divider orientation='horizontal'/>
              </View>
            )}
            />
            <View style={{height:50,justifyContent:'center',alignItems:'center'}}>
              <Text style={{fontSize:20}}>
                已显示全部评论
              </Text>
            </View>
          </ScrollView>
        </View>
        <View style={{flex:1,backgroundColor:'#e0e0e0',flexDirection:'row',alignItems:'center'}}>
          <Image
          source={require('../image/1.jpg')}
          style={{height:40,width:40,marginLeft:10,borderRadius:20}}
          />
          <TextInput
          onChangeText={(comment)=>{this.state.comment}}
          placeholder='说说你的看法~~~'
          fontSize={20}
          placeholderTextColor={'#bbbbbb'}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({})