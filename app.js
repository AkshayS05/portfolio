//sticky navigation
const sectionHeroElem = document.querySelector('.particles');
const particles = document.querySelector('#particles-js');
const nav = document.querySelector('.main-nav-list');
const navLinks = document.querySelectorAll('.main-nav-link');
// toggle-btn
const toggle = document.getElementById('toggle');
const toggleBtn = document.querySelector('.toggle-btn');
const allSections = document.querySelectorAll('.section');
const toggleBackground = document.querySelector('.theme-color');
const toggleDark = document.querySelector('.dark-theme-color');
const btnContainer = document.querySelector('.btn-mobile-nav');
const icon = document.querySelectorAll('.icon-mobile-nav');
const header = document.querySelector('header');
const contactSection = document.querySelector('.section-contact');
const contactSectionHeading = document.querySelector('.contact__heading');

// color for cards
const firstColorChoice = [
  '#1a3662',
  '#11998e',
  '#fc4a1a',
  '#642b73',
  '#30e8bf',
  '#ee0979',
  '#004ff9',
  '#403B4A',
];
const secondColorChoice = [
  '#3b79dc',
  '#38ef7d',
  '#f7b733',
  '#c6426e',
  '#ff8235',
  '#ff6a00',
  '#fff94c',
  '#E7E9BB',
];

if (
  localStorage.getItem('getDarkTheme') === null ||
  localStorage.getItem('getDarkTheme') === undefined
) {
  localStorage.getItem('getDarkTheme', 'false');
}
// handleColorTheme();
// toggle implementation
function handleColorTheme() {
  // e.preventDefault();

  // toggleBtn.classList.toggle('onToggle');
  if (localStorage.getItem('getDarkTheme') === 'true') {
    toggleBtn.classList.add('onToggle');
    toggleBackground.classList.add('toggleBackground');
    particles.classList.add('toggleBackgroundLight');
    header.style.backgroundImage =
      'linear-gradient(to bottom right, #484f5a, #222)';
    contactSection.style.backgroundImage =
      'linear-gradient(to bottom right, #484f5a, #222)';
    contactSectionHeading.classList.add('toggle-dark');
    toggleDark.classList.add('toggle-dark');
    localStorage.setItem('getDarkTheme', 'false');
  } else {
    toggleBtn.classList.remove('onToggle');
    particles.classList.remove('toggleBackgroundLight');
    toggleBackground.classList.remove('toggleBackground');
    toggleDark.classList.remove('toggle-dark');
    header.style.backgroundImage =
      'linear-gradient(to bottom right, #373b44, #4286f4)';
    contactSection.style.backgroundImage =
      'linear-gradient(to right bottom, #4286f4, #373b44)';
    localStorage.setItem('getDarkTheme', 'true');
  }
}
toggle.addEventListener('click', handleColorTheme);
console.log(localStorage.getItem('getDarkTheme'));

//intersection observer
const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add('sticky');
    }
    if (ent.isIntersecting) {
      document.body.classList.remove('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-200px',
  },
);
observer.observe(sectionHeroElem);
//Tabbed component
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const element = e.target.closest('.operations__tab');
  if (!element) return;
  tabs.forEach(function (tab) {
    tab.classList.remove('operations__tab--active');
  });
  tabContent.forEach(function (content) {
    content.classList.remove('operations__content--active');
  });
  element.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${element.dataset.tab}`)
    .classList.add('operations__content--active');
});
//implementing page navigation

nav.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('main-nav-link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
// Revealing sections

const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//lazy image
const img = document.querySelectorAll('img[data-src]');
const revealImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(revealImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
img.forEach((i) => imgObserver.observe(i));
// skills section animation
const skills = document.querySelector('.skills-grid');
const skill = document.querySelectorAll('.skills-grid-row');

const animateSkills = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  const id = skills.querySelectorAll('.animate__skill');

  id.forEach((i) => i.classList.add('skill-animation'));
  observer.unobserve(entry.target);
};
const skillSection = new IntersectionObserver(animateSkills, {
  root: null,
  threshold: 0.2,
});
skill.forEach((s) => skillSection.observe(s));
// Mobile Navigation

btnContainer.addEventListener('click', function (e) {
  header.classList.toggle('nav-open');
});
nav.addEventListener('click', function (e) {
  if (e.target.classList.contains('main-nav-link')) {
    header.classList.toggle('nav-open');
  }
});
// experience section position
const exp = document.getElementById('experience');

const removeOverflow = (entries) => {
  const [entry] = entries;
  if (entry.isIntersecting) {
    document.body.classList.remove('body-container');
  } else {
    document.body.classList.add('body-container');
  }
};
const expSection = new IntersectionObserver(removeOverflow, {
  root: null,
  threshold: 0.2,
});
expSection.observe(exp);
const allSkills = [
  {
    skillName: 'CSS',
    totalValue: 'eighty-five',
    colors: { color1: firstColorChoice[0], color2: secondColorChoice[0] },
  },

  {
    skillName: 'JavaScript',
    totalValue: 'seventy-seven',
    colors: { color1: firstColorChoice[1], color2: secondColorChoice[1] },
  },
  {
    skillName: 'Node Js',
    totalValue: 'sixty-eight',
    colors: { color1: firstColorChoice[2], color2: secondColorChoice[2] },
  },
  {
    skillName: 'Java',
    totalValue: 'seventy-one',
    colors: { color1: firstColorChoice[3], color2: secondColorChoice[3] },
  },
  {
    skillName: 'React Js',
    totalValue: 'eighty',
    colors: { color1: firstColorChoice[4], color2: secondColorChoice[4] },
  },
  {
    skillName: 'MongoDB',
    totalValue: 'seventy',
    colors: { color1: firstColorChoice[5], color2: secondColorChoice[5] },
  },
  {
    skillName: 'MySQL',
    totalValue: 'seventy-five',
    colors: { color1: firstColorChoice[6], color2: secondColorChoice[6] },
  },
  {
    skillName: 'Firebase',
    totalValue: 'sixty-five',
    colors: { color1: firstColorChoice[7], color2: secondColorChoice[7] },
  },
  {
    skillName: 'Bootstrap',
    totalValue: 'eighty-two',
    colors: { color1: firstColorChoice[0], color2: secondColorChoice[0] },
  },
  {
    skillName: 'Express Js',
    totalValue: 'seventy-eight',
    colors: { color1: firstColorChoice[1], color2: secondColorChoice[1] },
  },
  {
    skillName: 'Tailwind CSS',
    totalValue: 'seventy-six',
    colors: { color1: firstColorChoice[2], color2: secondColorChoice[2] },
  },
  {
    skillName: 'Material UI',
    totalValue: 'sixty-two',
    colors: { color1: firstColorChoice[3], color2: secondColorChoice[3] },
  },
  {
    skillName: 'EJS',
    totalValue: 'eighty-six',
    colors: { color1: firstColorChoice[4], color2: secondColorChoice[4] },
  },
  {
    skillName: 'JSX',
    totalValue: 'ninety-six',
    colors: { color1: firstColorChoice[5], color2: secondColorChoice[5] },
  },
  {
    skillName: 'SEO',
    totalValue: 'seventy-two',
    colors: { color1: firstColorChoice[6], color2: secondColorChoice[6] },
  },
];
///Cards component
const projects = [
  {
    title: 'The Ipod Project',
    img: './assets/ipod.jpg',
    list: ['ReactJs', 'JSX', 'CSS', 'JavaScript'],
    colors: { color1: firstColorChoice[0], color2: secondColorChoice[0] },
    backTitle: 'Project Using',
    backPara: 'React',
    liveLink: 'https://ipodbyakshays05.netlify.app/',
    githubLink: 'https://github.com/AkshayS05/Ipod-project-in-react',
  },
  {
    title: 'MovieNation',
    img: './assets/movienation_img.jpg',
    list: ['ReactJs', 'RestAPIs', 'MaterialUI', 'Voice AI'],
    colors: { color1: firstColorChoice[1], color2: secondColorChoice[1] },
    backTitle: 'Project Using',
    backPara: 'React',
    liveLink: 'https://movienationapp.netlify.app/',
    githubLink: 'https://github.com/AkshayS05/MovieNation-Akshaysharma',
  },
  {
    title: 'Blog Social',
    img: './assets/blog_social.jpg',
    list: ['MongoDB', 'NodeJs', 'Express Js', 'React Js'],
    colors: { color1: firstColorChoice[5], color2: secondColorChoice[5] },
    backTitle: 'Project Using',
    backPara: 'MERN Stack',
    liveLink: '#',
    githubLink: 'https://github.com/AkshayS05/blogsocial',
  },
  {
    title: 'The Pokemon Project',
    img: './assets/pokemon.jpg',
    list: ['ReactJs', 'JSX', 'Advanced CSS', 'JavaScript'],
    colors: { color1: firstColorChoice[2], color2: secondColorChoice[2] },
    backTitle: 'Project Using',
    backPara: 'React',
    liveLink: 'https://pokemonmatch-as05.netlify.app/',
    githubLink: 'https://github.com/AkshayS05/pokemon-match-react-app/',
  },
  {
    title: 'Awesome Food Project',
    img: './assets/awesomefood.jpg',
    list: ['ReactJs', 'CSS', 'JavaScript', 'Web Design'],
    colors: { color1: firstColorChoice[3], color2: secondColorChoice[3] },
    backTitle: 'Project Using',
    backPara: 'HTML, CSS, JS',
    liveLink: 'https://omnifoodbyakshays05.netlify.app/',
    githubLink: '#',
  },
  {
    title: 'Recipe Finder Project',
    img: './assets/recipe.jpg',
    list: ['ReactJs', 'JSX', 'CSS', 'JavaScript'],
    colors: { color1: firstColorChoice[4], color2: secondColorChoice[4] },
    backTitle: 'Project Using',
    backPara: 'React',
    liveLink: 'https://awesome-recipes-5dd0e.web.app/',
    githubLink: 'https://github.com/AkshayS05/recipeFinder',
  },
  {
    title: 'TODO NODE JS APP',
    img: './assets/todo.jpg',
    list: ['Mongo DB', 'Express Js', 'EJS', 'NodeJs'],
    colors: { color1: firstColorChoice[5], color2: secondColorChoice[5] },
    backTitle: 'Project Using',
    backPara: 'NodeJs',
    liveLink: '#',
    githubLink: 'https://github.com/AkshayS05/Todo-App',
  },
  {
    title: 'DS & ALGO IN JAVA',
    img: './assets/java.jpg',
    list: ['Sorting Algos', 'Searching Algos', 'Data Structures', 'OOP'],
    colors: { color1: firstColorChoice[6], color2: secondColorChoice[6] },
    backTitle: 'DS & ALGO IN',
    backPara: 'JAVA',
    liveLink: '#',
    githubLink: 'https://github.com/AkshayS05/Binary_Search',
  },
  {
    title: 'Awesome Code Bank',
    img: './assets/bankapp.jpg',
    list: ['Dates & Timers', 'Array Methods', 'Method Chaining', 'Loops'],
    colors: { color1: firstColorChoice[7], color2: secondColorChoice[7] },
    backTitle: 'Bank App',
    backPara: 'By Jonas',
    liveLink: 'https://awesomecodebank.netlify.app/',
    githubLink: 'https://github.com/AkshayS05/bankApp',
  },
  {
    title: 'MaterialUI APP',
    img: './assets/materialui.jpg',
    list: ['ReactJs', 'MaterialUI', 'CSS', 'Responsive'],
    colors: { color1: firstColorChoice[1], color2: secondColorChoice[1] },
    backTitle: 'React APP',
    backPara: 'CSS Framework',
    liveLink: 'https://materialuiakshay.netlify.app/',
    githubLink: 'https://github.com/AkshayS05/materialUIProject',
  },
  {
    title: 'Code World Quiz',
    img: './assets/materialui.jpg',
    list: ['React Js', 'JSX', 'JSON', 'React Hooks'],
    colors: { color1: firstColorChoice[2], color2: secondColorChoice[2] },
    backTitle: 'React APP',
    backPara: 'CSS Framework',
    liveLink: '#',
    githubLink: 'https://github.com/AkshayS05/codeworldquiz',
  },
  {
    title: 'Dice Game',
    img: './assets/dice_roll_game.jpg',
    list: ['JavaScript', 'HTML', 'CSS', 'Responsiveness'],
    colors: { color1: firstColorChoice[3], color2: secondColorChoice[3] },
    backTitle: 'Vanilla JavaScript',
    backPara: 'Dice Roll',
    liveLink: 'https://akshays05.github.io/dicegame/',
    githubLink: 'https://github.com/AkshayS05/dicegame',
  },
];
// skills section

const skillsSection = document.querySelector('.skills-grid');
allSkills.map((skill, i) => {
  const html = `<div class="skills-grid-row skill">
<span class="skill--percentage-${skill.totalValue} animate__skill">${skill.skillName}</span>
</div>`;
  skillsSection.insertAdjacentHTML('beforeend', html);
});
for (let i = 0; i < allSkills.length; i++) {
  const singleSkill = document.querySelector(
    `.skill--percentage-${allSkills[i].totalValue}`,
  );
  singleSkill.style.backgroundImage = `linear-gradient(to right bottom,${allSkills[i].colors.color1} , ${allSkills[i].colors.color2})`;
}
// portfolio
const elem = document.querySelector('.slider');
projects.map((project, i) => {
  const html = `
<div class="slide">
  <div class="col-${i}">
    <div class="card">
      <div class="card__side card__side--front">
        <div class="card__picture card__picture--${i}">&nbsp;</div>

        <h4 class="card__heading">
          <span class="card__heading-span card__heading-span--${i}">
            ${project.title}
          </span>
        </h4>
        <div class="card__details">
          <ul>
            <li><i class="fa-solid fa-check"></i>${project.list[0]}</li>
            <li><i class="fa-solid fa-check"></i>${project.list[1]}</li>
            <li><i class="fa-solid fa-check"></i>${project.list[2]}</li>
            <li><i class="fa-solid fa-check"></i>${project.list[3]}</li>
         
          </ul>
        </div>
      </div>
      <!-- back -->
      <div class="card__side card__side--back card__side--back-${i}">
  
      <div class="card__cta">
          <div class="card__text-box">
            <p class="card__project">${project.backTitle}</p>
            <p class="card__name">${project.backPara}</p>
          </div>
          <a href=${project.liveLink} class= "btn--effect btn--effect--white"
    target="_blank">View Live</a>
          <a href=${project.githubLink} class="btn--git btn--git--black" target="_blank"><span><i class="fa-brands fa-github"></i></span>Github</a>
         
        </div>
      </div>
    </div>
  </div>
  </div>`;

  elem.insertAdjacentHTML('beforeend', html);
});

// to set background image
let projectsCount = 0;
let i;
for (i = 0; i < projects.length; i++) {
  // to set heading colors
  const headingStyle = document.querySelector(`.card__heading-span--${i}`);

  headingStyle.style.backgroundImage = `linear-gradient(to right bottom,${projects[i].colors.color1} , ${projects[i].colors.color2})`;

  // setting up front image
  const cardPicture = document.querySelector(`.card__picture--${i}`);
  cardPicture.style.backgroundImage = `linear-gradient(to right bottom,${projects[i].colors.color1} , ${projects[i].colors.color2}),url(${projects[i].img})`;

  // setting up background color
  const card1 = document.querySelector(`.card__side--back-${i}`);
  card1.style.backgroundImage =
    // i < firstColorChoice.length?
    `linear-gradient(to right bottom,
        ${projects[i].colors.color1} , ${projects[i].colors.color2}
      )`;
}
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currSlide = 0;
let maxSlides = slides.length;

const moveSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%`),
  );
};
moveSlide(0);
const moveAhead = function () {
  if (currSlide === maxSlides - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  moveSlide(currSlide);
};
const moveBehind = function () {
  if (currSlide === 0) {
    currSlide = maxSlides - 1;
  } else {
    currSlide--;
  }
  moveSlide(currSlide);
};

btnRight.addEventListener('click', moveAhead);
btnLeft.addEventListener('click', moveBehind);
// handling arrow keys
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    moveBehind();
  } else if (e.key === 'ArrowRight') {
    moveAhead();
  }
});
