'use strict';
import { getAndShowAllCourses, getAndShowPopularCourses, getAndShowPresaleCourses, getAndShowArticlesBox as getAndShowArticlesBox, getAndShowMenuAndSubMenu } from './funcs/shared.js';
const $ = document;
const landingTitle = $.querySelector('#landingTitle');
const teacherCount = $.querySelector('#teacherCount');
const minutesCount = $.querySelector('#minutesCount');
const studentCount = $.querySelector('#studentCount');

window.addEventListener('load', () => {
   let landingText = 'ما به هر قیمتی دوره آموزشی تولید نمی‌کنیم!';
   let landingIndex = 0;

   typeWriter(landingText, landingIndex);
   counterfunction(teacherCount, 198);
   counterfunction(studentCount, 1_001);
   counterfunction(minutesCount, 5_220);

   getAndShowAllCourses();
   getAndShowPopularCourses();
   getAndShowPresaleCourses();
   getAndShowArticlesBox();
});

function typeWriter(text, i) {
   if (i < text.length) {
      landingTitle.innerHTML += text[i];
      i++;
   }

   setTimeout(() => {
      typeWriter(text, i);
   }, 100);
}

function counterfunction(element, max) {
   let counter = 0;
   setInterval(() => {
      if (counter === max) return;
      counter++;
      element.innerHTML = counter;
   }, 4);
}
