import { renderTopbarMenus, showUserNameNavbar, getAndShowMenuAndSubMenu } from './funcs/shared.js';

window.addEventListener('load', function () {
   showUserNameNavbar();

   renderTopbarMenus();

   getAndShowMenuAndSubMenu();
});
