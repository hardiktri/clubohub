import { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Button, BackHandler,StatusBar} from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { Link , useRoute,useNavigation} from '@react-navigation/native';



export default function Custommessage({route}) {
  const navigation = useNavigation();
const [upiparams, setParams] = useState(route.params);


const handleBackButtonClick = () => {
  
  // navigation.goBack('transaction');
  //navigation.push('transaction');
  return true;
}
useEffect(() => {


  
  BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  return () => {
    
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);

    };
}, []);
  return (
    <View style={styles.container}>
      <Text>{upiparams.params.message}</Text>
      <StatusBar style="auto" />
      <Link style={styles.underLineText} to={{ screen: upiparams.params.url }}>
     {upiparams.params.urltext}
    </Link>
    </View>
	
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	
  },
  button: {
    marginVertical: 10,
  },
  underLineText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: 'blue',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
