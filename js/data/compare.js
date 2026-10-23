/* ==== DATA: COMPARE REGIONS ==== */

export const compareData = {
  eldarhalm: {
    name: 'Солнечные Земли',
    color: '#c9a227',
    art: 'images/regions/eldarhalm.jpg',
    fields: {
      race:        'Люди',
      capital:     'Элдарград',
      ruler:       'Беспокойный Райк (тиран)',
      founded:     'Год 10',
      philosophy:  'Порядок, торговля, экспансия',
      economy:     'Зерно, скот, ткани, инструменты',
      landscape:   'Равнины, речные долины, морское побережье',
      magic:       'Низкая — магия здесь редкость',
      keyLocation: 'Зал «Эйра» (точное место неизвестно)',
      status:      'Фракция'
    }
  },
  imirdal: {
    name: 'Громовой Имирдал',
    color: '#6fa8dc',
    art: 'images/regions/imirdal.jpg',
    fields: {
      race:        'Великаны',
      capital:     'Имирград',
      ruler:       'Мудрый Криомир',
      founded:     'Год 10',
      philosophy:  'Выдержка, честь, кузнечное дело',
      economy:     'Руды, громокамень, оружие, доспехи',
      landscape:   'Ледяные горы, вечные льды, грозовые бури',
      magic:       'Средняя — рунная магия кузнецов',
      keyLocation: 'Портал на Парящие Острова (не работает)',
      status:      'Фракция'
    }
  },
  aenordal: {
    name: 'Аэнордал',
    color: '#6aa84f',
    art: 'images/regions/aenordal.jpg',
    fields: {
      race:        'Эльфы',
      capital:     'Ирмион',
      ruler:       'Вечный Аэнор',
      founded:     'Древние времена',
      philosophy:  'Гармония с природой, память, вечность',
      economy:     'Древесина, травы, мёд, меха, магические предметы',
      landscape:   'Вечный лес, священные рощи',
      magic:       'Высокая — эльфы владеют древней магией',
      keyLocation: 'Древо Мудрости',
      status:      'Фракция'
    }
  },
  swamp: {
    name: 'Болотная Империя',
    color: '#45818e',
    art: 'images/regions/swamp.jpg',
    fields: {
      race:        'Болотный народ',
      capital:     'Мермерия',
      ruler:       'Морская Аквария',
      founded:     'Год 10',
      philosophy:  'Тайна, изменчивость, перерождение',
      economy:     'Рыба, водоросли, рис, ремесленные изделия',
      landscape:   'Болота, заводи, подводные города',
      magic:       'Высокая — пророчества и целительство',
      keyLocation: 'Зал Будущего',
      status:      'Фракция'
    }
  },
  jauhar: {
    name: 'Пустыня Джаухар',
    color: '#d4a76a',
    art: 'images/regions/jauhar.jpg',
    fields: {
      race:        'Изгои всех рас',
      capital:     'Джаухар',
      ruler:       'Нет правителя (джин исчез)',
      founded:     'До 0',
      philosophy:  'Свобода, анархия, закон песка',
      economy:     'Драгоценные камни, соль, специи, ковры',
      landscape:   'Пустыня, дюны, редкие оазисы',
      magic:       'Средняя — магия пустыни, миражи',
      keyLocation: 'Гробница первого короля',
      status:      'Изгой'
    }
  },
  heavenly: {
    name: 'Парящие Острова',
    color: '#b4a7d6',
    art: 'images/regions/heavenly.jpg',
    fields: {
      race:        'Небожители (маги)',
      capital:     'Неизвестна',
      ruler:       'Хранитель (Создатель)',
      founded:     'До 0',
      philosophy:  'Знание, наблюдение, отстранённость',
      economy:     'Магические предметы, зелья, знания, артефакты',
      landscape:   'Парящие острова, облачные плато',
      magic:       'Абсолютная — источник всей магии Эйры',
      keyLocation: 'Зал «Эйра» (скрыт)',
      status:      'Наблюдатель'
    }
  }
};

export const compareFields = [
  { key: 'race',        label: 'Раса' },
  { key: 'capital',     label: 'Столица' },
  { key: 'ruler',       label: 'Правитель' },
  { key: 'founded',     label: 'Основана' },
  { key: 'status',      label: 'Статус' },
  { key: 'philosophy',  label: 'Философия' },
  { key: 'economy',     label: 'Экономика' },
  { key: 'landscape',   label: 'Ландшафт' },
  { key: 'magic',       label: 'Магия' },
  { key: 'keyLocation', label: 'Ключевая локация' }
];

export const compareOrder = ['eldarhalm', 'imirdal', 'aenordal', 'swamp', 'jauhar', 'heavenly'];