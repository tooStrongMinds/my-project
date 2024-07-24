<template>
    <div class="flex gap-6">
      <router-link to="/" title="Home" :class="{ 'text-white': $route.path === '/', 'text-textHover': $route.path !== '/' }"
        ><i class="fa-brands fa-windows text-xl"></i
      ></router-link>
      <router-link to="/movies" title="Movies" :class="{ 'text-white': $route.path === '/movies', 'text-textHover': $route.path !== '/movies' }"
        ><i class="fa-solid fa-film text-xl"></i
      ></router-link>
      <router-link to="/tv-series" title="Tv Series" :class="{ 'text-white': $route.path === '/tv-series', 'text-textHover': $route.path !== '/tv-series' }"
        ><i class="fa-solid fa-tv text-xl"></i
      ></router-link>
      <router-link to="/bookmarked" title="Bookmarked" :class="{ 'text-white': $route.path === '/bookmarked', 'text-textHover': $route.path !== '/bookmarked' }"
        ><i class="fa-solid fa-bookmark text-xl"></i
      ></router-link>
    </div>
  </template>

  