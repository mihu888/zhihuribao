import { Text, StyleSheet, StatusBar, View, ScrollView, SafeAreaView, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity, Image, Dimensions, Alert} from 'react-native'
import React, { Component, useState, useCallback } from 'react'
import {Divider} from '@rneui/themed'
import Swiper from 'react-native-swiper';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default class mainscreen extends Component {
  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);

  //   wait(2000).then(() => setRefreshing(false));
  // }, []);
  refreshing = false;

  onRefresh() {
    this.refreshing = true;
    wait(2000).then(() => {
      this.refreshing = false;
      this.setState({}); // 强制刷新组件，以便更新RefreshControl状态
    });
  }
  constructor(props){
    super(props)
      
      this.state={
        isloading:true,
        news:{},
        date:{},
        url:'',
        it:false,
        date:new Date(),
        pastdate:new Date().getTime(),
        day:0,
        time:'',
        datestring(date){
          var year = date.getFullYear();
          var month = (date.getMonth() + 1).toString().padStart(2,'0');
          var day = date.getDate().toString().padStart(2,'0');
          return year+month+day;
        },
        getmonth() {
          var date = new Date();
          var month = (date.getMonth()+1).toString();
          if(month==1)month="一";
          if(month==2)month="二";
          if(month==3)month="三";
          if(month==4)month="四";
          if(month==5)month="五";
          if(month==6)month="六";
          if(month==7)month="七";
          if(month==8)month="八";
          if(month==9)month="九";
          if(month==10)month="十";
          if(month==11)month="十一";
          if(month==12)month="十二";
          return month+'月';
        },
        getday() {
          var date = new Date();
          var day = date.getDate().toString();
          return day;
        },
        gettime() {
          var date = new Date();
          var time = date.getHours()+8;
          if(8<=time&&time<11)time="早上好！";
          else if(11<=time&&time<15)time="知乎日报";
          else if(15<=time&&time<18)time="下午好！";
          else time="晚上好！";
          return time;
        }
      }
  }
  componentDidMount(){
      fetch(`http://news-at.zhihu.com/api/3/stories/latest`)
    .then((response) => response.json())
    .then((json)=>{
      console.log(json);
      this.setState({news:json.stories,date:json.date});
      console.log(this.state.news);
      console.log(this.state.datestring(new Date(this.state.pastdate - 15 * 24 * 3600 * 1000)));
      })
    .catch((error) => console.error(error))
    .finally(() => {
      this.setState({isloading: true});
    });
  };
  
  render() {
    
    return (
      <SafeAreaView style = {{flex:1}}>
        <StatusBar translucent backgroundColor="#ffffff" barStyle="dark-content" />
        <View style = {styles.vu}>
          <View style={{width:75,justifyContent:'center',alignItems:'center'}}>
            <View style={{marginTop:6,flex:5}}>
              <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>
                {this.state.getday()}
              </Text>
            </View>
            <View style={{marginBottom:6,flex:3}}>
              <Text style={{fontSize:12,fontWeight:'bold',color:'black'}}>
                {this.state.getmonth()}
              </Text>
            </View>
          </View>
          <Divider orientation='vertical' style={{marginVertical:10}} />
          <View style={{justifyContent:'center',width:Dimensions.get('window').width-120}}>
            <Text style={styles.time}>
              {this.state.gettime()}
            </Text>
          </View>
          <View style={{flex:1,justifyContent:'center',marginTop:4}}>
            <TouchableOpacity>
              <Image
              source={require('../image/1.jpg')}
              style={styles.tubiao}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style = {styles.vd}>
          {/* <View>
            <Swiper>
              <Image
              source={}
              />
            </Swiper>
          </View> */}
          <View>
            <FlatList
            data={this.state.news}

            refreshControl={
              <RefreshControl
              refreshing={this.refreshing}
              onRefresh={() => this.onRefresh()}
              />
            }
            renderItem={({item})=>{
              // if(this.state.it){
              //   this.setState({isloading:false})
              //   return(
              //     <View style={{flexDirection:'row'}}>
              //       <Text>
              //         aa
              //       </Text>
              //       <Divider orientation='horizontal'/>
              //     </View>
              //   );
              // }
              return(
              <TouchableOpacity
              onPress={()=>{
                url1=`https://news-at.zhihu.com/api/3/story/${item.id}`;
                console.log(url1);
                this.props.navigation.navigate('news',{url1:url1});
              }}
              >
                <View style={{flexDirection:'row'}}>
                  <View style={{height:90,justifyContent:'center',marginLeft:10,marginRight:10,width:Dimensions.get('window').width-107}}>
                    <Text style={styles.itemtitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.itemhint}>
                      {item.hint}
                    </Text>
                  </View>
                  <Image
                  source={{uri:`${item.images}`}}
                  style={styles.itemimage}
                  />
                </View>
              </TouchableOpacity>
              )
            }}
            style={{backgroundColor:'#ffffff'}}
            ListFooterComponent={() => (this.state.isloading ? <ActivityIndicator size="large" color="#0000ff" /> : null)}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              //Alert.alert('jiazai');
              this.setState({isloading:false});
              this.setState({pastdate:new Date(this.state.pastdate - 1 * 24 * 3600 * 1000)});
                fetch(`https://news-at.zhihu.com/api/3/news/before/${this.state.datestring(new Date(this.state.pastdate))}`)
              .then((response)=>response.json())
              .then((json)=>{
                console.log(json);
                // this.setState({isloading:false})
                this.setState({news: [...this.state.news, ...json.stories]});
                console.log(this.state.news);
              })
              .catch((error) => console.error(error))
              .finally(()=>{
                this.setState({isloading:true});
              })
            }}
            />
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
  
const styles = StyleSheet.create({
  vu:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'white',
    width:Dimensions.get('window').width,
    marginTop: StatusBar.currentHeight,
  },
  vd:{
    flex:12
  },
  date:{
    fontSize:20,
  },
  month:{
    fontSize:20
  },
  time:{
    fontSize:25,
    fontWeight:'bold',
    // textAlignVertical:'center',
    marginHorizontal:15,
    color:'black',
  },
  tubiao:{
    width:35,
    height:35,
    // marginHorizontal:Dimensions.get('window').width-333,
    marginVertical:7
  },
  itemimage:{
    marginTop:5,
    width:80,
    height:80,

  },
  itemtitle:{
    fontSize:17,
    fontWeight:'bold',
    color:'black',
  },
  itemhint:{
    fontSize:10,
  },
})