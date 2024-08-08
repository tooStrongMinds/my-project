<template>
    <div class="flex gap-6 lg:flex-col lg:items-center">
      <router-link to="/" title="Home" :class="{ 'text-white': $route.path === '/', 'text-textHover': $route.path !== '/' }" class="hover:text-redHover transition duration-300"
        ><i class="fa-brands fa-windows text-xl"></i
      ></router-link>
      <router-link to="/movies" title="Movies" :class="{ 'text-white': $route.path === '/movies', 'text-textHover': $route.path !== '/movies' }" class="hover:text-redHover transition duration-300"
        ><i class="fa-solid fa-film text-xl"></i
      ></router-link>
      <router-link to="/tv-series" title="Tv Series" :class="{ 'text-white': $route.path === '/tv-series', 'text-textHover': $route.path !== '/tv-series' }" class="hover:text-redHover transition duration-300"
        ><i class="fa-solid fa-tv text-xl"></i
      ></router-link>
      <router-link to="/bookmarked" title="Bookmarked" :class="{ 'text-white': $route.path === '/bookmarked', 'text-textHover': $route.path !== '/bookmarked' }" class="hover:text-redHover transition duration-300"
        ><i class="fa-solid fa-bookmark text-xl"></i
      ></router-link>
    </div>
  </template>

  