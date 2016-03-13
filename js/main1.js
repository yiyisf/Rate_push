/**
 * Created by liuzhe on 16/3/13.
 */
var reg;
var sub;
var API_KEY = 'AIzaSyC6N_jRzX_xD8CjM9cuhTPviUXJ4QUviXY';
var isSubscribed = false;
var subscribeButton = document.querySelector('button');
var curlCodeElement = document.querySelector('.js-curl-code');
curlCodeElement.disabled = true;

if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('../js/sw.js')
        .then(function (serviceWorkerRegistration) {
            reg = serviceWorkerRegistration;
            subscribeButton.disabled = false;
            console.log('Service Worker is ready :^)', reg);
        }).catch(function (error) {
        console.log('Service Worker Error :^(', error);
    });
}
subscribeButton.addEventListener('click', function () {
    if (isSubscribed) {
        unsubscribe();
    } else {
        subscribe();
    }
});
function subscribe() {
    reg.pushManager.subscribe({userVisibleOnly: true}).
    then(function (pushSubscription) {
        sub = pushSubscription;
        console.log('Subscribed! Endpoint:', sub.endpoint);
        subscribeButton.textContent = 'Unsubscribe';
        isSubscribed = true;

        // We should figure the GCM curl command
        var produceGCMProprietaryCURLCommand = function () {
            var curlEndpoint = 'https://android.googleapis.com/gcm/send';
            var endpointSections = sub.endpoint.split('/');
            var subscriptionId = endpointSections[endpointSections.length - 1];
            var curlCommand = 'curl --header "Authorization: key=' +
                API_KEY + '" --header Content-Type:"application/json" ' +
                curlEndpoint + ' -d "{\\"registration_ids\\":[\\"' +
                subscriptionId + '\\"]}"';
            return curlCommand;
        };

        var produceWebPushProtocolCURLCommand = function () {
            var curlEndpoint = sub.endpoint;
            var curlCommand = 'curl --request POST ' + curlEndpoint;
            return curlCommand;
        };

        var curlCommand;
        if (sub.endpoint.indexOf(
                'https://android.googleapis.com/gcm/send') === 0) {
            curlCommand = produceGCMProprietaryCURLCommand();
        } else {
            curlCommand = produceWebPushProtocolCURLCommand();
        }
        curlCodeElement.disabled = false;
        curlCodeElement.innerHTML = curlCommand;


    });
}
function unsubscribe() {
    sub.unsubscribe().then(function (event) {
        subscribeButton.textContent = 'Subscribe';
        console.log('Unsubscribed!', event);
        isSubscribed = false;
        curlCodeElement.disabled = false;
        curlCodeElement.innerHTML = '';
    }).catch(function (error) {
        console.log('Error unsubscribing', error);
        subscribeButton.textContent = 'Subscribe';
    });
}
