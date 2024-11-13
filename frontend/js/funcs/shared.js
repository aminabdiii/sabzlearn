import { getMe } from './auth.js';
import { isLogin, getUrlParam, getToken } from './utils.js';

const showUserNameNavbar = function () {
   const navBarProfileBox = document.querySelector('#navBarProfileBox');
   const navBarProfileName = document.querySelector('#navBarProfileName');
   const isUserLogin = isLogin();
   if (isUserLogin) {
      // navBarProfileName.innerHTML = ;
      getMe().then(data => {
         navBarProfileName.innerHTML = `${data.name}`;
      });
      navBarProfileBox.setAttribute('href', '#');
   } else {
      navBarProfileName.innerHTML = 'ورود / ثبت نام';
      navBarProfileBox.setAttribute('href', 'login.html');
   }
};

const renderTopbarMenus = async function () {
   const topbarList = document.querySelector('#topbarList');
   topbarList.innerHTML = '';

   const res = await fetch('http://localhost:4000/v1/menus/topbar', {
      method: 'GET',
   });
   const topbarMenus = await res.json();
   // console.log(topbarMenus);

   const shuffle = topbarMenus.sort(() => 0.5 - Math.random());
   // console.log(shuffle);
   shuffle.splice(0, 6).forEach(data => {
      topbarList.innerHTML += `<li><a href="#" class="p-4">${data.title}</a></li>`;
   });
};

const getAndShowAllCourses = async function () {
   const coursesContainer = document.querySelector('#coursesContainer');
   coursesContainer.innerHTML = '';

   const res = await fetch('http://localhost:4000/v1/courses', {
      method: 'GET',
   });
   const courses = await res.json();
   console.log(courses);
   courses.slice(0, 6).map(course => {
      coursesContainer.insertAdjacentHTML(
         'beforeend',
         `
      <section class="bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
          <a href="course.html?name=${course.shortName}" class="block w-full">
              <div class="w-full">
                  <img
                      src="http://localhost:4000/courses/covers/${course.cover}"
                      alt="${course.name}"
                      class="rounded-b-2xl w-[299px] h-[168.188px] select-none"
                  />
              </div>
          </a>

          <div class="flex flex-col gap-y-3 pt-2 px-4.5 h-24">
                  <a href="course.html?name=${course.shortName}">
                      <h4 class="font-semibold leading-7 line-clamp-2 inline">
                          ${course.name}
                      </h4></a
                  >
                  <p class="line-clamp-2 text-[15px] opacity-70 font-medium leading-6">
                      ${course.description}
                  </p>
              </div>

          <div class="pb-2 pt-3 px-4.5">
              <div class="flex justify-between items-center pt-8 pb-3 border-b">
                  <a href="#" class="flex items-center gap-x-1 text-base text-slate-500">
                      <i class="fa-regular fa-user text-lg"></i>
                      ${course.creator}
                  </a>
                  <span class="text-yellow-400 text-lg">
                      ${course.courseAverageScore + '.0'}
                      <i class="fa-solid fa-star"></i>
                  </span>
              </div>
              <div class="flex justify-between py-2">
                  <span class="text-sm flex items-center gap-x-0.5 text-slate-500">
                      <i class="bi bi-people text-xl"></i>
                      ${course.registers}
                  </span>
                  <span class="text-primaryColor font-bold text-xl"> ${
                     course.price === 0 ? 'رایگان' : course.price.toLocaleString()
                  } </span>
              </div>
          </div>
      </section>
      `
      );
   });

   return courses;
};

const getAndShowPopularCourses = async function () {
   const containerPopularCourses = document.querySelector('#containerPopularCourses');
   containerPopularCourses.innerHTML = '';
   const res = await fetch('http://localhost:4000/v1/courses/popular', {
      method: 'GET',
   });
   const popularCoursesData = await res.json();

   popularCoursesData.map(pupCourse => {
      // console.log(pupCourse);
      containerPopularCourses.insertAdjacentHTML(
         'beforeend',
         `
         <div class="swiper-slide !w-auto">
         <section class="bg-white rounded-2xl overflow-hidden flex flex-col justify-between w-[297.500px] h-[400.987px]">
          <a href="#" class="block w-full">
              <div class="w-full">
                  <img
                      src="http://localhost:4000/courses/covers/${pupCourse.cover}"
                      alt="${pupCourse.name}"
                      class="rounded-b-2xl w-[299px] h-[168.188px]"
                  />
              </div>
          </a>

          <div class="flex flex-col gap-y-3 pt-2 px-4.5 h-24">
                  <a href="#">
                      <h4 class="font-semibold leading-7 line-clamp-2 inline">
                          ${pupCourse.name}
                      </h4></a
                  >
                  <p class="line-clamp-2 text-[15px] opacity-70 font-medium leading-6">
                      ${pupCourse.description}
                  </p>
              </div>

          <div class="pb-2 pt-3 px-4.5">
              <div class="flex justify-between items-center pt-8 pb-3 border-b">
                  <a href="#" class="flex items-center gap-x-1 text-base text-slate-500">
                      <i class="fa-regular fa-user text-lg"></i>
                      ${pupCourse.creator}
                  </a>
                  <span class="text-yellow-400 text-lg">
                      ${pupCourse.courseAverageScore + '.0'}
                      <i class="fa-solid fa-star"></i>
                  </span>
              </div>
              <div class="flex justify-between py-2">
                  <span class="text-sm flex items-center gap-x-0.5 text-slate-500">
                      <i class="bi bi-people text-xl"></i>
                      ${pupCourse.registers}
                  </span>
                  <span class="text-primaryColor font-bold text-xl"> ${
                     pupCourse.price === 0 ? 'رایگان' : pupCourse.price.toLocaleString()
                  } </span>
              </div>
          </div>
      </section>
         </div>
      `
      );
   });
};

const getAndShowPresaleCourses = async function () {
   const containerPresaleCourses = document.querySelector('#containerPresaleCourses');
   containerPresaleCourses.innerHTML = '';

   const res = await fetch('http://localhost:4000/v1/courses/presell', {
      method: 'GET',
   });
   const presaleCourses = await res.json();

   presaleCourses.map(preCourse => {
      containerPresaleCourses.insertAdjacentHTML(
         'beforeend',
         `
      <div class="swiper-slide !w-auto">
         <section class="bg-white rounded-2xl overflow-hidden flex flex-col justify-between w-[297.500px] h-[400.987px]">
          <a href="#" class="block w-full">
              <div class="w-full">
                  <img
                      src="http://localhost:4000/courses/covers/${preCourse.cover}"
                      alt="${preCourse.name}"
                      class="rounded-b-2xl w-full h-[168.188px]"
                  />
              </div>
          </a>

          <div class="flex flex-col gap-y-3 pt-2 px-4.5 h-24">
                  <a href="#">
                      <h4 class="font-semibold leading-7 line-clamp-2 inline">
                          ${preCourse.name}
                      </h4></a
                  >
                  <p class="line-clamp-2 text-[15px] opacity-70 font-medium leading-6">
                      ${preCourse.description}
                  </p>
              </div>

          <div class="pb-2 pt-3 px-4.5">
              <div class="flex justify-between items-center pt-8 pb-3 border-b">
                  <a href="#" class="flex items-center gap-x-1 text-base text-slate-500">
                      <i class="fa-regular fa-user text-lg"></i>
                      ${preCourse.creator}
                  </a>
                  <span class="text-yellow-400 text-lg">
                      ${preCourse.courseAverageScore + '.0'}
                      <i class="fa-solid fa-star"></i>
                  </span>
              </div>
              <div class="flex justify-between py-2">
                  <span class="text-sm flex items-center gap-x-0.5 text-slate-500">
                      <i class="bi bi-people text-xl"></i>
                      ${preCourse.registers}
                  </span>
                  <span class="text-primaryColor font-bold text-xl"> ${
                     preCourse.price === 0 ? 'رایگان' : preCourse.price.toLocaleString()
                  } </span>
              </div>
          </div>
      </section>
         </div>
      `
      );
   });
};

const getAndShowArticlesBox = async function () {
   const containerArticleBox = document.querySelector('#containerArticleBox');
   containerArticleBox.innerHTML = '';
   const res = await fetch('http://localhost:4000/v1/articles', {
      method: 'GET',
   });
   const articleData = await res.json();

   articleData.slice(0, 6).forEach(article => {
      let date = new Date(article.createdAt);
      const showDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;

      containerArticleBox.insertAdjacentHTML(
         'beforeend',
         `
         <div class="bg-white rounded-lg overflow-hidden flex flex-col justify-between h-full">
               <a href="#">
                   <div class="relative w-full h-[168px]">
                       <img src="http://localhost:4000/courses/covers/${article.cover}" class="w-full h-full" alt="${article.title}" />
                       <div class="absolute top-0 right-0 w-full blogGradient h-full"></div>
                   </div>
               </a>
               <a href="#" class="block px-4.5 pt-8"><h3 class="text-[16.5px] leading-7 font-semibold ">${article.title}</h3></a>
               <div class="px-4.5 pt-2.5 flex flex-col justify-end gap-y-3 h-3/4">
                   <span class="font-medium line-clamp-4 text-slate-500 text-[15px] text-justify leading-6"
                       >${article.description}</span
                   >
                   <div class="flex justify-between items-center text-slate-500 pt-8">
                       <div>
                           <a href="#" class="text-[14px] text-inherit">
                               <i class="fa-regular fa-user text-lg"></i>
                              ${article.creator.name}
                           </a
                           >
                       </div>
                       <div>
                           <span>${showDate}</span>
                           <i class="fa-regular fa-calendar-days"></i>
                       </div>
                   </div>
                   <a
                       href="#"
                       class="flex items-center justify-center transition-all duration-300 text-darkColor py-4 border-t-2 border-t-slate-500/font-semibold"
                   >
                       مطالعه مقاله
                       <i class="fa-solid fa-circle-left px-1"></i>
                   </a>
               </div>
         </div>
      `
      );
   });
};

const getAndShowMenuAndSubMenu = async function () {
   const containerMenu = document.querySelector('#containerMenu');

   const res = await fetch('http://localhost:4000/v1/menus', {
      method: 'GET',
   });
   const menuDatas = await res.json();
   console.log(menuDatas);
   menuDatas.forEach(menu => {
      containerMenu.insertAdjacentHTML(
         'beforeend',
         `
      <li class="relative">
          <a href="category.html?cat=${
             menu.href
          }" class="py-8 li-container peer flex items-center gap-x-1">
              ${menu.title}
              ${menu.submenus.length === 0 ? '' : '<i class="fa-solid fa-angle-down"></i>'}
          </a>
          ${
             menu.submenus.length === 0
                ? ''
                : `
          <ul
              class="absolute z-20 border opacity-0 peer-hover:transition-all peer-hover:duration-300 invisible top-20 right-0 w-64 bg-white shadow shadow-gray-300 rounded-lg peer-hover:visible peer-hover:opacity-100 border-b-4 border-b-primaryColor peer-hover:top-[87px] hover:visible hover:opacity-100 hover:top-[87px] hover:delay-1000 space-y-1"
          >
            ${menu.submenus
               .map(sub => {
                  return `<li class="block"><a href="#" class="px-3 py-2.5 block line-clamp-1">${sub.title}</a></li>`;
               })
               .join('')}
          </ul>
          `
          }
      </li>
      `
      );
   });
};

const getAndShowCoursesFromCategory = async function () {
   const categoryName = getUrlParam('cat').slice(15);
   const containerCategoryCoursesGrid = document.querySelector('#containerCategoryCoursesGrid');
   containerCategoryCoursesGrid.innerHTML = '';
   console.log(categoryName);
   const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`, {
      method: 'GET',
   });
   const categoryCourses = await res.json();
   return categoryCourses;
};

const createHtmlTemplate = function (showType, parrent, course, cleanParrent) {
   // grid showType
   if (showType === 'grid') {
      cleanParrent.innerHTML = '';
      parrent.innerHTML = '';
      course.forEach(course => {
         parrent.insertAdjacentHTML(
            'beforeend',
            `
      <section class="bg-white rounded-2xl overflow-hidden flex flex-col justify-between">
                   <a href="#" class="block w-full">
                       <div class="w-full">
                           <img
                               src="http://localhost:4000/courses/covers/${course.cover}"
                               alt="${course.name}"
                               class="rounded-b-2xl w-[299px] h-[168.188px]"
                           />
                       </div>
                   </a>

                   <div class="flex flex-col gap-y-3 pt-2 px-4.5 h-24">
                           <a href="#">
                               <h4 class="font-semibold leading-7 line-clamp-2 inline">
                                   ${course.name}
                               </h4></a
                           >
                           <p class="line-clamp-2 text-[15px] opacity-70 font-medium leading-6">
                               ${course.description}
                           </p>
                       </div>

                   <div class="pb-2 pt-3 px-4.5">
                       <div class="flex justify-between items-center pt-8 pb-3 border-b">
                           <a href="#" class="flex items-center gap-x-1 text-base text-slate-500">
                               <i class="fa-regular fa-user text-lg"></i>
                               ${course.creator}
                           </a>
                           <span class="text-yellow-400 text-lg">
                               ${course.courseAverageScore + '.0'}
                               <i class="fa-solid fa-star"></i>
                           </span>
                       </div>
                       <div class="flex justify-between py-2">
                           <span class="text-sm flex items-center gap-x-0.5 text-slate-500">
                               <i class="bi bi-people text-xl"></i>
                               ${course.registers}
                           </span>
                           <span class="text-primaryColor font-bold text-xl"> ${
                              course.price === 0 ? 'رایگان' : course.price.toLocaleString()
                           } </span>
                       </div>
                   </div>
               </section>
      `
         );
      });
   } else {
      cleanParrent.innerHTML = '';
      parrent.innerHTML = '';
      course.forEach(course => {
         parrent.insertAdjacentHTML(
            'beforeend',
            `
                  <section class="flex rounded-lg overflow-hidden items-center gap-x-5 bg-white pl-5">
                       <div>
                           <a href="#">
                               <img src="http://localhost:4000/courses/covers/${
                                  course.cover
                               }" alt="" class="h-[220.19px] w-[394px]" />
                           </a>
                       </div>
                       <div class="w-9/12 space-y-2">
                           <div>
                               <a href="#" class="text-black">
                                   <h4 class="text-base font-semibold">${course.name}</h4>
                               </a>
                           </div>
                           <div class="flex justify-between w-full">
                               <div>
                                   <a href="#" class="flex items-center gap-x-1 text-base text-slate-500 py-1">
                                       <i class="fa-regular fa-user text-lg"></i>
                                       <span> ${course.creator}</span>
                                   </a>
                               </div>
                               <div>
                                   <span class="text-yellow-400 text-lg">
                                       ${course.courseAverageScore + '.0'}
                                       <i class="fa-solid fa-star"></i>
                                   </span>
                               </div>
                           </div>
                           <div>
                               <p class="opacity-70 font-medium leading-7 text-justify h-[84px] line-clamp-3 overflow-hidden">
                                   ${course.description}
                               </p>
                           </div>
                           <div class="flex justify-between">
                               <div class="text-slate-500"><i class="bi bi-people text-xl"></i> ${
                                  course.registers
                               }</div>
                               <div>
                                   <span class="text-primaryColor font-bold text-xl">${
                                      course.price === 0 ? 'رایگان' : course.price.toLocaleString()
                                   }</span>
                               </div>
                           </div>
                       </div>
                   </section>
                  `
         );
      });
   }
};

const sortingCoursesInCategoryPage = function (arrCourses, filter) {
   let outputFilter = '';

   switch (filter) {
      case 'free':
         outputFilter = arrCourses.filter(course => course.price === 0);
         break;
      case 'money':
         outputFilter = arrCourses.filter(course => course.price > 0);
         break;
      case 'default':
         outputFilter = arrCourses;
         break;
      case 'score':
         outputFilter = [...arrCourses]
            .sort((a, b) => a.courseAverageScore - b.courseAverageScore)
            .reverse();
         break;
      case 'first':
         outputFilter = [...arrCourses].reverse();
         break;
      case 'last':
         outputFilter = arrCourses;
      default:
         outputFilter = arrCourses;
   }

   return outputFilter;
};

const calcClock = function (data, minOrHour, minOrHour2) {
   let courseTime = data
      .map(data => {
         return Number(data.slice(minOrHour, minOrHour2));
      })
      .reduce((acc, num) => {
         return acc + num;
      }, 0);
   return courseTime;
};

const getCourseDetails = async function () {
   const courseShortName = getUrlParam('name');
   const courseTitle = document.querySelector('.courseTitle');
   const categoryCourseTitle = document.querySelector('.categoryCourseTitle');
   const courseDescription = document.querySelector('.courseDescription');
   const courseDetailsBoxStatus = document.querySelector('.courseDetailsBox-status');
   const courseDetailsBoxSupport = document.querySelector('.courseDetailsBox-support');
   const courseDetailsBoxDate = document.querySelector('.courseDetailsBox-date');
   const courseDetailsBoxLoginStatus = document.querySelector('.courseDetailsBox-loginStatus');
   const courseDetailsBoxCourseTime = document.querySelector('.courseDetailsBox-courseTime');
   const courseVideo = document.querySelector('.courseVideo');
   const courseCommentCount = document.querySelector('.courseCommentCount');
   const courseStudentCount = document.querySelector('.courseStudentCount');
   const accardionSessionsCourseContainer = document.querySelector(
      '.accardionSessionsCourseContainer'
   );

   const res = await fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
      method: 'GET',
      headers: {
         Authorization: getToken('user'),
      },
   });
   const courseData = await res.json();
   console.log(courseData);

   // calculate course time
   const time = courseData.sessions.map(data => data.time.replace(':', ''));
   let min = calcClock(time, 0, 2);
   let courseClock = 60 % calcClock(time, 2, 4) === 0 ? ++min : min;
   const resultCalcCourseTime =
      Math.floor(courseClock / 60) === 0
         ? `${min === 0 ? 'به زودی' : min + ' دقیقه'} `
         : `${Math.floor(courseClock / 60)} ساعت`;
   // show details course
   courseTitle.innerHTML = courseData.name;
   categoryCourseTitle.innerHTML = courseData.categoryID.title;
   courseDescription.innerHTML = courseData.description;
   courseDetailsBoxStatus.innerHTML = courseData.isComplete ? 'تکمیل شده' : 'در حال برگزاری';
   courseDetailsBoxSupport.innerHTML = courseData.support;
   courseDetailsBoxDate.innerHTML = courseData.createdAt.slice(0, 10);
   courseDetailsBoxLoginStatus.insertAdjacentHTML(
      'beforeend',
      `${courseData.isUserRegisteredToThisCourse ? 'دانشجوی دوره هستید' : 'ثبت نام در دوره'} 
   `
   );
   courseDetailsBoxCourseTime.innerHTML = resultCalcCourseTime;
   courseVideo.setAttribute('poster', `http://localhost:4000/courses/covers/${courseData.cover}`);
   courseCommentCount.insertAdjacentHTML('beforeend', `${courseData.comments.length} دیدگاه`);
   courseStudentCount.innerHTML = courseData.courseStudentsCount;

   //! accordion
   if (courseData.sessions.length) {
      courseData.sessions.forEach((session, index) => {
         console.log(session);
         const tag = session.free || courseData.isUserRegisteredToThisCourse ? 'a' : 'span';
         const HREFofORon =
            tag === 'a' ? `href=episode.html?name=${courseData.shortName}&id=${session._id}` : '';

         accardionSessionsCourseContainer.insertAdjacentHTML(
            'beforeend',
            `
           <div
                id="hs-basic-collapse-one"
                class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 bg-gray-200/50 px-5 accItems"
                aria-labelledby="hs-basic-heading-one"
            >
                <${tag} class="py-5 flex justify-between items-center gap-x-5 text-black group" ${HREFofORon}>
                    <div class="flex items-center gap-x-4">
                        <div
                            class="w-8 h-8 transition-[background-color] duration-300 flex items-center justify-center border border-slate-500 rounded-full group-hover:bg-primaryColor group-hover:border-primaryColor group-hover:text-white"
                       >
                            ${index + 1}
                        </div>
                        <span class="group-hover:text-black text-black">${session.title}</span>
                    </div>
                    <span class="flex items-center gap-x-1">
                        ${
                           session.free || courseData.isUserRegisteredToThisCourse
                              ? ''
                              : `<i class="fa-solid fa-lock text-lg pb-1 pl-2 text-slate-500"></i>`
                        }
                         ${session.time}
                        <i class="fa-brands fa-youtube text-xl transition-colors duration-300 text-black/70 group-hover:text-primaryColor "></i>
                    </span>
                </${tag}>
            </div>
      `
         );
      });
   } else {
      accardionSessionsCourseContainer.insertAdjacentHTML(
         'beforeend',
         `
           <div
                id="hs-basic-collapse-one"
                class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 bg-gray-200/50 px-5 accItems"
                aria-labelledby="hs-basic-heading-one"
            >
                <span class="py-5 flex justify-between items-center gap-x-5 text-black group" href="#">
                    <div class="flex items-center gap-x-4">
                        <div
                            class="w-8 h-8 transition-[background-color] duration-300 flex items-center justify-center border border-slate-500 rounded-full group-hover:bg-primaryColor group-hover:border-primaryColor group-hover:text-white"
                       >
                            --
                        </div>
                        <span class="group-hover:text-black text-black">هنوز جلسه ای آپلود نشده</span>
                    </div>
                    <span class="flex items-center gap-x-1">
                        00:00
                        <i class="fa-brands fa-youtube text-xl transition-colors duration-300 text-black/70 group-hover:text-primaryColor "></i>
                    </span>
                </span>
            </div>
      `
      );
   }

   //! accordion
};

const getAndShowRelatedCourse = async function () {
   const containerRelatedCourses = document.querySelector('.containerRelatedCourses');
   const shortName = getUrlParam('name');

   const res = await fetch(`http://localhost:4000/v1/courses/related/${shortName}`, {
      method: 'GET',
   });
   const data = await res.json();

   data.forEach(course => {
      containerRelatedCourses.insertAdjacentHTML(
         'beforeend',
         `
      <li>
          <a href="course.html?name=${course.shortName}" class="flex items-center gap-x-2">
              <div>
                  <img src="http://localhost:4000/courses/covers/${course.cover}" class="w-24 rounded-md" alt="" />
              </div>
              <div>
                  <span class="text-[13px] font-semibold"> ${course.name} </span>
              </div>
          </a>
      </li>
      `
      );
   });
};

const getSessionInfo = async function () {
   const courseShortName = getUrlParam('name');
   const episodeID = getUrlParam('id');

   const res = await fetch(`http://localhost:4000/v1/courses/${courseShortName}/${episodeID}`, {
      method: 'GET',
      Authorization: `Bearer ${getToken()}`,
   });
   const episodeData = await res.json();
   console.log(episodeData);
};

export {
   showUserNameNavbar,
   renderTopbarMenus,
   getAndShowAllCourses,
   getAndShowPopularCourses,
   getAndShowPresaleCourses,
   getAndShowArticlesBox,
   getAndShowMenuAndSubMenu,
   getAndShowCoursesFromCategory,
   createHtmlTemplate,
   sortingCoursesInCategoryPage,
   getCourseDetails,
   getAndShowRelatedCourse,
   getSessionInfo,
};
