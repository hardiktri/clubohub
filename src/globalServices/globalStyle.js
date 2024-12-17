import {StyleSheet} from 'react-native';
import color from './color';
import Scale from './Scale';
const GlobalStyle = StyleSheet.create({
  backgroundColor: {
    backgroundColor: color.primaryColor,
    height: '100%',
    width: '100%',
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
    height: 100,
  },
  grediant: {
    marginTop: Scale(10),
    height: 50,
    width: '100%', // Flexible width
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: Scale(12),
    overflow: 'hidden',
  },
  bordercontainer: {
    flex: 1.0,
    color: 'white',
    backgroundColor: color.bgcolor,
    width: '99.2%', // Flexible width
    margin: 1.2,
    borderRadius: Scale(10),
    padding: 10,
  },
  txteditable: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B78428',
    backgroundColor: '#13132D',
  },
  prinarycolor: {
    backgroundColor: '',
  },
  avatar: {
    alignSelf: 'center',
    width: 75,
    height: 75,
    borderRadius: 65,
    borderColor: 'black',
    borderWidth: 1,
  },
  header: {
    width: '100%',
    height: 50,

    // top: '3%',
  },
  headerNeo: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    // marginLeft: '5%',
    // marginTop: 5,
    // marginBottom: 5,
    // borderRadius: 5,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seconderyBgColor: {
    backgroundColor: color.primaryColor,
  },
  textCss: {
    padding: 5,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerButtonLeft: {
    bottom: 15,
    left: 12,
    position: 'absolute',
  },
  btntext: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  setShadowHeader: {
    shadowOpacity: 0.6,
    shadowRadius: 1.8,
  },
  iconStyle: {
    height: 22,
    width: 22,
    color: 'white',
    fontSize: 20,
  },
  buttonStyle: {
    height: 50,
    borderRadius: 10,
    backgroundColor: color.btncolor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default GlobalStyle;
