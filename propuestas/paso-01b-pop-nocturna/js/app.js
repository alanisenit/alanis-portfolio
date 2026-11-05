// Prototipo Pop Nocturna · interacción compartida por todas las páginas
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const EASE = [0.22, 1, 0.36, 1];

// Idioma activo (recordado en localStorage)
let currentLang = localStorage.getItem('site_lang') || 'es';

// Motion (motion.dev) se carga aparte: si falla, todo sigue funcionando sin animación
let M = null;
const motionReady = import('https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm')
  .then(mod => { M = mod; })
  .catch(err => console.warn('Motion no cargó', err));

const CATS = {
  redes: { es: { label: 'Redes sociales', short: 'Redes' }, en: { label: 'Social media', short: 'Social' } },
  branding: { es: { label: 'Branding', short: 'Branding' }, en: { label: 'Brand identity', short: 'Branding' } },
  editorial: { es: { label: 'Editorial', short: 'Editorial' }, en: { label: 'Editorial design', short: 'Editorial' } },
  ilustracion: { es: { label: 'Ilustración', short: 'Ilustración' }, en: { label: 'Illustration', short: 'Illustration' } },
  fotomontaje: { es: { label: 'Fotomontaje', short: 'Fotomontaje' }, en: { label: 'Photomontage', short: 'Photomontage' } },
  video: { es: { label: 'Video corto', short: 'Video' }, en: { label: 'Short video', short: 'Video' } }
};

const PROJECTS = [
  { slug: 'macbeth', featured: true, cats: ['editorial', 'ilustracion'],
    cover: 'img/editorial-macbeth.jpg', page: 'proyecto-macbeth.html',
    imgs: ['img/editorial-macbeth.jpg', 'img/editorial-macbeth-2.jpg', 'img/editorial-macbeth-tipografico.jpg'],
    es: { title: 'Macbeth', sub: 'Carteles teatrales', desc: 'Tres carteles para una puesta de Macbeth: uno ilustrado, uno con dibujo de línea y uno solo tipográfico.' },
    en: { title: 'Macbeth', sub: 'Theater poster series', desc: 'Three posters for a staging of Shakespeare\'s Macbeth: a high-contrast illustration, a line drawing and a type-only version.' }
  },
  { slug: 'century-21', featured: true, cats: ['redes'],
    cover: 'img/social-century21-top-producer.jpg',
    imgs: ['img/social-century21-top-producer.jpg', 'img/social-century21-top-lados.jpg'],
    es: { title: 'Century 21', sub: 'Reconocimientos', desc: 'Posts de reconocimiento para agentes de Century 21 Horizonte, con un tratamiento dorado y sobrio.' },
    en: { title: 'Century 21', sub: 'Recognition posts', desc: 'Recognition posts for top agents at Century 21 Horizonte, with a gold treatment, portrait and clear hierarchy.' }
  },
  { slug: 'socohua', featured: true, cats: ['branding'],
    cover: 'img/branding-socohua-libreta.jpg',
    imgs: ['img/branding-socohua-libreta.jpg', 'img/branding-socohua-tote.jpg', 'img/branding-socohua-polo.jpg'],
    es: { title: 'Socohua', sub: 'Identidad corporativa', desc: 'Aplicaciones de la marca de Socohua Publicidad y Marketing en papelería, bolsas y uniformes.' },
    en: { title: 'Socohua', sub: 'Corporate identity', desc: 'The Socohua Publicidad y Marketing identity applied to notebooks, tote bags, pens and polo shirts.' }
  },
  { slug: 'clean-world', featured: true, cats: ['ilustracion'],
    cover: 'img/ilustracion-clean-world-2.jpg',
    imgs: ['img/ilustracion-clean-world-1.jpg', 'img/ilustracion-clean-world-2.jpg', 'img/ilustracion-clean-world-3.jpg'],
    es: { title: 'For a Clean World', sub: 'Campaña ilustrada', desc: 'Serie de carteles ilustrados sobre la contaminación del suelo, el agua y el aire.' },
    en: { title: 'For a Clean World', sub: 'Illustrated campaign', desc: 'A series of three illustrated posters about soil, water and air pollution, with flat vector illustration.' }
  },
  { slug: 'ano-nuevo-chino', featured: true, cats: ['fotomontaje', 'redes'],
    cover: 'img/fotomontaje-ano-nuevo-chino.jpg', imgs: ['img/fotomontaje-ano-nuevo-chino.jpg'],
    es: { title: 'Año Nuevo Chino', sub: 'Fotomontaje', desc: 'Post de fecha especial para Century 21, con fotomontaje y un tratamiento monocromático.' },
    en: { title: 'Chinese New Year', sub: 'Social photomontage', desc: 'A holiday post for Century 21 that blends a dragon, a temple and calligraphy into a monochrome photomontage.' }
  },
  { slug: 'jakon-crm', featured: true, cats: ['branding', 'editorial'],
    cover: 'img/branding-jakon-manual.jpg', imgs: ['img/branding-jakon-manual.jpg', 'img/branding-jakon-paleta.jpg'],
    es: { title: 'Jakon CRM', sub: 'Manual de marca', desc: 'Manual con variaciones de logotipo, paleta, tipografías y usos correctos e incorrectos.' },
    en: { title: 'Jakon CRM', sub: 'Brand guidelines', desc: 'Brand guidelines for Jakon CRM: logo variations, color palette with codes, typography, and applications.' }
  },
  { slug: 'otro-maldito-podcast', featured: true, cats: ['video', 'redes'],
    cover: 'img/video-omp-2.jpg', imgs: ['img/video-omp-1.jpg', 'img/video-omp-2.jpg', 'img/video-omp-3.jpg'],
    es: { title: 'Otro Maldito Podcast', sub: 'Reels', desc: 'Más de 40 videos cortos editados a partir de episodios de una hora, con textos para Instagram, TikTok, Facebook y YouTube.' },
    en: { title: 'Otro Maldito Podcast', sub: 'Reels & Shorts', desc: '40+ short videos edited from one-hour episodes, with subtitles, pacing and captions for every platform.' }
  },
  { slug: 'alphabet', featured: true, cats: ['editorial'],
    cover: 'img/editorial-alphabet.jpg', imgs: ['img/editorial-alphabet.jpg', 'img/editorial-alphabet-spread.jpg'],
    es: { title: 'Alphabet', sub: 'Libro ilustrado', desc: 'Libro del abecedario con fotografía de objetos, color plano por letra y textos cortos.' },
    en: { title: 'Alphabet', sub: 'Illustrated ABC book', desc: 'An illustrated ABC book that pairs object photography, one flat color per letter and short, simple texts.' }
  },
  { slug: 'reyes-magos', cats: ['fotomontaje', 'redes'],
    cover: 'img/fotomontaje-reyes-magos.jpg', imgs: ['img/fotomontaje-reyes-magos.jpg'],
    es: { title: 'Día de Reyes', sub: 'Fotomontaje', desc: 'Post de fecha especial con fotomontaje en escala de grises para redes sociales.' },
    en: { title: 'Three Kings Day', sub: 'Holiday photomontage', desc: 'A holiday post for Three Kings Day with a grayscale photomontage, three faces and a caravan in the distance.' }
  },
  { slug: 'the-prodigal', cats: ['editorial'],
    cover: 'img/editorial-the-prodigal.jpg', imgs: ['img/editorial-the-prodigal.jpg', 'img/editorial-the-prodigal-interior.jpg'],
    es: { title: 'The Prodigal', sub: 'Revista', desc: 'Diseño de portada e interiores para un artículo de revista, con citas destacadas y retícula a columnas.' },
    en: { title: 'The Prodigal', sub: 'Magazine layout', desc: 'Opening spread and inside pages for a magazine article, with a pull quote, two-column grid and photography.' }
  },
  { slug: 'vampbook', cats: ['branding', 'ilustracion'],
    cover: 'img/logo-vampbook.jpg', imgs: ['img/logo-vampbook.jpg', 'img/logo-vampbook-2.jpg'],
    es: { title: 'Vampbook', sub: 'Logotipo', desc: 'Logotipo ilustrado que une un murciélago y un libro, en tres versiones.' },
    en: { title: 'Vampbook', sub: 'Illustrated logo', desc: 'An illustrated logo combining a bat and a book, in three versions: color emblem, horizontal lockup and wings spread.' }
  },
  { slug: 'book-thief', cats: ['ilustracion'],
    cover: 'img/ilustracion-book-thief.jpg', imgs: ['img/ilustracion-book-thief.jpg'],
    es: { title: 'The Book Thief', sub: 'Portada', desc: 'Ilustración de portada para La ladrona de libros de Markus Zusak.' },
    en: { title: 'The Book Thief', sub: 'Cover illustration', desc: 'A cover illustration for Markus Zusak\'s The Book Thief: the protagonist reads beside Death in earthy tones.' }
  }
];

const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

function getProjectInfo(p, lang = currentLang) {
  const loc = p[lang] || p.es;
  return {
    ...p,
    title: loc.title,
    sub: loc.sub,
    desc: loc.desc
  };
}

function cardHTML(p) {
  const info = getProjectInfo(p);
  const c = p.cats[0];
  const catShort = CATS[c][currentLang].short;
  return `<a class="card" href="${p.page || 'trabajo.html#' + p.slug}" data-slug="${p.slug}">
    <div class="card-img"><img src="${p.cover}" alt="${info.title}: ${info.sub.toLowerCase()}" loading="lazy"></div>
    <div class="card-cap"><span class="tag t-${c}">${catShort}</span><b class="d">${info.title}</b></div>
  </a>`;
}

const renderGrid = (el, list) => { el.innerHTML = list.map(cardHTML).join(''); };

/* ───── UI Translations ───── */
const I18N = {
  nav: {
    work: { es: 'Trabajo', en: 'Work' },
    services: { es: 'Servicios', en: 'Services' },
    about: { es: 'Sobre mí', en: 'About' },
    contact: { es: 'Contacto', en: 'Contact' },
    talk: { es: 'Hablemos', en: 'Let\'s talk' }
  },
  footer: {
    title: { es: 'Creemos algo<br><span class="hand">que brille</span>', en: 'Let\'s create something<br><span class="hand">that shines</span>' },
    card1Small: { es: 'Para marcas y empresas', en: 'For brands and companies' },
    card1Title: { es: 'Cuéntame tu proyecto', en: 'Tell me about your project' },
    card1Text: { es: 'Redes, branding, editorial e ilustración', en: 'Social media, branding, editorial and illustration' },
    card2Small: { es: 'Para creadores', en: 'For creators' },
    card2Title: { es: 'Hagamos una colab', en: 'Let\'s collaborate' },
    card2Text: { es: 'Fotografía, ilustración, música o podcast', en: 'Photography, illustration, music or podcasts' },
    legal: { es: '© 2026 Alanis Romero · Diseñadora gráfica freelance · Lima, Perú', en: '© 2026 Alanis Romero · Freelance graphic designer · Lima, Peru' }
  },
  home: {
    eyebrow: { es: '<span class="dot"></span>Diseñadora gráfica freelance · Lima, Perú', en: '<span class="dot"></span>Freelance graphic designer · Lima, Peru' },
    heroTitle: { es: 'Diseño<br>que se <span class="g">queda</span><br><span class="hand">en tu feed</span>', en: 'Design<br>that <span class="g">sticks</span><br><span class="hand">in your feed</span>' },
    lead: { es: 'Soy Alanis Romero. Diseño redes sociales que detienen el scroll, marcas con carácter y piezas editoriales con intención, en español e inglés.', en: 'I\'m Alanis Romero. I design scroll-stopping social media, brands with character and editorial pieces with intent, in English and Spanish.' },
    btnWork: { es: 'Ver trabajo <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>', en: 'See my work <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>' },
    btnAbout: { es: 'Sobre mí', en: 'About me' },
    badgeText: { es: 'DISPONIBLE ✶ FREELANCE ✶ DISPONIBLE ✶ FREELANCE ✶', en: 'AVAILABLE ✶ FREELANCE ✶ AVAILABLE ✶ FREELANCE ✶' },
    featuredTitle: { es: 'Trabajo <span class="hand c-blue">destacado</span>', en: 'Featured <span class="hand c-blue">work</span>' },
    featuredBtn: { es: 'Ver los 12 proyectos <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>', en: 'See all 12 projects <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>' },
    servicesTitle: { es: 'Servicios', en: 'Services' },
    servicesSub: { es: 'Para marcas, agencias y creadores. Cada proyecto empieza con una conversación sobre qué necesitas comunicar y a quién.', en: 'For brands, agencies and creators. Every project starts with a conversation about what you need to say and to whom.' },
    svcRedesTitle: { es: 'Redes sociales', en: 'Social media' },
    svcRedesDesc: { es: 'Posts, carruseles e historias con coherencia de marca, pensados para detener el scroll.', en: 'Posts, carousels and stories that stay on brand and stop the scroll.' },
    svcBrandingTitle: { es: 'Branding', en: 'Brand identity' },
    svcBrandingDesc: { es: 'Logotipo, paleta, tipografías y manual para que todo se vea de la misma familia.', en: 'Logo, palette, typography and guidelines so everything looks like one family.' },
    svcEdTitle: { es: 'Diseño editorial', en: 'Editorial design' },
    svcEdDesc: { es: 'Revistas, libros, carteles y documentos con jerarquía clara y lectura cómoda.', en: 'Magazines, books, posters and documents with clear hierarchy and easy reading.' },
    svcIlustTitle: { es: 'Ilustración', en: 'Illustration' },
    svcIlustDesc: { es: 'Ilustraciones para campañas, portadas y piezas que necesitan voz propia.', en: 'Illustrations for campaigns, covers and pieces that need a voice of their own.' },
    svcVideoTitle: { es: 'Video corto', en: 'Short video' },
    svcVideoDesc: { es: 'Reels y TikToks a partir de contenido largo, con subtítulos y textos para cada red.', en: 'Reels and TikToks from long-form content, with captions and copy for each platform.' },
    aboutTitle: { es: 'Hola, soy Alanis.<span>Diseñadora gráfica y creativa digital</span>', en: 'Hi, I\'m Alanis.<span>Graphic designer and digital creative</span>' },
    aboutLead: { es: 'Me formé en BYU-Idaho y he trabajado en agencia, educación y contenido digital. Me gusta que cada pieza comunique claro y tenga personalidad.', en: 'I studied at BYU-Idaho and have designed for agencies, schools, academies and podcasts. I want every piece to be clear and full of personality.' },
    stat1: { es: 'Piezas y videos', en: 'Pieces and videos' },
    stat2: { es: 'Marcas y clientes', en: 'Brands and clients' },
    stat3: { es: 'Países', en: 'Countries' },
    stat4: { es: 'Bilingüe', en: 'Bilingual' },
    aboutBtn: { es: 'Conóceme <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>', en: 'Get to know me <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>' }
  },
  workPage: {
    eyebrow: { es: '<span class="dot"></span>Portafolio', en: '<span class="dot"></span>Portfolio' },
    title: { es: 'Trabajo', en: 'Work' },
    lead: { es: 'Doce proyectos de redes sociales, branding, diseño editorial, ilustración, fotomontaje y video corto.', en: 'Twelve projects in social media, branding, editorial design, illustration, photomontage and short-form video.' },
    sortLabel: { es: 'Orden', en: 'Sort' },
    sortOptFeatured: { es: 'Destacados', en: 'Featured' },
    searchPlaceholder: { es: 'Buscar', en: 'Search' },
    tagAll: { es: '#Todo', en: '#All' },
    tagRedes: { es: '#Redes', en: '#Social' },
    tagBranding: { es: '#Branding', en: '#Branding' },
    tagEditorial: { es: '#Editorial', en: '#Editorial' },
    tagIlust: { es: '#Ilustración', en: '#Illustration' },
    tagFoto: { es: '#Fotomontaje', en: '#Photomontage' },
    tagVideo: { es: '#Video', en: '#Video' },
    empty: { es: 'No hay proyectos con ese filtro. Prueba con otra palabra o elige #Todo.', en: 'No projects found with that filter. Try another keyword or select #All.' }
  },
  aboutPage: {
    eyebrow: { es: '<span class="dot"></span>Sobre mí', en: '<span class="dot"></span>About' },
    title: { es: 'Hola,<br>soy <span class="hand c-pink">Alanis</span>', en: 'Hi,<br>I\'m <span class="hand c-pink">Alanis</span>' },
    lead: { es: 'Diseñadora gráfica junior en Lima, Perú. Me formé en BYU-Idaho y he trabajado en agencia, educación y contenido digital para organizaciones de Perú, México, Chequia y Estados Unidos.', en: 'Junior graphic designer based in Lima, Peru. Trained at BYU-Idaho with agency, education and digital content experience for organizations in Peru, Mexico, Czechia and the US.' },
    btnCV: { es: 'Descargar CV <svg class="ico" aria-hidden="true"><use href="#i-down"/></svg>', en: 'Download CV <svg class="ico" aria-hidden="true"><use href="#i-down"/></svg>' },
    hExp: { es: 'Experiencia', en: 'Experience' },
    hEdu: { es: 'Formación', en: 'Education' },
    hTools: { es: 'Herramientas', en: 'Tools' },
    hLang: { es: 'Idiomas', en: 'Languages' },
    langES: { es: 'Español · nativo', en: 'Spanish · Native' },
    langEN: { es: 'Inglés · fluido', en: 'English · Fluent' },
    collabH2: { es: '¿Eres <span class="hand">creador/a?</span>', en: 'Are you a <span class="hand">creator?</span>' },
    collabLead: { es: 'Me encanta trabajar con otros creativos. Si tienes una idea que necesita diseño, hagámosla juntos.', en: 'I love working with fellow creatives. If you have an idea that needs design, let\'s make it together.' },
    collabIdea1T: { es: 'Foto + diseño', en: 'Photo + Design' },
    collabIdea1P: { es: 'Tus fotos convertidas en carruseles, portadas o una serie editorial.', en: 'Your photos transformed into carousels, cover art or an editorial series.' },
    collabIdea2T: { es: 'Podcast + reels', en: 'Podcast + Reels' },
    collabIdea2P: { es: 'Episodios largos convertidos en clips con identidad propia para cada red.', en: 'Long-form episodes edited into clips with unique identities for each platform.' },
    collabIdea3T: { es: 'Ilustración a cuatro manos', en: 'Joint Illustration' },
    collabIdea3P: { es: 'Proyectos personales, fanzines o campañas entre ilustradores.', en: 'Personal projects, zines, or cross-illustrator creative campaigns.' },
    collabBtn: { es: 'Proponer una colab <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>', en: 'Propose a collab <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>' }
  },
  contactPage: {
    eyebrow: { es: '<span class="dot"></span>Contacto', en: '<span class="dot"></span>Contact' },
    title: { es: 'Hablemos <span class="hand c-honey">✶</span>', en: 'Let\'s talk <span class="hand c-honey">✶</span>' },
    lead: { es: 'Cuéntame qué necesitas. Te respondo con preguntas para entender el proyecto o con una propuesta.', en: 'Tell me what you need. I\'ll reply with questions to understand your project or with a proposal.' },
    whoMarca: { es: 'Soy marca o empresa', en: 'I\'m a brand or company' },
    whoCreador: { es: 'Soy creador/a', en: 'I\'m a creator' },
    labelName: { es: 'Nombre', en: 'Name' },
    labelEmail: { es: 'Correo', en: 'Email' },
    labelService: { es: '¿Qué necesitas?', en: 'What do you need?' },
    labelMsg: { es: 'Mensaje', en: 'Message' },
    placeholderMsg: { es: 'Cuéntame sobre tu marca o tu idea', en: 'Tell me about your brand or your idea' },
    btnSubmit: { es: 'Enviar mensaje <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>', en: 'Send message <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>' },
    sideMail: { es: 'Correo', en: 'Email' },
    sideCopy: { es: 'Copiar', en: 'Copy' },
    sideSocial: { es: 'Redes', en: 'Social' },
    sideLocation: { es: 'Ubicación', en: 'Location' },
    sideLocSub: { es: 'Clientes de cualquier país · GMT-5', en: 'Clients worldwide · GMT-5' },
    faqTitle: { es: 'Preguntas <span class="hand c-blue">frecuentes</span>', en: 'Frequently asked <span class="hand c-blue">questions</span>' }
  },
  macbethPage: {
    backWork: { es: '<svg class="ico" aria-hidden="true"><use href="#i-back"/></svg> Trabajo', en: '<svg class="ico" aria-hidden="true"><use href="#i-back"/></svg> Work' },
    sub: { es: 'tres carteles, tres lecturas', en: 'three posters, three readings' },
    dtProj: { es: 'Proyecto', en: 'Project' },
    ddProj: { es: 'Serie de carteles teatrales', en: 'Theater poster series' },
    dtType: { es: 'Tipo', en: 'Type' },
    ddType: { es: 'Diseño editorial e ilustración', en: 'Editorial design & illustration' },
    dtPieces: { es: 'Piezas', en: 'Pieces' },
    ddPieces: { es: '3 carteles', en: '3 posters' },
    dtPalette: { es: 'Paleta', en: 'Palette' },
    ddPalette: { es: 'Ocre, crema y rojo vino', en: 'Ochre, cream, and wine red' },
    dtContext: { es: 'Contexto', en: 'Context' },
    ddContext: { es: 'Por confirmar con Alanis', en: 'To be confirmed with Alanis' },
    sample: { es: '✶ Texto de ejemplo: Alanis completará el encargo real', en: '✶ Sample text: Alanis will complete the client brief' },
    hIdea: { es: 'La idea', en: 'The Concept' },
    pIdea: { es: 'Tres caminos para la misma obra. Cada cartel cuenta la ambición de Macbeth desde un lenguaje distinto, pero los tres comparten paleta, tipografía y retícula para leerse como una sola campaña.', en: 'Three directions for the same play. Each poster approaches Macbeth\'s ambition through a different visual language, while sharing a unified palette, typography, and grid.' },
    hPieces: { es: 'Las piezas', en: 'The Pieces' },
    pPieces: { es: 'El primero usa una ilustración de alto contraste con la corona como símbolo. El segundo dibuja manos y corona con línea suelta. El tercero es solo tipografía: el título se repite y en cada línea resalta una letra.', en: 'The first uses a high-contrast illustration with the crown as a symbol. The second features a loose line drawing of hands and a crown. The third is purely typographic: the title repeats, highlighting a different letter on each line.' },
    hWhy: { es: 'Por qué está aquí', en: 'Why it\'s featured' },
    pWhy: { es: 'Muestra cómo Alanis explora varias soluciones para un mismo brief y mantiene un sistema visual coherente entre ellas.', en: 'It showcases how Alanis explores multiple solutions for a single brief while maintaining a coherent visual system across all pieces.' },
    cap1: { es: '01 · Ilustración de alto contraste', en: '01 · High-contrast illustration' },
    cap2: { es: '02 · Dibujo de línea', en: '02 · Line drawing' },
    cap3: { es: '03 · Solo tipografía', en: '03 · Type only' },
    navPrev: { es: '<svg class="ico" aria-hidden="true"><use href="#i-back"/></svg> Anterior', en: '<svg class="ico" aria-hidden="true"><use href="#i-back"/></svg> Previous' },
    navNext: { es: 'Siguiente <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>', en: 'Next <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>' }
  },
  modal: {
    close: { es: 'Cerrar proyecto', en: 'Close project' },
    viewFull: { es: 'Ver caso completo <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>', en: 'View full case study <svg class="ico" aria-hidden="true"><use href="#i-arrow"/></svg>' }
  }
};

function applyTranslations(lang) {
  document.documentElement.lang = lang;
  $$('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Nav
  const navA = $$('.boxes a');
  if (navA.length >= 4) {
    navA[0].textContent = I18N.nav.work[lang];
    navA[1].textContent = I18N.nav.services[lang];
    navA[2].textContent = I18N.nav.about[lang];
    navA[3].textContent = I18N.nav.contact[lang];
  }
  const ctaOut = $('.cta-out');
  if (ctaOut) {
    ctaOut.innerHTML = `<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#ast"/></svg>${I18N.nav.talk[lang]}`;
  }

  // Footer
  const footTitle = $('.foot-title');
  if (footTitle) footTitle.innerHTML = I18N.footer.title[lang];
  const footCards = $$('.foot-card');
  if (footCards.length >= 2) {
    const c1 = footCards[0];
    const s1 = $('small', c1), b1 = $('b', c1), sp1 = $('span', c1);
    if (s1) s1.textContent = I18N.footer.card1Small[lang];
    if (b1) b1.textContent = I18N.footer.card1Title[lang];
    if (sp1) sp1.textContent = I18N.footer.card1Text[lang];

    const c2 = footCards[1];
    const s2 = $('small', c2), b2 = $('b', c2), sp2 = $('span', c2);
    if (s2) s2.textContent = I18N.footer.card2Small[lang];
    if (b2) b2.textContent = I18N.footer.card2Title[lang];
    if (sp2) sp2.textContent = I18N.footer.card2Text[lang];
  }
  const legal = $('.foot-bottom > span:last-child');
  if (legal) legal.textContent = I18N.footer.legal[lang];

  // 1. Home Page Specific
  const heroEyebrow = $('.hero .eyebrow');
  if (heroEyebrow) heroEyebrow.innerHTML = I18N.home.eyebrow[lang];
  const heroTitle = $('.hero-title');
  if (heroTitle) heroTitle.innerHTML = I18N.home.heroTitle[lang];
  const heroLead = $('.hero .lead');
  if (heroLead) heroLead.textContent = I18N.home.lead[lang];
  const btnGreen = $('.hero .btn-green');
  if (btnGreen) btnGreen.innerHTML = I18N.home.btnWork[lang];
  const btnGhost = $('.hero .btn-ghost');
  if (btnGhost) btnGhost.textContent = I18N.home.btnAbout[lang];

  const stkPath = $('#stk-path');
  if (stkPath && stkPath.parentNode) {
    const textPath = stkPath.parentNode.parentNode.querySelector('textPath');
    if (textPath) textPath.textContent = I18N.home.badgeText[lang];
  }

  const pHeadH2 = $('#trabajo .p-head h2');
  if (pHeadH2) pHeadH2.innerHTML = I18N.home.featuredTitle[lang];
  const pHeadBtn = $('#trabajo .btn-ink');
  if (pHeadBtn) pHeadBtn.innerHTML = I18N.home.featuredBtn[lang];

  const svcHeadH2 = $('#servicios .p-head h2');
  if (svcHeadH2) svcHeadH2.textContent = I18N.home.servicesTitle[lang];
  const svcHeadP = $('#servicios .p-head p');
  if (svcHeadP) svcHeadP.textContent = I18N.home.servicesSub[lang];

  const svcLinks = $$('.svc li a');
  if (svcLinks.length >= 5) {
    const sMap = [
      { t: I18N.home.svcRedesTitle[lang], d: I18N.home.svcRedesDesc[lang], tag: '#' + CATS.redes[lang].short },
      { t: I18N.home.svcBrandingTitle[lang], d: I18N.home.svcBrandingDesc[lang], tag: '#' + CATS.branding[lang].short },
      { t: I18N.home.svcEdTitle[lang], d: I18N.home.svcEdDesc[lang], tag: '#' + CATS.editorial[lang].short },
      { t: I18N.home.svcIlustTitle[lang], d: I18N.home.svcIlustDesc[lang], tag: '#' + CATS.ilustracion[lang].short },
      { t: I18N.home.svcVideoTitle[lang], d: I18N.home.svcVideoDesc[lang], tag: '#' + CATS.video[lang].short }
    ];
    svcLinks.forEach((a, i) => {
      const tagEl = a.querySelector('.tag');
      const bEl = a.querySelector('b');
      const pEl = a.querySelector('p');
      if (tagEl) tagEl.textContent = sMap[i].tag;
      if (bEl) bEl.textContent = sMap[i].t;
      if (pEl) pEl.textContent = sMap[i].d;
    });
  }

  const teaserH2 = $('.teaser h2');
  if (teaserH2) teaserH2.innerHTML = I18N.home.aboutTitle[lang];
  const teaserP = $('.teaser > div > p');
  if (teaserP) teaserP.textContent = I18N.home.aboutLead[lang];
  const stats = $$('.stat span');
  if (stats.length >= 4) {
    stats[0].textContent = I18N.home.stat1[lang];
    stats[1].textContent = I18N.home.stat2[lang];
    stats[2].textContent = I18N.home.stat3[lang];
    stats[3].textContent = I18N.home.stat4[lang];
  }
  const teaserBtn = $('.teaser .btn-ink');
  if (teaserBtn) teaserBtn.innerHTML = I18N.home.aboutBtn[lang];

  // 2. Work Page Specific
  const workHero = $('.page-hero');
  if (workHero && location.pathname.includes('trabajo')) {
    const eye = $('.eyebrow', workHero);
    if (eye) eye.innerHTML = I18N.workPage.eyebrow[lang];
    const pt = $('.page-title', workHero);
    if (pt) pt.textContent = I18N.workPage.title[lang];
    const ld = $('.lead', workHero);
    if (ld) ld.textContent = I18N.workPage.lead[lang];
    const sortLbl = $('label.sort span');
    if (sortLbl) sortLbl.textContent = I18N.workPage.sortLabel[lang];
    const sortSel = $('#sort');
    if (sortSel && sortSel.options.length) sortSel.options[0].textContent = I18N.workPage.sortOptFeatured[lang];
    const qInput = $('#q');
    if (qInput) qInput.placeholder = I18N.workPage.searchPlaceholder[lang];
    const tfList = $$('.tf');
    const tfKeys = ['tagAll', 'tagRedes', 'tagBranding', 'tagEditorial', 'tagIlust', 'tagFoto', 'tagVideo'];
    tfList.forEach((b, i) => { if (tfKeys[i]) b.textContent = I18N.workPage[tfKeys[i]][lang]; });
    const emptyMsg = $('#empty');
    if (emptyMsg) emptyMsg.textContent = I18N.workPage.empty[lang];
  }

  // 3. About Page Specific
  if (location.pathname.includes('sobre-mi')) {
    const eye = $('.about-hero .eyebrow');
    if (eye) eye.innerHTML = I18N.aboutPage.eyebrow[lang];
    const pt = $('.about-hero .page-title');
    if (pt) pt.innerHTML = I18N.aboutPage.title[lang];
    const ld = $('.about-hero .lead');
    if (ld) ld.textContent = I18N.aboutPage.lead[lang];
    const cvB = $('#cv-btn');
    if (cvB) cvB.innerHTML = I18N.aboutPage.btnCV[lang];

    const h3s = $$('.about-grid .h3');
    if (h3s.length >= 4) {
      h3s[0].textContent = I18N.aboutPage.hExp[lang];
      h3s[1].textContent = I18N.aboutPage.hEdu[lang];
      h3s[2].textContent = I18N.aboutPage.hTools[lang];
      h3s[3].textContent = I18N.aboutPage.hLang[lang];
    }
    const chipsLang = $$('.about-grid .side-list > div:last-child .chip');
    if (chipsLang.length >= 2) {
      chipsLang[0].textContent = I18N.aboutPage.langES[lang];
      chipsLang[1].textContent = I18N.aboutPage.langEN[lang];
    }
    const colabH2 = $('#colabora .p-head h2');
    if (colabH2) colabH2.innerHTML = I18N.aboutPage.collabH2[lang];
    const colabP = $('#colabora .p-head p');
    if (colabP) colabP.textContent = I18N.aboutPage.collabLead[lang];
    const ideas = $$('#colabora .idea');
    if (ideas.length >= 3) {
      $('b', ideas[0]).textContent = I18N.aboutPage.collabIdea1T[lang];
      $('p', ideas[0]).textContent = I18N.aboutPage.collabIdea1P[lang];
      $('b', ideas[1]).textContent = I18N.aboutPage.collabIdea2T[lang];
      $('p', ideas[1]).textContent = I18N.aboutPage.collabIdea2P[lang];
      $('b', ideas[2]).textContent = I18N.aboutPage.collabIdea3T[lang];
      $('p', ideas[2]).textContent = I18N.aboutPage.collabIdea3P[lang];
    }
    const colabBtn = $('#colabora .ctas a');
    if (colabBtn) colabBtn.innerHTML = I18N.aboutPage.collabBtn[lang];
  }

  // 4. Contact Page Specific
  if (location.pathname.includes('contacto')) {
    const eye = $('.page-hero .eyebrow');
    if (eye) eye.innerHTML = I18N.contactPage.eyebrow[lang];
    const pt = $('.page-hero .page-title');
    if (pt) pt.innerHTML = I18N.contactPage.title[lang];
    const ld = $('.page-hero .lead');
    if (ld) ld.textContent = I18N.contactPage.lead[lang];

    const lMarca = $('label[for="who-marca"]');
    if (lMarca) lMarca.textContent = I18N.contactPage.whoMarca[lang];
    const lCreador = $('label[for="who-creador"]');
    if (lCreador) lCreador.textContent = I18N.contactPage.whoCreador[lang];
    const lName = $('label[for="f-name"]');
    if (lName) lName.textContent = I18N.contactPage.labelName[lang];
    const lEmail = $('label[for="f-email"]');
    if (lEmail) lEmail.textContent = I18N.contactPage.labelEmail[lang];
    const lSvc = $('label[for="f-service"]');
    if (lSvc) lSvc.textContent = I18N.contactPage.labelService[lang];
    const lMsg = $('label[for="f-msg"]');
    if (lMsg) lMsg.textContent = I18N.contactPage.labelMsg[lang];
    const tMsg = $('#f-msg');
    if (tMsg) tMsg.placeholder = I18N.contactPage.placeholderMsg[lang];
    const bSub = $('#contact-form button[type="submit"]');
    if (bSub) bSub.innerHTML = I18N.contactPage.btnSubmit[lang];

    const sideCards = $$('.contact-side .side-card');
    if (sideCards.length >= 3) {
      $('small', sideCards[0]).textContent = I18N.contactPage.sideMail[lang];
      const copyB = $('#copy-mail');
      if (copyB) copyB.textContent = I18N.contactPage.sideCopy[lang];
      $('small', sideCards[1]).textContent = I18N.contactPage.sideSocial[lang];
      $('small', sideCards[2]).textContent = I18N.contactPage.sideLocation[lang];
      $('span', sideCards[2]).textContent = I18N.contactPage.sideLocSub[lang];
    }
    const faqH2 = $('#faq .p-head h2');
    if (faqH2) faqH2.innerHTML = I18N.contactPage.faqTitle[lang];
  }

  // 5. Macbeth Case Study Specific
  if (location.pathname.includes('proyecto-macbeth')) {
    const caseBarBack = $('.case-bar .wrap a');
    if (caseBarBack) caseBarBack.innerHTML = I18N.macbethPage.backWork[lang];
    const caseHeadHand = $('.case-head .hand');
    if (caseHeadHand) caseHeadHand.textContent = I18N.macbethPage.sub[lang];

    const dts = $$('.case-meta dt');
    const dds = $$('.case-meta dd');
    if (dts.length >= 5 && dds.length >= 5) {
      dts[0].textContent = I18N.macbethPage.dtProj[lang]; dds[0].textContent = I18N.macbethPage.ddProj[lang];
      dts[1].textContent = I18N.macbethPage.dtType[lang]; dds[1].textContent = I18N.macbethPage.ddType[lang];
      dts[2].textContent = I18N.macbethPage.dtPieces[lang]; dds[2].textContent = I18N.macbethPage.ddPieces[lang];
      dts[3].textContent = I18N.macbethPage.dtPalette[lang]; dds[3].textContent = I18N.macbethPage.ddPalette[lang];
      dts[4].textContent = I18N.macbethPage.dtContext[lang]; dds[4].textContent = I18N.macbethPage.ddContext[lang];
    }
    const sample = $('.case-text .sample');
    if (sample) sample.textContent = I18N.macbethPage.sample[lang];
    const h2s = $$('.case-text h2');
    const ps = $$('.case-text p');
    if (h2s.length >= 3 && ps.length >= 3) {
      h2s[0].textContent = I18N.macbethPage.hIdea[lang]; ps[0].textContent = I18N.macbethPage.pIdea[lang];
      h2s[1].textContent = I18N.macbethPage.hPieces[lang]; ps[1].textContent = I18N.macbethPage.pPieces[lang];
      h2s[2].textContent = I18N.macbethPage.hWhy[lang]; ps[2].textContent = I18N.macbethPage.pWhy[lang];
    }
    const caps = $$('.case-imgs figcaption');
    if (caps.length >= 3) {
      caps[0].textContent = I18N.macbethPage.cap1[lang];
      caps[1].textContent = I18N.macbethPage.cap2[lang];
      caps[2].textContent = I18N.macbethPage.cap3[lang];
    }
    const navPrev = $('.case-next a:first-child small');
    if (navPrev) navPrev.innerHTML = I18N.macbethPage.navPrev[lang];
    const navNext = $('.case-next a:last-child small');
    if (navNext) navNext.innerHTML = I18N.macbethPage.navNext[lang];
  }

  // Re-render grids
  const featured = $('#featured');
  if (featured) renderGrid(featured, PROJECTS.filter(p => p.featured).slice(0, 8));

  const work = $('#work');
  if (work && typeof window.applyWorkFilter === 'function') {
    window.applyWorkFilter();
  }
}

// Wire up language buttons
document.addEventListener('click', e => {
  const btn = e.target.closest('.lang-btn');
  if (btn && btn.dataset.lang) {
    currentLang = btn.dataset.lang;
    localStorage.setItem('site_lang', currentLang);
    applyTranslations(currentLang);
  }
});

/* ───── Rejilla destacada (inicio) ───── */
const featured = $('#featured');
if (featured) renderGrid(featured, PROJECTS.filter(p => p.featured).slice(0, 8));

/* ───── Página de trabajo: filtros, búsqueda y orden ───── */
const work = $('#work');
if (work) {
  let cat = 'all', q = '', sort = 'featured';
  const apply = () => {
    let list = PROJECTS.filter(p => (cat === 'all' || p.cats.includes(cat)) &&
      (!q || norm([p[currentLang]?.title || p.es.title, p[currentLang]?.sub || p.es.sub, ...p.cats.map(c => CATS[c][currentLang].label)].join(' ')).includes(q)));
    if (sort === 'az') list = [...list].sort((a, b) => (a[currentLang]?.title || a.es.title).localeCompare(b[currentLang]?.title || b.es.title, currentLang));
    renderGrid(work, list);
    $('#count').textContent = list.length === 1 ? (currentLang === 'en' ? '1 project' : '1 proyecto') : `${list.length} ${currentLang === 'en' ? 'projects' : 'proyectos'}`;
    $('#empty').hidden = list.length > 0;
    if (M && !reduce) M.animate($$('.card', work), { opacity: [0, 1], y: [18, 0] }, { duration: 0.45, delay: M.stagger(0.035), ease: EASE });
  };
  window.applyWorkFilter = apply;
  $$('.tf').forEach(b => b.addEventListener('click', () => {
    cat = b.dataset.cat;
    $$('.tf').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    apply();
  }));
  const qEl = $('#q');
  if (qEl) qEl.addEventListener('input', e => { q = norm(e.target.value.trim()); apply(); });
  const sortEl = $('#sort');
  if (sortEl) sortEl.addEventListener('change', e => { sort = e.target.value; apply(); });
  renderGrid(work, PROJECTS);

  // Desde Servicios se llega con un filtro ya puesto (trabajo.html#f-branding)
  const pre = location.hash.startsWith('#f-') && $(`.tf[data-cat="${location.hash.slice(3)}"]`);
  if (pre) pre.click();
}

/* ───── Ventana de proyecto (modal) ───── */
const modal = $('#modal');
let lastFocus = null;
function openProject(slug) {
  const p = PROJECTS.find(x => x.slug === slug);
  if (!p || !modal) return false;
  const info = getProjectInfo(p);
  const c = p.cats[0];
  const catShort = CATS[c][currentLang].short;
  $('.m-bar', modal).className = 'm-bar t-' + c;
  $('#m-tag').textContent = '#' + catShort;
  $('#m-title').innerHTML = `${info.title}<small>${info.sub}</small>`;
  $('#m-desc').textContent = info.desc;
  $('#m-tags').innerHTML = p.cats.map(k => `<span class="tag t-${k}">#${CATS[k][currentLang].short}</span>`).join('');
  $('#m-imgs').innerHTML = p.imgs.map((src, i) => `<img src="${src}" alt="${info.title}, image ${i + 1}" loading="lazy">`).join('');
  const link = $('#m-link');
  link.hidden = !p.page;
  if (p.page) {
    link.href = p.page;
    link.innerHTML = I18N.modal.viewFull[currentLang];
  }
  const xBtn = $('.m-x', modal);
  if (xBtn) xBtn.setAttribute('aria-label', I18N.modal.close[currentLang]);
  modal.hidden = false;
  document.documentElement.classList.add('lock');
  modal.scrollTop = 0;
  if (M && !reduce) {
    M.animate($('.modal-back', modal), { opacity: [0, 1] }, { duration: 0.25 });
    M.animate($('.modal-card', modal), { opacity: [0, 1], y: [48, 0] }, { duration: 0.5, ease: EASE });
  }
  $('.m-x', modal).focus();
  try { history.replaceState(null, '', '#' + slug); } catch (e) {}
  return true;
}
function closeProject() {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.documentElement.classList.remove('lock');
  try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  if (lastFocus) lastFocus.focus();
}
if (modal) {
  document.addEventListener('click', e => {
    const card = e.target.closest('.card[data-slug]');
    if (card && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      lastFocus = card;
      openProject(card.dataset.slug);
    }
    if (e.target.closest('[data-close]')) closeProject();
  });
  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeProject();
    if (e.key === 'Tab') {
      const f = $$('a[href]:not([hidden]), button', $('.modal-card', modal));
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  const fromHash = location.hash.slice(1);
  if (fromHash && PROJECTS.some(p => p.slug === fromHash)) motionReady.then(() => openProject(fromHash));
}

/* ───── Stickers que siguen al mouse (paralaje suave) ───── */
const par = $('[data-parallax]');
if (par && !reduce) {
  const items = $$('[data-depth]', par);
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const tick = () => {
    raf = 0;
    cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
    items.forEach(el => {
      const d = +el.dataset.depth;
      el.style.setProperty('--px', (cx * d).toFixed(2) + 'px');
      el.style.setProperty('--py', (cy * d).toFixed(2) + 'px');
    });
    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
  };
  par.addEventListener('pointermove', e => {
    const r = par.getBoundingClientRect();
    tx = (e.clientX - r.left) / r.width - 0.5;
    ty = (e.clientY - r.top) / r.height - 0.5;
    if (!raf) raf = requestAnimationFrame(tick);
  });
  par.addEventListener('pointerleave', () => { tx = ty = 0; if (!raf) raf = requestAnimationFrame(tick); });
}

/* ───── Aparición al hacer scroll ───── */
motionReady.then(() => {
  if (!M || reduce) return;
  $$('[data-reveal] > *, .card, .svc li, .stat, .foot-card, .idea, .timeline li').forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight + 40) return;
    M.inView(el, (a) => {
      const t = a instanceof Element ? a : a.target;
      M.animate(t, { opacity: [0.15, 1], y: [34, 0] }, { duration: 0.75, ease: EASE });
    }, { margin: '0px 0px 25% 0px', amount: 0 });
  });
});

/* ───── Contacto ───── */
const form = $('#contact-form');
if (form) {
  if (location.hash === '#creadores') { $('#who-creador').checked = true; $('#f-service').value = 'colab'; }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const note = $('#form-note');
    const missing = ['f-name', 'f-email', 'f-msg'].filter(id => !$('#' + id).value.trim());
    const emailOk = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('#f-email').value.trim());
    if (missing.length || !emailOk) {
      note.className = 'form-note err';
      note.textContent = currentLang === 'en'
        ? (missing.length ? 'Please enter your name, email, and message.' : 'Please check your email address.')
        : (missing.length ? 'Completa tu nombre, correo y mensaje.' : 'Revisa el correo: parece incompleto.');
      $('#' + (missing[0] || 'f-email')).focus();
      return;
    }
    note.className = 'form-note ok';
    note.textContent = currentLang === 'en'
      ? 'Prototype: form does not send messages yet. On the live site it goes directly to Alanis.'
      : 'Prototipo: el formulario todavía no envía mensajes. En el sitio final llegará directo al correo de Alanis.';
  });
}
const copyBtn = $('#copy-mail');
if (copyBtn) copyBtn.addEventListener('click', () => {
  const text = $('#mail-text').textContent.trim();
  const done = () => {
    copyBtn.textContent = currentLang === 'en' ? 'Copied' : 'Copiado';
    setTimeout(() => (copyBtn.textContent = currentLang === 'en' ? 'Copy' : 'Copiar'), 1800);
  };
  try {
    navigator.clipboard.writeText(text).then(done, () => selectMail());
  } catch (e) { selectMail(); }
  function selectMail() {
    const r = document.createRange(); r.selectNodeContents($('#mail-text'));
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    copyBtn.textContent = currentLang === 'en' ? 'Selected' : 'Seleccionado';
  }
});

/* ───── CV ───── */
const cvBtn = $('#cv-btn');
if (cvBtn) cvBtn.addEventListener('click', e => {
  e.preventDefault();
  $('#cv-note').textContent = currentLang === 'en' ? 'On the final site this button downloads the PDF CV.' : 'En el sitio final este botón descarga el CV en PDF.';
});

// Inicializar traducción si está guardada en 'en'
if (currentLang === 'en') {
  applyTranslations('en');
}
