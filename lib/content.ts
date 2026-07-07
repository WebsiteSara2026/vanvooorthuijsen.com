export type Lang = "en" | "nl"

export type SideKey = "analytical" | "creative"

type ServiceItem = {
  title: string
  body: string
}

type SideContent = {
  eyebrow: string
  label: string
  headline: string
  tagline: string
  services: ServiceItem[]
  hireLine: string
}

type Content = {
  nav: {
    both: string
    contact: string
  }
  hero: {
    kicker: string
    tagline: string
    title: string
    titleAccentCreative: string
    titleAccentAnalytical: string
    intro: string
    prompt: string
  }
  sides: Record<SideKey, SideContent>
  both: {
    eyebrow: string
    title: string
    body: string
  }
  about: {
    eyebrow: string
    stat: string
    statLabel: string
    body: string
  }
  cta: {
    title: string
    body: string
    button: string
    email: string
  }
  footer: {
    rights: string
  }
}

export const content: Record<Lang, Content> = {
  en: {
    nav: { both: "Both halves", contact: "Get in touch" },
    hero: {
      kicker: "Chris van Voorthuijsen — Freelance consultant",
      tagline: "Clear, Simple, Result.",
      title: "One brain. Two halves.",
      titleAccentCreative: "creative",
      titleAccentAnalytical: "analytical",
      intro:
        "I rent out my thinking — and you decide which side does the work. Some projects need the creative half: story, voice, and words that make people feel something. Others need the analytical half: structure, strategy, and a plan that holds up under pressure.",
      prompt: "Pick a half to explore",
    },
    sides: {
      analytical: {
        eyebrow: "Left brain",
        label: "The analytical side",
        headline: "Strategy, structure, and clear thinking.",
        tagline: "For complex or high-stakes projects that need direction and rigor.",
        services: [
          {
            title: "Strategy & positioning",
            body: "Defining where you're going and why it matters — value propositions and positioning that align your team.",
          },
          {
            title: "Business project structuring",
            body: "Turning complex initiatives into a clear, workable plan and keeping momentum from kickoff to delivery.",
          },
          {
            title: "Clarity from chaos",
            body: "Connecting the dots between teams and turning ambition into a sharp, executable roadmap.",
          },
        ],
        hireLine: "Hire this side when you need to make sense of the mess.",
      },
      creative: {
        eyebrow: "Right brain",
        label: "The creative side",
        headline: "Storytelling, copywriting, and voice.",
        tagline: "For when you know what you want to say, but not yet how to say it.",
        services: [
          {
            title: "Copywriting",
            body: "Website copy, campaign messaging, and long-form content that turns rough ideas and strategy into words people remember.",
          },
          {
            title: "Brand narrative",
            body: "A story and voice that actually sound like you — consistent across every touchpoint.",
          },
          {
            title: "Messaging that moves",
            body: "Words that don't just inform, but make people feel something and act on it.",
          },
        ],
        hireLine: "Hire this side when you need to move people.",
      },
    },
    both: {
      eyebrow: "And when you need both",
      title: "The story and the strategy come from the same head.",
      body: "The real advantage: no handoff, no lost-in-translation between the smart plan and the words that carry it. Your message stays sharp and your execution holds up.",
    },
    about: {
      eyebrow: "About",
      stat: "25+",
      statLabel: "years in fast-moving, high-growth environments",
      body: "I work flexibly — remote or on-site, whatever the project needs — hands-on, and I get to the point quickly. Two connected strengths, one head — so you can shape the story and the strategy without the gaps in between.",
    },
    cta: {
      title: "Which half do you need?",
      body: "Tell me about the project and I'll tell you which side of the brain to put to work — or both.",
      button: "Start a conversation",
      email: "info@vanvoorthuijsen.com",
    },
    footer: { rights: "Chris van Voorthuijsen. All rights reserved." },
  },
  nl: {
    nav: { both: "Beide helften", contact: "Neem contact op" },
    hero: {
      kicker: "Chris van Voorthuijsen — Freelance consultant",
      tagline: "Clear, Simple, Result.",
      title: "Eén brein. Twee helften.",
      titleAccentCreative: "creatieve",
      titleAccentAnalytical: "analytische",
      intro:
        "Ik verhuur mijn denkkracht — en jij kiest welke kant het werk doet. Sommige projecten vragen om de creatieve helft: verhaal, stem en woorden die iets losmaken. Andere vragen om de analytische helft: structuur, strategie en een plan dat onder druk overeind blijft.",
      prompt: "Kies een helft om te ontdekken",
    },
    sides: {
      analytical: {
        eyebrow: "Linkerhersenhelft",
        label: "De analytische kant",
        headline: "Strategie, structuur en helder denken.",
        tagline: "Voor complexe projecten met hoge inzet die richting en scherpte nodig hebben.",
        services: [
          {
            title: "Strategie & positionering",
            body: "Bepalen waar je heen gaat en waarom het ertoe doet — waardeproposities en positionering die je team op één lijn brengen.",
          },
          {
            title: "Structureren van projecten",
            body: "Complexe initiatieven vertalen naar een helder, werkbaar plan en vaart houden van start tot oplevering.",
          },
          {
            title: "Helderheid uit chaos",
            body: "De verbanden leggen tussen teams en ambitie omzetten in een scherpe, uitvoerbare routekaart.",
          },
        ],
        hireLine: "Huur deze kant in als je grip wilt krijgen op de chaos.",
      },
      creative: {
        eyebrow: "Rechterhersenhelft",
        label: "De creatieve kant",
        headline: "Storytelling, copywriting en stem.",
        tagline: "Voor als je weet wát je wilt zeggen, maar nog niet hóe.",
        services: [
          {
            title: "Copywriting",
            body: "Websiteteksten, campagneboodschappen en longread-content die ruwe ideeën én strategie omzet in woorden die blijven hangen.",
          },
          {
            title: "Merkverhaal",
            body: "Een verhaal en stem die echt bij jou passen — consistent op elk contactmoment.",
          },
          {
            title: "Boodschappen die raken",
            body: "Woorden die niet alleen informeren, maar iets losmaken en tot actie aanzetten.",
          },
        ],
        hireLine: "Huur deze kant in als je mensen in beweging wilt krijgen.",
      },
    },
    both: {
      eyebrow: "En als je beide nodig hebt",
      title: "Het verhaal en de strategie komen uit hetzelfde hoofd.",
      body: "Het echte voordeel: geen overdracht, niets dat verloren gaat tussen het slimme plan en de woorden die het dragen. Je boodschap blijft scherp en je uitvoering houdt stand.",
    },
    about: {
      eyebrow: "Over mij",
      stat: "25+",
      statLabel: "jaar in snelle, sterk groeiende omgevingen",
      body: "Ik werk flexibel — op afstand of op locatie, wat het project ook vraagt — hands-on en kom snel ter zake. Twee verbonden krachten, één hoofd — zodat je het verhaal én de strategie vormgeeft zonder gaten ertussen.",
    },
    cta: {
      title: "Welke helft heb je nodig?",
      body: "Vertel me over het project en ik zeg je welke hersenhelft aan het werk moet — of allebei.",
      button: "Start een gesprek",
      email: "info@vanvoorthuijsen.com",
    },
    footer: { rights: "Chris van Voorthuijsen. Alle rechten voorbehouden." },
  },
}
