import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

    registerAppWithFCM = async () => {
        if (Platform.OS === "ios") {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.getToken(onRegister);
                }
                else {
                    this.requestPermission(onRegister);
                }
            })
            .catch(error => {
                console.log("Permission reject ", error);
            })
    }

    getToken = (onRegister) => {
        messaging().getToken()
        .then( fcmtoken => {
            if (fcmtoken) {
                onRegister(fcmtoken);
            } else {
                console.log("User does not have token")
            }
           
        } )
        .catch(error => {
            console.log("get token reject ", error);
        })
    }

    requestPermission = (onRegister) => {
        messaging().requestPermission()
        .then( () => {
            
               this.getToken(onRegister);
            
        } )
        .catch(error => {
            console.log("request permission reject ", error);
        })
    }

    deleteToken = () => {
        console.log("delete token");
        messaging().deleteToken()
        .catch(error => {
            console.log("delete token error ", error);
        })
    }

    createNotificationListeners = (onRegister , onNotification, onOpenNotification) => {

        messaging().onNotificationOpenedApp( remoteMessage => {
            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        } );

        messaging().getInitialNotification()
        .then(remoteMessage => {
            if(remoteMessage){
                const notification = remoteMessage.notification
                onOpenNotification(notification)
            }
        });

        this.messageListener = messaging().onMessage(async remoteMessage => {
            if (remoteMessage) {
                let notification = null
                if (Platform.OS === "ios") {
                    notification = remoteMessage.data.notification
                }
                else {
                    notification = remoteMessage.notification
                }
                onNotification(notification)
            }
        });

        messaging().onTokenRefresh(fcmToken => {
            onRegister(fcmToken);
        })

    }

    unRegister = () => {
        this.messageListener()
    }

}

export const fcmService = new FCMService()