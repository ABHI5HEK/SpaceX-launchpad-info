import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];




const Item = ({ name }) => (
  <View style={styles.item}>
    
    <Text style={styles.title}>{name}</Text>
    
  </View>
);

class Launchpad extends Component {
    constructor(){
        super();
        this.state= {
            //launches: [{"id":5,"name":"VAFB SLC 3W","status":"retired","location":{"name":"Vandenberg Air Force Base","region":"California","latitude":34.6440904,"longitude":-120.5931438},"vehicles_launched":["Falcon 1"],"attempted_launches":0,"successful_launches":0,"wikipedia":"https://en.wikipedia.org/wiki/Vandenberg_AFB_Space_Launch_Complex_3","details":"SpaceX original west coast launch pad for Falcon 1. Performed a static fire but was never used for a launch and abandoned due to scheduling conflicts.","site_id":"vafb_slc_3w","site_name_long":"Vandenberg Air Force Base Space Launch Complex 3W"},{"id":2,"name":"CCAFS SLC 40","status":"active","location":{"name":"Cape Canaveral","region":"Florida","latitude":28.5618571,"longitude":-80.577366},"vehicles_launched":["Falcon 9"],"attempted_launches":61,"successful_launches":59,"wikipedia":"https://en.wikipedia.org/wiki/Cape_Canaveral_Air_Force_Station_Space_Launch_Complex_40","details":"SpaceX primary Falcon 9 launch pad, where all east coast Falcon 9s launched prior to the AMOS-6 anomaly. Initially used to launch Titan rockets for Lockheed Martin. Back online since CRS-13 on 2017-12-15.","site_id":"ccafs_slc_40","site_name_long":"Cape Canaveral Air Force Station Space Launch Complex 40"},{"id":8,"name":"STLS","status":"under construction","location":{"name":"Boca Chica Village","region":"Texas","latitude":25.9972641,"longitude":-97.1560845},"vehicles_launched":["Falcon 9"],"attempted_launches":0,"successful_launches":0,"wikipedia":"https://en.wikipedia.org/wiki/SpaceX_South_Texas_Launch_Site","details":"SpaceX new launch site currently under construction to help keep up with the Falcon 9 and Heavy manifests. Expected to be completed in late 2018. Initially will be limited to 12 flights per year, and only GTO launches.","site_id":"stls","site_name_long":"SpaceX South Texas Launch Site"},{"id":1,"name":"Kwajalein Atoll","status":"retired","location":{"name":"Omelek Island","region":"Marshall Islands","latitude":9.0477206,"longitude":167.7431292},"vehicles_launched":["Falcon 1"],"attempted_launches":5,"successful_launches":2,"wikipedia":"https://en.wikipedia.org/wiki/Omelek_Island","details":"SpaceX original launch site, where all of the Falcon 1 launches occured. Abandoned as SpaceX decided against upgrading the pad to support Falcon 9.","site_id":"kwajalein_atoll","site_name_long":"Kwajalein Atoll Omelek Island"},{"id":6,"name":"VAFB SLC 4E","status":"active","location":{"name":"Vandenberg Air Force Base","region":"California","latitude":34.632093,"longitude":-120.610829},"vehicles_launched":["Falcon 9"],"attempted_launches":16,"successful_launches":16,"wikipedia":"https://en.wikipedia.org/wiki/Vandenberg_AFB_Space_Launch_Complex_4","details":"SpaceX primary west coast launch pad for polar orbits and sun synchronous orbits, primarily used for Iridium. Also intended to be capable of launching Falcon Heavy.","site_id":"vafb_slc_4e","site_name_long":"Vandenberg Air Force Base Space Launch Complex 4E"},{"id":4,"name":"KSC LC 39A","status":"active","location":{"name":"Cape Canaveral","region":"Florida","latitude":28.6080585,"longitude":-80.6039558},"vehicles_launched":["Falcon 9","Falcon Heavy"],"attempted_launches":27,"successful_launches":26,"wikipedia":"https://en.wikipedia.org/wiki/Kennedy_Space_Center_Launch_Complex_39#Launch_Complex_39A","details":"NASA historic launch pad that launched most of the Saturn V and Space Shuttle missions. Initially for Falcon Heavy launches, it is now launching all of SpaceX east coast missions due to the damage from the AMOS-6 anomaly. After SLC-40 repairs are complete, it will be upgraded to support Falcon Heavy, a process which will take about two months. In the future it will launch commercial crew missions and the Interplanetary Transport System.","site_id":"ksc_lc_39a","site_name_long":"Kennedy Space Center Historic Launch Complex 39A"}],
            launches: []
        }
    }
    componentDidMount(){
         this.callApi();
    }


    async callApi(){
       let resp  = await fetch('https://api.spacexdata.com/v3/launchpads');
       let respJson = await resp.json();
    //    this.setState({launchName: respJson.map(inf=>{
    //        return (inf.name)
    //    })});

       this.setState({launches: respJson});

       //console.warn(this.state.launches);
    //console.warn(this.state.launches.map(info=>{return(info.name)}));
    }
   
  renderItem = ({ item }) => (
    //<Item name={item.name} />
    <View style={styles.item}>
   {/* {item.status == "active"?'green':'red'} */}
    <Text style={styles.title}>{"Launchpad Name: " +item.name}</Text>
    
    <Text style={styles.details}>{"Details: " + item.details}</Text>
    
    <Text style={styles.status}>{"Status:"+ item.status}</Text>
    
    <Text onPress={() => navigation.push('Launches')} style={styles.launch}>{"Launches: " + item.vehicles_launched}</Text>
  </View>
  );
  render(){
      console.log(this.state.launches)
  if(this.state.launches.length == 0){
    console.log("not working")
      return (<Text>Not found</Text>);
  }else{return ( 
    <SafeAreaView style={styles.container}>
      <FlatList
        data={this.state.launches}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );}
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#EFEFEF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    marginBottom:10
  },details: {
    fontSize: 12,
    color:'#4A403A',
    marginBottom:10
  },status: {
    fontSize: 20,
    color:'#FF0000'
  },launch: {
    fontSize: 20,
    color:'#4A403A'
  }
});

export default Launchpad;
