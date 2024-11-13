import {
   getAndShowCoursesFromCategory,
   createHtmlTemplate,
   sortingCoursesInCategoryPage,
} from './funcs/shared.js';
import { sweetAlert, searchInArray } from './funcs/utils.js';

window.addEventListener('load', function () {
   const containerCategoryCoursesGrid = document.querySelector('#containerCategoryCoursesGrid');
   const containerCategoryCoursesRow = document.querySelector('#containerCategoryCoursesRow');
   const btnShowTypeItem = document.querySelectorAll('.btnShowTypeItem');

   const coursesFilteringSelections = document.querySelectorAll('.coursesFilteringSelections');
   const coursesFilteringTitle = document.querySelector('.coursesFilteringTitle');

   const inputSearchCourses = document.querySelector('#inputSearchCourses');

   let showType = 'grid';

   const defaultAllStyleSelections = function () {
      coursesFilteringSelections.forEach(element => element.classList.remove('bg-gray-300'));
   };

   getAndShowCoursesFromCategory().then(courses => {
      const categoryCourses = [...courses];

      if (categoryCourses.length) {
         createHtmlTemplate(
            'grid',
            containerCategoryCoursesGrid,
            categoryCourses,
            containerCategoryCoursesRow
         );
      } else {
         sweetAlert(
            'دوره ای در این دسته وجود ندارد',
            'دسته بندی دیگری را انتخاب کنید',
            'error',
            () => (location.href = 'index.html'),
            'باشه'
         );
      }

      // click the showType buttons
      // show category Courses by grid or row show type
      btnShowTypeItem.forEach(btn => {
         btn.addEventListener('click', function (e) {
            defaultAllStyleSelections();
            coursesFilteringSelections[0].classList.add('bg-gray-300');
            coursesFilteringTitle.innerHTML = coursesFilteringSelections[0].innerHTML;

            containerCategoryCoursesGrid.innerHTML = '';
            containerCategoryCoursesRow.innerHTML = '';

            const btnTarget = e.target.closest('.btnShowTypeItem');
            if (!btnTarget) return;
            btnShowTypeItem.forEach(btn => btn.classList.remove('active-category-item'));
            btnTarget.classList.add('active-category-item');
            // show category Courses by grid or row show type
            if (String(btnTarget.classList).includes('Grid')) {
               showType = 'grid';
               createHtmlTemplate(
                  showType,
                  containerCategoryCoursesGrid,
                  categoryCourses,
                  containerCategoryCoursesRow
               );
            } else {
               showType = 'row';
               createHtmlTemplate(
                  showType,
                  containerCategoryCoursesRow,
                  categoryCourses,
                  containerCategoryCoursesGrid
               );
            }
         });
      });

      // show category Courses by user filtering method
      coursesFilteringSelections.forEach(item => {
         item.addEventListener('click', function (e) {
            inputSearchCourses.value = '';
            e.preventDefault();
            let targetSelection = e.target;
            defaultAllStyleSelections();
            targetSelection.classList.add('bg-gray-300');

            coursesFilteringTitle.innerHTML = targetSelection.innerHTML;

            console.log(targetSelection.getAttribute('data-key'));

            let arrCoursesByUserFiltering = sortingCoursesInCategoryPage(
               [...categoryCourses],
               targetSelection.getAttribute('data-key')
            );
            if (showType === 'grid') {
               createHtmlTemplate(
                  showType,
                  containerCategoryCoursesGrid,
                  arrCoursesByUserFiltering,
                  containerCategoryCoursesRow
               );
            } else {
               createHtmlTemplate(
                  showType,
                  containerCategoryCoursesRow,
                  arrCoursesByUserFiltering,
                  containerCategoryCoursesGrid
               );
            }
         });
      });

      // handle search in courses
      inputSearchCourses.addEventListener('input', function (e) {
         let shownCourses = searchInArray(categoryCourses, 'name', e.target.value);

         if (showType === 'grid')
            createHtmlTemplate(
               showType,
               containerCategoryCoursesGrid,
               shownCourses,
               containerCategoryCoursesRow
            );
         else if (showType === 'row')
            createHtmlTemplate(
               showType,
               containerCategoryCoursesRow,
               shownCourses,
               containerCategoryCoursesGrid
            );
         if (!shownCourses.length) {
            containerCategoryCoursesRow.insertAdjacentHTML(
               'beforeend',
               `<section class="w-full bg-red-300/50 p-3 -mt-5">
                  <span class="text-red-500">دوره ای مرتبط با جستوجوی شما یافت نشد مجدد تلاش کنید :)</span>
               </section>`
            );
         }
      });
   });
});
