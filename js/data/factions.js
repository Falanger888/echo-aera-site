/* ==== DATA: FACTIONS ==== */

export const factions = {
  eldarhalm: {
    slug: 'eldarhalm',
    name: 'Солнечные Земли',
    race: 'Люди',
    color: '#c9a227',
    ruler: 'Беспокойный Райк',
    status: 'faction',
    statusLabel: 'Фракция',
    short: 'Империя людей. Равнины, торговые пути, крепости.'
  },
  imirdal: {
    slug: 'imirdal',
    name: 'Громовой Имирдал',
    race: 'Великаны',
    color: '#6fa8dc',
    ruler: 'Мудрый Криомир',
    status: 'faction',
    statusLabel: 'Фракция',
    short: 'Ледяные горы. Портал на Парящие Острова.'
  },
  aenordal: {
    slug: 'aenordal',
    name: 'Аэнордал',
    race: 'Эльфы',
    color: '#6aa84f',
    ruler: 'Вечный Аэнор',
    status: 'faction',
    statusLabel: 'Фракция',
    short: 'Вечный лес. Древо Мудрости, священные рощи.'
  },
  swamp: {
    slug: 'swamp',
    name: 'Болотная Империя',
    race: 'Болотный народ',
    color: '#45818e',
    ruler: 'Морская Аквария',
    status: 'faction',
    statusLabel: 'Фракция',
    short: 'Русалки и рыболюди. Интриги и пророчества.'
  },
  jauhar: {
    slug: 'jauhar',
    name: 'Пустыня Джаухар',
    race: 'Изгои',
    color: '#d4a76a',
    ruler: 'Нет правителя',
    status: 'outcast',
    statusLabel: 'Изгой',
    short: 'Нейтральная земля. Здесь нет правил.'
  },
  heavenly: {
    slug: 'heavenly',
    name: 'Парящие Острова',
    race: 'Небожители',
    color: '#b4a7d6',
    ruler: 'Хранитель',
    status: 'observer',
    statusLabel: 'Наблюдатель',
    short: 'Финальная локация. Смотрит, но не вмешивается.'
  }
};

/* Порядок для отображения */
export const factionOrder = ['eldarhalm', 'imirdal', 'aenordal', 'swamp', 'jauhar', 'heavenly'];

/* Текущие отношения. По умолчанию — все нейтральны.
 * В будущем игроки будут менять их. Пока — нейтралитет. */
export const currentRelations = {
  // Формат: 'slugA-slugB': 'ally' | 'war' | 'trade' | 'neutral'
  // Порядок ключа: по алфавиту (a-b, не b-a)
};

/* Типы отношений */
export const relationTypes = {
  ally:    { label: 'Союз',        short: 'С', color: '#6aa84f', symbol: '⚔' },
  trade:   { label: 'Торговля',    short: 'Т', color: '#c9a227', symbol: '◈' },
  war:     { label: 'Вражда',      short: 'В', color: '#c0392b', symbol: '✕' },
  neutral: { label: 'Нейтралитет', short: '—', color: '#5a5d6b', symbol: '—' }
};

/* Текущая политическая обстановка — что уже происходит в лоре.
 * Это фон, а не игровое состояние. */
export const loreNotes = [
  {
    title: 'Райк против всех',
    text: 'Шестой король людей ведёт империю к упадку. Повышает налоги, раздаёт должности сторонникам, начинает войны с соседями. Из империи бегут в пустыню.',
    factions: ['eldarhalm']
  },
  {
    title: 'Дружба эльфов и болот',
    text: 'Аэнор и Ундина безоговорочно доверяют друг другу. Эльфы первыми признали болотный народ равным. Зелёный Мост — символ этого союза.',
    factions: ['aenordal', 'swamp']
  },
  {
    title: 'Нейтралитет великанов',
    text: 'Криомир держится в стороне. Портал на Парящие Острова построил его дед. Великаны ждут.',
    factions: ['imirdal']
  },
  {
    title: 'Пустыня — против всех',
    text: 'Здесь нет фракций. Только гильдии, договоры и песок. Джин исчез, закон держится на памяти о нём.',
    factions: ['jauhar']
  },
  {
    title: 'Хранитель наблюдает',
    text: 'Он не вмешивается. Но портал в его владения — в горах великанов. И Аэнор — единственный, кто знает, где Зал «Эйра».',
    factions: ['heavenly']
  }
];