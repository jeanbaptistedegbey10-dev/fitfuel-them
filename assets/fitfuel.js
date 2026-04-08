/**
 * FitFuel — JavaScript
 * Fichier : assets/fitfuel.js
 *
 * Contient :
 * - Quiz interactif
 * - Filtre produits
 * - Add to cart AJAX
 * - Nav scroll effect
 */

/* ============================================================
   QUIZ
   ============================================================ */

const FF_QUIZ_STEPS = [
  {
    label: "Étape 1 / 4",
    question: "Quel est ton objectif principal ?",
    options: [
      { icon: "💪", title: "Prise de masse",  sub: "Gagner du muscle rapidement",     value: "masse" },
      { icon: "🔥", title: "Perte de poids",  sub: "Perdre la graisse efficacement",  value: "poids" },
      { icon: "⚡", title: "Endurance",        sub: "Courir plus vite, plus longtemps",value: "endurance" },
      { icon: "🧘", title: "Bien-être",        sub: "Santé générale et vitalité",      value: "bienetre" },
    ]
  },
  {
    label: "Étape 2 / 4",
    question: "Ton niveau d'entraînement ?",
    options: [
      { icon: "🌱", title: "Débutant",     sub: "Moins de 6 mois",         value: "debutant" },
      { icon: "🏋️", title: "Intermédiaire",sub: "Entre 6 mois et 2 ans",   value: "intermediaire" },
      { icon: "🚀", title: "Confirmé",     sub: "Plus de 2 ans",           value: "confirme" },
      { icon: "🏆", title: "Compétiteur",  sub: "Niveau compétition",      value: "competiteur" },
    ]
  },
  {
    label: "Étape 3 / 4",
    question: "Combien de séances par semaine ?",
    options: [
      { icon: "1️⃣", title: "1 – 2 séances", sub: "Programme léger",       value: "1-2" },
      { icon: "3️⃣", title: "3 – 4 séances", sub: "Entraînement régulier", value: "3-4" },
      { icon: "5️⃣", title: "5 – 6 séances", sub: "Entraînement intensif", value: "5-6" },
      { icon: "🗓️", title: "7 séances+",     sub: "Athlète professionnel", value: "7plus" },
    ]
  }
];

// Tags Shopify à mapper vers les résultats du quiz
// Modifie ces handles pour qu'ils correspondent à tes vraies collections Shopify
const FF_QUIZ_RESULTS = {
  masse:     { label: "Prise de Masse",  handles: ["whey-pure-pro", "mass-builder-x", "multisport-complex"],  tag: "masse" },
  poids:     { label: "Perte de Poids",  handles: ["thermofuel-elite", "whey-pure-pro", "multisport-complex"], tag: "poids" },
  endurance: { label: "Endurance",       handles: ["whey-pure-pro", "multisport-complex", "bcaa-recovery"],    tag: "endurance" },
  bienetre:  { label: "Bien-être",       handles: ["multisport-complex", "omega-3-premium", "magnesium-sport"],tag: "bienetre" },
};

let ffQuizStep = 0;
let ffQuizAnswers = {};

function ffOpenQuiz() {
  const overlay = document.getElementById('ff-quiz-overlay');
  if (!overlay) return;
  ffQuizStep = 0;
  ffQuizAnswers = {};
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  ffRenderQuizStep();
}

function ffCloseQuiz() {
  const overlay = document.getElementById('ff-quiz-overlay');
  if (!overlay) return;
  overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

function ffRenderQuizStep() {
  const content  = document.getElementById('ff-quiz-content');
  const progress = document.getElementById('ff-quiz-progress-bar');
  if (!content || !progress) return;

  if (ffQuizStep >= FF_QUIZ_STEPS.length) {
    ffRenderQuizResult();
    return;
  }

  const step = FF_QUIZ_STEPS[ffQuizStep];
  const pct  = ((ffQuizStep + 1) / (FF_QUIZ_STEPS.length + 1)) * 100;
  progress.style.width = pct + '%';

  content.innerHTML = `
    <span class="ff-quiz__step-label">${step.label}</span>
    <p class="ff-quiz__question">${step.question}</p>
    <div class="ff-quiz__options">
      ${step.options.map((opt, i) => `
        <button
          class="ff-quiz__option"
          data-value="${opt.value}"
          onclick="ffSelectOption(${i}, '${opt.value}')"
        >
          <span class="ff-quiz__option-icon">${opt.icon}</span>
          <span class="ff-quiz__option-title">${opt.title}</span>
          <span class="ff-quiz__option-sub">${opt.sub}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function ffSelectOption(index, value) {
  // Highlight sélection
  document.querySelectorAll('.ff-quiz__option').forEach(el => el.classList.remove('is-selected'));
  const options = document.querySelectorAll('.ff-quiz__option');
  if (options[index]) options[index].classList.add('is-selected');

  // Sauvegarder la réponse
  if (ffQuizStep === 0) ffQuizAnswers.objective = value;
  if (ffQuizStep === 1) ffQuizAnswers.level = value;
  if (ffQuizStep === 2) ffQuizAnswers.frequency = value;

  // Délai pour l'animation puis passer à l'étape suivante
  setTimeout(() => {
    ffQuizStep++;
    ffRenderQuizStep();
  }, 380);
}

function ffRenderQuizResult() {
  const content  = document.getElementById('ff-quiz-content');
  const progress = document.getElementById('ff-quiz-progress-bar');
  if (!content || !progress) return;

  progress.style.width = '100%';

  const objective = ffQuizAnswers.objective || 'masse';
  const result    = FF_QUIZ_RESULTS[objective] || FF_QUIZ_RESULTS.masse;

  // Sauvegarder dans sessionStorage pour la page collection
  sessionStorage.setItem('ff_quiz_result', JSON.stringify(ffQuizAnswers));

  // Construire les URLs produits dynamiquement
  const productItems = result.handles.map((handle, i) => {
    const prices = ['34,90€', '47,90€', '22,90€'];
    const names  = {
      'whey-pure-pro':      'Whey Pure Pro',
      'mass-builder-x':     'Mass Builder X',
      'thermofuel-elite':   'ThermoFuel Elite',
      'multisport-complex': 'MultiSport Complex',
      'bcaa-recovery':      'BCAA Recovery',
      'omega-3-premium':    'Oméga-3 Premium',
      'magnesium-sport':    'Magnésium Sport',
    };
    return `
      <div class="ff-quiz__result-product">
        <span class="ff-quiz__result-product-name">${names[handle] || handle}</span>
        <span class="ff-quiz__result-product-price">${prices[i] || '–'}</span>
      </div>
    `;
  }).join('');

  content.innerHTML = `
    <div class="ff-quiz__result">
      <div style="font-size: 3rem; margin-bottom: 0.5rem;">✅</div>
      <p class="ff-quiz__result-title">Plan ${result.label}</p>
      <p class="ff-quiz__result-sub">Voici les 3 produits recommandés pour ton profil :</p>
      <div class="ff-quiz__result-products">${productItems}</div>
      <a
        href="/collections/all?sort_by=best-selling&filter.p.tag=${result.tag}"
        class="ff-btn ff-btn--primary"
        style="width: 100%; justify-content: center; margin-top: 0.5rem;"
        onclick="ffCloseQuiz()"
      >
        Voir mon plan complet
      </a>
      <p style="font-size: 0.78rem; color: var(--ff-text-muted); margin-top: 1rem; font-family: var(--ff-font-body);">
        Livraison gratuite dès 50€ · Garantie satisfaction 30 jours
      </p>
    </div>
  `;
}

/* ============================================================
   FILTRES PRODUITS
   ============================================================ */

function ffInitFilters() {
  const filterBtns = document.querySelectorAll('.ff-filter-btn');
  const productCards = document.querySelectorAll('.ff-product-card[data-tags]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Activer le bouton
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filtrer les cartes
      productCards.forEach(card => {
        if (filter === 'all') {
          card.style.display = 'block';
        } else {
          const tags = card.dataset.tags || '';
          card.style.display = tags.includes(filter.toLowerCase()) ? 'block' : 'none';
        }
      });
    });
  });
}

/* ============================================================
   ADD TO CART — AJAX
   ============================================================ */

async function ffAddToCart(event, btn) {
  event.preventDefault();
  event.stopPropagation();

  const variantId = btn.dataset.productId;
  if (!variantId) return;

  btn.disabled = true;
  btn.textContent = '…';

  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: 1 })
    });

    if (!response.ok) throw new Error('Erreur réseau');

    await response.json();

    // Feedback visuel
    btn.textContent = '✓';
    btn.style.background = 'var(--ff-green)';

    // Mettre à jour le compteur panier
    await ffUpdateCartCount();

    setTimeout(() => {
      btn.textContent = '+';
      btn.style.background = '';
      btn.disabled = false;
    }, 1800);

  } catch (err) {
    console.error('Add to cart error:', err);
    btn.textContent = '!';
    btn.style.background = 'var(--ff-red)';
    setTimeout(() => {
      btn.textContent = '+';
      btn.style.background = '';
      btn.disabled = false;
    }, 1500);
  }
}

async function ffUpdateCartCount() {
  try {
    const res  = await fetch('/cart.js');
    const cart = await res.json();
    const countEl = document.querySelector('.ff-cart-count');
    if (countEl) {
      countEl.textContent = `Panier (${cart.item_count})`;
    }
  } catch (e) {
    // silently fail
  }
}

/* ============================================================
   NAV SCROLL EFFECT
   ============================================================ */

function ffInitNav() {
  const nav = document.querySelector('.ff-nav-wrapper');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 80) {
      nav.style.background = 'rgba(8, 10, 14, 0.98)';
    } else {
      nav.style.background = 'rgba(8, 10, 14, 0.88)';
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ============================================================
   QUIZ OVERLAY — FERMER AU CLIC EXTÉRIEUR
   ============================================================ */

function ffInitQuizOverlay() {
  const overlay = document.getElementById('ff-quiz-overlay');
  if (!overlay) return;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) ffCloseQuiz();
  });

  // ESC pour fermer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') ffCloseQuiz();
  });
}

/* ============================================================
   BOUTONS OUVRIR QUIZ (tous les éléments avec data-quiz-open)
   ============================================================ */

function ffInitQuizTriggers() {
  document.querySelectorAll('[data-quiz-open], #ff-open-quiz').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      ffOpenQuiz();
    });
  });
}

/* ============================================================
   INIT — tout démarre ici
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  ffInitNav();
  ffInitFilters();
  ffInitQuizOverlay();
  ffInitQuizTriggers();
});