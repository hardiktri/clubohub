import PushNotification, {Importance} from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from 'react-native'; 

class LocalNotificationService {

    configure = (onOpenNotification) => {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },

            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);

                if (!notification?.data) {
                    return
                }

                notification.userInteraction = true;

                onOpenNotification(Platform.OS === "ios" ? notification.data.item : notification.data);

                if (Platform.OS === "ios") {
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                }

            },

            // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
            onAction: function (notification) {
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);

                // process the action
            },

            // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        });
    }

    unregister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options = {}) => {

        if (Platform.OS == "android") {
            PushNotification.createChannel(
                {
                    channelId: "clubo", // (required)
                    channelName: "clubo", // (required)
                    channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                    playSound: false, // (optional) default: true
                    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
                },
                (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
            );
        }

        PushNotification.localNotification({
            // Android Only Properties 
            ...this.buildAndroidNotification(id, title, message, data, options),

            // Ios Properties
            ...this.buildIOSNotification(id, title, message, data, options),

            // Android and ios properties
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false
        })
    }

    buildAndroidNotification = (id, title, message, data, options) => {
        return {
            id: id,
            channelId: "clubo",
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_notification",
            bigText: message || "",
            subText: title || "",
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: "high",
            data: data,
        }
    }

    buildIOSNotification = (id, title, message, data, options) => {
        return {
            alertAction: 'view',
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    cancelAllLocalNotifications = () => {
        if (Platform.OS == "ios") {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }
    }

    removeDeliveredNotificationByID = (notificationId) => {
        PushNotification.cancelLocalNotifications({ id: notificationId })
    }

}

export const localNotificationService = new LocalNotificationService()