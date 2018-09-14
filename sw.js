let staticCacheName = 'v2';

self.addEventListener('install', function(event) {
	event.waitUntil(
		// add the pages that we want to cache
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/restaurant.html',
				'/css/styles.css',
				'/js/dbhelper.js',
				'/js/main.js',
				'/js/restaurant_info.js',
				'/data/restaurants.json',
				'/img/1.jpg',
				'/img/1_200px.jpg',
				'/img/1_400px.jpg',
				'/img/2.jpg',
				'/img/2_200px.jpg',
				'/img/2_400px.jpg',
				'/img/3.jpg',
				'/img/3_200px.jpg',
				'/img/3_400px.jpg',
				'/img/4.jpg',
				'/img/4_200px.jpg',
				'/img/4_400px.jpg',
				'/img/5.jpg',
				'/img/5_200px.jpg',
				'/img/5_400px.jpg',
				'/img/6.jpg',
				'/img/6_200px.jpg',
				'/img/6_400px.jpg',
				'/img/7.jpg',
				'/img/7_200px.jpg',
				'/img/7_400px.jpg',
				'/img/8.jpg',
				'/img/8_200px.jpg',
				'/img/8_400px.jpg',
				'/img/9.jpg',
				'/img/9_200px.jpg',
				'/img/9_400px.jpg',
				'/img/10.jpg',
				'/img/10_200px.jpg',
				'/img/10_400px.jpg'
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function(cacheName) {
					return cacheName.startWith('v') && cacheName != staticCacheName;
				}).map(function(cacheName) {
					return caches.delete(cacheName);
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if(response) {
				console.log('found matches in cache');
				return response;
			}
			else {
				console.log('Cannot find match in cache');
				return fetch(event.request)
				.then(function(response) {
					const clonedResponse = response.clone();
					caches.open('v1').then(function(cache) {
						cache.put(event.request, clonedResponse);
					})
					return response;
				})
				.catch(function(err) {
					console.log(err);
				});
			}
		})
	);
});