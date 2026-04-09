# FitFuel — Shopify Theme Custom

> E-commerce de nutrition sportive avec expérience personnalisée via quiz interactif

🔗 **Live Demo** : https://fitfuel-portfolio.myshopify.com  
📁 **Repo** : github.com/TON-USER/fitfuel-theme

---

## Aperçu

![FitFuel Homepage](./screenshot.png)

FitFuel est une boutique Shopify custom spécialisée dans la vente de compléments alimentaires et produits de nutrition sportive. Elle se distingue par une expérience personnalisée permettant aux utilisateurs de recevoir des recommandations adaptées à leurs objectifs.

---

## Features

- **Quiz intelligent** — 4 étapes progressives avec recommandations produits personnalisées
- **Catalogue produits** — Grille avec filtres dynamiques par catégorie (Protéines, Gainers, Brûleurs, Vitamines)
- **Add to cart AJAX** — Ajout au panier sans rechargement de page
- **Section Abonnement** — Plans achat unique vs mensuel avec économies
- **Témoignages** — Section preuve sociale avec badges objectifs
- **CTA Banner** — Bannière de conversion avec quiz trigger
- **Nav fixe glassmorphism** — Compteur panier dynamique
- **Footer complet** — Liens, réseaux sociaux, modes de paiement
- **Responsive** — Mobile-first, adapté à tous les écrans
- **Theme Editor compatible** — Toutes les sections sont configurables via l'éditeur Shopify sans toucher au code

---

## Stack technique

| Couche | Techno |
|--------|--------|
| Plateforme | Shopify (Online Store 2.0) |
| Templating | Liquid |
| Frontend | HTML5, CSS3, JavaScript vanilla |
| Thème base | Dawn (Shopify official) |
| CLI | Shopify CLI 3.x |
| Versioning | Git + GitHub |

---

## Architecture du thème

```
fitfuel-theme/
├── assets/
│   ├── fitfuel.css          # Design tokens, composants, animations
│   └── fitfuel.js           # Quiz logic, AJAX cart, filtres, nav
├── sections/
│   ├── hero-fitfuel.liquid           # Hero homepage
│   ├── quiz-teaser.liquid            # Section quiz teaser
│   ├── featured-products-fitfuel.liquid  # Grille produits + filtres
│   ├── subscription-fitfuel.liquid   # Plans abonnement
│   ├── testimonials-fitfuel.liquid   # Témoignages clients
│   └── cta-banner-fitfuel.liquid     # Bannière CTA finale
├── layout/
│   └── theme.liquid         # Layout global (nav + footer + quiz overlay)
└── templates/
    └── index.json           # Composition homepage
```

---

## Design System

- **Couleurs** : Noir `#080A0E` · Bleu `#00D4FF` · Vert `#00FF87`
- **Typographie** : Barlow Condensed (display) + DM Sans (body)
- **Style** : Dark athletic — énergique, moderne, fitness-oriented

---

## Installation locale

```bash
# Prérequis : Node.js 20+, Git, Shopify CLI

# 1. Cloner le repo
git clone https://github.com/TON-USER/fitfuel-theme.git
cd fitfuel-theme

# 2. Lancer le serveur de dev
shopify theme dev --store TON-STORE.myshopify.com

# 3. Ouvrir dans Chrome
# http://127.0.0.1:9292
```

---

## Déploiement

```bash
shopify theme push --store TON-STORE.myshopify.com
```

---

## Roadmap (prochaines features)

- [ ] Page Quiz `/pages/quiz` — version complète standalone
- [ ] Page Collection `/collections` — filtres avancés + tri
- [ ] Page Produit — FAQ accordion + toggle abonnement
- [ ] Intégration Judge.me — avis clients réels
- [ ] Intégration Klaviyo — email marketing automation
- [ ] Intégration Recharge — abonnements récurrents

---

## Auteur

Développé par **[Ton Nom]**  
Portfolio : [ton-portfolio.com]  
LinkedIn : [linkedin.com/in/ton-profil]
