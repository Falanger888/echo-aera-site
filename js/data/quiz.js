/* ==== DATA: QUIZ (шуточный) ==== */

export const questions = [
  {
    text: 'Ты просыпаешься у озера. Не помнишь, как здесь оказался. Первая мысль?',
    answers: [
      { text: '«Опять пятница»',                    scores: { people: 2, warriors: 1 } },
      { text: '«Это сон. Надо ущипнуть себя»',       scores: { elves: 2, mages: 1 } },
      { text: '«Где мой телефон?»',                  scores: { desert: 2, hunters: 1 } },
      { text: '«О, приключение!»',                   scores: { heavenly: 2, mages: 2 } }
    ]
  },
  {
    text: 'К тебе вышли три тени и сказали: «Сохрани баланс». Что ты ответишь?',
    answers: [
      { text: '«Скиньте на карту»',                  scores: { desert: 2, hunters: 1 } },
      { text: '«Это точно про Wi-Fi?»',              scores: { people: 2, warriors: 1 } },
      { text: '«Я подумаю»',                         scores: { elves: 2, healers: 1 } },
      { text: 'Молча кивну, лишь бы отстали',        scores: { swamp: 2, healers: 1 } }
    ]
  },
  {
    text: 'Впереди развилка. Слева — деревня, справа — горы. Куда?',
    answers: [
      { text: 'В деревню — там еда',                 scores: { people: 2, warriors: 1 } },
      { text: 'В горы — там тихо',                   scores: { giants: 2, warriors: 2 } },
      { text: 'Налево, всегда налево',               scores: { swamp: 2, healers: 1 } },
      { text: 'Стою и думаю уже полчаса',            scores: { heavenly: 2, mages: 1 } }
    ]
  },
  {
    text: 'Тебе дали загадочный предмет. Что делаешь?',
    answers: [
      { text: 'Сразу съем',                          scores: { desert: 2, hunters: 1 } },
      { text: 'Потрясу и приложу к уху',             scores: { people: 2, warriors: 1 } },
      { text: 'Положу в инвентарь, разберусь потом', scores: { elves: 1, mages: 2 } },
      { text: 'Продам на барахолке',                 scores: { desert: 2, hunters: 2 } }
    ]
  },
  {
    text: 'Ночью ты услышал шёпот звёзд. Твои действия?',
    answers: [
      { text: 'Запишу, вдруг пригодится',            scores: { heavenly: 2, mages: 2 } },
      { text: 'Пойду за шёпотом',                    scores: { elves: 2, hunters: 1 } },
      { text: 'Скажу звёздам: «Помолчите»',          scores: { giants: 2, warriors: 2 } },
      { text: 'Уже сплю, не мешайте',                scores: { swamp: 2, healers: 1 } }
    ]
  },
  {
    text: 'Врата в финальную локацию. Ты внутри. Что делаешь?',
    answers: [
      { text: 'Иду к выходу, я тут проездом',        scores: { desert: 2, hunters: 1 } },
      { text: 'Обнимаю всех',                        scores: { swamp: 2, healers: 2 } },
      { text: 'Осматриваю углы, вдруг что ценное',   scores: { elves: 2, hunters: 1 } },
      { text: 'Стою красиво. Пусть смотрят',         scores: { heavenly: 2, mages: 1 } }
    ]
  }
];

export const races = {
  people: {
    name: 'Человек из Солнечных Земель',
    region: 'Солнечные Земли',
    regionId: 'eldarhalm',
    tagline: 'Ты — из тех, кто идёт напролом и не жалуется.',
    description: 'Практичный, упрямый, всегда знаешь, где ближайшая таверна. Идеальный кандидат для любой передряги — если не считать, что ты в неё обычно и влипаешь.',
    art: 'images/quiz/people.jpg'
  },
  elves: {
    name: 'Эльф из Аэнордала',
    region: 'Аэнордал',
    regionId: 'aenordal',
    tagline: 'Ты — из тех, кто всё замечает и ничего не говорит.',
    description: 'Внимательный, спокойный, любишь деревья больше людей. Иногда кажешься загадочным — на самом деле ты просто интроверт.',
    art: 'images/quiz/elves.jpg'
  },
  giants: {
    name: 'Великан из Громового Имирдала',
    region: 'Громовой Имирдал',
    regionId: 'imirdal',
    tagline: 'Ты — из тех, кто сначала делает, потом думает.',
    description: 'Сильный, прямой, не любишь болтовню. Если дал слово — держишь. Если обидели — ну, ты понял.',
    art: 'images/quiz/giants.jpg'
  },
  swamp: {
    name: 'Житель Болотной Империи',
    region: 'Болотная Империя',
    regionId: 'swamp',
    tagline: 'Ты — из тех, кто всех жалеет и всех лечит.',
    description: 'Эмпатичный, мягкий, терпеливый. Ты выслушаешь даже того, кого никто не хочет слушать. Включая самого себя.',
    art: 'images/quiz/swamp.jpg'
  },
  desert: {
    name: 'Кочевник из Джаухара',
    region: 'Пустыня Джаухар',
    regionId: 'jauhar',
    tagline: 'Ты — из тех, кто никогда не сидит на месте.',
    description: 'Свободный, выносливый, ни к чему не привязанный. Дом — там, где ты сейчас. Проблема: ты не всегда помнишь, где именно.',
    art: 'images/quiz/desert.jpg'
  },
  heavenly: {
    name: 'Небожитель с Парящих Островов',
    region: 'Парящие Острова',
    regionId: 'heavenly',
    tagline: 'Ты — из тех, кто задаёт слишком много вопросов.',
    description: 'Любопытный, задумчивый, витаешь в облаках. Возможно, в буквальном смысле. Возможно, даже физически.',
    art: 'images/quiz/heavenly.jpg'
  }
};

export const classes = {
  warriors: {
    name: 'Воин',
    tagline: 'Просто. Прямо. Больно.',
    description: 'Ты идёшь вперёд. Когда что-то мешает — ты это сносишь. Философия: «если не работает, приложи больше силы».'
  },
  mages: {
    name: 'Маг',
    tagline: 'Знание — тоже оружие.',
    description: 'Ты решаешь проблемы головой. Иногда — головой других. По крайней мере, так ты говоришь.'
  },
  healers: {
    name: 'Целитель',
    tagline: 'Я помогу. Но потом буду ворчать.',
    description: 'Ты лечишь других, забывая о себе. Это благородно. И немного тревожно.'
  },
  hunters: {
    name: 'Охотник',
    tagline: 'Стоять. Смотреть. Ждать.',
    description: 'Ты терпелив. Ты наблюдаешь. Ты бьёшь точно. А ещё ты всегда таскаешь с собой верёвку. На всякий случай.'
  }
};

export function calculateResult(answers) {
  const totals = {};

  answers.forEach(scores => {
    if (!scores) return;
    Object.entries(scores).forEach(([key, value]) => {
      totals[key] = (totals[key] || 0) + value;
    });
  });

  let topRace = null;
  let topRaceScore = 0;
  let topClass = null;
  let topClassScore = 0;

  Object.entries(totals).forEach(([key, value]) => {
    if (races[key] && value > topRaceScore) {
      topRace = key;
      topRaceScore = value;
    }
    if (classes[key] && value > topClassScore) {
      topClass = key;
      topClassScore = value;
    }
  });

  return {
    race: races[topRace] || races.people,
    raceKey: topRace || 'people',
    clazz: classes[topClass] || classes.warriors,
    clazzKey: topClass || 'warriors'
  };
}