/**
 * Created by liuzhe on 16/3/12.
 */
// Version 0.1


//推送通知
'use strict';

console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('push', function(event) {
  console.log('Push message', event);

  var title = 'Push message';

  event.waitUntil(
    self.registration.showNotification(title, {
      'body': 'The Message',
      'icon': '../images/icon.png'
    }));
});

//self.addEventListener('push', function(event) {
//  console.log('Push message received', event);
//
//  var title = 'Push message';
//  event.waitUntil(
//    self.registration.showNotification(title, {
//      body: 'The Message',
//      icon: '../images/icon1.png',
//      tag: 'my-tag'
//    }));
//
//   TODO
//});


//Handle notification clicks

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'https://youtu.be/gYMkEMCHtJ4';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});